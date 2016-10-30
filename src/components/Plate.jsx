import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router'
import FloatNumPad from './FloatNumPad.jsx'
import IntNumPad from './IntNumPad.jsx'
import PlateConsumption from './PlateConsumption.jsx'

@observer
class Plate extends Component {
  constructor () {
    super(...arguments)

    this.state = { showing: 'form' }

    this.increaseConsumption =
      this.props.actions.increaseConsumption.bind(this.props.actions)

    this.decreaseConsumption =
      this.props.actions.decreaseConsumption.bind(this.props.actions)

    this.update =
      this.props.actions.update.bind(this.props.actions)
  }

  render () {
    return (
      <div>
        {this.renderPriceSelector()}

        {this.renderQuantitySelector()}

        {this.renderForm()}
      </div>
    )
  }

  renderPriceSelector () {
    if (this.state.showing !== 'priceSelector') { return; }

    return (
      <FloatNumPad
        title='Plate’s Price'
        submit={value => {
          this.update({ price: value })
          this.setState({ showing: 'form' })
        }}
        value={this.props.plate.price} />
    )
  }

  renderQuantitySelector () {
    if (this.state.showing !== 'quantitySelector') { return; }

    return (
      <IntNumPad
        title='plate’s quantity'
        submit={value => {
          this.update({ quantity: value })
          this.setState({ showing: 'form' })
        }}
        value={this.props.plate.quantity} />
    )
  }

  renderForm () {
    if (this.state.showing !== 'form') { return; }

    return (
      <div className='with-bottom-menu-container'>
        <div className='plate-quantity-price clearfix'>
          <div className='input-container price'>
            <label htmlFor='price'>
              Price
            </label>

            <input
              type='text'
              id='price'
              readOnly
              onClick={evt => this.setState({ showing: 'priceSelector' })}
              value={this.props.plate.price.toFixed(2)} />
          </div>

          <div className='input-container quantity'>
            <label htmlFor='quantity'>
              Quantity
            </label>

            <input
              type='quantity'
              id='quantity'
              readOnly
              onClick={evt => this.setState({ showing: 'quantitySelector' })}
              value={this.props.plate.quantity} />
          </div>
        </div>

        {this.renderConsumptionPartial()}

        <div className='bottom-menu plate-bottom-actions full-button-menu'>
          <Link className='button-1 finish-button' to='/plates'>
            Save plate
          </Link>
        </div>
      </div>
    )
  }

  renderConsumptionPartial () {
    let className = 'plate-consumption-container'

    if (!this.props.plate.validToReceiveConsumption) {
      className += ' blocked'
    }

    let block = () => {
      if (this.props.plate.validToReceiveConsumption) { return }

      return <div className='plate-consumption-block'></div>
    }

    return (
      <div className={className}>
        {block()}

        <h2 className='title-3'>
          People consumption
        </h2>

        {this.renderPeopleConsumption()}
      </div>
    )
  }

  renderPeopleConsumption () {
    let rows =
      this
        .props
        .people
        .stores
        .map(person => (
          PlateConsumption(
            person,
            this.props.plate.consumptions[person.cid],
            this.increaseConsumption.bind(null, person.cid),
            this.decreaseConsumption.bind(null, person.cid)
          )
        ))

    return (
      <table className='table-1 plate-consumption-table'>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

export default Plate
