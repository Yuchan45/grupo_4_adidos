const sneakersData = require('../data/sneakers');

const prodDetailsController = {
    landing: function(req, res) {
        res.render('product-details', {sneakers: sneakersData});
    },
    login: function(req, res) {
        res.render('login-form');
    },
    register: function(req, res) {
        res.render('register-form');
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
            res.render( "product-details",  {
                sneakerEncontrado: productoEncontrado, 
                sneakers: sneakersData
            });
        }

    }
};

module.exports = prodDetailsController;