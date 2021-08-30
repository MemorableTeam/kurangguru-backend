const express = require('express');
const setupController = require('../controllers/setup');
const router = express.Router();

router.get('/', setupController.setup);

module.exports = router