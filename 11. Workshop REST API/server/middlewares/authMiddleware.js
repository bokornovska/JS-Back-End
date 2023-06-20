const jwt = require('jsonwebtoken')

exports.auth = (req,res,next) => {
    const token = req.header('X-Authorization');

    if(token){
        try {
            const decodedToken = jwt.verify(token, 'SECRETSECRET');
            res.user = decodedToken;

            next();
            
        } catch (error) {
            res.status(401).json({
                message: 'You are no authorized',
            })
        }


    }else{
        next();
    }
}