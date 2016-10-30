import React, { Component } from 'react'

class NewPeopleForm extends Component {
  constructor () {
    super(...arguments)

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = { name: '' }
  }

  render () {
    return (
      <form id='new-person-form' onSubmit={this.onSubmit}>
        <div className='input-container'>
          <label htmlFor='person-name' style={{ display: 'none' }}>
            Person's name
          </label>

          <input
            id='person-name'
            type='text'
            autoComplete='false'
            placeholder='Add a person'
            value={this.state.name}
            maxLength='20'
            onChange={this.onChange.bind(this)} />
        </div>
      </form>
    )
  }

  onSubmit (evt) {
    evt.preventDefault()

    let name = this.state.name.trim()

    if (name) {
      this.props.onComplete(name)
      this.setState({ name: '' })
    }
  }

  isValid () {
    return this.state.name !== ''
  }

  onChange (evt) {
    this.setState({ name: evt.target.value })
  }
}

export default NewPeopleForm
