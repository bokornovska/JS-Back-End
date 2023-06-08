const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');



exports.findByUsername = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });

// ------------------------------REGISTER--------------------------------

exports.register = async (email, firstName, lastName, password, repeatPassword) => {

    //Validate password
    if (password !== repeatPassword) {
        throw new Error('Password missmatch');
    };

    // Check if user exists
    const existingUser = await User.findOne({
        $or: [
            { email },
            { password }
        ]
    });

    if (existingUser) {
        throw new Error('User exists');
    };

    // TODO Validate password

    if(password.length <4) {
        throw new Error('Password too short')
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    await User.create({email, username, password: hashedPassword });

    return this.login(email, password);
}

// ------------------------------------LOGIN----------------------------------

exports.login = async (email, password) => {

    //User exists
    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    };

    // Passwword is valid

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    };

    // Generate token

    const payload = {
        _id: user._id,
        email,
        username: user.username
    };

    const token = await jwt.sign(payload, SECRET);

    return token;
}