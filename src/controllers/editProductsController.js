const editProductsController = {
    landing: function(req, res) {
        //res.sendFile('editProducts.html', {root: './src/views/'});
        res.render('editProducts');
    }
};

module.exports = editProductsController;