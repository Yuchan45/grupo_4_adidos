const sliderSneakers = require('../data/sneakers');
const shopCartSneakers = require('../data/shopCartSneakers');
// const sneakers = [sliderSneakers, shopCartSneakers];

const shoppingCartController = {
    landing: function(req, res) {
        //res.sendFile('shopping-cart.html', {root: './src/views/'});
        res.render('shopping-cart', {
            sneakers: sliderSneakers,
            shopCartSneakers: shopCartSneakers
        });
    }
};

module.exports = shoppingCartController;