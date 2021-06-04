const setupModel = require("../models/setup")

const setupController = {
  setup: (req, res) => {
    setupModel.setup().then(result => {
      res.send(result)
    }).catch(err => res.send(err))
  }
}

module.exports = setupController