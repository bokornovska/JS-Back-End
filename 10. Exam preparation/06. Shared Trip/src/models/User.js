const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        // minLength:10,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    gender: {
        type: String,
        enum : ['male','female'],
        required: [true, 'Gender is required'],
    },
    tripsHistory: [{
        type: mongoose.Types.ObjectId,
        ref: 'Trip',
    }],
});

// validate repeat password 
userSchema.virtual('repass')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('Passwords don`t match');
        }
    });

// hash password 
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;