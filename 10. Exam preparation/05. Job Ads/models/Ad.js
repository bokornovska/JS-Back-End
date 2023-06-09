const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    headline: {
        type: String,
        // minLength:2,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        // min:0,
        required: true,
    },
    companyDescription: {
        type: String,
        // minLength:10,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    usersApplied: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;