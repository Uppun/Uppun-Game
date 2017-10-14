import Server from './MockServer'
import BattleActions from './actions/BattleActions'
import Sprites from './assets/Animation_Data'
import Dispatcher from './Dispatcher'
import BattleAnimationStore from './stores/BattleAnimationStore'

Dispatcher.register((payload) => { 
    if (payload.actionType === 'ENEMY_ATTACKED') {
        Dispatcher.waitFor(BattleAnimationStore.getDispatchToken())

        const AnimationInfo = BattleAnimationStore.getState()
        for (let currentFrame = 0; currentFrame < AnimationInfo.frames; currentFrame++) {
            setTimeout(() => {
               BattleActions.playerAnimate(AnimationInfo)
            }, 1000 * (currentFrame+1))
        }
    }
})

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
