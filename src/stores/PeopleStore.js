import { CollectionStore } from '../utils/store.js'
import { computed } from 'mobx'

class PeopleStore extends CollectionStore {
  removeByCid (cid) {
    this.removeStore(this.findStore(cid))
  }

  @computed get ordered () {
    let stores = [].concat(this.stores.toJS())

    stores.sort((a, b) => {
      let aId = parseInt(a.cid.split(':')[1], 10)
      let bId = parseInt(b.cid.split(':')[1], 10)

      return bId - aId
    })

    return stores
  }
}

export default PeopleStore
