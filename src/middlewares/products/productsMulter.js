const path = require('path');
const multer = require('multer');

// Seteo donde y como guardar los archivos.
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = path.join(__dirname, '../../../public/images/products');
        cb(null, folder);
    },
    filename: function(req, file, cb) {
        //let imageName = Date.now() + path.extname(file.originalname);
        let imageName = "product-image"+ Date.now() + path.extname(file.originalname); 
        cb(null, imageName);
    }
});

let uploadFile = multer({storage});

module.exports= uploadFile;