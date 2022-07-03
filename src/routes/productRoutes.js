const express = require('express');
const router = express.Router();
const multer = require('multer');
const productsController = require('../controllers/productsController');

router.get('/', productsController.allProducts);
router.get('/add', function(req, res) {
    res.send("Seccion para agregar un producto");
});
router.get('/edit', productsController.editProduct);

router.get('/:id', productsController.obtenerPorId);
// router.get('/details/:id', productsController.allProducts);

module.exports = router;