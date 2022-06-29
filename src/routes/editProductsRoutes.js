const express = require('express');
const router = express.Router();
const editProductsController = require('../controllers/editProductsController');

router.get('/', editProductsController.landing);

module.exports = router;