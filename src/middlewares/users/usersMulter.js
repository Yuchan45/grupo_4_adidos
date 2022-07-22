const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

// Multer
const fileStorageEngineConfig = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = '';
        if (file.fieldname == 'profileImage') {
            folder = path.join(__dirname, '../../../public/images/users/profiles');
        } else {
            folder = path.join(__dirname, '../../../public/images/users/banners');    
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

module.exports = multipleUpload;