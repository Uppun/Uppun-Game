import {ReduceStore} from 'flux/utils'
import BattleDispatcher from './BattleDispatcher'
import SailorMars from '../assets/rei.gif'
import BattleActionTypes from './BattleActionTypes'
import TeamStore from './TeamStore'

class BattleStore extends ReduceStore {
    constructor() {
        super(BattleDispatcher)
    }
    getInitialState() {
    return null
    }
    reduce (state, action) {
        switch(action.type) {
            case BattleActionTypes.ENM_ATK: {
                const newState = {...state}
                const stages = [...newState.stages]
                const enemyArray = [...stages[newState.CurrentPage]]
                const enemy = {...enemyArray[action.Results.receiver]}
                enemy.enemyHP -= action.Results.damage
                if(enemy.enemyHP < 0)
                    enemy.enemyHP = 0
                enemyArray[action.Results.receiver] = enemy
                stages[newState.CurrentPage] = enemyArray
                newState.stages = stages
                return newState
            }
            case BattleActionTypes.UPDATE_TARGET: {
                const newState = {...state}
                if (newState.stages[newState.CurrentPage-1].enemies[action.CurrentTarget].enemyHP !== 0) {
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