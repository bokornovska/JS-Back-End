const mongoose = require('mongoose');

const Cat = require('./models/Cat');

async function main() {

    // mongoose.set('strictQuery', false);  -  if there is a warning

    await mongoose.connect('mongodb://127.0.0.1:27017/catShelter');

    console.log('Database connected');

    const cats = await readCats();

    cats.forEach(cat => {
        cat.makesound();
        console.log(cat.info);
    });

    let oneCat = await readOneCat();
    console.log(oneCat);

    // await updateCat('Nav', 'Navuhodonosor');

    // await saveCat('', 4, 'angora'); - name is required
    // await saveCat('Chan', 25, 'siamec'); - validation failed;

    await deleteCat('Garry');
};

async function saveCat(name, age, breed) {

    await Cat.create({
        name,
        age,
        breed,
    });

    // const cat = new Cat({
    //     name,
    //     age,
    //     breed,
    // });

    // await cat.save();
}

async function readCats() {
    const cats = await Cat.find();

    console.log(cats);
    return cats;
}

async function readOneCat(name) {
    // const cat = await Cat.findOne({ breed: 'angora' }); 
    const cat = await Cat.findById("644a27f9aa43d5379a0a6e98");
    return cat;
};

async function updateCat(name, newName) {
    await Cat.updateOne({ name }, { name: newName });
};

async function deleteCat(name) {
    await Cat.deleteOne({ name });
};



main();