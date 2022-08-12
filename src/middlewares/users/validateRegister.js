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

module.exports = validateCreateUserForm;