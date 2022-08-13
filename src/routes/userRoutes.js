const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Middlewares
const multipleUpload = require('../middlewares/users/usersMulter');
const validateCreateUserForm = require('../middlewares/users/validateRegister');
const isLogged = require('../middlewares/isLogged');
const isAdmin = require('../middlewares/users/isAdmin');



// Controllers
const {login, loginProcess, register, createUser, processRegister, recover, list, editIndex, editUser, deleteUser, logout, search, filter} = usersController;



// LogIn
router.get('/login', login);
router.post('/login', loginProcess);
// router.post('/login', login); // Falta express-validation (check pass lenght, etc).
// Register
router.get('/register', register);
// router.post('/register', multipleUpload, validateCreateUserForm, createUser); // Falta express-validation (check pass lenght, etc).
router.post('/register', multipleUpload, processRegister); // validateCreateUserForm

// Recovery
router.get('/recover', recover);
// List
router.get('/list', list); // isLogged,
// Edit user
router.get('/:id/edit', editIndex);
router.put('/:id', multipleUpload, editUser);
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