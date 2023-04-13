const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

let filePath = path.resolve(__dirname, './text.txt');
//Synchronous reading from file
const text = fs.readFileSync(filePath, {encoding: 'utf-8'});
console.log('Read from file');
console.log(text);

//Asynchronous reading from file
fs.readFile(path.resolve(__dirname, './text.txt'), {encoding: 'utf-8'}, (err, data) => {
    if(err){
        return;
    }
    console.log(data);
});
console.log('Read from file')

//Asynchronous reading with promises
fsp.readFile(path.resolve(__dirname, './text.txt'), {encoding:'utf-8'})
.then(result => {
    console.log(result)
});

