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
                else if(decoded.role == 'member') next()
                else if(decoded.role == 'fasilitator') next()
                else if (decoded.id == req.query.id) next()
                /* else formResponse({
                    message: `Forbidden`,
                    status: 403
                }, res) */
                else  res.status(403).send({message : 'Forbidden'})
            } else {
                res.status(400).send({message : `${err.message},${bearerToken}`})
               /*  formResponse({
                    message: ,
                    status: 400,
                }, res) */
            }
        });
    }
}


module.exports = verifyToken