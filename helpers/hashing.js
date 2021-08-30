const bcrypt = require('bcrypt');

const hashing = (req, res, next) => {
  if (req.body.password) {
    if (req.body.password !== req.body.confirm_password) {
      res.status(400).send({
        message: 'Password doesn`t match !',
        status: 400
      });
    }
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