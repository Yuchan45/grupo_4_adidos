const mainController = {
    landing: function(req, res) {
        res.sendFile('home.html', {root: './src/views/'});
    }
};

module.exports = mainController;