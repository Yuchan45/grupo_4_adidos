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
const {loginIndex, login, register, createUser, recover, list, editIndex, editUser, deleteUser, logout} = usersController;


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

router.get('/login', loginIndex);
router.post('/login', loginValidation, login);

router.get('/register', register);
router.post('/register', multipleUpload, userAlreadyExists, dataTypeValidation, createUser);

router.get('/recover', recover);

router.get('/list', isAdmin, list);

router.get('/:id/edit', editIndex);
router.put('/:id', multipleUpload, dataTypeValidation, editUser);

router.delete('/:id', deleteUser);

router.get('/logout', logout);



//router.get('/list/:id/edit', usersController.profileEdit);

module.exports = router;