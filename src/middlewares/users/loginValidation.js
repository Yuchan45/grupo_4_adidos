const path = require('path');

const fileOperation = require('../modules/fileControl');
const userFunction = require('../modules/userFunction');

const allUsersFile = path.join(__dirname, '../../data/users.json');
const activeUserFile = path.join(__dirname, '../../data/active-user.json');
let activeUser = fileOperation.readFile(activeUserFile);

function loginValidation(req, res, next) {
    let errorMsg = '';  
    let loggedUser = {
        username: req.body.username,
        password: req.body.password,
    };

    const allUsers = fileOperation.readFile(allUsersFile); // ReadFile devuelve un array de objetos usuario.
    const user = userFunction.userExists(allUsers, loggedUser); 

    if (user === "yes") {
        errorMsg = "La contraseña ingresada no es valida!";
    } else if (user === "no") {
        errorMsg = "El usuario ingresado NO existe!";
    } else {
        // Todo en orden, siga señor
        fileOperation.writeActiveUser(user, activeUserFile); // Actualizo el usuario activo
        next();
        return;
    }
    // Si los datos no son validos...
    res.render('./users/login-form', {
        userData : req.body,
        errorMsg : errorMsg,
        activeUser: activeUser
    });
}

module.exports = loginValidation;