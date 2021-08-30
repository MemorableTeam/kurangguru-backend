const express = require('express');
const router = express.Router();
const classController = require('../controllers/class');
const { verifyId, onlyReturnRole, verifyFasilitator } = require('../helpers/verifyToken');

router.get('/', classController.getClass)
router.get('/schedule', onlyReturnRole, classController.getClassBySchedule)
router.get('/user', verifyId, classController.getClassByUser)

router.post('/', verifyFasilitator, classController.addNewClass)
router.patch('/', verifyFasilitator, classController.editClass)

module.exports = router;