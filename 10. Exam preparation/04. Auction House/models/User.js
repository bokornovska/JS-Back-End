const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        match: /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+$/,
        required: [true, 'Email is required']
    },
    firstName: {
        type: String,
        minLength:1,
        required: [true, 'First Name is required']
    },
    lastName: {
        type: String,
        minLength:1,
        required: [true, 'Last Name is required']
    },
    password: {
        type: String,
        // minLength:5,
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