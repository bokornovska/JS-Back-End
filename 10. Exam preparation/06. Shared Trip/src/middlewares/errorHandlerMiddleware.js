const {getErrorMessage} = require('../utils/error');

exports.errorHandler = (err, req, res) => {
    res.render('/404', {error: getErrorMessage(err)});
}