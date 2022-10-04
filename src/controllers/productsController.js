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
const Users = db.User;
const Favorites = db.Favorite;


const productsController = {  
    allProducts: async function (req, res) {
        const products = await Products.findAll({
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}, {association: "favUsers"}]
        });
        res.render('./products/all-products', {
            products: products,
        });
    },
    running: async function (req, res) {
        const categoryName = 'Running';
        const category = await Categories.findAll({
            where: {
                name: categoryName
            }
        });

        if (!(category.length > 0)) {
            return res.send("Lo sentimos... No hay zapatillas de esta categoria (En la base de datos no estan).");
        }
        const category_id = category[0].id;

        const products = await Products.findAll({
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}, {association: "favUsers"}],
            where: {
                category_id: category_id
            }
        });
        res.render('./products/all-products', {
            products: products,
        });
    },
    urban: async function (req, res) {
        const categoryName = 'Urban';
        const category = await Categories.findAll({
            where: {
                name: categoryName
            }
        });

        if (!(category.length > 0)) {
            return res.send("Lo sentimos... No hay zapatillas de esta categoria (En la base de datos no estan).");
        }
        const category_id = category[0].id;

        const products = await Products.findAll({
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}, {association: "favUsers"}],
            where: {
                category_id: category_id
            }
        });
        res.render('./products/all-products', {
            products: products,
        });
    },
    trackAndField: async function (req, res) {
        const categoryName = 'Track & field';
        const category = await Categories.findAll({
            where: {
                name: categoryName
            }
        });

        if (!(category.length > 0)) {
            return res.send("Lo sentimos... No hay zapatillas de esta categoria (En la base de datos no estan).");
        }
        const category_id = category[0].id;

        const products = await Products.findAll({
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}, {association: "favUsers"}],
            where: {
                category_id: category_id
            }
        });
        res.render('./products/all-products', {
            products: products,
        });
    },
    myProducts: async (req, res) => {
        const productOwner = req.session.userLogged ? req.session.userLogged : '';
        if (!productOwner) return res.redirect('/users/login');

        const products = await Products.findAll({
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}, {association: "favUsers"}],
            where: {
                user_id: productOwner.id
            }
        });
        res.render('./products/myProducts', {
            products: products,
        });
    },
    productDetails: async (req, res) => {
        const productId = req.params.id;
        let productoEncontrado = await Products.findByPk(productId, {
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}, {association: "favUsers"}] 
        });
        if (!productoEncontrado) {
            return res.status(404).send("No se encuentra el producto");
        }

        const allProducts = await Products.findAll({
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}, {association: "favUsers"}] 
        });

        res.render('./products/product-details',  {
            product: productoEncontrado,
            products: allProducts  // Esto es para el products-slider
        });
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
            // Remuevo la imagen ingresada.
            if (file) {
                const imagePath = path.join(__dirname, '../../public/images/products/' + file.filename);
                userFunction.removeImage(imagePath);
            }
            // Me traigo los datos a enviar a la vista.
            const brands = await Brands.findAll({ raw: true });
            const categories = await Categories.findAll({ raw: true });
            return res.render('./products/createProduct', {
                errors: errors.mapped(), // Mapped convierte el array de errores en un obj literal con (name del elemento) y sus diferentes propiedades
                old: product,
                brands: brands,
                categories: categories,
            });
        }
        
        const userId = req.session.userLogged.id;

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
            colors_hexa: product.colors.toString(),
            size_eur: product.sizes.toString(),
        }

        const prodCreated = Product.createProductDb(prodData); 
        res.redirect('/products');
    },
    editProduct: async function (req, res) {
        const productId = req.params.id;
        const brands = await Brands.findAll({ raw: true });
        const categories = await Categories.findAll({ raw: true });
        

        let editProduct = await Products.findByPk(productId, {
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}] 
        });
        if (!editProduct) {
            return res.status(404).send("No se encuentra el producto");
        }
        
        const sizes = editProduct.size_eur.split(',');
        const colors = editProduct.colors_hexa.split(',');
        //console.log(sizes);
        // return res.send(sizes);

        res.render('./products/edit-products', {
            product: editProduct,
            brands: brands,
            categories: categories,
        })
    },
    processEditProduct: async function (req, res) {
        if (!req.session.userLogged) {
            return res.redirect('/users/login');
        }
        const id = req.params.id;
        const file = req.file;
        const product = req.body;

        // Me busco el producto de la db sin modificar para recuperar datos previos.
        let editProduct = await Products.findByPk(id, {
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}] 
        });
        if (!editProduct) {
            return res.status(404).send("No se encuentra el producto a modificar en la base de datos");
        }

        let errors = validationResult(req);
        if (!errors.isEmpty()){
            // Remuevo la imagen ingresada (xq al ser un caso fallido de modificacion, la imagen no debe ser guardada).
            if (file) {
                const imagePath = path.join(__dirname, '../../public/images/products/' + file.filename);
                userFunction.removeImage(imagePath);
            }
            // Vuelvo a mostrar la vista de edicion de produto.
            const brands = await Brands.findAll({ raw: true });
            const categories = await Categories.findAll({ raw: true });
            

            const sizes = editProduct.size_eur.split(',');
            const colors = editProduct.colors_hexa.split(',');
            return res.render('./products/edit-products', {
                errors: errors.mapped(),
                product: editProduct,
                brands: brands,
                categories: categories,
            })
        }

        const prevProdImage = editProduct.image;
        let updatedProdImage = '';
        if (file) {
            // Debo remover la antigua imagen del producto del sv.
            const prevImagePath = path.join(__dirname, '../../public/images/products/' + prevProdImage);
            userFunction.removeImage(prevImagePath);
            // Actualizo con la nueva imagen del producto.
            updatedProdImage = file.filename;

        } else {
            // Debo dejar la antigua imagen del producto.
            updatedProdImage = prevProdImage;
        }

        const userId = req.session.userLogged.id;

        let prodData = {
            user_id: userId,
            brand_id: product.brand,
            model: product.model,
            description: product.description,
            price: product.price,
            discount: product.discount,
            image: updatedProdImage,
            gender: product.gender,
            stock: product.stock,
            category_id: product.category,
            colors_hexa: product.colors.toString(),
            size_eur: product.sizes.toString(),
        }

        const updateResult = await Product.editProductDb(prodData, id);
        if (!updateResult) return res.send("Ha ocurrido un problema al modificar los datos del producto");

        // Remove image files.
        // productFunction.removeProductImage(allShoes, id);

        res.redirect('/products/' + id + 'edit');
    },
    deleteProduct: async function (req, res) {
        if (!req.params.id) return;
        const id = req.params.id;
        let prodToDelete = await Products.findByPk(id);
        
        // Remove image files.
        const imagePath = path.join(__dirname, '../../public/images/products/' + prodToDelete.image);
        userFunction.removeImage(imagePath);

        // Borro el prod de la db
        await Products.destroy({
            where: {
                id: id
            },
            force: true 
        });

        res.redirect('/products/my-products');
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
    favorites: async (req, res) => {
        if (!req.session.userLogged) return res.redirect('/users/login');
        const userId = req.session.userLogged.id;

        const favorites = await Favorites.findAll({
            where: {
                user_id: userId
            }
        });

        let favoriteProdIds = [];
        favorites.forEach(product => {
            // Me armo un array con los ids de los productos favoritos del usuario.
            favoriteProdIds.push(product.product_id);
        });

        const products = await Products.findAll({
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}, {association: "favUsers"}],
            where: {
                id: favoriteProdIds       // Esto es magia, se puede pasar un array de ids...
            }
        });

        res.render('./products/all-products', {
            products: products,
        });

    },
    addToFavorites: async (req, res) => {
        if (!req.session.userLogged) return res.redirect('/users/login');
        if (!req.params.id) return;
        const prodId = req.params.id;
        const userId = req.session.userLogged.id;
        console.log({prodId, userId});

        // Chequeamos que el usuario no tenga ya añadido este producto en favoritos.
        const alreadyFav = await Favorites.findOne({
            where: {
                user_id: userId,
                product_id: prodId
            }
        });

        if (!alreadyFav) {
            // Lo agrega a favoritos
            const newFav = {
                user_id: userId,
                product_id: prodId
            };
    
            const createdFav = await Product.createFavoriteDb(newFav);
            if (!createdFav) return res.send("Ha ocurrido un problema al agregar el producto a favoritos :(");
    
            return res.send("True");
        } else {
            // Lo saca de favoritos

            await Favorites.destroy({
                where: {
                    product_id: prodId
                },
                force: true 
            });

            return res.send("El producto ha sido removido de favoritos!");
        }

        // DEBERIA PODER VOLVER AL 'MISMO' LUGAR XQ EL AGREGAR A FAVORITOS NO TE CAMBIA DE PAGINA. PERO NO SE COMO HACER ESE REDIRECT.

    },
    test: async function(req, res) {
        const products = await Products.findAll({
            include: [{association: "brands"}, {association: "categories"}, {association: "users"}, {association: "favUsers"}],
            where: {
                id: [30, 31, 32]
            }
        });
        res.render('./products/all-products', {
            products: products,
        });
    }
};

module.exports = productsController;