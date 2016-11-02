import React, { Component } from 'react'
import NumPadNumbers from './NumPadNumbers.jsx'

class NumPad extends Component {
  render () {
    return (
      <div className='num-pad'>
        <div className='current-value-container'>
          <h3 className='title'>{this.props.title}</h3>
          <p className='value'>{this.props.value}</p>
        </div>

        <NumPadNumbers onClickButton={this.props.onClickButton} />
      </div>
    )
  }
}

export default NumPad
