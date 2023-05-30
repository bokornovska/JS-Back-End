const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
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