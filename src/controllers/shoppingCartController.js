const shoppingCartController = {
    landing: function(req, res) {
        res.sendFile('shopping-cart.html', {root: './src/views/'});
    }
};

module.exports = shoppingCartController;