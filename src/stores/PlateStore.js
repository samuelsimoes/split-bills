/*eslint guard-for-in: 'off'*/

import { computed } from 'mobx'
import numberType from './numberType.js'
import { ObjectStore } from '../utils/store.js'

class PlateStore extends ObjectStore {
  static attributes = {
    quantity: numberType,
    price: numberType,
    consumptions: { defaultValue: {} }
  }

  removeConsumptionByPersonCid (personCid) {
    let consumptions = { ...this.consumptions }

    delete consumptions[personCid]

    this.setAttribute('consumptions', consumptions)
  }

  increaseConsumption (personCid) {
    let consumptions = { ...this.consumptions }

    consumptions[personCid] = ((consumptions[personCid] || 0) + 1)

    this.setAttribute('consumptions', consumptions)
  }

  decreaseConsumption (personCid) {
    if (!this.consumptions[personCid]) { return; }

    let consumptions = { ...this.consumptions }

    consumptions[personCid] -= 1

    this.setAttribute('consumptions', consumptions)
  }

  @computed get validToReceiveConsumption () {
    return this.quantity && this.price
  }

  @computed get totalByPerson () {
    let consumedQuantity = 0

    for (let personCid in this.consumptions) {
      consumedQuantity += this.consumptions[personCid]
    }

    let fraction = (this.totalPrice / consumedQuantity)

    let mapping = {}

    for (let personCid in this.consumptions) {
      mapping[personCid] = (fraction * this.consumptions[personCid])
    }

    return mapping
  }

  @computed get totalPrice () {
    return this.price * this.quantity
  }

  @computed get consumersCids () {
    let cids = []

    for (let personCid in this.consumptions) {
      if (this.consumptions[personCid]) {
        cids.push(personCid)
      }
    }

    return cids
  }
}

export default PlateStore
