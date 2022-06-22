const express = require('express');
const router = express.Router();
const allProdsController = require('../controllers/allProductsController');

router.get('/', allProdsController.landing);

module.exports = router;