import BattleActionTypes from './BattleActionTypes'
import Dispatcher from './BattleDispatcher'
import BattleStore from './BattleStore'
const Actions = {
    PlayerAttack() {
        Dispatcher.dispatch({
            type: BattleActionTypes.ATK_BATTLE,
        })
    },
    UpdateTarget(index) {
        Dispatcher.dispatch({
            type: BattleActionTypes.UPDATE_TARGET,
            CurrentTarget: index
        })
    }

}

export default Actions