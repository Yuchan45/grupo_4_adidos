const path = require('path');
const fileOperation = require('./controllerModules/fileControl');
const userFunction = require('./controllerModules/userFunction');
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

        let avatarFullPath = (files.profileImage) ? req.files.profileImage[0].path : '';
        let bannerFullPath = (files.bannerImage) ? req.files.bannerImage[0].path : '';

        // DataType Validation.
        const validProfileExtension = userFunction.extensionValidation(path.extname(profileImageName));
        const validBannerExtension = userFunction.extensionValidation(path.extname(bannerImageName));   

        if (!(validProfileExtension && validBannerExtension)) {
            errorMsg = "Archivo de imagen no valido!";
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
        fileOperation.addUserToFile(user, allUsersFile);
        // fileOperation.writeActiveUser(user, activeUserFile); No lo puedo logear, que se loguee denuevo
        res.redirect('/user/login');
    },
    editIndex: function(req, res) {
        // Update de los datos de los archivos
        const id = req.params.id;
        const users = fileOperation.readFile(allUsersFile);
        activeUser = fileOperation.readFile(activeUserFile);

        let editUser = userFunction.getUserById(users, id);

        res.render('./users/user-edit', {
            users: users, // Se usa para el nav-bar
            activeUser: activeUser, // Se usa para el nav-bar
            editUser: editUser
        });
    },
    editUser: function(req, res) {
        const files = req.files; 
        const id = req.params.id; // Id del usuario a modificar.
        const data = req.body; // Datos recibidos del form de edicion.

        const activeUser = fileOperation.readFile(activeUserFile);
        const allUsers = fileOperation.readFile(allUsersFile); // Array de todos los usuarios en la base de datos
        const editUser = userFunction.getUserById(allUsers, id); // Busco al usuario de la database cuya id corresponda con la que se esta modificando.

        // Set the profile image name if exists, otherwise set the default image name.
        const profileName = (files.profileImage) ? req.files.profileImage[0].filename : '';
        const bannerName = (files.bannerImage) ? req.files.bannerImage[0].filename : '';

        const profileImageName = (profileName) ? profileName : editUser.avatarImageName;
        const bannerImageName = (bannerName) ? bannerName : editUser.bannerName;

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

        res.redirect('/user/list');
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