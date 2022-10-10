// Sequelize
const db = require('../database/models');
const sequelize = db.sequelize;
//Otra forma de llamar a los modelos
const Products = db.Product;
const Favorites = db.Favorite;
const ShoppingCarts = db.Shopping_cart;
const Items = db.Item;
const path = require('path');

const Product = {
    getDateTime: function() {
        // Returns current Date and Time as YYYY-MM-DD hh:mm:ss
        let date_ob = new Date();
        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();

        // prints date & time in YYYY-MM-DD HH:MM:SS format
        return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    },
    createProductDb: async function(prodData) {
        const createdUser = await Products.create({ 
            ...prodData,
            creation_date: this.getDateTime(),
            last_updated: this.getDateTime()
        });
        return createdUser;
    },
    editProductDb: async function(prodData, id) {
        const updatedProd = await Products.update({ 
            ...prodData,
            creation_date: this.getDateTime(),
            last_updated: this.getDateTime()
        }, {
            where: {
                id: id
            }
        });
        
        return updatedProd;
    },
    createFavoriteDb: async function(favData) {
        const createdFavorite = await Favorites.create({ 
            ...favData,
        });
        return createdFavorite;
    },
    createShoppingCartDb: async function(data) {
        const createdShoppingCart = await ShoppingCarts.create({ 
            ...data
        });
        return createdShoppingCart;
    },
    createItemsDb: async function(itemData) {
        const createdItem = await Items.create({
            ...itemData,
            purchase_date: this.getDateTime(),
        });
        return createdItem;

    },
    shoppingCartStatus: function(carts) {
        // Recibe por parametro un array de carritos. Devuelve...
        // '-1' -> Este usuario no tiene carritos (sean activos o cerrados).
        // '0'  -> Este usuario no tiene carritos ACTIVOS.
        // 'Objeto carrito'  -> Este usuario tiene un carrito ACTIVO.

        let result = 0;
        if (carts.length > 0) {
            // Ya hay un carrito para este usuario (sea activo o no).
            carts.forEach(cart => {
                if (cart.status == 1) {
                    // Verifico si el carrito es activo o no. Status: (0 = 'pending', 1 = 'effective').
                    result = cart;
                }
            });
        } else {
            // No hay carrito activo para este usuario. Hay que crear uno.
            result = -1;
        }
        return result;
    }

}

module.exports = Product;