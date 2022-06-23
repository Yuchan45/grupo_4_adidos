const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controllers/shoppingCartController');

router.get('/', shoppingCartController.landing);

module.exports = router;