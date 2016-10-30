import { CollectionStore } from '../utils/store.js'

class PeopleStore extends CollectionStore {
  removeByCid (cid) {
    this.removeStore(this.findStore(cid))
  }
}

export default PeopleStore
