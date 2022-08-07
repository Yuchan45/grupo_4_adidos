const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Middlewares
const multipleUpload = require('../middlewares/users/usersMulter');
const loginValidation = require('../middlewares/users/loginValidation');
const isAdmin = require('../middlewares/users/isAdmin');
const userAlreadyExists = require('../middlewares/users/userAlreadyExists');
const dataTypeValidation = require('../middlewares/users/dataTypeValidation');

// Controllers
const {loginIndex, login, register, createUser, recover, list, editIndex, editUser, deleteUser, logout, search, filter} = usersController;

// Express Validator
const { body } = require('express-validator');
// Validaciones
const validateCreateUserForm = [
    body('name')
        .notEmpty().withMessage('Debes completar el campo de nombre!').bail()
        .isAlpha().withMessage('El nombre no puede tener caracteres invalidos!'),

    body('username')
        .notEmpty().withMessage('Debes completar el campo de usuario!').bail()
        .isAlphanumeric().withMessage('No se permiten caracteres invalidos!'),

    body('password')
        .notEmpty().withMessage('Debes ingresar una contraseña!').bail()
        .isLength({min: 6, max: 100}).withMessage('Debes ingresar una contraseña valida! (minimo 6 caracteres)'),

    body('email')
        .notEmpty().withMessage('Debes completar el email!').bail()
        .isEmail().withMessage('Debes completar un email valido!'),

    body('address')
        .notEmpty().withMessage('Debes completar el campo de direccion!').bail(),

    body('birthdate')
        .notEmpty().withMessage('Debes completar el campo de fecha de nacimiento!').bail()
        .isDate().withMessage('La fecha de nacimiento es invalida!'),
];


// LogIn
router.get('/login', loginIndex);
router.post('/login', loginValidation, login); // Falta express-validation (check pass lenght, etc).
// Register
router.get('/register', register);
router.post('/register', multipleUpload, userAlreadyExists, dataTypeValidation, validateCreateUserForm, createUser); // Falta express-validation (check pass lenght, etc).
// Recovery
router.get('/recover', recover);
// List
router.get('/list', isAdmin, list);
// Edit user
router.get('/:id/edit', editIndex);
router.put('/:id', multipleUpload, dataTypeValidation, editUser);
// Delete user
router.delete('/:id', deleteUser);
// LogOut
router.get('/logout', logout);

// Filters
router.get('/filter', filter);

// Search
router.get('/search', search);



//router.get('/list/:id/edit', usersController.profileEdit);

module.exports = router;