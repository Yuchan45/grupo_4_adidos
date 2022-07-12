const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.allProducts);

router.get('/create', function(req, res) {
    res.send("Formulario de creación de productos");
});

router.get('/:id', productsController.obtenerPorId);

router.post('/', function(req, res) {
    res.send("Acción de creación (a donde se envía el formulario)");
});

router.get('/:id/edit', productsController.editProduct);

router.put('/:id', function(req, res) {
    res.send("Acción de edición (a donde se envía el formulario):");
});

router.delete('/:id', function(req, res) {
    res.send("Acción de borrado");
});


module.exports = router;