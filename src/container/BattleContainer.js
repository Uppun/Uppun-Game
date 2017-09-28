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
        return battles.stages[battles.CurrentPage - 1]
    }
    onClickTarget = (index) => {
        BattleActions.UpdateTarget(index)
    }
    render() {
        console.log(this.state.enemies)
        return (
        <div> 
            {this.state.enemies.map((enemy, index) => (
            <div key={index} onClick= {() => this.onClickTarget(index)} style={{...enemy.enemySprite, position: 'absolute', top: enemy.enemySprite.top + (index * 50)}}/>))}
        </div>)
    }
}

export default Container.create(EnemyWindow)