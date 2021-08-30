const express = require('express');
const usersController = require('../controllers/users');
const hashing = require('../helpers/hashing');
const upload = require('../helpers/upload');
const router = express.Router();

router.get('/', usersController.getUsers)
router.patch('/', upload.uploadPhoto, hashing, usersController.updateUsers)

module.exports = router