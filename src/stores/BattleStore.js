import {ReduceStore} from 'flux/utils'
import Dispatcher from '../Dispatcher'
import ActionTypes from '../actions/ActionTypes'

function updateElement(array, index, updateFunc) {
    return array.map((item, i) => (i === index ? updateFunc(item) : item))
}

class BattleStore extends ReduceStore {
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
                return action.game

            case ActionTypes.UPDATE_TARGET:
                return state.stages[state.currentStage].enemies[action.index].enemyHP > 0
                    ? {...state, target: action.index}
                    : state

            case ActionTypes.ENEMY_ATTACKED: {
                const {recipient, damage} = action.results
                const {stages, currentStage} = state

                return {
                    ...state,
                    stages: updateElement(stages, currentStage, stage => ({
                        ...stage,
                        enemies: updateElement(stage.enemies, recipient, enemy => ({
                            ...enemy,
                            enemyHP: Math.max(enemy.enemyHP - damage, 0),
                        })),
                    })),
                }
            }

            case ActionTypes.STAGE_CHANGE: {
                return {...state, currentStage: action.stage}
            }

            default:
                return state
        }
    }
}

export default new BattleStore()
