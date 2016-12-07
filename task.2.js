const BigNumber = require('bignumber.js')

const calcFloat = (a, b) => Number(new BigNumber(a).plus(b).toString())
const calcBig = (a, b) => new BigNumber(a).plus(b).toString()

module.exports = {
  calcFloat: calcFloat,
  calcBig: calcBig
}
