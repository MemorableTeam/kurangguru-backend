const express = require('express');
const router = express.Router();
const classController = require('../controllers/class');

router.get('/', classController.getClass)
router.get('/schedule', classController.getClassBySchedule)
router.get('/user', classController.getClassByUser)

module.exports = router;