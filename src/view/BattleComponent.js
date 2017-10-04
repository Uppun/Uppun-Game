import React from 'react'
import CharacterContainer from '../container/CharacterContainer'
import EnemyContainer from '../container/EnemyContainer'
import BattleContainer from '../container/BattleContainer'
import TeamContainer from '../container/TeamContainer'
import BattleUI from '../container/BattleUI'

function BattleComponent() {
    return (
        <div>
            <TeamContainer />
            <BattleContainer />
            <BattleUI />
        </div>
    )
}

export default BattleComponent
