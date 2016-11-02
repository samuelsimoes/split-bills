import React, { Component } from 'react'

class HomeScreenAddAsk extends Component {
  static defaultProps = {
    onClick: function () {}
  }

  render () {
    return (
      <div className='add-home-screen-overlay' onClick={this.props.onClick}>
        <div className='content'>
          <img
            src={this.image()}
            alt='You can add this app on your mobile home-screen' />

          <p>You can add this app in you home screen. Try it out!</p>

          <p><small>Tap anywhere to proceed!</small></p>
        </div>
      </div>
    );
  }

  image () {
    let userAgent = window.navigator.userAgent
    let url = process.env.PUBLIC_URL

    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
      url += '/ios-add.jpg'
    } else {
      url += '/android-add.jpg'
    }

    return url
  }
}

export default HomeScreenAddAsk
