const registerController = {
    landing: function(req, res) {
        res.sendFile('register-form.html', {root: './src/views/'});
    }
};

module.exports = registerController;