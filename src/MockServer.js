import SailorMoon from './assets/usagi.gif'
import SailorMars from './assets/rei.gif'

function makeTestPlayer() {
    return {
    characterSprite: {
        backgroundPositionX: 353,
        backgroundPositionY: 685,
        height: 40,
        width: 40,
        top: 150,
        left: 250,
        backgroundImage: `url(${SailorMoon})`,
        zIndex: 2,
    },
    playerHP: Math.floor(Math.random() * 50 + 21),
    playerBaseAtk: Math.floor(Math.random() * 10 + 1),
};
}

function makeTestEnemy() {
    return {
    enemySprite: {
        backgroundPositionX: 100,
        backgroundPositionY: 355,
        height: 40,
        width: 39,
        top: 150,
        left: 50,
        backgroundImage: `url(${SailorMars})`,
        zIndex: 2,
        visibility: 'visible',
    },
    enemyHP: Math.floor(Math.random() * 10 + 2),
    enemyBaseAtk: Math.floor(Math.random() * 10 + 1),
};
}

function MockSend(data) {
    return JSON.stringify(data)
}

function MockParse(data) {
    return JSON.parse(data)
}

function newGame() {
    const team = []
    const teamSize = Math.floor(Math.random() * 4 + 1)
    for (let i = 0; i < teamSize; i++) {
        team.push(makeTestPlayer())
    }

    const stages = []
    const numStages = Math.floor(Math.random() * 3 + 1)
    for (let i = 0; i < numStages; i++) {
        const enemies = []
        const numEnemies = Math.floor(Math.random() * 3 + 1)
        for (let j = 0; j < numEnemies; j++) {
            enemies.push(makeTestEnemy())
        }
        stages.push({enemies})
    }

    return {currentStage: 0, heroes: {team}, numStages, stages}
}

const gameState = newGame()

function initializeGame() {
    return MockSend(gameState)
}

function updateGame(data) {
    const teamAttacks = []
    const enemyAttacks = []

    const {currentStage, heroes, stages} = gameState
    const {team} = heroes
    const {enemies} = stages[currentStage]
    let currentTarget = MockParse(data).target

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
    }
    else {
        if ((currentStage + 1) < gameState.numStages){
            gameState.currentStage += 1
        }
    }
    return MockSend({teamAttacks, enemyAttacks, stageUpdate: gameState.currentStage})
}

export default {initializeGame, updateGame}
