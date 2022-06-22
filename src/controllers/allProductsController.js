const allProductsController = {
    landing: function(req, res) {
        res.sendFile('all-products.html', {root: './src/views/'});
    }
};

module.exports = allProductsController;

