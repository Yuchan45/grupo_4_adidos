const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Seteo donde y como guardar los archivos.
const fileStorageEngineConfig = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = '';
        if (file.fieldname == 'profileImage') {
            folder = path.join(__dirname, '../../public/images/profiles');
        } else {
            folder = path.join(__dirname, '../../public/images/banners');    
        }
        cb(null, folder);
    },
    filename: function(req, file, cb) {
        let imageName = '';
        //let imageName = Date.now() + path.extname(file.originalname);
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

router.get('/login', usersController.loginIndex);
router.post('/login', usersController.login);

router.get('/register', usersController.register);
router.post('/register', multipleUpload, usersController.createUser);

router.get('/recover', usersController.recover);
router.get('/list', usersController.list);

router.get('/logout', usersController.logout);

//router.get('/list/:id/edit', usersController.profileEdit);

module.exports = router;