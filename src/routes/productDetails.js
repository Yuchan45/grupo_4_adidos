const express = require('express');
const router = express.Router();
const {
    landing,
    login,
    register,
    obtenerPorId
} = require("../controllers/productDetailsController");

router.get('/', landing);
router.get('/login-form', login);
router.get('/register-form', register);
router.get('/:id', obtenerPorId);


module.exports = router;