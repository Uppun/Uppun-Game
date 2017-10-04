import {ReduceStore} from 'flux/utils'
import BattleDispatcher from './BattleDispatcher'
import BattleActionTypes from './BattleActionTypes'

class BattleStore extends ReduceStore {
    constructor() {
        super(BattleDispatcher)
    }
    getInitialState() {
        return null
    }
    // eslint-disable-next-line class-methods-use-this
    reduce(state, action) {
        switch (action.type) {
            case BattleActionTypes.ENM_ATK: {
                const newState = {...state}
                const stages = [...newState.stages]
                const stage = {...stages[newState.CurrentPage]}
                const enemyArray = [...stage.enemies]
                const enemy = {...enemyArray[action.Results.receiver]}
                enemy.enemyHP -= action.Results.damage
                if (enemy.enemyHP < 0) enemy.enemyHP = 0
                enemyArray[action.Results.receiver] = enemy
                stage.enemies = enemyArray
                stages[newState.CurrentPage] = stage
                newState.stages = stages
                return newState
            }
            case BattleActionTypes.UPDATE_TARGET: {
                const newState = {...state}
                if (newState.stages[newState.CurrentPage].enemies[action.CurrentTarget].enemyHP !== 0) {
                    newState.Target = action.CurrentTarget
                }
                return newState
            }

            case BattleActionTypes.INITIALIZE: {
                return action.EnemyInfo
            }

            default:
                return state
        }
    }
}

export default new BattleStore()
