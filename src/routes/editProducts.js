const express = require('express');
const router = express.Router();
const editProductsController = require('../controllers/editProductsController');

router.get('/', editPoductsController.landing);

module.exports = router;