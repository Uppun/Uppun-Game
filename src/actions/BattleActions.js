import Dispatcher from '../Dispatcher'
import ActionTypes from './ActionTypes'
import BattleStore from '../stores/BattleStore'
import Middleware from '../Middleware'

export default {
    initialize(game) {
        Dispatcher.dispatch({
            type: ActionTypes.INITIALIZE,
            game,
        })
    },

    updateTarget(index) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_TARGET,
            index,
        })
    },

    attack() {
        const {target} = BattleStore.getState()
        Middleware.sendAttack(target)
    },

    playerAttacked(results) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAYER_ATTACKED,
            results,
        })
    },

    enemyAttacked(results) {
        Dispatcher.dispatch({
            type: ActionTypes.ENEMY_ATTACKED,
            results,
        })
    },
    changeStage(stage) {
        Dispatcher.dispatch({
            type: ActionTypes.STAGE_CHANGE,
            stage,
        })
    },

    playerAnimate(AnimationInfo) {
        Dispatcher.dispatch({
            type: ActionTypes.PLAYER_ANIMATE,
            AnimationInfo
        })
    }
}
