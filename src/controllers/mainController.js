const path = require('path');
const { v4: uuidv4 } = require('uuid');
const shopCartSneakers = require('../data/shopCartSneakers');
const Product = require('../modules/Products');

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
        const userId = req.session.userLogged.id;
        const prodId = req.params.id;

        // Cuando el usuario haga click en "Finalizar compra", ahi cambio el status del carrito a 'effective' y listo.




        const transactionNumber = parseInt(Date.now().toString().slice(5));
        const data = {
            user_id: userId,
            transaction_number: transactionNumber, 
            status: 1
        };

        const createdShoppingCart = Product.createShoppingCartDb(data);
        if (!createdShoppingCart) return res.send("Ha ocurrido un error al crear el carrito de compras");

        // Tengo que crear el item (la instancia del producto con quantity, precio congelado y fecha de agregado).
        // Me traigo el ultimo shopping cart


        // const itemData = {
        //     shopping_cart_id: ,
        //     product_id: ,
        //     quantity: ,
        //     purchase_value: ,

        // };



        return res.send("Añadir al carrito");
    }
};

module.exports = mainController;