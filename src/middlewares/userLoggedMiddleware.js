const User = require('../modules/User');

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;  // userEmail es una cookie q se guarda cuando el cliente checkea el "recuerdame"
    // console.log(emailInCookie);
    let userFromCookie = User.findByField('email', emailInCookie);

    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;