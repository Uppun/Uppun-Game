import EnemyStore from '../data/EnemyStore'
import React from 'react'
import {Container} from 'flux/utils'

class EnemyWindow extends React.Component {
    static getStores() {
        return [EnemyStore]
    }

    static calculateState(prevState) {
        return {
            ...EnemyStore.getState(),
        }
    }
    render() {
        return <div style={{...this.state.enemySprite, position: 'absolute'}} />
    }
}

export default Container.create(EnemyWindow)
