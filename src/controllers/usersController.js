const usersController = {
    login: function(req, res) {
        res.render('login-form');
    },
    register: function(req, res) {
        res.render('register-form');
    },
    recover: function(req, res) {
        res.render('recover');
    }
};

module.exports = usersController;