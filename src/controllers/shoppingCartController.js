const sliderSneakers = require('../data/sneakers');
const shopCartSneakers = require('../data/shopCartSneakers');
// const sneakers = [sliderSneakers, shopCartSneakers];

const shoppingCartController = {
    landing: function(req, res) {
        let total = 0;
        for (let i=0; i<shopCartSneakers.length; i++) {
            total += shopCartSneakers[i].price;
        }
        res.render('shopping-cart', {
            sneakers: sliderSneakers,
            shopCartSneakers: shopCartSneakers,
            total: total
        });
    }
};

module.exports = shoppingCartController;