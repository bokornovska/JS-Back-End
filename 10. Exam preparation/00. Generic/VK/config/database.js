const mongoose = require('mongoose');

// TODO : change database name
const CONNECTION_STRING = 'mongodb://0.0.0.0:27017/demoDB'
module.exports = async (app) => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected')
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }

}