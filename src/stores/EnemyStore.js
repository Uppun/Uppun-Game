import {ReduceStore} from 'flux/utils'
import Dispatcher from '../Dispatcher'
import ActionTypes from '../actions/ActionTypes'
import SailorMars from '../assets/rei.gif'

class EnemyStore extends ReduceStore {
    constructor() {
        super(Dispatcher)
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

    // eslint-disable-next-line class-methods-use-this
    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.ENEMY_ATTACKED:
                return {
                    ...state,
                    enemyHP: Math.max(state.enemyHP - action.playerDamage, 0),
                }

            default:
                return state
        }
    }
}

export default new EnemyStore()
