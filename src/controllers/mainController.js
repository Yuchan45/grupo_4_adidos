const sneakersData = require('../data/sneakers');

const mainController = {
    landing: function(req, res) {
        //res.sendFile('home.ejs', {root: './src/views/'});
        res.render('home', {sneakers: sneakersData});
    }
};

module.exports = mainController;