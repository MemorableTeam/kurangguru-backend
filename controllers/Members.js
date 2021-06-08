const memberModels = require('../models/Members')

const memberController = {
    getMembers : (req, res)=>{
        const request = { ...req.query }
        if(request.id){

        }
    },
    addMember : (req, res)=>{
        const request = { ...req.query }
    },
    deleteMember : (req, res)=>{
        const request = { ...req.query }
    },
    updateMember : (req, res)=>{
        const request = { ...req.query }
    }
}

module.exports = memberController