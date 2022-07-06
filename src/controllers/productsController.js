const path = require('path');
const sneakersData = require('../data/sneakers');
const fileOperation = require('./usersModules/fileControl');
const activeUserFile = path.join(__dirname, '../data/active-user.json');

const activeUser = fileOperation.readFile(activeUserFile);


const productsController = {
    allProducts: function(req, res) {
        res.render('./products/all-products', {
            sneakers: sneakersData,
            activeUser: activeUser
        });
    },
    editProduct: function(req, res) {
        res.render('./products/editProducts', {
            activeUser: activeUser
        });
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
                sneakers: sneakersData,
                activeUser: activeUser
            });
        }
    }
};

module.exports = productsController;