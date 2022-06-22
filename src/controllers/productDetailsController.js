const prodDetailsController = {
    landing: function(req, res) {
        res.sendFile('product-details.html', {root: './src/views/'});
    }
};

module.exports = prodDetailsController;