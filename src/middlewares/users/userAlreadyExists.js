const path = require('path');
const fileOperation = require('../modules/fileControl');
const userFunction = require('../modules/userFunction');

const allUsersFile = path.join(__dirname, '../../data/users.json');
const activeUserFile = path.join(__dirname, '../../data/active-user.json');


function userAlreadyExists(req, res, next) {
    // Checks if user already exists
    let activeUser = fileOperation.readFile(activeUserFile);
    let allUsers = fileOperation.readFile(allUsersFile);

    const userData = req.body;
    let usernameAlreadyExists = userFunction.usernameAvailable(allUsers, userData.username);
    if (usernameAlreadyExists) {
        errorMsg = "El usuario ya existe! Prueba con otro nombre de usuario.";
        res.render('./users/register-form', {
            formData : req.body,
            errorMsg : errorMsg,
            activeUser: activeUser
        });
        return;
    }
    next();
}

module.exports = userAlreadyExists;