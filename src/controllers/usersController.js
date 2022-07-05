const path = require('path');
const userCrud = require('./usersModules/fileControl');
const { v4: uuidv4 } = require('uuid');

const usersController = {
    login: function(req, res) {
        res.render('./users/login-form');
    },
    register: function(req, res) {
        res.render('./users/register-form');
    },
    recover: function(req, res) {
        res.render('./users/recover');
    },
    list: function(req, res) {
        const users = require('../data/users.json');
        res.render('./users/user-list', {users: users});
    },
    createUser: function(req, res) {
        let profileImage = '';
        const file = req.file;

        profileImage = (file) ? req.file.filename : "default.png";

        // DataType Validation.
        let ext = path.extname(profileImage);
        if (ext != '.png' && ext != '.jpg' && ext != '.jpeg') {
            console.log("Archivo de imagen no valido!");
            res.redirect('/user/register');
            return;
        }

        let user = {
            id: uuidv4(),
            accCreationDate: new Date().toISOString().slice(0, 10),
            name: req.body.name,
            username: req.body.username,
            avatarImageName: profileImage,
            bannerName: "",
            email: req.body.email,
            address: req.body.address,
            birthdate: req.body.birthdate,
            role: req.body.role,
            gender: req.body.gender,
            country: req.body.country,
            interests: req.body.interest
        };
        userCrud.saveUser(user);
        res.redirect('/user/list');
    }
};

module.exports = usersController;