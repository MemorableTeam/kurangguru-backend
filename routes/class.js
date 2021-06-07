const express = require('express');
const router = express.Router();
const classController = require('../controllers/class');
const { verifyId } = require('../helpers/verifyToken');

router.get('/', classController.getClass)
router.get('/schedule', classController.getClassBySchedule)
router.get('/user', verifyId, classController.getClassByUser)

router.post('/', classController.addNewClass)
router.patch('/', classController.editClass)

module.exports = router;