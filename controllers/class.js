const classModel = require('../models/class');

const classController = {
  getClass: (req, res) => {
    const request = { ...req.query }
    if (request.id) {
      classModel.getClassById(request)
        .then(result => res.status(result.statusCode).send(result))
        .catch(err => res.status(err.statusCode).send(err))
    }
    classModel.getAllClass(request)
      .then(result => res.status(result.statusCode).send(result))
      .catch(err => res.status(err.statusCode).send(err))
  },

  getClassBySchedule: (req, res) => {
    const request = { ...req.query }
    classModel.getClassBySchedule(request)
      .then(result => res.status(result.statusCode).send(result))
      .catch(err => res.status(err.statusCode).send(err))
  },

  getClassByUser: (req, res) => { },
};

module.exports = classController