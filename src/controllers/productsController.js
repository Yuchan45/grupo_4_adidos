const path = require('path');
const { v4: uuidv4 } = require('uuid');

const fileOperation = require('../modules/fileControl');
const userFunction = require('../modules/userFunction');
const productFunction = require('../modules/productFunction');
const { validationResult } = require('express-validator');

const Product = require('../modules/Products');
const sneakersData = require('../data/sneakers');
const allShoesPath = path.join(__dirname, '../data/products.json');
const allShoes = fileOperation.readFile(allShoesPath);

// Sequelize
const db = require('../database/models');
const Products = db.Product;
const Brands = db.Brand;
const Categories = db.Category;

const productsController = {  
    allProducts: async function (req, res) {
        const products = await Products.findAll({
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}] 
        });
        res.render('./products/all-products', {
            products: products,
        });
    },
    editProduct: function (req, res) {
        const prodId = req.params.id;
        const allShoes = fileOperation.readFile(allShoesPath);
        let editProduct = productFunction.getProdById(allShoes, prodId);

        res.render('./products/edit-products', {
            user: req.session.userLogged,
            data : editProduct,
            msg : ''
        })
    },
    processEditProduct: function (req, res) {
        const id = req.params.id;
        const file = req.file;
        const product = req.body;
        const allShoes = fileOperation.readFile(allShoesPath);
        let editProduct = productFunction.getProdById(allShoes, id);

        if (!file) {
            const msg = "Debe seleccionar una imagen de producto!";
            res.render('./products/edit-products', {
                user: req.session.userLogged,
                data : editProduct,
                msg : msg
            })
            return;
        }
        //console.log(file.filename)
     
        const updatedProduct = {
            id: editProduct.id,
            prodCreationDate: editProduct.prodCreationDate, //dia que cree producto
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

        // Remove image files.
        productFunction.removeProductImage(allShoes, id);

        // Creo un nuevo array sin el elemento modificado.
        let updatedArray = productFunction.removeProdFromArray(allShoes, id);
        updatedArray.push(updatedProduct);
        fileOperation.writeFile(updatedArray, allShoesPath);

        res.redirect('/products');
    },
    obtenerPorId: (req, res) => {
        const productId = req.params.id;
        //console.log(productId);
        let productoEncontrado;

        for (let i = 0; i < allShoes.length; i++) {
            //console.log(allShoes[i]);
            if (allShoes[i].id === productId) {
                productoEncontrado = allShoes[i];
            }
        }
        //console.log(productoEncontrado)
        if (!productoEncontrado) {
            res.status(404).send("No se encuentra el producto");
        } else {
            res.render('./products/product-details',  {
                sneakerEncontrado: productoEncontrado, 
                trendingSneakers: sneakersData,
                user: req.session.userLogged
            });
        }
    },
    createProduct: async function (req, res) {
        const brands = await Brands.findAll({ raw: true });
        const categories = await Categories.findAll({ raw: true });
        res.render('./products/createProduct', {
            user: req.session.userLogged,
            old: '',
            brands: brands,
            categories: categories
        })
    },
    processCreateProduct: async function (req, res) {
        if (!req.session.userLogged) {
            return res.redirect('/users/login');
        }

        const file = req.file;
        const product = req.body;
        
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            const brands = await Brands.findAll({ raw: true });
            const categories = await Categories.findAll({ raw: true });
            return res.render('./products/createProduct', {
                errors: errors.mapped(), // Mapped convierte el array de errores en un obj literal con (name del elemento) y sus diferentes propiedades
                old: product,
                brands: brands,
                categories: categories
            });
        }
        

        const userId = req.session.userLogged.id;
        
        const colors_hexa = [product.color1, product.color2, product.color3];
        let prodData = {
            user_id: userId,
            brand_id: product.brand,
            model: product.model,
            description: product.description,
            price: product.price,
            discount: product.discount,
            image: file.filename,
            gender: product.gender,
            stock: product.stock,
            category_id: product.category,
            colors_hexa: colors_hexa.toString(),
            size_eur: product.size,
        }

        const prodCreated = Product.createProductDb(prodData); 
        res.redirect('/products');
    },
    search: function(req, res) {
        // const activeUser = fileOperation.readFile(activeUserFile);
        const allShoes = fileOperation.readFile(allShoesPath);

        let userSearch = req.query.search;
        let productsResults = [];

        for (let i = 0; i < allShoes.length; i++) {
            if (allShoes[i].brand.toLowerCase().includes(userSearch.toLowerCase())) {
                productsResults.push(allShoes[i])
            }
        }
        res.render('./products/all-products', {
            trendingSneakers : productsResults,
            products : productsResults,
            user: req.session.userLogged
        })
    },
    deleteProduct: function (req, res) {
         const id = req.params.id;
        if (!id) return;

        let products = fileOperation.readFile(allShoesPath);
        let newArray = productFunction.removeProdFromArray(products, id);
        fileOperation.writeFile(newArray, allShoesPath);

        // Remove image files.
        productFunction.removeProductImage(products, id);

        res.redirect('/products');
    },
    test: async function(req, res) {
        const brands = await Brands.findAll({ raw: true });
        return res.send(brands);
    }
};

module.exports = productsController;