const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');

const SECRET = 'SomeSecretSecret'

exports.findByUsername = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });

// ------------------------------REGISTER--------------------------------

exports.register = async (username, email, password, repeatPassword) => {

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

    if(existingUser){
        throw new Error('User exists');
    };

    // TODO Validate password

    const hashedPassword = await bcrypt.hash(password, 10);


    await User.create({ username, email, password: hashedPassword });
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