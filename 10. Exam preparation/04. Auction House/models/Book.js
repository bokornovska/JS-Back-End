const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength:2,
        required: true,
    },
    author: {
        type: String,
        minLength:5,
        required: true,
    },
    image: {
        type: String,
        validate: /^https?:\/\//,
        required: true,
    },
    review: {
        type: String,
        minLength:10,
        required: true,
    },
    genre: {
        type: String,
        minLength:3,
        required: true,
    },
    stars: {
        type: Number,
        min: [1, 'Stars must be between 1 and 5'],
        max:[5, 'Stars must be between 1 and 5'],
        required: true,
    },
    wishList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;