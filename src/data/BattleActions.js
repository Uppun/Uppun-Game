import BattleActionTypes from './BattleActionTypes'
import Dispatcher from './BattleDispatcher'

const Actions = {
    PlayerAttack(AttackResults) {
        Dispatcher.dispatch({
            type: BattleActionTypes.ATK_BATTLE,
            Results: AttackResults,
        })
    },
    EnemyAttack(AttackResults) {
        Dispatcher.dispatch({
            type: BattleActionTypes.ENM_ATK,
            Results: AttackResults,
        })
    },
    UpdateTarget(index) {
        Dispatcher.dispatch({
            type: BattleActionTypes.UPDATE_TARGET,
            CurrentTarget: index,
        })
    },
    Initialize(GameState) {
        Dispatcher.dispatch({
            type: BattleActionTypes.INITIALIZE,
            EnemyInfo: GameState.enemies,
            TeamInfo: GameState.heroes,
        })
    },
}

export default Actions
