import { pricePushNumber, priceRemoveNumber, integerPushNumber, integerRemoverNumber } from './editableNumber.js'

it('pricePushNumber push a number in a value', () => {
  expect(pricePushNumber(0,1)).toEqual(0.01)
  expect(pricePushNumber(0.1,2)).toEqual(1.02)
  expect(pricePushNumber(0.1,0)).toEqual(1)
  expect(pricePushNumber(15,0)).toEqual(150)
  expect(pricePushNumber(15,1)).toEqual(150.01)
  expect(pricePushNumber(0,0)).toEqual(0)
})

it('priceRemoverNumber removes a number of a value', () => {
  expect(priceRemoveNumber(0)).toEqual(0)
  expect(priceRemoveNumber(1)).toEqual(0.1)
  expect(priceRemoveNumber(15)).toEqual(1.5)
})

it('integerPushNumber push a number in a value', () => {
  expect(integerPushNumber(0,1)).toEqual(1)
  expect(integerPushNumber(0,0)).toEqual(0)
  expect(integerPushNumber(1,1)).toEqual(11)
})

it('integerRemoverNumber removes a number in a value', () => {
  expect(integerRemoverNumber(0)).toEqual(0)
  expect(integerRemoverNumber(1)).toEqual(0)
  expect(integerRemoverNumber(12)).toEqual(1)
})
