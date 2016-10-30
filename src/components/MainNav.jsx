import React, { Component } from 'react'
import Link from 'react-router/Link'

class MainNav extends Component {
  render () {
    return (
      <nav id='main-nav'>
        <Link
          to='/people'
          className='link link-people'
          activeClassName='active'>
          <span>People</span>
        </Link>

        {this.withPersonLinks()}
      </nav>
    )
  }

  withPersonLinks () {
    if (!this.props.showAllLinks) { return; }

    return [
      <Link
        to='/plates-index'
        className='link link-plates'
        isActive={location => location.pathname.indexOf('plates') !== -1}
        activeClassName='active'>
        <span>Plates</span>
      </Link>,

      <Link
        to='/to_pay'
        className='link link-to-pay'
        activeClassName='active'>
        <span>To Pay</span>
      </Link>
    ]
  }
}

export default MainNav
