import BattleComponent from './view/BattleComponent'
import React from 'react'
import ReactDOM from 'react-dom'
import BattleMiddleware from './data/BattleMiddleware'

ReactDOM.render(<BattleComponent />, document.getElementById('root'))

BattleMiddleware.startGame()
