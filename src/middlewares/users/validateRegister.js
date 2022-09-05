// Express Validator
const path = require('path');
const { body } = require('express-validator');

// Validaciones
const validateCreateUserForm = [
    body('name')
        .notEmpty().withMessage('Debes completar el campo de nombre'),

    body('username')
        .notEmpty().withMessage('Debes completar el campo de usuario').bail()
        .isAlphanumeric().withMessage('No se permiten caracteres invalidos'),

    body('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength({min: 6, max: 100}).withMessage('Debes ingresar una contraseña valida! (minimo 6 caracteres)'),

    body('email')
        .notEmpty().withMessage('Debes completar el email').bail()
        .isEmail().withMessage('Debes completar un email valido'),

    body('address')
        .notEmpty().withMessage('Debes completar el campo de calle').bail(),

    body('addressNumber')
        .notEmpty().withMessage('Debes completar el campo de numero de calle').bail(),

    body('birthdate')
        .notEmpty().withMessage('Debes completar el campo de fecha de nacimiento').bail()
        .isDate().withMessage('La fecha de nacimiento es invalida'),
    
    body('cash')
        .notEmpty().withMessage('Debes completar el campo cash').bail(),

    body('profileImage').custom((value, { req }) => {
        let files = req.files;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.jfif'];

        let fileExtension = path.extname(files[0].originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }

        return true;
        // if (!file) {
        //     throw new Error('Si no ingresa una imagen de perfil, se le sera asignada una por defecto');
        // } else {
        //     let fileExtension = path.extname(file.originalname);
        //     if (!acceptedExtensions.includes(fileExtension)) {
        //         throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        //     }
        // }
    }),
    body('bannerImage').custom((value, { req }) => {
        let files = req.files;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.jfif'];

        let fileExtension = path.extname(files[0].originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }

        return true;
        // if (!file) {
        //     throw new Error('Si no ingresa una imagen de portada, se le sera asignada una por defecto');
        // } else {
        //     let fileExtension = path.extname(file.originalname);
        //     if (!acceptedExtensions.includes(fileExtension)) {
        //         throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        //     }
        // }
    })

];

module.exports = validateCreateUserForm;