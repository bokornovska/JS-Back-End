const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength:4,
        required: true,
    },
    description: {
        type: String,
        maxLength:200,
    },
    image: {
        type: String,
        // validate: /^https?:\/\//, 
    },
    category: {
        type: String,
        enum: ['Vehicles', 'Real Estate', 'Electronics', 'Furniture', 'Other'],
        required: true,
    },
    price: {
        type: Number,
        min:0,
        required: true,
    },
    bidder: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;