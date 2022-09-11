const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');


// Middlewares
const uploadFile = require('../middlewares/products/productsMulter');
const hasFile = require('../middlewares/products/hasFile');

router.get('/prueba', productsController.prueba);

router.get('/', productsController.allProducts);

router.get('/create', productsController.create);

// Create
router.post('/create', productsController.save);
// Read
router.get('/', productsController.productsList);
// Detalle 
router.get('/:id', productsController.productDetails);
// Update = actualizar
router.get('/edit/:id', productsController.editProducts);
router.post('/edit/:id', productsController.update);
// Delete
router.post("/delete/:id", productsController.delete);

router.post('/create', uploadFile.single("product-image"), hasFile, productsController.createProduct); 

//router.get('/list',productsController.productList); // El listado se muestra directamente en la vista de products (/products)

router.get('/search', productsController.search);

router.get('/:id', productsController.obtenerPorId);

router.get('/:id/edit', productsController.editProdIndex);

router.put('/:id', uploadFile.single("product-image"), productsController.editProduct)

router.delete('/delete/:id', productsController.deleteProduct);



module.exports = router;