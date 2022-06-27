const express = require('express');
const router = express.Router();
const recoverController = require('../controllers/recoverController');

router.get('/', recoverController.landing);

module.exports = router;