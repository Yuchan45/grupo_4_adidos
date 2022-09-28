const path = require('path');
const shopCartSneakers = require('../data/shopCartSneakers');

// Sequelize
const db = require('../database/models');
const Products = db.Product;
const Brands = db.Brand;
const Categories = db.Category;



const mainController = {
    index: async function(req, res) {
        const products = await Products.findAll({
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}, {association: "favUsers"}] 
        });

        res.render('home', {
            products: products,
        });
        
    },
    shoppingCart: async function(req, res) {
        const products = await Products.findAll({
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}, {association: "favUsers"}] 
        });
        
        let total = 0;
        for (let i=0; i<shopCartSneakers.length; i++) {
            total += shopCartSneakers[i].price;
        }
        res.render('shopping-cart', {
            products: products,
            shopCartSneakers: shopCartSneakers,
            total: total,
        });
    },
    addShoppingCart: async (req, res) => {
        if (!req.session.userLogged) return res.redirect('/users/login');

        // Tengo que crear el carrito vacio (con nro de orden y status(inicialmente pending))
        
        // Tengo que crear el item (la instancia del producto con quantity, precio congelado y fecha de agregado).




        return res.send("Añadir al carrito");
    }
};

module.exports = mainController;