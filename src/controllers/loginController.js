const loginController = {
    landing: function(req, res) {
        //res.sendFile('login-form.html', {root: './src/views/'});
        res.render('login-form');
    }
};

module.exports = loginController;