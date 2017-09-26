import TeamStore from '../data/TeamStore'
import BattleStore from '../data/BattleStore'
import {Container} from 'flux/utils'
import React from 'react'
import BattleActions from '../data/BattleActions'
class BattleWindow extends React.Component{
    static getStores() {
        return [
            TeamStore,
            BattleStore,
        ]
    }

    static calculateState(prevState) {
        const playerHolder = TeamStore.getState().Team
        const EnemyHolder = BattleStore.getState()
        const enemyList = EnemyHolder.stages[EnemyHolder.CurrentPage-1].enemies
        const attackButtonVisibility = ((enemyList.some(enemy => enemy.enemyHP > 0)) && (playerHolder.some(player => player.playerHP > 0)) > 0) ? 'visible' : 'hidden'

        return {
            playerHolder,
            enemyList,
            attackButtonVisibility,
        }
    }

    onClickAttack = () => {
        BattleActions.PlayerAttack()
    }

    onClickTarget = (index) => {
        console.log('You clicked me')
        BattleActions.UpdateTarget(index)
    }

    render() {
        const {playerHolder, enemyList, attackButtonVisibility} = this.state
        return (
            <div>
                <div>
                    {playerHolder.map((player, index) => 
                    <div key={index}>Player: {player.playerHP}</div>)}
                </div>
                <div>
                    {enemyList.map((enemy, index) => (
                    <div key={index} onClick= {() => this.onClickTarget(index)} style = {{border: (BattleStore.getState().Target == index) ? '2px solid red' : '' }}>Enemy: {enemy.enemyHP}</div>))}
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
}

export default Container.create(BattleWindow)