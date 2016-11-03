import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'

var attachFastClick = require('fastclick')

attachFastClick.attach(document.body)

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install()
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
