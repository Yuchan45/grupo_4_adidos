const path = require('path');
const { validationResult } = require('express-validator');
const fileOperation = require('../modules/fileControl');
const userFunction = require('../modules/userFunction');
const { v4: uuidv4 } = require('uuid');

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
        res.redirect('/');
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
            filter : '',
            users: users,
            activeUser: activeUser
        });
    },
    createUser: function(req, res, next) {
        let errors = validationResult(req);
        
        // if (errors.isEmpty){
        //     console.log("Todo valido")
        // } else {
        //     console.log(errors.mapped())
        // }

        let errorMsg = '';
        let activeUser = fileOperation.readFile(activeUserFile);

        const files = req.files;
        const userData = req.body;

        if (!(req.validProfileExtension && req.validBannerExtension)) {
            errorMsg = "Archivo de imagen no valido!";
            res.render('./users/register-form', {
                formData : req.body,
                errorMsg : errorMsg,
                activeUser: activeUser
            });
            return;
        }

        // No valido si el usuario sube o no archivos porque no es obligatorio establecer una foto de perfil.    
        // Set the profile image name if exists, otherwise set the default image name.
        const profileImageName = (files.profileImage) ? req.files.profileImage[0].filename : 'default.jpg';
        const bannerImageName = (files.bannerImage) ? req.files.bannerImage[0].filename : 'default-banner.jpg';
        let avatarFullPath = (files.profileImage) ? req.files.profileImage[0].path : '';
        let bannerFullPath = (files.bannerImage) ? req.files.bannerImage[0].path : '';

        let user = {
            id: uuidv4(),
            accCreationDate: new Date().toISOString().slice(0, 10),
            name: userData.name,
            username: userData.username,
            password: userData.password,
            avatarImageName: profileImageName,
            bannerName: bannerImageName,
            avatarPath: avatarFullPath,
            bannerPath: bannerFullPath,
            email: userData.email,
            address: userData.address,
            birthdate: userData.birthdate,
            role: userData.role,
            gender: userData.gender,
            country: userData.country,
            interests: userData.interest
        };
        fileOperation.addToFile(user, allUsersFile);
        res.redirect('/users/login');
    },
    editIndex: function(req, res) {
        // Update de los datos de los archivos
        let errorMsg = '';
        const id = req.params.id;
        const users = fileOperation.readFile(allUsersFile);
        activeUser = fileOperation.readFile(activeUserFile);

        let editUser = userFunction.getUserById(users, id);

        res.render('./users/user-edit', {
            errorMsg : errorMsg,
            users: users, // Se usa para el nav-bar
            activeUser: activeUser, // Se usa para el nav-bar
            editUser: editUser
        });
    },
    editUser: function(req, res) {
        let errorMsg = '';
        const files = req.files; 
        const id = req.params.id; // Id del usuario a modificar.
        const data = req.body; // Datos recibidos del form de edicion.

        const activeUser = fileOperation.readFile(activeUserFile);
        const allUsers = fileOperation.readFile(allUsersFile); 
        const editUser = userFunction.getUserById(allUsers, id); 

        if (!(req.validProfileExtension && req.validBannerExtension)) {
            errorMsg = "Archivo de imagen no valido!";
            res.render('./users/user-edit', {
                editUser : editUser,
                errorMsg : errorMsg,
                activeUser: activeUser
            });
            return;
        }

        // Set the profile image name if exists, otherwise set the default image name.
        const profileImageName = (files.profileImage) ? req.files.profileImage[0].filename : editUser.avatarImageName;
        const bannerImageName = (files.bannerImage) ? req.files.bannerImage[0].filename : editUser.bannerName;

        let avatarFullPath = (files.profileImage) ? req.files.profileImage[0].path : '';
        let bannerFullPath = (files.bannerImage) ? req.files.bannerImage[0].path : '';

        let modifiedUser = {
            id: editUser.id,
            accCreationDate: editUser.accCreationDate,
            name: data.name,
            username: data.username,
            password: data.password,
            avatarImageName: profileImageName,
            bannerName: bannerImageName,
            avatarPath: avatarFullPath,
            bannerPath: bannerFullPath,
            email: data.email,
            address: data.address,
            birthdate: data.birthdate,
            role: data.role,
            gender: data.gender,
            country: data.country,
            interests: data.interest
        };

        if (activeUser.id == id)  fileOperation.writeActiveUser(modifiedUser, activeUserFile); // Actualizo el archivo active-user
        // Elimino del servidor las anteriores imagenes del usuario en caso de que este haya subido unas nuevas.
        const profilePath = path.join(__dirname, '../../public/images/users/profiles/' + editUser.avatarImageName);
        const bannerPath = path.join(__dirname, '../../public/images/users/banners/' + editUser.bannerName);
        if (profileImageName != editUser.avatarImageName) userFunction.removeImage(profilePath);
        if (bannerImageName != editUser.bannerName) userFunction.removeImage(bannerPath);
        
        
        // Creo un nuevo array sin el elemento modificado.
        let updatedArray = userFunction.removeUserFromArray(allUsers, id);
        updatedArray.push(modifiedUser);
        fileOperation.writeFile(updatedArray, allUsersFile);

        if (editUser.role == 'admin') {
            res.redirect('/users/list');
            return;
        }
        res.redirect('/');
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
            res.redirect('/users/login');
        } else {
            res.redirect('/users/list');
        }

        // Remove image files.
        userFunction.removeUserProfileBannerImage(allUsers, id);
    },
    logout: function(req, res) {
        const user = {};
        fileOperation.writeActiveUser(user, activeUserFile); // Borro el usuario del archivo active-user.json
        res.redirect('/users/login');
    },
    search: function(req, res) {
        users = fileOperation.readFile(allUsersFile);
        let userSearch = req.query.search;
        let userResults = []

        for (let i = 0; i < users.length; i++) {
            if (users[i].username.toLowerCase().includes(userSearch.toLowerCase()) || users[i].name.toLowerCase().includes(userSearch.toLowerCase())) {
                userResults.push(users[i])
            }
        }
        
        res.render('./users/user-list', {
            filter : '',
            users: userResults,
            activeUser: activeUser
        });
    },
    filter: function(req, res) {
        const filter = req.query.filter;

        users = fileOperation.readFile(allUsersFile);
        
        let userResults = [];
        switch (filter) {
            case 'all':
                userResults = users;
                break;
            case 'id':
                userResults = userFunction.getUsersOrderedById(users);
                break;
            case 'role':
                userResults = userFunction.getUsersOrderedByRole(users);
                break;
            case 'name':
                userResults = userFunction.getUsersOrderedByName(users);
                break;
            case 'country':
                userResults = userFunction.getUsersOrderedByCountry(users);
                break;
            default:
                res.send("Error");
        }

        res.render('./users/user-list', {
            filter : filter,
            users : userResults,
            activeUser: activeUser
        });
    }
};

module.exports = usersController;