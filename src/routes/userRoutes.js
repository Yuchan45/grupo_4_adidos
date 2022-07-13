const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Middlewares
const loginValidation = require('../middlewares/users/loginValidation');
const isAdmin = require('../middlewares/users/isAdmin');
const userAlreadyExists = require('../middlewares/users/userAlreadyExists');
const dataTypeValidation = require('../middlewares/users/dataTypeValidation');

// Controllers
const {loginIndex, login, register, createUser, recover, list, editIndex, editUser, deleteUser, logout, search, filter} = usersController;


// Multer
const fileStorageEngineConfig = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = '';
        if (file.fieldname == 'profileImage') {
            folder = path.join(__dirname, '../../public/images/users/profiles');
        } else {
            folder = path.join(__dirname, '../../public/images/users/banners');    
        }
        cb(null, folder);
    },
    filename: function(req, file, cb) {
        let imageName = '';
        if (file.fieldname == 'profileImage') {
            imageName = 'userProfile-' + uuidv4() + path.extname(file.originalname);
        } else {
            imageName = 'userBanner-' + uuidv4() + path.extname(file.originalname);
        }
        cb(null, imageName);
    }
});

let upload = multer({storage: fileStorageEngineConfig});
let multipleUpload = upload.fields( [{name: 'profileImage'}, {name: 'bannerImage'}] );

// LogIn
router.get('/login', loginIndex);
router.post('/login', loginValidation, login); // Falta express-validation (check pass lenght, etc).
// Register
router.get('/register', register);
router.post('/register', multipleUpload, userAlreadyExists, dataTypeValidation, createUser); // Falta express-validation (check pass lenght, etc).
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