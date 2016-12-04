const Promise = require('bluebird');
const chai = require('chai');
const calc = require('../task.2.js');

chai.should();

describe("Calculations", () => {
  it.skip("Should return correct result from calculating two floats", () => {
	 let result = calc.calcFloat(0.1, 0.2);
	 
	 result.should.equal(0.3);
  });
  
  it("Should return correct result to big numbers", () => {
	 let result = calc.calcBig(1000000000000000000, 10);
	 
	 result.should.equal('1000000000000000010');
  });
});