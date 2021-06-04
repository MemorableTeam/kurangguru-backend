const usersModel = require("../models/users")


const usersController = {
  getUsers: (req, res) => {
    const request = { ...req.body }
    if (request.id) {
      usersModel.getUserById(request)
        .then(result => res.status(result.status).send(result))
        .catch(err => res.status(err.status).send(err))
    } else {
      usersModel.getAll(request)
        .then(result => res.status(result.status).send(result))
        .catch(err => res.status(err.status).send(err))
    }
  },

  updateUsers: (req, res) => {
    const request = { ...req.body, photo: req.file ? `/uploads/photo/${req.file.filename}` : undefined }
    usersModel.updateUsers(request)
      .then(result => res.status(result.status).send(result))
      .catch(err => res.status(err.status).send(err))
  }
}

module.exports = usersController