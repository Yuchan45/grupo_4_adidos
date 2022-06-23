const registerController = {
    landing: function(req, res) {
        //res.sendFile('register-form.html', {root: './src/views/'});
        res.render('register-form');
    }
};

module.exports = registerController;