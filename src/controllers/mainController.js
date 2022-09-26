const path = require('path');
const sliderSneakers = require('../data/sneakers');
const shopCartSneakers = require('../data/shopCartSneakers');
const fileOperation = require('../modules/fileControl');

// Sequelize
const db = require('../database/models');
const Products = db.Product;
const Brands = db.Brand;
const Categories = db.Category;



const mainController = {
    index: async function(req, res) {
        const products = await Products.findAll({
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}] 
        });

        res.render('home', {
            products: products,
        });
        
    },
    shoppingCart: async function(req, res) {
        const products = await Products.findAll({
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}] 
        });
        
        let total = 0;
        for (let i=0; i<shopCartSneakers.length; i++) {
            total += shopCartSneakers[i].price;
        }
        res.render('shopping-cart', {
            products: products,
            shopCartSneakers: shopCartSneakers,
            total: total,
            user: req.session.userLogged
        });
    }
};

module.exports = mainController;