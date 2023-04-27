const mongoose = require('mongoose');

async function main() {

    // mongoose.set('strictQuery', false);  -  if there is a warning

    await mongoose.connect('mongodb://127.0.0.1:27017/catShelter');

    console.log('Database connected')
};

main();