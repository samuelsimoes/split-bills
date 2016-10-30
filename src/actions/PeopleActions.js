class PeopleActions {
  constructor (people, plates) {
    this.people = people
    this.plates = plates
  }

  add (name) {
    this.people.addStore({ name })
  }

  remove (cid) {
    this.people.removeByCid(cid)
    this.plates.removeAllConsumptionByPersonCid(cid)
  }
}

export default PeopleActions
