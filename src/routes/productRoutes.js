
const path = require('path');
const multer = require('multer');

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Middlewares
const extensionValidation = require('../middlewares/products/extensionValidation');
const hasFile = require('../middlewares/products/hasFile');

// Seteo donde y como guardar los archivos.
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = path.join(__dirname, '../../public/images/products');
        cb(null, folder);
    },
    filename: function(req, file, cb) {
        //let imageName = Date.now() + path.extname(file.originalname);
        let imageName = "product-image"+ Date.now() + path.extname(file.originalname); 
        cb(null, imageName);
    }
});

let uploadFile = multer({storage});

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