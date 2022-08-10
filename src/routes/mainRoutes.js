const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/shopping-cart', mainController.shoppingCart);
router.get('/testSession', function(req, res) {
    if (req.session.nvisitas == undefined) {
        req.session.nvisitas = 0;
    }
    req.session.nvisitas++;

    res.send('Numero de visitas: ' + req.session.nvisitas);
});
router.get('/activeUser', function(req, res) {
    res.send(req.session.activeUser);
});

module.exports = router;