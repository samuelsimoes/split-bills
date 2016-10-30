import React, { Component } from 'react'
import MainNav from './MainNav.jsx'
import FloatNumPad from './FloatNumPad.jsx'
import { observer } from 'mobx-react'

@observer
class ToPay extends Component {
  constructor () {
    super(...arguments)

    this.state = { showing: 'form' }

    this.updateServiceValue =
      this.props.actions.updateServiceValue.bind(this.props.actions)
  }

  render () {
    return (
      <div>
        {this.renderServiceValueSelector()}

        {this.renderForm()}
      </div>
    )
  }

  renderServiceValueSelector () {
    if (this.state.showing !== 'serviceValueSelector') { return; }

    return (
      <FloatNumPad
        title='Service’s Price'
        submit={value => {
          this.updateServiceValue(value)
          this.setState({ showing: 'form' })
        }}
        value={this.props.plates.serviceValue} />
    )
  }

  renderForm () {
    if (this.state.showing !== 'form') { return; }

    return (
      <div className='common-container'>
        <MainNav showAllLinks={true} />

        <div className='input-container service-value-input-container'>
          <label htmlFor='price'>
            Service's value
          </label>

          <input
            type='text'
            id='price'
            readOnly
            onClick={() => this.setState({ showing: 'serviceValueSelector' })}
            value={this.props.plates.serviceValue.toFixed(2)} />
        </div>

        <table className='table-1 to-pay-table'>
          <tbody>
            {this.renderDueByPeople()}

            <tr className='total-row'>
              <td>
                <p className='paragraph-1'>
                  total
                </p>
              </td>

              <td className='price-cell'>
                <p className='paragraph-1'>
                  {this.props.plates.total.toFixed(2)}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  renderDueByPeople () {
    return this.props.people.stores.map(person => {
      return (
        <tr key={person.cid}>
          <td>
            <p className='paragraph-1'>{person.name}</p>
          </td>

          <td className='price-cell'>
            <p className='paragraph-1'>{(this.props.plates.totalByPerson[person.cid] || 0).toFixed(2)}</p>
          </td>
        </tr>
      )
    })
  }
}

export default ToPay
