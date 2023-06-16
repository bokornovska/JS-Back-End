const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        // minLength: [2, 'Name must be at least 2 characters'],
        required: [true, 'Start point is required'],
    },
    endPoint: {
        type: String,
        // match: [/^https?:\/\//, 'Invalid url'],
        required: [true, 'end point is required'],
    },
    date: {
        type: String,
        required: [true, 'Date is required'],
    },
    time: {
        type: String,
        required: [true, 'Time is required'],
    },
    carImage: {
        type: String,
        required: [true, 'Image is required'],
    },
    carBrand: {
        type: String,
        required: [true, 'Car brand is required']
    },
    seats: {
        type: Number,
        required: [true, 'Seats brand is required']
    },
    price: {
        type: Number,
        required: [true, 'Price brand is required']
    },
    description: {
        type: String,
        required: [true, 'Description brand is required']
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buddies: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    }]
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;