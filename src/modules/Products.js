// Sequelize
const db = require('../database/models');
const sequelize = db.sequelize;
//Otra forma de llamar a los modelos
const Products = db.Product;
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


}

module.exports = Product;