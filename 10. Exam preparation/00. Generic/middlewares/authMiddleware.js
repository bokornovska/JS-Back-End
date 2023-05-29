const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');

exports.authentication = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (token) {

        try {
            const decodedToken = await jwt.verify(token, SECRET);

            req.user = decodedToken;

        } catch (err) {
            res.clearCookie('auth');
            res.status(401).render('home/404');
        }
    };

    next();
}