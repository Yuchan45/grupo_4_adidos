const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../logs/logs.txt');

function logs(req, res, next) {
    fs.appendFileSync(file, "El usuario ingreso a la ruta: '" + req.url + "'\n");
    next();
}

module.exports = logs;