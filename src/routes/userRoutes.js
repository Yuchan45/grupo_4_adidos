const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');


const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Seteo donde y como guardar los archivos.
const fileStorageEngineConfig = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = path.join(__dirname, '../../public/images/profiles');
        cb(null, folder);
    },
    filename: function(req, file, cb) {
        //let imageName = Date.now() + path.extname(file.originalname);
        let imageName = 'userProfile-' + uuidv4() + path.extname(file.originalname);
        cb(null, imageName);
    }
});

let fileUpload = multer({storage: fileStorageEngineConfig});


router.get('/login', usersController.login);

router.get('/register', usersController.register);
router.post('/register', fileUpload.single('profileImage'), usersController.createUser); // le paso profileImage que seria el name del input file.

router.get('/recover', usersController.recover);
router.get('/list', usersController.list);

module.exports = router;