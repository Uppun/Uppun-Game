import BattleActions from '../data/BattleActions'
import SailorMoon from './usagi.gif'
import SailorMars from './rei.gif'

let TeamArray = []
const TeamSize = Math.floor((Math.random()*4) + 1)
const testPlayer = {
    characterSprite: {
        backgroundPositionX: 353,
        backgroundPositionY: 685,
        height: 40,
        width: 40,
        top: 150,
        left: 250,
        backgroundImage: `url(${SailorMoon})`,
        zIndex: 2
    },
    playerHP: Math.floor((Math.random()*50)+21),
    playerBaseAtk: Math.floor((Math.random()*10)+1)
}

for (let i = 0; i < TeamSize; i++) {
        TeamArray.push(testPlayer)
    }
const TeamState = {Team: TeamArray}

let BattleArray = []
const BattleSize = Math.floor((Math.random()*3) + 1)
const testEnemy = {
    enemySprite: {
        backgroundPositionX: 100,
        backgroundPositionY: 355,
        height: 40,
        width: 39,
        top: 150,
        left: 50,
        backgroundImage: `url(${SailorMars})`,
        zIndex: 2,
        visibility: 'visible'
    },
    enemyHP: Math.floor((Math.random()*10)+2),
    enemyBaseAtk: Math.floor((Math.random()*10)+1)
}
for (let i = 0; i < BattleSize; i++) {
    let EnemyArray = []
    const EnemyNumber = Math.floor((Math.random()*3) + 1)
    for (let j = 0; j < EnemyNumber; j++) {
        EnemyArray.push(testEnemy)
    }
        BattleArray[i] = {enemies: EnemyArray}
}
const BattleState = {Target: 0, CurrentPage: 0, MaxPages: BattleSize, stages: BattleArray}

const GameState = {enemies: BattleState, heroes: TeamState}

function MockSend(data) {
    return JSON.stringify(data)
}


function initializeGame() {
    return MockSend(GameState)
}
function updateGame(target) {
    let TeamAttacks = []
    let EnemyAttacks = []


    const battle = GameState.enemies
    const stage = battle.stages[battle.CurrentPage]
    const {enemies} = stage
    const players = GameState.heroes.Team
    battle.Target = target
    let CurrentEnemy = enemies[battle.Target]

    for (let i = 0; i < players.length; i++) {
        if (players[i].playerHP > 0) {
            const DamageDone = Math.floor((Math.random() * players[i].playerBaseAtk) + 1)
            TeamAttacks.push({ attacker: i, damage: DamageDone, receiver: battle.Target })
            console.log(CurrentEnemy)
            CurrentEnemy.enemyHP -= DamageDone
            if (CurrentEnemy.enemyHP <= 0) {
                CurrentEnemy.enemyHP = 0
                CurrentEnemy = enemies.find(enemy => enemy.enemyHP > 0)
                if (CurrentEnemy)
                    battle.Target = enemies.findIndex(enemy => enemy.enemyHP > 0)
                else
                    break;
            }
        }
    }

    for (let j = 0; j < enemies.length; j++) {
        if (enemies[j].enemyHP > 0) {
            const DamageDone = Math.floor((Math.random() * enemies[j].enemyBaseAtk) + 1)
            const enemyTarget = players.findIndex(member => member.playerHP > 0)
            EnemyAttacks.push({ attacker: j, damage: DamageDone, enemyTarget })
            players[enemyTarget].playerHP -= DamageDone
            if (players[enemyTarget].playerHP <= 0){
                players[enemyTarget].playerHP = 0
            }

        }
    }



    return MockSend({TeamAttacks, EnemyAttacks})
}

export default {initializeGame, updateGame}