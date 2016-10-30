import PlatesStore from './PlatesStore.js'
import { ObjectStore } from '../utils/store.js'

it('computes the total value', () => {
  let plate1 = new ObjectStore({ totalByPerson: { 'FS:1': 20, 'FS:2': 30 } }),
      plate2 = new ObjectStore({ totalByPerson: { 'FS:1': 100, 'FS:2': 10 } })

  let plate = new PlatesStore([plate1, plate2], { serviceValue: 5 })

  expect(plate.totalByPerson).toEqual({
    'FS:1': 123.75,
    'FS:2': 41.25
  })
})
