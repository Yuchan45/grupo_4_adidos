const path = require('path');
const fileOperation = require('./controllerModules/fileControl');
const userFunction = require('./controllerModules/userFunction');
const { v4: uuidv4 } = require('uuid');
const { nextTick } = require('process');

const allUsersFile = path.join(__dirname, '../data/users.json');
const activeUserFile = path.join(__dirname, '../data/active-user.json');
let activeUser = fileOperation.readFile(activeUserFile);

const usersController = {
    loginIndex: function(req, res) {
        activeUser = fileOperation.readFile(activeUserFile);
        res.render('./users/login-form', {
            userData : '',
            errorMsg : '',
            activeUser: activeUser
        });
    },
    login: function(req, res) {      
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
            res.redirect('/');
            return;
        }
        // Si los datos no son validos...
        res.render('./users/login-form', {
            userData : req.body,
            errorMsg : errorMsg,
            activeUser: activeUser
        });
    },
    register: function(req, res) {
        res.render('./users/register-form', {
            formData : '',
            errorMsg : '',
            activeUser: activeUser
        });
    },
    recover: function(req, res) {
        res.render('./users/recover', {
            activeUser: activeUser
        });
    },
    list: function(req, res) {
        // Update de los datos de los archivos
        const users = fileOperation.readFile(allUsersFile);
        activeUser = fileOperation.readFile(activeUserFile);
        res.render('./users/user-list', {
            users: users,
            activeUser: activeUser
        });
    },
    createUser: function(req, res, next) {
        const files = req.files;
        const userData = req.body;
        let errorMsg = '';

        //console.log(next)
        // No valido si el usuario sube o no archivos porque no es obligatorio establecer una foto de perfil.

        // Check if user already exists
        let allUsers = fileOperation.readFile(allUsersFile);
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
        
        // Set the profile image name if exists, otherwise set the default image name.
        const profileName = (files.profileImage) ? req.files.profileImage[0].filename : '';
        const bannerName = (files.bannerImage) ? req.files.bannerImage[0].filename : '';
        const profileImageName = (profileName) ? profileName : "default.jpg";
        const bannerImageName = (bannerName) ? bannerName : "default-banner.jpg";

        // DataType Validation.
        const validProfileExtension = userFunction.extensionValidation(path.extname(profileImageName));
        const validBannerExtension = userFunction.extensionValidation(path.extname(bannerImageName));   

        if (!(validProfileExtension && validBannerExtension)) {
            errorMsg = "Archivo de imagen no valido!";
            // const error = new Error('Por favor seleccione un archivo valido!');
            // error.httpStatusCode = 400;
            // return next(error);
            res.render('./users/register-form', {
                formData : req.body,
                errorMsg : errorMsg,
                activeUser: activeUser
            });
            return;
        }

        let user = {
            id: uuidv4(),
            accCreationDate: new Date().toISOString().slice(0, 10),
            name: userData.name,
            username: userData.username,
            password: userData.password,
            avatarImageName: profileImageName,
            bannerName: bannerImageName,
            email: userData.email,
            address: userData.address,
            birthdate: userData.birthdate,
            role: userData.role,
            gender: userData.gender,
            country: userData.country,
            interests: userData.interest
        };
        fileOperation.addUserToFile(user, allUsersFile);
        // fileOperation.writeActiveUser(user, activeUserFile); No lo puedo logear, que se loguee denuevo
        res.redirect('/user/login');
    },
    editIndex: function(req, res) {
        // Update de los datos de los archivos
        const users = fileOperation.readFile(allUsersFile);
        activeUser = fileOperation.readFile(activeUserFile);
        
        res.render('./users/user-edit', {
            users: users,
            activeUser: activeUser
        });
    },
    editUser: function(req, res) {
        res.send("PUT EDIT");
    },
    deleteUser: function(req, res) {
        if (!req.params.id) return;
        const id = req.params.id;
        let allUsers = fileOperation.readFile(allUsersFile); // ReadFile devuelve un array de objetos usuario.
        let activeUser = fileOperation.readFile(activeUserFile);
        
        let newArray = userFunction.removeUserFromArray(allUsers, id);
        fileOperation.writeFile(newArray, allUsersFile);
        
        if (activeUser.id == id) {
            fileOperation.writeActiveUser({}, activeUserFile); // Limpio el archivo active-user
            res.redirect('/user/login');
        } else {
            res.redirect('/user/list');
        }

        // Remove image files.
        userFunction.removeUserProfileBannerImage(allUsers, id);
    },
    logout: function(req, res) {
        const user = {};
        fileOperation.writeActiveUser(user, activeUserFile); // Borro el usuario del archivo active-user.json
        res.redirect('/user/login');
    }
};

module.exports = usersController;