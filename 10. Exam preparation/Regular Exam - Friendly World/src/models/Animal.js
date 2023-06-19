const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name must be at least 2 characters'],
        required: [true, 'Name is required'],
    },
    years: {
        type: Number,
        min: [1, 'The years must be between 1 and 100'],
        max: [100, 'The years must be between 1 and 100'],
        required: [true, 'Years is required'],
    },
    kind: {
        type: String,
        minLength: [3, 'Kind must be at least 3 characters'],
        required: [true, 'Kind is required'],
    },
    image: {
        type: String,
        match: [/^https?:\/\//, 'Invalid url'],
        required: [true, 'Image is required']
    },
    need: {
        type: String,
        minLength: [3, 'The need must be at least 3 characters long'],
        maxLength: [20, 'The need must be no more than 20 characters long'],
        required: [true, 'Need is required'],
    },
    location: {
        type: String,
        minLength: [5, 'The location must be at least 5 characters long'],
        maxLength: [15, 'The location must be no more than 15 characters long'],
        required: [true, 'Location is required']
    },
    description: {
        type: String,
        minLength: [5, 'The description must be at least 5 characters long'],
        maxLength: [50, 'The description must be no more than 50 characters long'],
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    donations: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;