const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

const {index, shoppingCart, addShoppingCart, removeShoppingCartItem} = mainController;

router.get('/', index);

router.get('/shopping-cart', shoppingCart);
router.post('/shopping-cart/:id', addShoppingCart);
router.delete('/shopping-cart/delete/:id', removeShoppingCartItem);



// Unit tests
router.get('/testSession', function(req, res) {
    if (req.session.nvisitas == undefined) {
        req.session.nvisitas = 0;
    }
    req.session.nvisitas++;

    res.send('Numero de visitas: ' + req.session.nvisitas);
});

router.get('/activeUser', function(req, res) {
    if (req.session.userLogged) {
        return res.send(req.session.userLogged)
    }
    return res.send('No hay usuario loguado');
});

module.exports = router;