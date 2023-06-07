const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        minLength:10,
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        minLength:4,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        minLength:3,
        required: true,
    }
},
    // {
    //     virtuals: {
    //         repeatPassword: {
    //             set(value) {
    //                 if (this.password !== value) {
    //                     throw new mongoose.Error('Password missmatch')
    //                 }
    //             }
    //         }
    //     }
    // }
);

const User = mongoose.model('User', userSchema);

module.exports = User;