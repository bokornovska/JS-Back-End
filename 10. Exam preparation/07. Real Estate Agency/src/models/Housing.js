const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [6, 'Name must be at least 6 characters'],
        required: [true, 'Name is required'],
    },
    type: {
        type: String,
        enum: {
            values: ['Apartment', 'Villa', 'House'],
            message: "Invalid type. Only 'Apartment', 'Villa', 'House' is allowed.",
        },
        required: [true, 'Type is required'],
    },
    year: {
        type: Number,
        min: [1850, 'The year must be between 1850 and 2021'],
        max: [2021, 'The year must be between 1850 and 2021'],
        required: [true, 'Year is required'],
    },
    city: {
        type: String,
        minLength: [4, 'The city must be at least 4 characters long'],
        required: [true, 'City is required'],
    },
    image: {
        type: String,
        match: [/^https?:\/\//, 'Invalid url'],
        required: [true, 'Image is required']
    },
    description: {
        type: String,
        maxLength: [60, 'Description must be max 60 characters long'],
        required: [true, 'Description is required']
    },
    availablePieces: {
        type: Number,
        min: [0, 'available pieces must be positive number between 0 and 10'],
        max: [10, 'available pieces must be positive number between 0 and 10'],
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    rented: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]
});

const House = mongoose.model('House', housingSchema);

module.exports = House;