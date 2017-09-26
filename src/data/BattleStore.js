import {ReduceStore} from 'flux/utils'
import BattleDispatcher from './BattleDispatcher'
import SailorMars from '../assets/rei.gif'
import BattleActionTypes from './BattleActionTypes'

function updateEnemies(enemies, action) {
    const enemyLocation = enemies.findIndex(enemy => 
        enemy.enemyHP > 0)
    const enemiesCopy = [...enemies]
    let enemy = {...enemiesCopy[enemyLocation]}
    if (enemy.enemyHP - action.playerDamage <= 0){
        enemy.enemyHP = 0
    }
    else {
        enemy.enemyHP -= action.playerDamage
    }
    enemiesCopy[enemyLocation] = {...enemy}
    return enemiesCopy
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
        const BattleState = {CurrentPage: 1, MaxPages: BattleSize, stages: BattleArray}
        return (BattleState)
    }
    reduce (state, action) {
        switch(action.type) {
            case BattleActionTypes.ATK_BATTLE: {
                const newState = {...state}
                const stagesCopy = [...newState.stages]
                let enemyArrayCopy = [...stagesCopy[newState.CurrentPage-1].enemies]
                enemyArrayCopy = updateEnemies(enemyArrayCopy, action)
                const isAllDead = enemyArrayCopy.every(enemy => 
                    enemy.enemyHP === 0)
                stagesCopy[newState.CurrentPage-1].enemies = enemyArrayCopy
                newState.stages = stagesCopy
                if(isAllDead) {
                    if(newState.CurrentPage < newState.MaxPages){
                        newState.CurrentPage += 1
                    }
                }
                return newState
            }
            
            default: 
                return state
        }
    }
}

export default new BattleStore()