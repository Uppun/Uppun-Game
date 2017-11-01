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
                                frames: Sprites.Usagi.Animation.Attack.number,
                                order: Sprites.Usagi.Animation.Attack.order,
                                startingPosition: Sprites.Usagi.Animation.Attack.start,
                                dimensions: Sprites.Usagi.Animation.Attack.dimensions,
                            },
                        },
                    ],
                }
            case ActionTypes.PLAYER_ATTACKED:
                return {
                    ...state,
                    queue: [
                        ...state.queue,
                        {
                            type: 'enemy',
                            info: {
                                currentMember: action.results.attacker,
                                frames: Sprites.Rei.Animation.Attack.number,
                                order: Sprites.Rei.Animation.Attack.order,
                                startingPosition: Sprites.Rei.Animation.Attack.start,
                                dimensions: Sprites.Rei.Animation.Attack.dimensions,
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
