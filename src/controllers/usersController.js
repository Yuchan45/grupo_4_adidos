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
    }
};

module.exports = usersController;