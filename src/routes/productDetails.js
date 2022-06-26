const express = require('express');
const router = express.Router();
const prodDetailsController = require('../controllers/productDetailsController');

router.get('/', prodDetailsController.landing);
router.get('/:id', prodDetailsController.obtenerPorId);


module.exports = router;