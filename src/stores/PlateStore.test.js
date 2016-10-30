import PlateStore from './PlateStore.js'

it('computes the total value', () => {
  let plate = new PlateStore({ price: 20.30, quantity: 2 })
  expect(plate.totalPrice).toBe(40.60)
})

it('computes the total by person', () => {
  let plate = new PlateStore({
    price: 50,
    quantity: 2,
    consumptions: {
      'FS:1': 2,
      'FS:2': 3
    }
  })

  expect(plate.totalByPerson).toEqual({
    'FS:1': 40,
    'FS:2': 60
  })
})

it('removes consumptions by personCid', () => {
  let plate = new PlateStore({
    consumptions: {
      'FS:1': 2,
      'FS:2': 3
    }
  })

  plate.removeConsumptionByPersonCid('FS:1')

  expect(plate.consumptions['FS:1']).toBe(undefined)
  expect(plate.consumptions['FS:2']).toBe(3)
})

it('increment consumption by personCid', () => {
  let plate = new PlateStore()

  plate.increaseConsumption('FS:1')
  plate.increaseConsumption('FS:1')

  expect(plate.consumptions['FS:1']).toBe(2)
})

it('decrease consumption by personCid', () => {
  let plate = new PlateStore({ consumptions: { 'FS:1': 1 } })

  plate.decreaseConsumption('FS:1')
  plate.decreaseConsumption('FS:1')

  expect(plate.consumptions['FS:1']).toBe(0)
})
