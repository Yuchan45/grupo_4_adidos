const express = require('express');
const router = express.Router();
const multer = require('multer');
const usersController = require('../controllers/usersController');

router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.get('/recover', usersController.recover);
router.get('/list', usersController.list);

module.exports = router;