const classModel = require('../models/class');

const classController = {
  getClass: (req, res) => {
    const request = { ...req.query }
    if (request.id) {
      classModel.getClassById(request)
        .then(result => res.status(result.status).send(result))
        .catch(err => res.status(err.status).send(err))
    }
    classModel.getAllClass(request)
      .then(result => res.status(result.status).send(result))
      .catch(err => res.status(err.status).send(err))
  },

  getClassBySchedule: (req, res) => {
    const request = { ...req.query }
    classModel.getClassBySchedule(request)
      .then(result => res.status(result.status).send(result))
      .catch(err => res.status(err.status).send(err))
  },

  getClassByUser: (req, res) => {
    const request = { ...req.query }
    classModel.getClassByUser(request)
      .then(result => res.status(result.status).send(result))
      .catch(err => res.status(err.status).send(err))
  },

  addNewClass: (req, res) => {
    const request = { ...req.body }
    classModel.addClass(request)
      .then(result => res.status(result.status).send(result))
      .catch(err => res.status(err.status).send(err))
  },

  editClass: (req, res) => {
    const request = { ...req.body }
    classModel.editClass(request)
      .then(result => res.status(result.status).send(result))
      .catch(err => res.status(err.status).send(err))
  }
};

module.exports = classController