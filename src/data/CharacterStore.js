import {ReduceStore} from 'flux/utils'
import BattleDispatcher from './BattleDispatcher'
import SailorMoon from '../assets/usagi.gif'
import BattleActionTypes from './BattleActionTypes'
class CharacterStore extends ReduceStore {
    constructor() {
        super(BattleDispatcher)
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
                zIndex: 2
            },
            playerHP: Math.floor((Math.random()*50)+21),
            playerBaseAtk: Math.floor((Math.random()*10)+1)
        }
    }
    reduce (state, action) {
        switch(action.type) {
            case BattleActionTypes.ATK_BATTLE:
                if ((state.playerHP - action.enemyDamage) <= 0)
                    return {
                        ...state,
                        playerHP: 0
                    }
                else {
                    return {
                        ...state, 
                        playerHP: state.playerHP - action.enemyDamage, 
                    }
                }

            default: 
                return state
        }
    }
}

export default new CharacterStore()