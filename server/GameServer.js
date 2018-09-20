const WebSocket = require('ws')
const MongoClient = require('mongodb').MongoClient
const uuidv4 = require('uuid/v4')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:/gameDb';
const PORT = process.env.PORT || 9000;

const wss = new WebSocket.Server({ port: PORT })
wss.on('listening', () => { console.log("Server started!")})
let db


wss.broadcast = function broadcast(data) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  };
  
wss.on('connection', (ws) => {
    let gameState
    let sessionId
    ws.send(JSON.stringify({type: 'connection'}))
    ws.on('message', (data) => {
        let recievedData
        try {
            recievedData = JSON.parse(data)
        } catch(err) {
            ws.close(1007, 'Invalid message, closing connection.')
            return
        }
        console.log(recievedData)
        switch(recievedData.type) {
            case 'initialize':
                MongoClient.connect(MONGODB_URI).then(db => {
                    db.collection('sessions').findOne({sessionId: recievedData.sessionId}).then(sessionInfo => {  
                        if (sessionInfo === null) {
                            sessionId = uuidv4()
                            newGame(sessionId).then(state => {
                                gameState = state
                                ws.send(JSON.stringify({type: 'initialize', game: gameState, sessionId}))
                            })
                        } else {
                            gameState = sessionInfo.state
                            sessionId = sessionInfo.sessionId
                            ws.send(JSON.stringify({type: 'initialize', game: sessionInfo.state, sessionId: sessionInfo.sessionId}))
                        }
                    db.close()})})
                break;
            case 'attack':
                ws.send(JSON.stringify(updateGame(recievedData.target, gameState, sessionId)))
                break;
        }
    })
})
function makeTestPlayer() {
    return {
        character: 'Usagi',
        playerHP: Math.floor(Math.random() * 50 + 21),
        playerBaseAtk: Math.floor(Math.random() * 10 + 1),
    }
}

function makeTestEnemy() {
    return {
        enemy: 'Rei',
        enemyHP: Math.floor(Math.random() * 10 + 2),
        enemyBaseAtk: Math.floor(Math.random() * 10 + 1),
    }
}

async function newGame(sessionId) {
    let team = []
    const teamSize = Math.floor(Math.random() * 4 + 1)
    const stages = []
    const numStages = Math.floor(Math.random() * 3 + 1)

    db = await MongoClient.connect(MONGODB_URI)
    const teamPromises = []
    for (let i = 0; i < teamSize; i++) {
        teamPromises.push(db.collection('characters').findOne({character: "Usagi"}))
    }
    team = await Promise.all(teamPromises)
    for (let i = 0; i < numStages; i++) {
        const enemies = []
        const numEnemies = Math.floor(Math.random() * 3 + 1)
        for (let j = 0; j < numEnemies; j++) {
            enemies.push(db.collection('enemies').findOne({enemy: "Rei"}))
        }
        stages.push({enemies: await Promise.all(enemies)})
    }
    const returnValue = {currentStage: 0, heroes: {team}, numStages, stages}
    db.collection('sessions').insertOne({sessionId, state: returnValue})
    db.close()

    return returnValue
}


function updateGame(data, gameState, sessionId) {
    const teamAttacks = []
    const enemyAttacks = []

    const {currentStage, heroes, stages} = gameState
    const {team} = heroes
    const {enemies} = stages[currentStage]
    let currentTarget = data

    for (let i = 0; i < team.length; i++) {
        const hero = team[i]
        if (hero.playerHP <= 0) continue

        currentTarget = currentTarget != null ? currentTarget : enemies.findIndex(enemy => enemy.enemyHP > 0)
        if (currentTarget === -1) {
            break
        }

        const damage = Math.floor(Math.random() * hero.playerBaseAtk + 1)
        teamAttacks.push({attacker: i, damage, recipient: currentTarget})

        const enemy = enemies[currentTarget]
        enemy.enemyHP -= damage
        if (enemy.enemyHP <= 0) {
            enemy.enemyHP = 0
            currentTarget = null
        }
    }
    if (enemies.some(enemy => enemy.enemyHP > 0)) {
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i]
            if (enemy.enemyHP <= 0) continue

            const damage = Math.floor(Math.random() * enemy.enemyBaseAtk + 1)
            const enemyTarget = team.findIndex(hero => hero.playerHP > 0)
            if (enemyTarget === -1) {
                break
            }
            enemyAttacks.push({attacker: i, damage, enemyTarget})

            team[enemyTarget].playerHP = Math.max(team[enemyTarget].playerHP - damage, 0)
        }
    } else if (currentStage + 1 < gameState.numStages) {
        gameState.currentStage += 1
    }
    MongoClient.connect(MONGODB_URI).then(db => {
        console.log(gameState)
        console.log(sessionId)
        db.collection('sessions').updateOne({sessionId}, {$set:{state: gameState}}).then(() =>
            db.close())
    })
    return {type: 'attacks', teamAttacks, enemyAttacks, stageUpdate: gameState.currentStage}
}