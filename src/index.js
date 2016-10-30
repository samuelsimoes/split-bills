import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'

var attachFastClick = require('fastclick')

attachFastClick.attach(document.body)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
