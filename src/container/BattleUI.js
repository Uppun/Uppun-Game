import TeamStore from '../data/TeamStore'
import BattleStore from '../data/BattleStore'
import {Container} from 'flux/utils'
import React from 'react'
import BattleActions from '../data/BattleActions'
import BattleMiddleware from '../data/BattleMiddleware'

class BattleWindow extends React.Component {
    static getStores() {
        return [TeamStore, BattleStore]
    }

    static calculateState(prevState) {
        const stateHolder = TeamStore.getState()
        if (stateHolder) {
            const playerHolder = TeamStore.getState().Team
            const EnemyHolder = BattleStore.getState()
            console.log(EnemyHolder)
            const enemyList = EnemyHolder.stages[EnemyHolder.CurrentPage].enemies
            console.log(enemyList)
            const attackButtonVisibility =
                enemyList.some(enemy => enemy.enemyHP > 0) && playerHolder.some(player => player.playerHP > 0) > 0
                    ? 'visible'
                    : 'hidden'
            return {
                playerHolder,
                enemyList,
                attackButtonVisibility,
            }
        }

        return null
    }

    onClickAttack = () => {
        BattleMiddleware.serverAttack(BattleStore.getState().Target)
    }

    onClickTarget = index => {
        BattleActions.UpdateTarget(index)
    }

    render() {
        const {playerHolder, enemyList, attackButtonVisibility} = this.state
        if (playerHolder) {
            return (
                <div>
                    <div>{playerHolder.map((player, index) => <div key={index}>Player: {player.playerHP}</div>)}</div>
                    <div>
                        {enemyList.map((enemy, index) => (
                            <div
                                key={index}
                                onClick={() => this.onClickTarget(index)}
                                style={{border: BattleStore.getState().Target == index ? '2px solid red' : ''}}
                            >
                                Enemy: {enemy.enemyHP}
                            </div>
                        ))}
                    </div>
                    <button
                        className="attackBtn"
                        onClick={this.onClickAttack}
                        style={{visibility: attackButtonVisibility}}
                    >
                        Attack
                    </button>
                </div>
            )
        }

        return null
    }
}

export default Container.create(BattleWindow)
