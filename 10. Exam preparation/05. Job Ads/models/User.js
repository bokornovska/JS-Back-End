const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        // minLength:10,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: true,
    },
    skillsDescription: {
        type: String,
        required: true,
    },
    myAds: {
        type: mongoose.Types.ObjectId,
        ref: 'Ad',
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