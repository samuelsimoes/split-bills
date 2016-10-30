class PlatesActions {
  constructor (plates) {
    this.plates = plates
  }

  remove (cid) {
    this.plates.removeStore(this.plates.findStore(cid))
  }

  updateServiceValue (value) {
    this.plates.setAttribute('serviceValue', value)
  }
}

export default PlatesActions
