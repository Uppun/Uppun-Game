import {ReduceStore} from 'flux/utils'
import BattleDispatcher from './BattleDispatcher'
import SailorMars from '../assets/rei.gif'
import BattleActionTypes from './BattleActionTypes'
import TeamStore from './TeamStore'

function updateEnemies(state, damage) {
    const newState = {...state}
    const stagesCopy = [...newState.stages]
    const enemyArrayCopy = [...stagesCopy[newState.CurrentPage-1].enemies]
    let enemyLocation = null
    if (newState.Target == null)
        enemyLocation = enemyArrayCopy.findIndex(enemy => 
            enemy.enemyHP > 0)
    else 
        enemyLocation = newState.Target
        
    const enemy = {...enemyArrayCopy[enemyLocation]}
    if (enemy.enemyHP - damage <= 0){
        enemy.enemyHP = 0
        newState.Target = null
    }
    else {
        enemy.enemyHP -= damage
    }
    enemyArrayCopy[enemyLocation] = enemy
    stagesCopy[newState.CurrentPage-1].enemies = enemyArrayCopy
    newState.stages = stagesCopy
    return newState
}
class BattleStore extends ReduceStore {
    constructor() {
        super(BattleDispatcher)
    }
    getInitialState() {
        let BattleArray = []
        const BattleSize = Math.floor((Math.random()*3) + 1)
        const testEnemy = {
            enemySprite: {
                backgroundPositionX: 100,
                backgroundPositionY: 355,
                height: 40,
                width: 39,
                top: 100,
                left: 50,
                backgroundImage: `url(${SailorMars})`,
                zIndex: 2,
                visibility: 'visible'
            },
            enemyHP: Math.floor((Math.random()*10)+2),
            enemyBaseAtk: Math.floor((Math.random()*10)+1)
        }
        for (let i = 0; i < BattleSize; i++) {
            let EnemyArray = []
            const EnemyNumber = Math.floor((Math.random()*3) + 1)
            for (let j = 0; j < EnemyNumber; j++) {
                EnemyArray.push(testEnemy)
            }
                BattleArray[i] = {enemies: EnemyArray}
        }
        const BattleState = {Target: null, CurrentPage: 1, MaxPages: BattleSize, stages: BattleArray}
        return (BattleState)
    }
    reduce (state, action) {
        switch(action.type) {
            case BattleActionTypes.ATK_BATTLE: {
                const DamageTaken = Math.floor((Math.random() * TeamStore.getState().Team[0].playerBaseAtk) + 1)
                const newState = updateEnemies(state, DamageTaken)
                const isAllDead = newState.stages[newState.CurrentPage-1].enemies.every(enemy => 
                    enemy.enemyHP === 0)
                if(isAllDead) {
                    if(newState.CurrentPage < newState.MaxPages){
                        newState.CurrentPage += 1
                    }
                }
                return newState
            }
            case BattleActionTypes.UPDATE_TARGET: {
                const newState = {...state}
                newState.Target = action.CurrentTarget
                return newState
            }
            
            default: 
                return state
        }
    }
}

export default new BattleStore()