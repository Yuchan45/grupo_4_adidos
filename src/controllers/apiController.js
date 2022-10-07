const db = require('../database/models')
const DB = require('../database/models')
const usersController = require('./usersController')
const Op = DB.sequelize.Op

const Products = db.Product;
const Brands = db.Brand;
const Categories = db.Category;
const ShoppingCarts = db.Shopping_cart;
const Items = db.Item;


module.exports = {
    userList : (req, res) => {
        DB.User
            .findAll()
            .then(users => {
                return res.json({
                    count: users.length,
                    data: users
                })
            })
    },
    userListId : (req, res) => {
        DB.User
            .findByPk(req.params.id, {
                attributes: {exclude: ['password']}
            })
            .then(users => {
                return res.json({
                    count: users.lenght,
                    data: users
                })
            })
    },

    productList : async (req, res) => {
        let countByBrands = {};
        let brandsArray = [];

        const brands = await Brands.findAll();
        brands.forEach(brand => {
            brandsArray.push(brand.name);
        });

        const products = await Products.findAll({
            include: [{association: "brands"}] 
        });

        for (let i=0; i<brandsArray.length; i++) {
            let count = 0;
            for (let j=0; j<products.length; j++) {
                if (products[j].brands.name == brandsArray[i]) {
                    let marca = products[j].brands.name;
                    count += 1;
                    countByBrands[marca] = count;
                }
            }
        }

        console.log(countByBrands);

        const productos = await Products.findAll();
        return res.json({
            count: productos.length,
            countByBrands,
            data: productos
        });
    },


    productListId : (req, res) => {
        DB.Product
            .findByPk(req.params.id)
            .then(products => {
                return res.json({
                    count: products.lenght,
                    data: products
                })
            })
    }
    
}