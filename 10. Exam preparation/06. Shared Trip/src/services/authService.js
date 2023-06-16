const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config')

// ------------------------------------------------LOGIN----------------------------------------------------------
exports.login = async (email, password) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email ot password')
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email ot password')
    }

    const token = await createToken(user);
    
    return token;

};

// -------------------------------------------------REGISTER----------------------------------------------------------
exports.register = async (userData) => {

    const user = await User.findOne({ email: userData.email });

    if (user) {
        throw new Error('This user already exists');
    };

    // return User.create(userData); (if not auto login)

    // if auto login after registration:
    const createdUser = await User.create(userData);

    const token = await createToken(createdUser);
    return token;
    
}

async function createToken(user){
    const payload = {
        _id: user._id,
        email: user.email,
        gender: user.gender,
    };

    const token = await jwt.sign(payload, SECRET);

    return token;
}