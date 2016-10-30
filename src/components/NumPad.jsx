import React, { Component } from 'react'

class NumPad extends Component {
  render () {
    return (
      <div className='num-pad'>
        <div className='current-value-container'>
          <h3 className='title'>{this.props.title}</h3>
          <p className='value'>{this.props.value}</p>
        </div>

        <div className='numbers'>
          {this.renderNumbers()}
        </div>
      </div>
    )
  }

  renderNumbers () {
    return [1,2,3,4,5,6,7,8,9,'delete',0,'ok'].map(key => {
      return (
        <button
          key={key.toString()}
          type='button'
          onClick={evt => this.props.onClickButton(key)}
          className={`num-pad-button num-pad-button-${key}`}>
          {key}
        </button>
      )
    })
  }
}

export default NumPad
