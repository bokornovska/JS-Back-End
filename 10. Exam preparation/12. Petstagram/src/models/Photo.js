const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name must be at least 2 characters'],
        required: [true, 'Name is required'],
    },
    image: {
        type: String,
        // match: [/^https?:\/\//, 'Invalid url'],
        required: [true, 'imageUrl is required'],
    },
    age: {
        type: Number,
        min: 1,
        max: 100,
        required: [true, 'Age is required'],
    },
    description: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: [true, 'Description is required'],
    },
    location: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: [true, 'Location is required']
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    comments: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            message: {
                type: String,
                required: [true, 'Comment message is required']
            }
        }
    ]
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;