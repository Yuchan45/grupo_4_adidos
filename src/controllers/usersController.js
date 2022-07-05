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
        const files = req.files;

        const profileName = (files.profileImage) ? req.files.profileImage[0].filename : '';
        const bannerName = (files.bannerImage) ? req.files.bannerImage[0].filename : '';

        let profileImageName = (profileName) ? profileName : "default.png";
        let bannerImageName = (bannerName) ? bannerName : "default-banner.png";

        // DataType Validation.
        let ext = path.extname(profileImageName);
        let ext2 = path.extname(bannerImageName);
        if (ext != '.png' && ext != '.jpg' && ext != '.jpeg') {
            console.log("Archivo de imagen de perfil no valido!");
            res.redirect('/user/register');
            return;
        }
        if (ext2 != '.png' && ext2 != '.jpg' && ext2 != '.jpeg') {
            console.log("Archivo de imagen del banner no valido!");
            res.redirect('/user/register');
            return;
        }

        let user = {
            id: uuidv4(),
            accCreationDate: new Date().toISOString().slice(0, 10),
            name: req.body.name,
            username: req.body.username,
            avatarImageName: profileImageName,
            bannerName: bannerImageName,
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