const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Middlewares
const apicontroller = require('../controllers/apiController');

router.get('/users', apicontroller.userList)
router.get('/users/:id', apiController.userListId)

router.get('/products', apicontroller.productList)
router.get('/products/:id', apiController.productListId)

module.exports = router