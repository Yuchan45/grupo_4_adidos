// DataType Validation.
const path = require('path');
const fileOperation = require('../../modules/fileControl');

const activeUserFile = path.join(__dirname, '../../data/active-user.json');
let activeUser = fileOperation.readFile(activeUserFile);

function extensionValidation(req, res, next) {
    let productImage = '';
    const file = req.file;

    productImage = (file) ? req.file.filename : "default.png";

    let ext = path.extname(productImage);
    if (ext != '.png' && ext != '.JPG' && ext != '.jpeg' && ext != '.webp') {
        const msg = "Archivo de imagen no valido!";
        const old = req.body;
        console.log(old);
        res.render('./products/createProduct', {
            activeUser: activeUser,
            old : old,
            errorMsg: msg
        });
        return;
    }
    // console.log("Pase...")
    next();
}

module.exports = extensionValidation;