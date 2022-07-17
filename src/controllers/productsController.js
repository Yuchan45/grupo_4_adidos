const path = require('path');
const { v4: uuidv4 } = require('uuid');

const fileOperation = require('../middlewares/modules/fileControl');
const userFunction = require('../middlewares/modules/userFunction');

const sneakersData = require('../data/sneakers');
const allShoesPath = path.join(__dirname, '../data/products.json');
const allShoes = fileOperation.readFile(allShoesPath);
const activeUserFile = path.join(__dirname, '../data/active-user.json');
const activeUser = fileOperation.readFile(activeUserFile);

const productsController = {
    
    allProducts: function (req, res) {
        updateProducts = fileOperation.readFile(allShoesPath);
        res.render('./products/all-products', { 
            trendingSneakers: sneakersData,
            products: updateProducts,
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
                trendingSneakers: sneakersData,
                activeUser: activeUser
            });
        }
    },
    create: function (req, res) {
        res.render('./products/createProduct', {
            activeUser : activeUser
        })
    },
    // productList: function (req, res) {
    //     res.render('./products/productsList', { products: allShoes });
    // },
    createProduct: function (req, res) {
        console.log("Entre al controller del create prods POST")
        const file = req.file;
        const product = req.body;

        const newProduct = {
            id: uuidv4(),
            prodCreationDate: new Date().toISOString().slice(0, 10), //dia que cree producto
            // productOwner:  
            brand: product.brand,
            model: product.model,
            category: product.category,
            description: product.description,
            price: product.price,
            discount: product.discount,
            image: file.filename,
            color: product.color,
            gender: product.gender,
            stock: product.stock
        };
        
        fileOperation.addToFile(newProduct, allShoesPath);
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
            trendingSneakers : productsResults,
            products : allShoes,
            activeUser : activeUser
        })
    },
    deleteProduct: function (req, res) {

        //  const id = req.params.id;

        if (!req.params.id) return;
        const id = req.params.id;
        let products = fileOperation.readFile(allShoes);

        let newArray = userFunction.removeUserFromArray(products, id);
        fileOperation.writeFile(newArray, allShoes);

        if (allShoes.id == id) {
            fileOperation.writeActiveUser({}, allShoes); // Limpio el archivo active-user
            res.redirect('/products');
        }
        res.redirect('/products');
    }
};

module.exports = productsController;