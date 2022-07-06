const path = require('path');
const userCrud = require('./usersModules/fileControl');
const userValidation = require('./usersModules/userValidation');
const { v4: uuidv4 } = require('uuid');

const allUsersFile = path.join(__dirname, '../data/users.json');
const activeUserFile = path.join(__dirname, '../data/active-user.json');

const usersController = {
    loginIndex: function(req, res) {
        res.render('./users/login-form', {
            userData : '',
            errorMsg : ''
        });
    },
    login: function(req, res) {      
        let errorMsg = '';  
        let loggedUser = {
            username: req.body.username,
            password: req.body.password,
        };

        const allUsers = userCrud.readFile(allUsersFile); // ReadFile devuelve un array de objetos usuario.
        const user = userValidation.loginUser(allUsers, loggedUser);

        if (user === "yes") {
            errorMsg = "La contraseña ingresada no es valida!";
        } else if (user === "no") {
            errorMsg = "El usuario ingresado NO existe!";
        } else {
            // Todo en orden, siga señor
            userCrud.writeActiveUser(user, activeUserFile); // Guardo el usuario activo en un archivo.
            res.redirect('/user/list');
            return;
        }
        // Si los datos no son validos...
        res.render('./users/login-form', {
            userData : req.body,
            errorMsg : errorMsg
        });
    },
    register: function(req, res) {
        res.render('./users/register-form', {
            formData : '',
            errorMsg : ''
        });
    },
    recover: function(req, res) {
        res.render('./users/recover');
    },
    list: function(req, res) {
        const users = require('../data/users.json');
        res.render('./users/user-list', {users: users});
    },
    createUser: function(req, res) {
        const files = req.files;
        const userData = req.body;
        let errorMsg = '';

        // Check if user already exists
        let allUsers = userCrud.readFile(allUsersFile);
        let usernameAlreadyExists = userValidation.usernameAvailable(allUsers, userData.username);
        if (usernameAlreadyExists) {
            errorMsg = "El usuario ya existe! Prueba con otro nombre de usuario.";
            res.render('./users/register-form', {
                formData : req.body,
                errorMsg : errorMsg
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
            res.render('./users/register-form', {
                formData : req.body,
                errorMsg : errorMsg
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
        userCrud.saveUser(user, allUsersFile);
        res.redirect('/user/list');
    }
};

module.exports = usersController;