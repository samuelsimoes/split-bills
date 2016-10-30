class PlateActions {
  constructor (plate, plates) {
    this.plate = plate
    this.plates = plates
  }

  increaseConsumption (personCid) {
    this.plate.increaseConsumption(personCid)
  }

  decreaseConsumption (personCid) {
    this.plate.decreaseConsumption(personCid)
  }

  update (data) {
    this.plate.setAttributes(data)
  }

  remove () {
    this.plates.removeStore(this.plate)
    window.location = '/#/plates'
  }
}

export default PlateActions
