import React from 'react'
import {Container} from 'flux/utils'
import BattleActions from '../actions/BattleActions'
import TeamStore from '../stores/TeamStore'
import BattleStore from '../stores/BattleStore'

class EnemyWrapper extends React.PureComponent {
    handleClickTarget = () => {
        const {onClick, index} = this.props
        if (onClick) onClick(index)
    }

    render() {
        const {isTarget, children} = this.props
        return (
            <div onClick={this.handleClickTarget} style={{border: isTarget ? '2px solid red' : 'none'}}>
                {children}
            </div>
        )
    }
}

class BattleUI extends React.PureComponent {
    static getStores() {
        return [TeamStore, BattleStore]
    }

    static calculateState(prevState) {
        const teamState = TeamStore.getState()
        const battles = BattleStore.getState()
        if (teamState == null || battles == null) {
            return null
        }

        const {team} = teamState
        const enemyList = battles.stages[battles.currentStage].enemies
        const attackButtonVisibility =
            enemyList.some(enemy => enemy.enemyHP > 0) && team.some(player => player.playerHP > 0) > 0
                ? 'visible'
                : 'hidden'

        return {
            team,
            enemyList,
            attackButtonVisibility,
            target: battles.target,
            ready: true,
        }
    }

    handleClickTarget = index => {
        BattleActions.updateTarget(index)
    }

    handleClickAttack = () => {
        BattleActions.attack()
    }

    render() {
        const {ready, team, enemyList, attackButtonVisibility} = this.state
        if (!ready) {
            return null
        }

        return (
            <div>
                <div>{team.map((player, index) => <div key={index}>Player: {player.playerHP}</div>)}</div>
                <div>
                    {enemyList.map((enemy, index) => (
                        <EnemyWrapper
                            key={index}
                            index={index}
                            onClick={this.handleClickTarget}
                            isTarget={this.state.target === index}
                        >
                            Enemy: {enemy.enemyHP}
                        </EnemyWrapper>
                    ))}
                </div>
                <button
                    className="attackBtn"
                    onClick={this.handleClickAttack}
                    style={{visibility: attackButtonVisibility}}
                >
                    Attack
                </button>
            </div>
        )
    }
}

export default Container.create(BattleUI)
