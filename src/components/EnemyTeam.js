import React from 'react'
import {Container} from 'flux/utils'
import BattleActions from '../actions/BattleActions'
import BattleStore from '../stores/BattleStore'

class EnemySprite extends React.PureComponent {
    handleClick = () => {
        const {onClick, index} = this.props
        if (onClick) onClick(index)
    }

    render() {
        const {style} = this.props
        return <div onClick={this.handleClick} style={style} />
    }
}

class EnemyTeam extends React.PureComponent {
    static getStores() {
        return [BattleStore]
    }

    static calculateState(prevState) {
        const battles = BattleStore.getState()
        if (battles == null) {
            return null
        }

        return battles.stages[battles.currentStage]
    }

    handleClickTarget = index => {
        BattleActions.updateTarget(index)
    }

    render() {
        const {enemies} = this.state
        if (enemies == null) {
            return null
        }

        return (
            <div>
                {enemies.map((enemy, index) => (
                    <EnemySprite
                        key={index}
                        index={index}
                        onClick={this.handleClickTarget}
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
}

export default Container.create(EnemyTeam)
