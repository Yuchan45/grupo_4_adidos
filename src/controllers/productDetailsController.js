const prodDetailsController = {
    landing: function(req, res) {
        //res.sendFile('product-details.html', {root: './src/views/'});
        res.render('product-details');
    }
};

module.exports = prodDetailsController;