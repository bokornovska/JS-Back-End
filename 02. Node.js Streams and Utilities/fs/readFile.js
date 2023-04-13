const fs = require('fs');
const fsp = require('fs/promises');

//Synchronous reading from file
const text = fs.readFileSync('./text.txt', {encoding: 'utf-8'});
console.log('Read from file');
console.log(text);

//Asynchronous reading from file
fs.readFile('./text.txt', {encoding: 'utf-8'}, (err, data) => {
    if(err){
        return;
    }
    console.log(data);
});
console.log('Read from file')

//Asynchronous reading with promises
fsp.readFile('./text.txt', {encoding:'utf-8'})
.then(result => {
    console.log(result)
});

