/*
 This server must return different numbers for each request. In order, from 0 to ...
 */
const express = require('express');
const Promise = require('bluebird');
const delay = require('./delay.js');
const config = require('./config.json');

let app = express();
let i = 0;

let getNumber = () => {
  i++;
  return delay(1000).then(() => {
	 return i;
  })
}

app.get('/', (req, res) => {
  return res.send('To get number send GET request to /api/number');
});

app.get('/api/number', (req, res, next) => {
  getNumber().then((num) => {
	 return res.json({
		number: num
	 });
  }).catch(next);
});

app.get('/api/message', (req, res, next) => {
  function getMessage() {
	 this.message = "Hello, world";
	 
	 return Promise(function (resolve) {
		resolve(this.message);
	 });
  }
  
  getMessage().then((message) => {
	 return res.json({
		message: message
	 });
  }).catch(next);
});


app.listen(config.http.port, config.http.bind, (err) => {
  if (err) {
	 console.log('Error at launch: ', err);
	 return;
  }
  
  const message = `Server launched at http://${config.http.bind}:${config.http.port} port`;
  console.log(message);
});