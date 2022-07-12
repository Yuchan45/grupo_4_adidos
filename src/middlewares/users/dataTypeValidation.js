const path = require('path');
const userFunction = require('../modules/userFunction');


function dataTypeValidation(req, res, next) {
    const files = req.files;

    const profileImageName = (files.profileImage) ? req.files.profileImage[0].filename : 'default.jpg';
    const bannerImageName = (files.bannerImage) ? req.files.bannerImage[0].filename : 'default-banner.jpg';

    const validProfileExtension = userFunction.extensionValidation(path.extname(profileImageName));
    const validBannerExtension = userFunction.extensionValidation(path.extname(bannerImageName));   

    req.validProfileExtension = true;
    req.validBannerExtension = true;
    if (!(validProfileExtension && validBannerExtension)) {
        req.validProfileExtension = false;
        req.validBannerExtension = false;
    }
    next();
}

module.exports = dataTypeValidation;