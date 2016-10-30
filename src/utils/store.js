import { extendObservable, observable, action, computed } from 'mobx'

let storesUUID = 1

class ObjectStore {
  constructor (data={}) {
    this.cid = `FS:${storesUUID++}`

    data = { ...this.getDefaults(), ...data }

    extendObservable(this, data)

    this.resetAttributes(data)
  }

  @action setAttributes (data) {
    for (let attributeName in data) {
      if (data.hasOwnProperty(attributeName)) {
        this.setAttribute(attributeName, data[attributeName])
      }
    }
  }

  getDefaults () {
    if (!this.constructor.attributes) { return {}; }

    let defaults = {}

    for (let attributeName in this.constructor.attributes) {
      if (this.constructor.attributes.hasOwnProperty(attributeName)) {
        defaults[attributeName] = this.fluxoContractFor(attributeName).defaultValue
      }
    }

    return JSON.parse(JSON.stringify(defaults))
  }

  fluxoContractFor (attributeName) {
    if (this.constructor.attributes && this.constructor.attributes[attributeName]) {
      return this.constructor.attributes[attributeName]
    } else {
      return {}
    }
  }

  fluxoParserFor (attributeName) {
    return this.fluxoContractFor(attributeName).parser || ((value) => value)
  }

  setAttribute (attributeName, value) {
    value = this.fluxoParserFor(attributeName).call(this, value)

    if (this[attributeName] === value) { return; }

    this[attributeName] = value
  }

  @action resetAttributes (data={}) {
    this.data = {}

    let newData = { ...this.getDefaults(), ...data }

    this.setAttributes(newData)
  }

  dumpFor (attributeName) {
    return this.fluxoContractFor(attributeName).dump || ((value) => value)
  }
}

class CollectionStore extends ObjectStore {
  @observable stores = []

  constructor (stores=[], data={}) {
    super(data)
    this.childrenKlass = this.constructor.childrenKlass || ObjectStore
    this.addStores(stores)
  }

  findStore (cidOrId) {
    return this.fluxoIndex[cidOrId]
  }

  @action addStores (stores) {
    stores.forEach(store => this.addStore(store))
  }

  @computed get fluxoIndex () {
    var index = {}

    this.stores.forEach(store => {
      index[store.cid] = store
      if (store.id) { index[store.id] = store; }
    })

    return index
  }

  removeStore (store) {
    this.stores.splice(this.stores.indexOf(store), 1)
  }

  removeAllStores () {
    this.stores = []
  }

  @action setStores (stores) {
    stores.forEach(store => {
      let foundStore = this.findStore(store.cid || store.id)

      if (foundStore) {
        foundStore.setAttributes(store)
      } else {
        this.addStore(store)
      }
    })
  }

  addStore (store) {
    if (!(store instanceof ObjectStore)) {
      store = new this.childrenKlass(store)
    }

    var alreadyAddedStore = this.findStore(store.cid || store.id)

    if (alreadyAddedStore) { return alreadyAddedStore; }

    this.stores.push(store)

    return store
  }
}

export { ObjectStore, CollectionStore }
