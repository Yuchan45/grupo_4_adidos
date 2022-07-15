const path = require('path');
const newProductCrud = require('./usersModules/productControl');
const { v4: uuidv4 } = require('uuid');

const allProductsFile = path.join(__dirname, '../data/newProduct.json');
const sneakersData = require('../data/sneakers');
const newProducts = require('../data/newProduct.json')
const { profile } = require('console');

const productsController = {
    allProducts: function (req, res) {
        res.render('./products/all-products', { sneakers: sneakersData, newProducts: newProducts });
    },
    editProduct: function (req, res) {
        res.render('./products/editProducts');
    },
    obtenerPorId: (req, res) => {
        const productId = parseInt(req.params.id, 10);
        let productoEncontrado;

        for (let i = 0; i < sneakersData.length; i++) {
            if (sneakersData[i].id === productId) {
                productoEncontrado = sneakersData[i];
            }
        }

        if (!productoEncontrado) {
            res.status(404).send("No se encuentra el producto");
        } else {
            res.render('./products/product-details', {
                sneakerEncontrado: productoEncontrado,
                sneakers: sneakersData
            });
        }
    },
    create: function (req, res) {
        res.render('./products/createProduct')
    },
    productList: function (req, res) {
        res.render('./products/productsList', { newProducts: newProducts });
    },
    createProduct: function (req, res) {
        let profileImage = '';
        const file = req.file;

        profileImage = (file) ? req.file.filename : "default.png";
        //agregar validar error
        if (!file) {
            const error = new error("Por Favor seleccione un archivo")
            error.httpStatusCode = 400
            return next(error)
        }
        // DataType Validation.
        let ext = path.extname(profileImage);
        if (ext != '.png' && ext != '.JPG' && ext != '.jpeg') {
            console.log("Archivo de imagen no valido!");
            res.redirect('/products/create');
            return;
        }
        const newProduct = {
            id: uuidv4(),
            prodCreationDate: new Date().toISOString().slice(0, 10), //dia que cree producto
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            descount: req.body.descount,
            image: file.filename,
            category: req.body.category,
            brand: req.body.brand,
            color: req.body.color,
            model: req.body.model,
            gender: req.body.gender
        };
        newProductCrud.saveProduct(newProduct); // ver
        res.redirect('/products');
    },
    deleteProduct: function (req, res) {

        //  const id = req.params.id;

        if (!req.params.id) return;
        const id = req.params.id;
        let Products = fileOperation.readFile(newProducts);

        let newArray = userFunction.removeUserFromArray(Products, id);
        fileOperation.writeFile(newArray, newProducts);

        if (newProducts.id == id) {
            fileOperation.writeActiveUser({}, newProducts); // Limpio el archivo active-user
            res.redirect('/products');
        }


        res.redirect('/products');
    }
};

module.exports = productsController;