const mongoose = require('mongoose');

//create schema
const catShema = new mongoose.Schema({
    name: {
        type:String,
        // required: true, - automatic error
        required: [true, 'Трябва име'],
        minLength: 3,
    },
    age: {
        type: Number,
        min: 0,
        max: 15,
    },
    breed: {
        type: String,
        enum: ['Persian', 'Angora', 'Domestic', 'British Shorthair']
    },
});

//Method
catShema.methods.makesound = function(){
    console.log(`Hello my name is ${this.name} and meow!`);
};

//Virtual property
catShema.virtual('info').get(function(){
    return `${this.name} - ${this.age} - ${this.breed}`
});

//Validation methods
catShema.path('name').validate(function() {
    return this.name.startsWith('N')
}, 'Name should start with N')

//create model
// const Cat = mongoose.model('Cat', catShema);

module.exports = mongoose.model('Cat', catShema);
// module.exports = Cat;
