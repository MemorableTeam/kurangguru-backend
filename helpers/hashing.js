const bcrypt = require('bcrypt');

const hashing = (req, res, next) => {
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      // Send to controller
      if (!err) {
        req.body.password = hash
        next()
      } else {
        res.status(500).send({
          message: 'Error when update user',
          status: 500
        })
      }
    });
  } else {
    next()
  }
}

module.exports = hashing