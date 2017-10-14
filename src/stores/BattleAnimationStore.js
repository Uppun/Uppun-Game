import Middleware from '../Middleware'
import {ReduceStore} from 'flux/utils'
import Dispatcher from '../Dispatcher'
import ActionTypes from '../actions/ActionTypes'
import Sprites from '../assets/Animation_Data'

class BattleAnimationStore extends ReduceStore {
    constructor() {
        super(Dispatcher)
    }


    getInitialState() {
        let queue = []
        return { queue }
    }

    reduce(state, action) {
        switch(action.type) {
            case ActionTypes.ENEMY_ATTACKED:
                return {...state, 
                    queue: [...state.queue,
                        {type: 'player', info: {
                        currentMember: action.attacker, 
                        frames: Sprites.Usagi.Attack.number, 
                        order: Sprites.Usagi.Attack.order, 
                        startingPosition: Sprites.Usagi.Attack.start,
                        dimensions: Sprites.Usagi.Attack.dimensions
                    }
                }]
            }
            default:
                return state
        }
    }
}

export default new BattleAnimationStore()