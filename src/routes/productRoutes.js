const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');


// Middlewares
const uploadFile = require('../middlewares/products/productsMulter');
const extensionValidation = require('../middlewares/products/extensionValidation');
const hasFile = require('../middlewares/products/hasFile');

router.get('/', productsController.allProducts);

router.get('/create', productsController.create);

router.post('/create', uploadFile.single("product-image"), hasFile, extensionValidation, productsController.createProduct); 

//router.get('/list',productsController.productList); // El listado se muestra directamente en la vista de products (/products)

router.get('/search', productsController.search);

router.get('/:id', productsController.obtenerPorId);

router.get('/:id/edit', productsController.editProdIndex);

router.put('/:id', uploadFile.single("product-image"), productsController.editProduct)

router.delete('/delete/:id', productsController.deleteProduct);



module.exports = router;