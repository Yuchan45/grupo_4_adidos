const path = require('path');
const fileOperation = require('./usersModules/fileControl');
const userValidation = require('./usersModules/userValidation');
const { v4: uuidv4 } = require('uuid');
const { nextTick } = require('process');

const allUsersFile = path.join(__dirname, '../data/users.json');
const activeUserFile = path.join(__dirname, '../data/active-user.json');
const activeUser = fileOperation.readFile(activeUserFile);

const usersController = {
    loginIndex: function(req, res) {
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
        const user = userValidation.loginUser(allUsers, loggedUser);

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
        const users = require('../data/users.json');
        res.render('./users/user-list', {
            users: users,
            activeUser: activeUser
        });
    },
    createUser: function(req, res, next) {
        const files = req.files;
        const userData = req.body;
        let errorMsg = '';

        console.log(next)
        // No valido si el usuario sube o no archivos porque no es obligatorio establecer una foto de perfil.

        // Check if user already exists
        let allUsers = fileOperation.readFile(allUsersFile);
        let usernameAlreadyExists = userValidation.usernameAvailable(allUsers, userData.username);
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
        const profileImageName = (profileName) ? profileName : "default.png";
        const bannerImageName = (bannerName) ? bannerName : "default-banner.png";

        // DataType Validation.
        const validProfileExtension = userValidation.extensionValidation(path.extname(profileImageName));
        const validBannerExtension = userValidation.extensionValidation(path.extname(bannerImageName));   

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
        fileOperation.saveUser(user, allUsersFile);
        // fileOperation.writeActiveUser(user, activeUserFile); No lo puedo logear, que se loguee denuevo
        res.redirect('/user/login');
        // res.redirect('/user/list');
    },
    logout: function(req, res) {
        const user = {};
        fileOperation.writeActiveUser(user, activeUserFile); // Borro el usuario del archivo active-user.json
        res.redirect('/user/login');
    }
};

module.exports = usersController;