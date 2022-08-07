function isAdmin(req, res, next) {
    let activeUser = req.session.activeUser;
    if ((activeUser.role).toLowerCase() == 'admin') {
        next();
        return;
    }
    res.send("No tienes acceso a esta pagina!");
}

module.exports = isAdmin;