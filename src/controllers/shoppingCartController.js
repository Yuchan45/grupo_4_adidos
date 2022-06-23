const shoppingCartController = {
    landing: function(req, res) {
        //res.sendFile('shopping-cart.html', {root: './src/views/'});
        res.render('shopping-cart');
    }
};

module.exports = shoppingCartController;