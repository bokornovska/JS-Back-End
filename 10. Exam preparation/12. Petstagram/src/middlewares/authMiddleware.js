const { SECRET, TOKEN_KEY } = require("../config/config");
const jwt = require("../lib/jwt");


exports.authentication = async (req, res, next) => {

    const token = req.cookies[TOKEN_KEY];

    if(token){
        try {
            const decodedToken = await jwt.verify(token, SECRET);

            req.user = decodedToken;

            next();
        } catch (error) {
            res.clearCookie(TOKEN_KEY);
            res.redirect('/auth/login');
        }
    }else{
        next();
    }
}