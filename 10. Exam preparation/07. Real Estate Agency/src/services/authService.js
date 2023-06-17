const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config')

// ------------------------------------------------LOGIN----------------------------------------------------------
exports.login = async (username, password) => {

    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Invalid username ot password')
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid username ot password')
    }

    const token = await createToken(user);

    return token;

};

// -------------------------------------------------REGISTER----------------------------------------------------------
exports.register = async (userData) => {

    const user = await User.findOne({ username: userData.username });

    if (user) {
        throw new Error('Username is taken');
    };
    //(if not auto login)
    return User.create(userData);

    // if auto login after registration:
    // const createdUser = await User.create(userData);

    // const token = await createToken(createdUser);
    // return token;

}

async function createToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET);

    return token;
}