import BattleStore from '../data/BattleStore'
import React from 'react'
import {Container} from 'flux/utils'

class EnemyWindow extends React.Component {
    static getStores() {
        return [BattleStore]
    }

    static calculateState(prevState) {
        const battles = BattleStore.getState()
        return battles.stages[battles.CurrentPage - 1]
    }

    render() {
        console.log(this.state.enemies)
        return (
        <div> 
            {this.state.enemies.map((enemy, index) => (
            <div key={index} style={{...enemy.enemySprite, position: 'absolute', top: Math.floor((Math.random() * 100)+90)}}/>))}
        </div>)
    }
}

export default Container.create(EnemyWindow)