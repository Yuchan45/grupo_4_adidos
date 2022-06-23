const allProductsController = {
    landing: function(req, res) {
        //res.sendFile('all-products.html', {root: './src/views/'});
        res.render('all-products');
    }
};

module.exports = allProductsController;

