const path = require('path');

const fileOperation = require('../modules/fileControl');

const activeUserFile = path.join(__dirname, '../../data/active-user.json');


function isAdmin(req, res, next) {
    let activeUser = fileOperation.readFile(activeUserFile);
    if ((activeUser.role).toLowerCase() == 'admin') {
        next();
        return;
    }
    res.send("No tienes acceso a esta pagina!");
}

module.exports = isAdmin;