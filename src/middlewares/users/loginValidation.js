const path = require('path');

const fileOperation = require('../../modules/fileControl');
const userFunction = require('../../modules/userFunction');

const allUsersFile = path.join(__dirname, '../../data/users.json');
const activeUserFile = path.join(__dirname, '../../data/active-user.json');
let activeUser = fileOperation.readFile(activeUserFile);

function loginValidation(req, res, next) {
    // Verifica: - El usuario ya existe. Contraseña valida o invalida.  
    let actualUser = undefined;
    let user = {
        username: req.body.username,
        password: req.body.password,
    };

    const allUsers = fileOperation.readFile(allUsersFile); // ReadFile devuelve un array de objetos usuario.

    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].username.toLowerCase() == user.username.toLowerCase()) {
            if (allUsers[i].password == user.password) {
                actualUser = allUsers[i];
                break;
            }
        }
    }
    if (!actualUser) {
        res.render('./users/login-form', {
            userData : req.body,
            errorMsg : 'Las credenciales son invalidas!',
            activeUser: activeUser
        });
    } else {
        req.session.activeUser = actualUser;
        //fileOperation.writeActiveUser(actualUser, activeUserFile); // Actualizo el usuario activo
        next();
    }


}

module.exports = loginValidation;