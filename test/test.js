const Promise = require('bluebird');
const chai = require('chai');
const config = require('../config.json');
const delay = require('../delay.js');

const url = `http://${config.http.bind}:${config.http.port}/api/number`;

let rp = require('request-promise');
chai.should();

describe("HTTP Server", () => {
  
  it("Should return different numbers for each request", (done) => {
	 let getNumber = () => {
		return rp({
		  url: url,
		  json: true
		}).then((body) => {
		  return body.number;
		});
	 }
	 
	 let requests = [];
	 
	 for (let i = 0; i < 100; i++) {
		requests.push(getNumber());
	 }
	 
	 Promise.all(requests).then((results) => {
		console.log(results);
		let doubles = results.filter((i) => {
		  return results.filter((j) => {
			 return j == i;
		  }).length > 1;
		});
		
		doubles.should.have.length(0);
	 }).then(done).catch(done);
  });
  
});