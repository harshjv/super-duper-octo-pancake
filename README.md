# Solution

## Task 1

### Should return different numbers for each request

The code is written in a way that it will first increment the value of `i` and then wait for `1ms` before returning the value through `Promise`.

Also, it should be noted that the value returned by `Promise` (marked by Here in code snippet below) is not a local (or *copied*) value. It uses parent scope's variable `i`. So, when concurrent requests modifies the value, it will return the most recent incremented value instead of returning different values every time.

    let getNumber = () => {
      i++
      return delay(1).then(() => {
        return i // **Here**
      })
    }

For example, for 100 concurrent requests, it will return `100` every time instead of returning `1` to `100`.


### Should return message

ES6 scopes `this` as *scope-by-flow* instead of `window`/`object`/`instance` scope as in ES5. So, changed function to arrow function.

Also, `mocha 3` throws `Error: Resolution method is overspecified. Specify a callback *or* return a Promise; not both.` exception when a test case returns `Promise` and `callback`, both. So, after fixing the code, there is a requirement to change the test case and remove `return` statement. (see code snippet below)

    return rp({
      url: url + '/message',
      json: true
    }).then((body) => {
      body.message.should.equal('Hello, world')
    }).then(done).catch(done)

For reference, see this links
1. https://github.com/mochajs/mocha/blob/master/CHANGELOG.md#boom-breaking-changes
2. https://github.com/mochajs/mocha/pull/1320


## Task 2

### Should return correct result from calculating two floats *and* Should return correct result to big numbers

For these two subtasks, I've used [bignumber.js](https://github.com/MikeMcl/bignumber.js/) and solution is a one liner.

    const calcFloat = (a, b) => Number(new BigNumber(a).plus(b).toString())
    const calcBig = (a, b) => new BigNumber(a).plus(b).toString()

Here, the problem is with floating point calculations. Computer stores everything in binary and there is no way to represent fractions like `0.3`. For other calculations, multiple errors nullifies each other's effect so it doesn't give unexpected results.

Also, checkout this tweet about the same :) https://twitter.com/harshjv/status/806074934065627137
