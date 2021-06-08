const topicsModel = require("../models/topics");

const topicsController = {
  getTopics: (req, res) => {
    const request = { ...req.query };
    console.log(req.query);
    topicsModel
      .getAllTopics(request)
      .then((result) => res.status(result.status).send(result))
      .catch((err) => res.status(err.status).send(err));
  },

  addTopics: (req, res) => {
    const request = { ...req.body }
    topicsModel.addTopics(request)
      .then(result => res.status(result.status).send(result))
      .catch(err => res.status(err.status).send(err))
  },

};

module.exports = topicsController;
