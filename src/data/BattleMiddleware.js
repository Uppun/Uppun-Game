import muhServer from '../assets/MockServer'
import BattleActions from './BattleActions'

function MockSend(data) {
    return JSON.stringify(data)
}

function MockParse(data) {
    return JSON.parse(data)
}

function startGame() {
    const gameStart = MockParse(muhServer.initializeGame())
    BattleActions.Initialize(gameStart)
}
function serverAttack(target) {
    const AttackResults = MockParse(muhServer.updateGame(target))
    if (AttackResults.EnemyAttacks) {
        for (let i = 0; i < AttackResults.TeamAttacks.length; i++) {
            BattleActions.EnemyAttack(AttackResults.TeamAttacks[i])
        }
    }
    for (let j = 0; j < AttackResults.EnemyAttacks.length; j++) {
        BattleActions.PlayerAttack(AttackResults.EnemyAttacks[j])
    }
}

export default {startGame, serverAttack}
