const Promise = require('bluebird');

let delay = (ms) => {
  var deferred = Promise.pending();
  setTimeout(function(){
	 deferred.resolve();
  }, ms);
  return deferred.promise;
}

module.exports = delay;