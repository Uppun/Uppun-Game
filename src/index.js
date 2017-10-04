import React from 'react'
import ReactDOM from 'react-dom'
import BattleComponent from './view/BattleComponent'
import BattleMiddleware from './data/BattleMiddleware'

ReactDOM.render(<BattleComponent />, document.getElementById('root'))

BattleMiddleware.startGame()
