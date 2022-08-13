// Express Validator
const { body } = require('express-validator');
const path = require('path');

// Validaciones
const validateCreateUserForm = [
    body('name')
        .notEmpty().withMessage('Debes completar el campo de nombre!'),

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

    body('profileImage').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jfif'];

        if (!file) {
            throw new Error('Tiene que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    }),
    body('bannerImage').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jfif'];

        if (!file) {
            throw new Error('Tiene que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    }),

];

module.exports = validateCreateUserForm;