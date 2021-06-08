const memberModel = require("../models/member")

const memberController = {
  getAllMember: (req, res) => {
    memberModel.getAllMember(req)
    .then(result => {
      res.send(result)
    })
    .catch(err => res.send(err))
  },

  addNewMember: (request, res) => {
      memberModel.addNewMember(request.body)
      .then(result => {
          res.send(result)
      })
      .catch(err => {
          res.send(err)
      })
  }
}

module.exports = memberController