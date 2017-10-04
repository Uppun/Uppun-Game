import {ReduceStore} from 'flux/utils'
import BattleDispatcher from './BattleDispatcher'
import SailorMars from '../assets/rei.gif'
import BattleActionTypes from './BattleActionTypes'

class EnemyStore extends ReduceStore {
    constructor() {
        super(BattleDispatcher)
    }

    getInitialState() {
        return {
            enemySprite: {
                backgroundPositionX: 100,
                backgroundPositionY: 355,
                height: 40,
                width: 39,
                top: 100,
                left: 50,
                backgroundImage: `url(${SailorMars})`,
                zIndex: 2,
            },
            enemyHP: Math.floor(Math.random() * 50 + 21),
            enemyBaseAtk: Math.floor(Math.random() * 10 + 1),
        }
    }
    reduce(state, action) {
        switch (action.type) {
            case BattleActionTypes.ATK_BATTLE:
                if (state.enemyHP - action.playerDamage <= 0)
                    return {
                        ...state,
                        enemyHP: 0,
                    }

                return {
                    ...state,
                    enemyHP: state.enemyHP - action.playerDamage,
                }

            default:
                return state
        }
    }
}

export default new EnemyStore()
