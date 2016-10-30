import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router'
import MainNav from './MainNav.jsx'
import PlatesItem from './PlatesItem.jsx'

@observer
class Plates extends Component {
  constructor () {
    super(...arguments)
    this.remove = this.props.actions.remove.bind(this.props.actions)
  }

  render () {
    return (
      <div className='common-container with-bottom-menu-container'>
        <MainNav showAllLinks={true} />

        {this.renderMain()}
      </div>
    )
  }

  renderMain () {
    if (this.props.plates.stores.length) {
      return this.renderList()
    } else {
      return this.renderBlankSlate()
    }
  }

  renderBlankSlate () {
    return (
      <div className='blank-slate plates-blank-slate'>
        <p className='description'>
          There's no plates defined yet, click below to define the first plate.
        </p>

        <Link className='button-1 call-action-button' to='/plates/new'>
          Add Plate
        </Link>
      </div>
    )
  }

  renderList () {
    return (
      <div>
        {this.renderPlates()}

        <div className='bottom-menu all-plates-bottom-menu'>
          <Link
            type='button'
            className='button-1 button finish-button'
            to='/to_pay'>
            Finish
          </Link>

          <Link
            className='button-1 button add-button'
            to='/plates/new'>
            Add Plate
          </Link>
        </div>
      </div>
    )
  }

  renderPlates () {
    let rows =
      this
        .props
        .plates
        .stores
        .map(plate => PlatesItem(plate, this.props.people.stores, this.remove))

    return (
      <table className='table-1 all-plates-table'>
        <thead>
          <tr>
            <th className='price-column'>
              Plate's price
            </th>
            <th className='quantity-column'>
              Quantity
            </th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

export default Plates
