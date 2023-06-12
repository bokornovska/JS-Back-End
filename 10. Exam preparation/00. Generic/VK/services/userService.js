
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'asdfghjlkqweertytyu';


async function register(username, password) {
    const existingUser = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existingUser) {
        throw new Error('Username already exists')
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashedPassword
    });

    // TODO see assignment if registration creates user session

    const token = createSession(user);

    return token;
}

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if(!user){
        throw new Error('Incorrect username or password');
    };


    const result = await bcrypt.compare(password, user.hashedPassword);

    if(!result){
        throw new Error('Incorrect username or password');
    };

    const token = createSession(user);
    return token;
}

// async function logout() {

// }

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET)
}

function createSession({ _id, username }) {

    const payload = {
        _id,
        username
    };

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

module.exports = {
    register,
    login,
    verifyToken
}