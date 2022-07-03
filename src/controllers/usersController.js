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
        res.render('./users/user-list');
    },
    createUser: function(req, res) {
        let user = {
            id: uuidv4(),
            accCreationDate: new Date().toISOString().slice(0, 10),
            name: req.body.name,
            username: req.body.username,
            avatar: "",
            banner: "",
            email: req.body.email,
            address: req.body.address,
            birthdate: req.body.birthdate,
            role: req.body.role,
            gender: req.body.gender,
            country: req.body.country,
            interests: req.body.interest
        };
        res.send(user);
    }
};

module.exports = usersController;