/*
	Calculating float and returns float
 */
let calcFloat = (a, b) => {
  return a + b;
}

/*
	Calculate big number and returns string
 */
let calcBig = (a, b) => {
  return (a + b).toString();
}

module.exports = {
  calcFloat: calcFloat,
  calcBig: calcBig
};