import {ReduceStore} from 'flux/utils'
import Dispatcher from '../Dispatcher'
import ActionTypes from '../actions/ActionTypes'

function updateElement(array, index, updateFunc) {
    return array.map((item, i) => (i === index ? updateFunc(item) : item))
}

class TeamStore extends ReduceStore {
    constructor() {
        super(Dispatcher)
    }

    getInitialState() {
        return null
    }

    // eslint-disable-next-line class-methods-use-this
    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.INITIALIZE:
                return action.game.heroes

            case ActionTypes.PLAYER_ATTACKED: {
                const {enemyTarget, damage} = action.results
                return {
                    ...state,
                    team: updateElement(state.team, enemyTarget, member => ({
                        ...member,
                        playerHP: Math.max(member.playerHP - damage, 0),
                    })),
                }
            }

            default:
                return state
        }
    }
}

export default new TeamStore()
