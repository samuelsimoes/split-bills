import React, { Component } from 'react'

class NumPadNumbers extends Component {
  static defaultProps = {
    onClick: function () {}
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    let numbers = [1,2,3,4,5,6,7,8,9,'delete',0,'ok'].map(key => {
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

    return (
      <div className='numbers'>
        {numbers}
      </div>
    )
  }
}

export default NumPadNumbers
