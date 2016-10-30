function pricePushNumber (value, number) {
  value = value.toFixed(2).replace('.', '')

  if (!parseFloat(value) && number) {
    return parseFloat(`0.0${number}`)
  }

  value += number

  return parseFloat(`${value.slice(0,-2)}.${value.slice(-2)}`)
}

function priceRemoveNumber (value) {
  value = value.toFixed(2).replace('.', '').slice(0,-1)

  return parseFloat(`${value.slice(0,-2)}.${value.slice(-2)}`)
}

function integerPushNumber (value, number) {
  value = value.toString()

  value += number

  return parseInt(value, 10)
}

function integerRemoverNumber (value) {
  value = value.toString().slice(0,-1)

  value = value ? value : '0'

  return parseInt(value, 10)
}

export { pricePushNumber, priceRemoveNumber, integerPushNumber, integerRemoverNumber }
