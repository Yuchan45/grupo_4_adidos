const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Middlewares
const multipleUpload = require('../middlewares/users/usersMulter');
const validateCreateUserForm = require('../middlewares/users/validateRegister');
const loginValidation = require('../middlewares/users/loginValidation');
const isLogged = require('../middlewares/isLogged');
const isAdmin = require('../middlewares/users/isAdmin');
const userAlreadyExists = require('../middlewares/users/userAlreadyExists');
const dataTypeValidation = require('../middlewares/users/dataTypeValidation');

// Controllers
const {loginIndex, login, register, createUser, processRegister, recover, list, editIndex, editUser, deleteUser, logout, search, filter} = usersController;



// LogIn
router.get('/login', loginIndex);
router.post('/login', loginValidation, login); // Falta express-validation (check pass lenght, etc).
// Register
router.get('/register', register);
// router.post('/register', multipleUpload, userAlreadyExists, dataTypeValidation, validateCreateUserForm, createUser); // Falta express-validation (check pass lenght, etc).
router.post('/register', multipleUpload, userAlreadyExists, dataTypeValidation, validateCreateUserForm, processRegister);

// Recovery
router.get('/recover', recover);
// List
router.get('/list', isLogged, list);
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