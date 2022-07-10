const path = require('path');
const userCrud = require('./usersModules/fileControl');
const { v4: uuidv4 } = require('uuid');

const sneakersData = require('../data/sneakers');

const productsController = {
    allProducts: function(req, res) {
        res.render('./products/all-products', {sneakers: sneakersData});
    },
    editProduct: function(req, res) {
        res.render('./products/editProducts');
    },
    obtenerPorId: (req, res) => {
        const productId = parseInt(req.params.id, 10);
        let productoEncontrado; 

        for (let i = 0; i < sneakersData.length; i++) {
            if ( sneakersData[i].id === productId ) {
                productoEncontrado = sneakersData[i];
            }
        }
        
        if (!productoEncontrado){
            res.status(404).send("No se encuentra el producto");
        } else {
            res.render('./products/product-details',  {
                sneakerEncontrado: productoEncontrado, 
                sneakers: sneakersData
            });
        }
    },
    create: function(req, res) {
        res.render('./products/createProduct')
    },
    createproduct: function(req,res){
        const newProduct={
            id: uuidv4(), //ver
            accCreationDate: new Date().toISOString().slice(0, 10), //ver
            id: req.body.id, //ver
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            descount: req.body.descount,
            image: req.body.image,
            category: req.body.category,
            brand: req.body.brand,
            color: req.body.color,
            cellphone: req.body.cellphone,
            gender: req.body.gender
        };
        //guardarla
        res.render("./products/createProduct", { newProduct : newProduct});
        newProductCrud.saveProduct(newProduct); // ver
        res.redirect('/products/create')
    },
    productList: function(req,res){
        const users = require('../data/newProduct.json');
        res.render('./products/productsList', {newProducts: newProducts});
    },
};

module.exports = productsController;