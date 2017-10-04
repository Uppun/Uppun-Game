import React from 'react'
import {Container} from 'flux/utils'
import BattleStore from '../data/BattleStore'
import BattleActions from '../data/BattleActions'

class EnemyWindow extends React.Component {
    static getStores() {
        return [BattleStore]
    }

    static calculateState(prevState) {
        const battles = BattleStore.getState()
        if (battles) {
            return battles.stages[battles.CurrentPage]
        }

        return null
    }
    onClickTarget = index => {
        BattleActions.UpdateTarget(index)
    }
    render() {
        if (this.state.enemies != null) {
            return (
                <div>
                    {this.state.enemies.map((enemy, index) => (
                        <div
                            key={index}
                            onClick={() => this.onClickTarget(index)}
                            style={{
                                ...enemy.enemySprite,
                                position: 'absolute',
                                top: enemy.enemySprite.top + index * 50,
                            }}
                        />
                    ))}
                </div>
            )
        }

        return null
    }
}

export default Container.create(EnemyWindow)
