function isLogged(req, res, next) {
    if (!req.session.userLogged) {
        return res.send("Debes estar logueado para entrar aqui " + req.session.userLogged);
    } else {
        return next();
    }
}

module.exports = isLogged;