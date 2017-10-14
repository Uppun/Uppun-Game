import {ReduceStore} from 'flux/utils'
import Dispatcher from '../Dispatcher'
import ActionTypes from '../actions/ActionTypes'
import Sprites from '../assets/Animation_Data'

class BattleAnimationStore extends ReduceStore {
    constructor() {
        super(Dispatcher)
    }

    getInitialState() {
        const queue = []
        return {queue}
    }

    // eslint-disable-next-line class-methods-use-this
    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.ENEMY_ATTACKED:
                return {
                    ...state,
                    queue: [
                        ...state.queue,
                        {
                            type: 'player',
                            info: {
                                currentMember: action.results.attacker,
                                frames: Sprites.Usagi.Attack.number,
                                order: Sprites.Usagi.Attack.order,
                                startingPosition: Sprites.Usagi.Attack.start,
                                dimensions: Sprites.Usagi.Attack.dimensions,
                            },
                        },
                    ],
                }
            case ActionTypes.ANIMATION_DONE:
                return {...state, queue: state.queue.slice(1)}
            default:
                return state
        }
    }
}

export default new BattleAnimationStore()
