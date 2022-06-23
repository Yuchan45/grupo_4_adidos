const mainController = {
    landing: function(req, res) {
        //res.sendFile('home.ejs', {root: './src/views/'});
        res.render('home');
    }
};

module.exports = mainController;