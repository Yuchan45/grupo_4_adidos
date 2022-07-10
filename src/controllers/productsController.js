const path = require('path');
const newProductCrud = require('./usersModules/productControl');
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
    createProduct: function(req,res){
        const file = req.file;
        res.send(file.filename)
        //agregar validar error
        // DataType Validation.
       let ext = path.extname(profileImage);
        if (ext != '.png' && ext != '.jpg' && ext != '.jpeg') {
            console.log("Archivo de imagen no valido!");
            res.redirect('/products/list');
            return;
        }
        const newProduct={
            id: uuidv4(), //ver
            prodCreationDate: new Date().toISOString().slice(0, 10), //dia que cree producto
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            descount: req.body.descount,
            image: file.filename,
            category: req.body.category,
            brand: req.body.brand,
            color: req.body.color,
            cellphone: req.body.cellphone,
            gender: req.body.gender
        };
        res.send(newProduct)
        newProductCrud.saveUser(newProduct); // ver
        res.render("./products/createProduct", { newProduct : newProduct});
        res.redirect('/products/list')
    },
    productList: function(req,res){
        const users = require('../data/newProduct.json');
        res.render('./products/productsList', {newProducts: newProducts});
    },
    deleteProduct: function(req, res) {
        
    },
    
};

module.exports = productsController;