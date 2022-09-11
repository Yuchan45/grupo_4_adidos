let db = require("../database/models");

let productsController = {
    create: function (req, res) {
        db.Category.findAll()
            .then(function(category){
                return res.render("createProduct", {category : category})
            })
    },

    save: function (req, res){
        db.Product.create({
            model: req.body.model,
            brand: req.body.brand,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            gender: req.body.gender,
            category: req.body.category,
            color: req.body.color,
            size: req.body.size,
            stock: req.body.stock,
            // No deja "product-image"
            productimage: req.body.product-image
        });

        //esta bien poner "/create"?
        res.redirect("/create")
    },

    productsList: function (req, res){
        db.Product.findAll()
            .then(function(products){
                res.render("productsList", {products:products})
            })
    }, 
    
    // le cambie el nombre de product-details a productDetails
    productDetails: function (req, res){
        db.Product.findByPk(req.params.id)
        /* Esperando a que se hagan las relaciones en models
            include: [{association: "category"}, {association: "brand"}] */
            .then(function(product){
                res.render("productDetails", {product:product})
            })
    },
    
    editProducts: function (req, res) {
        let productsRequest = db.Product.findByPk(req.params.id);
        let categoryRequest = db.Category.findAll();

        Promise.all([productsRequest, categoryRequest])
            .then(function([product, category]){
                res.render("editProducts", {product:product, category:category})
            })
    },

    update: function (req, res) {
        db.Product.update({
            model: req.body.model,
            brand: req.body.brand,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            gender: req.body.gender,
            category: req.body.category,
            color: req.body.color,
            size: req.body.size,
            stock: req.body.stock,
            // No deja "product-image"
            productimage: req.body.product-image
    }, {
        where: {
            id: req.params.id
        }
    });
    
    res.redirect("/products/" + req.params.id)
},

    delete: function(req, res){
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/products");
    }
}

module.exports = productsController;