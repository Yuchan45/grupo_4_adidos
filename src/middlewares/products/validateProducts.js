// Express Validator
const path = require('path');
const { body } = require('express-validator');

// Validaciones
const validateProducts = [
    body('brand')
        .notEmpty().withMessage('Debes completar el campo de marca'),

    body('model')
        .notEmpty().withMessage('Debes completar el campo de modelo').bail(),

    body('category')
        .notEmpty().withMessage('Debes ingresar una categoria').bail(),

    body('stock')
        .notEmpty().withMessage('Debes completar el campo de stock').bail()
        .isNumeric().withMessage('El stock debe ser un dato numerico'),

        // HACER QUE VALIDE QUE POR LO MENOS HAYA 1 SIZE SELECCIONADO!

    body('price')
        .notEmpty().withMessage('Debes completar el campo de precio').bail()
        .isNumeric().withMessage('El precio debe ser un dato numerico'),
    body('discount')
        .notEmpty().withMessage('Debes completar el campo de descuento').bail()
        .isNumeric().withMessage('El descuento debe ser un dato numerico'),
    
    body('gender')
        .notEmpty().withMessage('Debes completar el campo de genero').bail(),

    body('description')
        .notEmpty().withMessage('Debes completar el campo de description (En caso de no querer poner nada, escribir "-")').bail(),

    body('productImage').custom((value, { req }) => {
        let file = req.file;
        if (!file) {
            throw new Error('Debe ingresar una imagen del producto!');
        } else {
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.jfif', '.webp']; 
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            } else {
                return true;
            }
        }
    })
    
];

module.exports = validateProducts;