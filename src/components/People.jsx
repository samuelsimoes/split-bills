import React, { Component } from 'react'
import { observer } from 'mobx-react'
import NewPeopleForm from './NewPeopleForm.jsx'
import MainNav from './MainNav.jsx'
import { Link } from 'react-router'

@observer
class People extends Component {
  constructor () {
    super(...arguments)
    this.add = this.props.actions.add.bind(this.props.actions)
    this.remove = this.props.actions.remove.bind(this.props.actions)
  }

  render () {
    return (
      <div className='common-container with-bottom-menu-container'>
        <MainNav showAllLinks={this.props.people.stores.length} />

        <NewPeopleForm onComplete={this.add} />

        {this.renderMain()}
      </div>
    )
  }

  renderMain () {
    if (this.props.people.stores.length) {
      return (
        <div>
          {this.renderList()}

          <div className='bottom-menu full-button-menu'>
            <Link
              type='button'
              className='button-1 button add-button'
              to='/plates/new'>
              Add Plate
            </Link>
          </div>
        </div>
      )
    } else {
      return this.renderBlankSlate()
    }
  }

  renderBlankSlate () {
    return (
      <div className='blank-slate people-blank-slate'>
        <p className='description'>
          You first need add the consumer people. Click on the field above.
        </p>
      </div>
    )
  }

  renderList () {
    let rows = this.props.people.stores.map(person => {
      return (
        <tr key={person.cid}>
          <td className='person-name-cell'>
            <p className='paragraph-1'>
              {person.name}
            </p>
          </td>

          <td className='delete-button-column'>
            <button
              type='button'
              className='table-delete-button'
              onClick={this.remove.bind(null, person.cid)}>
              Remove
            </button>
          </td>
        </tr>
      )
    })

    return (
      <table className='table-1 people-table'>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

export default People
