const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        match: [/^[a-zA-Z]+\s[a-zA-Z]+$/, 'name should be in the following format: firstname nastname'], 
        required: [true, 'Name is required'],
    },
    username: {
        type: String,
        minLength:[5, 'Username must be at least 5 characters'],
        required: [true, 'Username is required'],
    },
    password: {
        type: String,
        minLength:[4,'Password must be at least 4 characters long'],
        required: [true, 'Password is required'],
    },
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