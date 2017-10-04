import {ReduceStore} from 'flux/utils'
import Dispatcher from '../Dispatcher'
import ActionTypes from '../actions/ActionTypes'
import SailorMoon from '../assets/usagi.gif'

class CharacterStore extends ReduceStore {
    constructor() {
        super(Dispatcher)
    }

    getInitialState() {
        return {
            characterSprite: {
                backgroundPositionX: 353,
                backgroundPositionY: 685,
                height: 40,
                width: 40,
                top: 100,
                left: 250,
                backgroundImage: `url(${SailorMoon})`,
                zIndex: 2,
            },
            playerHP: Math.floor(Math.random() * 50 + 21),
            playerBaseAtk: Math.floor(Math.random() * 10 + 1),
        }
    }

    // eslint-disable-next-line class-methods-use-this
    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.PLAYER_ATTACKED:
                return {
                    ...state,
                    playerHP: Math.max(state.playerHP - action.enemyDamage, 0),
                }

            default:
                return state
        }
    }
}

export default new CharacterStore()
