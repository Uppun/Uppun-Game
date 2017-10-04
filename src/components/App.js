import React from 'react'
import EnemyTeam from './EnemyTeam'
import PlayerTeam from './PlayerTeam'
import BattleUI from './BattleUI'

function App() {
    return (
        <div>
            <PlayerTeam />
            <EnemyTeam />
            <BattleUI />
        </div>
    )
}

export default App
