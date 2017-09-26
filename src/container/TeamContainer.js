import TeamStore from '../data/TeamStore'
import React from 'react'
import {Container} from 'flux/utils'

class EnemyWindow extends React.Component {
    static getStores() {
        return [TeamStore]
    }

    static calculateState(prevState) {
        return {
            ...TeamStore.getState()
        }
    }

    render() {
        return (
        <div> 
            {this.state.Team.map((player, index) => (
            <div key={index} style={{...player.characterSprite, position: 'absolute', top: Math.floor((Math.random() * 100)+90)}}/>))}
        </div>)
    }
}

export default Container.create(EnemyWindow)