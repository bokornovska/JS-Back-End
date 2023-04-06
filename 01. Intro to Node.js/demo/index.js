// const calc = require('./claculator') // locale modules - default export
const {calc} = require('./claculator') // locale modules named export

// import third-party modules
const is = require('is')

// import core modules
const path = require('path');

let sum = calc(1,1);

console.log(sum);
console.log(is.function(calc));
console.log(path.resolve('./'))