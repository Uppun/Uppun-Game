import BattleStore from '../data/BattleStore'
import React from 'react'
import {Container} from 'flux/utils'
import BattleActions from '../data/BattleActions'

class EnemyWindow extends React.Component {
    static getStores() {
        return [BattleStore]
    }

    static calculateState(prevState) {
        const battles = BattleStore.getState()
        if (battles){
            return battles.stages[battles.CurrentPage]
        }
        else {
            return null
        }
    }
    onClickTarget = (index) => {
        BattleActions.UpdateTarget(index)
    }
    render() {
        if (this.state.enemies != null) {
            return (
            <div> 
                {this.state.enemies.map((enemy, index) => (
                <div key={index} onClick= {() => this.onClickTarget(index)} style={{...enemy.enemySprite, position: 'absolute', top: enemy.enemySprite.top + (index * 50)}}/>))}
            </div>)
        }
        else {
            return null
        }
    }
}

export default Container.create(EnemyWindow)