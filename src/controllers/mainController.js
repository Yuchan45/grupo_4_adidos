const path = require('path');
const { v4: uuidv4 } = require('uuid');
const shopCartSneakers = require('../data/shopCartSneakers');
const Product = require('../modules/Products');

// Sequelize
const db = require('../database/models');
const Products = db.Product;
const Brands = db.Brand;
const Categories = db.Category;
const ShoppingCarts = db.Shopping_cart;
const Items = db.Item;



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
        if (!req.session.userLogged) return res.redirect('/users/login');
        const userId = req.session.userLogged.id;

        const products = await Products.findAll({
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}, {association: "favUsers"}] 
        });

        const shoppingCart = await ShoppingCarts.findOne({
            where: {
                user_id: userId,
                status: 1
            }
        });

        const shoppingCartId = shoppingCart.id;
        const items = await Items.findAll({
            where: {
                shopping_cart_id: shoppingCartId
            }
        }, {
            include: [{association: ""}, {association: ""}, {association: ""}, {association: ""}] 
        });


        res.render('shopping-cart', {
            products: products
        });
    },
    addShoppingCart: async (req, res) => {
        if (!req.session.userLogged) return res.redirect('/users/login');
        const userId = req.session.userLogged.id;
        const prodId = req.params.id;
        const prodData = req.body;

        // Cuando el usuario haga click en "Finalizar compra", ahi cambio el status del carrito a 'effective' y listo.

        const carritos = await ShoppingCarts.findAll({
            where: {
                user_id: userId
            }
        });

        // Detalles de estados:
        // '-1' -> Este usuario no tiene carritos (sean activos o cerrados).
        // '0'  -> Este usuario no tiene carritos ACTIVOS.
        // 'Objeto carrito'  -> Este usuario tiene un carrito ACTIVO.

        const resultStatus = Product.shoppingCartStatus(carritos);
        let shoppingCart = '';
        if (resultStatus == -1 || resultStatus == 0) {
            // Hay que crear un carrito nuevo xq no hay carritos activos.
            const transactionNumber = parseInt(Date.now().toString().slice(5));
            const data = {
                user_id: userId,
                transaction_number: transactionNumber, 
                status: 1
            };

            shoppingCart = await Product.createShoppingCartDb(data);
            if (!shoppingCart) return res.send("Ha ocurrido un error al crear el carrito de compras");
            console.log("Shopping cart CREADO " + shoppingCart.id);
        } else {
            // Hay que buscar el carrito activo.
            shoppingCart = await ShoppingCarts.findAll({
                where: {
                    user_id: userId
                }
            });
            console.log("Shopping cart ENCONTRADO" + shoppingCart.id);
        }


        // Tengo que crear el item (la instancia del producto con quantity, precio congelado y fecha de agregado).
        const prodToAdd = await Products.findByPk(prodId);
        if (!prodToAdd) return res.send("Error al cargar el producto al carrito :(");

        const shoppingCartId = shoppingCart.id;
        const itemData = {
            shopping_cart_id: shoppingCartId,
            product_id: prodId,
            quantity: 1, // POR AHORA LO VAMOS A DEJAR ASI...
            purchase_value: prodToAdd.price
        };

        const createdItem = Product.createItemsDb(itemData);
        if (!createdItem) return res.send("Error al crear el item :(");

        return res.redirect('/shopping-cart');
    }
};

module.exports = mainController;