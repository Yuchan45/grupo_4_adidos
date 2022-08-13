const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const fileOperation = require('../modules/fileControl');
const userFunction = require('../modules/userFunction');
const { v4: uuidv4 } = require('uuid');
const User = require('../modules/User');

const allUsersFile = path.join(__dirname, '../data/users.json');


const usersController = {
    login: function(req, res) {
        res.render('./users/login-form', {
            old : '',
            errors : '',
            user: req.session.userLogged
        });
    },
    loginProcess: function(req, res) {      
        const user = req.body;

        const userToLogin = User.findByField('email', (user.email).toLowerCase());
        if (userToLogin) {
            const isPswCorrect = bcrypt.compareSync(user.password, userToLogin.password);
            if (isPswCorrect) {
                delete userToLogin.password; // Borramos la propiedad password por temas de seguridad.
                req.session.userLogged = userToLogin;
                return res.redirect('/');
            }     
        }
        
        return res.render('./users/login-form', {
            old: user,
            errors : {
                loginFailed: {
                    msg: 'Las credenciales son invalidas!'
                }
            },
        });

    },
    register: function(req, res) {
        res.render('./users/register-form', {
            oldData : '',
            errorMsg : '',
            user: req.session.userLogged
        });
    },
    recover: function(req, res) {
        res.render('./users/recover', {

        });
    },
    list: function(req, res) {
        // Update de los datos de los archivos
        const users = fileOperation.readFile(allUsersFile);
        res.render('./users/user-list', {
            filter : '',
            users: users,
            user: req.session.userLogged
        });
    },
    // createUser: function(req, res, next) {
    //     let errors = validationResult(req);
    //     //console.log(errors);
    //     if (errors.isEmpty()){
    //         console.log("Todo valido");
    //     } else {
    //         console.log(errors.mapped());
    //     }

    //     let errorMsg = '';
    //     // let activeUser = fileOperation.readFile(activeUserFile);

    //     const files = req.files;
    //     const userData = req.body;

    //     if (!(req.validProfileExtension && req.validBannerExtension)) {
    //         errorMsg = "Archivo de imagen no valido!";
    //         res.render('./users/register-form', {
    //             oldData : req.body,
    //             errorMsg : errorMsg,
    //             activeUser: req.session.activeUser
    //         });
    //         return;
    //     }

    //     // No valido si el usuario sube o no archivos porque no es obligatorio establecer una foto de perfil.    
    //     // Set the profile image name if exists, otherwise set the default image name.
    //     const profileImageName = (files.profileImage) ? req.files.profileImage[0].filename : 'default.jpg';
    //     const bannerImageName = (files.bannerImage) ? req.files.bannerImage[0].filename : 'default-banner.jpg';
    //     let avatarFullPath = (files.profileImage) ? req.files.profileImage[0].path : '';
    //     let bannerFullPath = (files.bannerImage) ? req.files.bannerImage[0].path : '';

    //     let user = {
    //         id: uuidv4(),
    //         accCreationDate: new Date().toISOString().slice(0, 10),
    //         name: userData.name,
    //         username: userData.username,
    //         //password: userData.password,
    //         password: bcrypt.hashSync(userData.password, 10),
    //         avatarImageName: profileImageName,
    //         bannerName: bannerImageName,
    //         avatarPath: avatarFullPath,
    //         bannerPath: bannerFullPath,
    //         email: userData.email,
    //         address: userData.address,
    //         birthdate: userData.birthdate,
    //         role: userData.role,
    //         gender: userData.gender,
    //         country: userData.country,
    //         interests: userData.interest
    //     };
    //     fileOperation.addToFile(user, allUsersFile);
    //     res.redirect('/users/login');
    // },
    processRegister: function(req, res) {
        const files = req.files;
        let user = req.body;
        let errors = validationResult(req);

        if (!errors.isEmpty()){
            console.log("Error encontrado por express-Validator");
            console.log(errors)
            return res.render('./users/register-form', {
                errorMsg: errors.mapped(),
                oldData: user
            });
        }

        const emailInDb = User.findByField('email', user.email);
        const usernameInDb = User.findByField('username', user.username);

        if (emailInDb) {
            return res.render('./users/register-form', {
                // Arreglar para que dsp si se vea bien el error.
                errorMsg: {
                    email: {
                        msg: 'Este email ya esta registrado!'
                    }
                },
                oldData: user
            });
        }

        const profileImageName = (files.profileImage) ? req.files.profileImage[0].filename : 'default.jpg';
        const bannerImageName = (files.bannerImage) ? req.files.bannerImage[0].filename : 'default-banner.jpg';

        let dataUser = {
            ...user,
            email: user.email.toLowerCase(),
            password: bcrypt.hashSync(user.password, 10),
            avatar: profileImageName,
            banner: bannerImageName
        }

        const userCreated = User.create(dataUser);
        res.redirect('/users/login');

    },
    editIndex: function(req, res) {
        // Update de los datos de los archivos
        let errorMsg = '';
        const id = req.params.id;
        const users = fileOperation.readFile(allUsersFile);

        let editUser = userFunction.getUserById(users, id);

        res.render('./users/user-edit', {
            errorMsg : errorMsg,
            user: req.session.userLogged, // Se usa para el nav-bar
            editUser: editUser,
        });
    },
    editUser: function(req, res) {
        let errorMsg = '';
        const files = req.files; 
        const id = req.params.id; // Id del usuario a modificar.
        const data = req.body; // Datos recibidos del form de edicion.

        // const activeUser = fileOperation.readFile(activeUserFile);
        const allUsers = fileOperation.readFile(allUsersFile); 
        const editUser = userFunction.getUserById(allUsers, id); 

        if (!(req.validProfileExtension && req.validBannerExtension)) {
            errorMsg = "Archivo de imagen no valido!";
            res.render('./users/user-edit', {
                editUser : editUser,
                errorMsg : errorMsg,
                user: req.session.userLogged
            });
            return;
        }

        // Set the profile image name if exists, otherwise set the previous image name.
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
        // return res.send(modifiedUser);
        // Actualizo el usuario activo en el session.
        req.session.userLogged = modifiedUser;

        // if (activeUser.id == id)  fileOperation.writeActiveUser(modifiedUser, activeUserFile); // Actualizo el archivo active-user
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
            req.session.activeUser = {};
            res.redirect('/users/login');
        } else {
            // Esto es por si en algun momento pinta poder borrar otros usuarios que no sean nuestros xdxd
            req.session.activeUser = {}; 
            res.redirect('/users/login');
        }

        // Remove image files.
        userFunction.removeUserProfileBannerImage(allUsers, id);
    },
    logout: function(req, res) {
        const user = {};
        // fileOperation.writeActiveUser(user, activeUserFile); // Borro el usuario del archivo active-user.json
        req.session.userLogged = {}; 
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
            user: req.session.userLogged
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
            user: req.session.userLogged
        });
    }
};

module.exports = usersController;