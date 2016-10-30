import React, { Component } from 'react'

import PlatesStore from '../stores/PlatesStore.js'
import PeopleStore from '../stores/PeopleStore.js'

import PeopleActions from '../actions/PeopleActions.js'
import PlateActions from '../actions/PlateActions.js'
import PlatesActions from '../actions/PlatesActions.js'

import People from './People.jsx'
import Plate from './Plate.jsx'
import Plates from './Plates.jsx'
import ToPay from './ToPay.jsx'

import Router from 'react-router/HashRouter'
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'

import '../BaseIcons.font'
import '../ButtonIcons.font'
import '../App.css'

class App extends Component {
  constructor () {
    super()

    this.stores = {
      people: new PeopleStore(),
      plates: new PlatesStore()
    }
  }

  render() {
    return (
      <Router>
        <div id='main-container'>
          <Match pattern='/' exactly render={() => <Redirect to='/people'/>}/>

          <Match pattern='/people' render={() => {
            let actions = new PeopleActions(this.stores.people, this.stores.plates)
            return <People people={this.stores.people} actions={actions} />
          }}/>

          <Match pattern='/plates-index' exactly render={() => {
            if (this.platesPageShowingCid) {
              return <Redirect to={`/plates/${this.platesPageShowingCid}/edit`} />
            } else {
              return <Redirect to='/plates' />
            }
          }}/>

          <Match pattern='/plates' exactly render={(props) => {
            let actions = new PlatesActions(this.stores.plates)
            delete this.platesPageShowingCid
            return <Plates plates={this.stores.plates} actions={actions} people={this.stores.people} />
          }}/>

          <Match pattern='/plates/new' render={(props) => {
            let newPlate = this.stores.plates.addStore()
            return <Redirect to={`/plates/${newPlate.cid}/edit`} />
          }}/>

          <Match pattern='/plates/:cid/edit' render={(props) => {
            let plate = this.stores.plates.findStore(props.params.cid),
                actions = new PlateActions(plate, this.stores.plates)

            if (plate) {
              this.platesPageShowingCid = plate.cid
              return <Plate plate={plate} plates={this.stores.plates} people={this.stores.people} actions={actions} />
            } else {
              return <Redirect to='/plates' />
            }
          }}/>

          <Match pattern='/to_pay' render={(props) => {
            let actions = new PlatesActions(this.stores.plates)
            return <ToPay people={this.stores.people} plates={this.stores.plates} actions={actions} />
          }}/>
        </div>
      </Router>
    )
  }
}

export default App
