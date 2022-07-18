const path = require('path');
const fileOperation = require('../../modules/fileControl');

const activeUserFile = path.join(__dirname, '../../data/active-user.json');
let activeUser = fileOperation.readFile(activeUserFile);

function hasFile(req, res, next) {
    const file = req.file;
        
    if (!file) {
        const msg = "Debe seleccionar una imagen de producto!";
        const old = req.body;
        res.render('./products/createProduct', {
            activeUser: activeUser,
            old : old,
            errorMsg: msg
        });
        return;
    }
    // console.log("Has file")
    next();
}

module.exports = hasFile;