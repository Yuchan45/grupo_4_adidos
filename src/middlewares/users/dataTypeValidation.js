const path = require('path');
const userFunction = require('../../modules/userFunction');


function dataTypeValidation(req, res, next) {
    // Checks if there is a file or not. If theres not a profile or banner image, then it sets a default image.
    // Then checks if the extension of the input image is valid (".jpg", ".png", ".jpeg", ".jfif", ".gif", ".webp")
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