import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Middleware from './Middleware'

ReactDOM.render(<App />, document.getElementById('root'))

Middleware.startGame()
