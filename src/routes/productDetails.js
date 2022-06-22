const express = require('express');
const router = express.Router();
const prodDetailsController = require('../controllers/productDetailsController');

router.get('/', prodDetailsController.landing);

module.exports = router;