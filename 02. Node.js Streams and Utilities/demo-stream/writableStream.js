const fs = require('fs');

const writeStream = fs.createWriteStream('./output.txt', {encoding: 'utf-8', flags: 'a'});



const chunk1 = 'Pesho';
const chunk2 = 'Gosho';
const chunk6 = 'Stamat';
const chunk3 = 'Ivan';
const chunk4 = 'Marijka';
const chunk5 = 'Kalinka';


writeStream.write(chunk1 + '\n');
writeStream.write(chunk2 + '\n');
writeStream.write(chunk3 + '\n');
writeStream.write(chunk4 + '\n');
writeStream.write(chunk5 + '\n');

writeStream.on('close', () => {
    console.log('Spiram krancheto')
})
writeStream.end();
