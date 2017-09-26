import BattleActionTypes from './BattleActionTypes'
import Dispatcher from './BattleDispatcher'
import EnemyStore from './EnemyStore'
import CharacterStore from './CharacterStore'
import BattleStore from './BattleStore'
const Actions = {
    PlayerAttack() {
        Dispatcher.dispatch({
            type: BattleActionTypes.ATK_BATTLE,
            playerDamage: Math.floor((Math.random() * CharacterStore.getState().playerBaseAtk) + 1),
            enemyDamage: Math.floor((Math.random() * 5 + 1))
        })
    }

}

export default Actions