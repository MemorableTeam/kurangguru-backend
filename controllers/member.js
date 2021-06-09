const memberModel = require("../models/members")

const memberController = {
  getAllMember: (req, res) => {
    const request = { ...req.query }
    if (request.user_id) {
      memberModel.getMemberById(request)
        .then(result => res.status(result.status).send(result))
        .catch(err => res.status(err.status).send(err))
    }
    memberModel.getMembers(request)
      .then(result => res.status(result.status).send(result))
      .catch(err => res.status(err.status).send(err))
  },

  addMember: (req, res) => {
    const request = { ...req.query }
    memberModel.addMember(request)
      .then(result => res.status(result.status).send(result))
      .catch(err => res.status(err.status).send(err))
  },

  editMember: (req, res) => {
    const request = { ...req.query }
    memberModel.editMember(request)
      .then(result => res.status(result.status).send(result))
      .catch(err => res.status(err.status).send(err))
  },

  deleteMember: (req, res) => {
    const request = { ...req.query }
    memberModel.deleteMember(request)
      .then(result => res.status(result.status).send(result))
      .catch(err => res.status(err.status).send(err))
  },
}

module.exports = memberController