export default {
  defaultValue: 0,
  parser: function (value) {
    if (typeof value !== 'number') { return 0; }
    return value
  }
}
