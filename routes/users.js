const express = require('express');
const usersController = require('../controllers/users');
const hashing = require('../helpers/hashing');
const router = express.Router();

router.get('/', usersController.getUsers)
router.patch('/', hashing, usersController.updateUsers)

module.exports = router