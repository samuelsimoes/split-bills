import React, { Component } from 'react'
import NumPad from './NumPad.jsx'
import { integerPushNumber, integerRemoverNumber } from '../utils/editableNumber.js'

class IntNumPad extends Component {
  constructor () {
    super(...arguments)

    this.state = { value: this.props.value }

    this.submit = this.submit.bind(this)

    this.onClickButton = this.onClickButton.bind(this)
  }

  render () {
    return (
      <NumPad
        title={this.props.title}
        value={this.state.value}
        onSubmit={this.submit}
        onClickButton={this.onClickButton} />
    )
  }

  submit () {
    this.props.submit(this.state.value)
  }

  onClickButton (value) {
    if (value === 'delete') {
      return this.setState({ value: integerRemoverNumber(this.state.value) })
    } else if (value === 'ok') {
      return this.submit()
    } else {
      return this.setState({ value: integerPushNumber(this.state.value, value) })
    }
  }
}

export default IntNumPad
