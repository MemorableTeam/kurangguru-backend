const topicsModel = require("../models/topics");

const topicsController = {
  getTopics: (req, res) => {
    const request = { ...req.query };
    topicsModel.getAllTopics(request)
    .then((result) => res.status(result.status).send(result))
    .catch((err) => res.status(err.status).send(err));
  },

  addTopics: (req, res) => {
    const request = { ...req.body };
    topicsModel.addTopics(request)
    .then((result) => res.status(result.status).send(result))
    .catch((err) => res.status(err.status).send(err));
  },

  editTopics : (req, res)=>{
    const request = {...req.body, ...req.query};
    const {topics_id, user_id} = req.query
    if(topics_id == null || user_id == null){
      res.status(403).send({message: 'Access Forbidden'})
    }else{
      topicsModel.editTopic(request)
      .then((result)=>{
        res.status(result.status).send(result)
      }).catch((err)=>{
        res.status(err.status).send(err)
      })
    }
  },
  deleteTopic : (req, res) =>{
      const request = {...req.query}
      console.log(request)
      topicsModel.deleteTopic(request)
      .then((result)=>{
        res.status(result.status).send(result)
      }).catch((err)=>{
        res.status(err.status).send(err)
      })
  }
};

module.exports = topicsController;
