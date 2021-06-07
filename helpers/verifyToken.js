const jwt = require('jsonwebtoken');

const verifyToken = {
	verifyId: (req, res, next) => {
		const bearerToken = req.headers.authorization
		if (!bearerToken) {
			res.status(404).send({ message: 'Resource not found!', status: 404 })
		} else {
			jwt.verify(bearerToken.split(' ')[1], process.env.SECRET_KEY, function (err, decoded) {
				if (!err) {
					req.query.role = decoded.role
					if (decoded.id == req.query.user_id) next()
					else res.status(403).send({ message: 'Forbidden', status: 403 })
				} else {
					res.status(400).send({ message: `${err.message},${bearerToken}`, status: 400 })
				}
			});
		}
	},

	verifyFasilitator: (req, res, next) => {
		const bearerToken = req.headers.authorization
		if (!bearerToken) {
			res.status(404).send({ message: 'Resource not found!', status: 404 })
		} else {
			jwt.verify(bearerToken.split(' ')[1], process.env.SECRET_KEY, function (err, decoded) {
				if (!err) {
					if (decoded.role == 'fasilitator') next()
					else res.status(403).send({ message: 'Forbidden', status: 403 })
				} else {
					res.status(400).send({ message: `${err.message},${bearerToken}`, message: 400 })
				}
			});
		}
	},

	onlyReturnRole: (req, res, next) => {
		const bearerToken = req.headers.authorization
		if (!bearerToken) {
			res.status(404).send({ message: 'Resource not found!', status: 404 })
		} else {
			jwt.verify(bearerToken.split(' ')[1], process.env.SECRET_KEY, function (err, decoded) {
				if (!err) {
					req.query.role = decoded.role
					next()
				} else {
					res.status(400).send({ message: `${err.message},${bearerToken}`, status: 400 })
				}
			});
		}
	}
}

module.exports = verifyToken