const path = require('path');
const sliderSneakers = require('../data/sneakers');
const shopCartSneakers = require('../data/shopCartSneakers');
const fileOperation = require('./usersModules/fileControl');
const activeUserFile = path.join(__dirname, '../data/active-user.json');

const activeUser = fileOperation.readFile(activeUserFile);

const mainController = {
    index: function(req, res) {
        res.render('home', {
            sneakers: sliderSneakers,
            activeUser: activeUser
        });
    },
    shoppingCart: function(req, res) {
        let total = 0;
        for (let i=0; i<shopCartSneakers.length; i++) {
            total += shopCartSneakers[i].price;
        }
        res.render('shopping-cart', {
            sneakers: sliderSneakers,
            shopCartSneakers: shopCartSneakers,
            total: total,
            activeUser: activeUser
        });
    }
};

module.exports = mainController;