/*eslint guard-for-in: 'off'*/

import { computed } from 'mobx'
import { CollectionStore } from '../utils/store.js'
import PlateStore from './PlateStore.js'
import numberType from './numberType.js'

class PlatesStore extends CollectionStore {
  static childrenKlass = PlateStore

  static attributes = {
    serviceValue: numberType
  }

  removeAllConsumptionByPersonCid (personCid) {
    this.stores.forEach(plate => plate.removeConsumptionByPersonCid(personCid))
  }

  removeByCid (cid) {
    this.removeStore(this.store.findStore(cid))
  }

  increaseConsumption (plateCid, personCid) {
    this.findStore(plateCid).increaseConsumption(personCid)
  }

  decreaseConsumption (plateCid, personCid) {
    this.findStore(plateCid).decreaseConsumption(personCid)
  }

  @computed get total () {
    let total = 0

    for (var personCid in this.totalByPerson) {
      total += this.totalByPerson[personCid]
    }

    return total
  }

  @computed get totalByPerson () {
    let grouping = {},
        allPlatesCost = 0

    this.stores.forEach(plate => {
      let totalByPerson = plate.totalByPerson

      for (var personCid in totalByPerson) {
        grouping[personCid] = ((grouping[personCid] || 0) + totalByPerson[personCid])

        allPlatesCost += totalByPerson[personCid]
      }
    })

    if (this.serviceValue !== 0) {
      for (var personCid in grouping) {
        let consumedPercentage = ((grouping[personCid] * 100) / allPlatesCost),
            consumedServiceValue = ((this.serviceValue * consumedPercentage) / 100)

        grouping[personCid] += consumedServiceValue
      }
    }

    return grouping
  }

  get isEmpty () {
    return this.stores.length === 0
  }
}

export default PlatesStore
