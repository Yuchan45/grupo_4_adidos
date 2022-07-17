const path = require('path');
const fileOperation = require('../modules/fileControl');

const activeUserFile = path.join(__dirname, '../../data/active-user.json');
let activeUser = fileOperation.readFile(activeUserFile);

function hasFile(req, res, next) {
    const file = req.file;
        
    if (!file) {
        console.log("Debe seleccionar una imagen de producto!");
        res.render('./products/createProduct', {
            activeUser: activeUser
        });
        return;
    }
    console.log("Has file")
    next();
}

module.exports = hasFile;