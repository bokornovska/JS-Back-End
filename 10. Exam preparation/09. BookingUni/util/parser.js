

function parseError(error) {
    if (error.name == 'ValidatorError') {

        Object.values(error.errors).map(x => x.message);
    } else {

        return error.message.split('/n');
    }
}

module.exports = {
    parseError
}