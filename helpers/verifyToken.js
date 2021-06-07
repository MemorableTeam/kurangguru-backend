const jwt = require('jsonwebtoken');
const formResponse = require('./formResponse');

const verifyToken = (req, res, next) => {
    const bearerToken = req.header('token')
    if (!bearerToken) {
        formResponse({
            message: `Resource not Found`,
            status: 404,
        }, res)
    }else{
        jwt.verify(bearerToken, process.env.SECRET_KEY, function (err, decoded) {
            if (!err) {
                if(decoded.role == 'admin') next()
                else if(decoded.role == 'user') next()
                else if(decoded.role == 'fasilitator') next()
                else if (decoded.user_id == req.query.user_id) next()
                else  res.status(403).send({message : 'Forbidden'})
            } else {
                res.status(400).send({message : `${err.message},${bearerToken}`})
            }
        });
    }
}


module.exports = verifyToken