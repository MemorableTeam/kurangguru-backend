const express = require('express')
const router = express.Router();
const topicsController = require('../controllers/topics');
const { verifyId, onlyReturnRole, verifyFasilitator } = require('../helpers/verifyToken');


router.get('/',onlyReturnRole,topicsController.getTopics)
router.post('/add',topicsController.addTopics)

module.exports=router