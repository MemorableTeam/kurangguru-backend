const topicModels = require('../models/Topics')

const topicController ={
    getAllTopics : (req, res)=>{
        const request = { ...req.query }
        if(request.id){
            topicModels.getTopics(request)
            .then(result => res.status(result.status).send(result))
            .catch(err => res.status(err.status).send(err))
        }
        topicModels.getAllTopics(request)
        .then(result=> res.status(result.status).send(result))
        .catch(err => res.status(err.status).send(err))
    },
    editTopic : (req, res)=>{
        topicModels.updateTopic(req)
        if()
    },
    addTopic : (req, res)=>{
        const request = {...req.body}
        if(!req.query.user_id){

        }
    },
    deleteTopic : (req, res)=>{

    }
}

module.exports = topicController