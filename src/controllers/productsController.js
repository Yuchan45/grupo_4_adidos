const path = require('path');
const { v4: uuidv4 } = require('uuid');

const fileOperation = require('../middlewares/modules/fileControl');
const userFunction = require('../middlewares/modules/userFunction');
const newProductCrud = require('./usersModules/productControl');

const sneakersData = require('../data/sneakers');
const newProducts = path.join(__dirname, '../data/newProduct.json')
const activeUserFile = path.join(__dirname, '../data/active-user.json');
const activeUser = fileOperation.readFile(activeUserFile);

const productsController = {
    
    allProducts: function (req, res) {
        res.render('./products/all-products', { 
            sneakers: sneakersData,
            newProducts: newProducts,
            activeUser: activeUser
        });
    },
    editProduct: function (req, res) {
        res.render('./products/editProducts', {
            activeUser: activeUser
        });
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
            res.render('./products/product-details',  {
                sneakerEncontrado: productoEncontrado, 
                sneakers: sneakersData,
                activeUser: activeUser
            });
        }
    },
    create: function (req, res) {
        res.render('./products/createProduct', {
            activeUser : activeUser
        })
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
    search: function(req, res) {
        const activeUser = fileOperation.readFile(activeUserFile);
        let userSearch = req.query.search;
        let productsResults = []
        for (let i = 0; i < sneakersData.length; i++) {
            if ( sneakersData[i].brand.toLowerCase().includes(userSearch.toLowerCase())) {
                productsResults.push(sneakersData[i])
            }
        }
        res.render('./products/all-products', {
            sneakers : productsResults,
            newProducts : newProducts,
            activeUser : activeUser
        })
    },
    deleteProduct: function (req, res) {

        //  const id = req.params.id;

        if (!req.params.id) return;
        const id = req.params.id;
        let products = fileOperation.readFile(newProducts);

        let newArray = userFunction.removeUserFromArray(products, id);
        fileOperation.writeFile(newArray, newProducts);

        if (newProducts.id == id) {
            fileOperation.writeActiveUser({}, newProducts); // Limpio el archivo active-user
            res.redirect('/products');
        }
        res.redirect('/products');
    }
};

module.exports = productsController;