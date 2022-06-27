const recoverController = {
    landing: function(req, res) {
        //res.sendFile('recover.html', {root: './src/views/'});
        res.render('recover');
    }
};

module.exports = recoverController;