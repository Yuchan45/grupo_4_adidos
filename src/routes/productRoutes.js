
const path = require('path');
const multer = require('multer');

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Seteo donde y como guardar los archivos.
const fileStorageEngineConfig = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = path.join(__dirname, '../../public/images/products');
        cb(null, folder);
    },
    filename: function(req, file, cb) {
        //let imageName = Date.now() + path.extname(file.originalname);
        let imageName = Date.now() + path.extname(file.originalname); 
        cb(null, imageName);
    }
});

let uploadFile = multer({storage: fileStorageEngineConfig});

router.get('/', productsController.allProducts);

router.get('/create', productsController.create);
router.post('/create',uploadFile.single("image"), productsController.createproduct); 

router.get('/list',productsController.productList)

router.get('/:id', productsController.obtenerPorId);

router.get('/:id/edit', productsController.editProduct);

router.put('/:id', function(req, res) {
    res.send("Acción de edición (a donde se envía el formulario):");
});

router.delete('/:id', function(req, res) {
    res.send("Acción de borrado");
});

module.exports = router;