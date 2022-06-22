const loginController = {
    landing: function(req, res) {
        res.sendFile('login-form.html', {root: './src/views/'});
    }
};

module.exports = loginController;