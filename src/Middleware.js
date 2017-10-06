import Server from './MockServer'
import BattleActions from './actions/BattleActions'

function MockSend(data) {
    return JSON.stringify(data)
}

function MockParse(data) {
    return JSON.parse(data)
}

function startGame() {
    const game = MockParse(Server.initializeGame())
    BattleActions.initialize(game)
}

function sendAttack(target) {
    const results = MockParse(Server.updateGame(MockSend({target})))

    for (const attack of results.teamAttacks) {
        BattleActions.enemyAttacked(attack)
    }

    for (const attack of results.enemyAttacks) {
        BattleActions.playerAttacked(attack)
    }
    BattleActions.changeStage(results.stageUpdate)
}

export default {startGame, sendAttack}
