const path = require('path');

function isLogged(req, res, next) {
    if (req.session.activeUser == undefined) {
        res.send("Debes estar logueado para entrar aqui " + req.session.activeUser);
    } else {
        next();
        return;
    }
}

module.exports = isLogged;