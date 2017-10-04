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
    for (let i = 0; i < AttackResults.TeamAttacks.length(); i++) {
        BattleActions.PlayerAttack(AttackResults.EnemyAttacks[i])
    }
    for (let j = 0; j < AttackResults.EnemyAttacks.length(); j++) {
        BattleActions.EnemyAttacK(AttackResults.TeamAttacks[j])
    }
    
}