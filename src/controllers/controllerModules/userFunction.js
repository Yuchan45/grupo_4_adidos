const path = require('path');
const fs = require('fs');

let functionalities = {
    usernameAvailable: function(array, username) {
        // Recibe un array de objetos "usuario" y un string "username". Se fija si dicho usuario se encuentra en el array.
        // Devuelve true en caso de que el usuario ya se encuentre en el array, y false en caso contrario.
        let flag = false;
        let i = 0;
        while (i < array.length && flag == false) {
            if (array[i].username == username) flag = true;
            i++;
        }
        return flag;
    },
    extensionValidation: function(ext) {
        // Recibe una extension de formato, por ejemplo: ".png". Se fija si la extension del archivo es 
        // valida (pertenece a un archivo de tipo imagen). Devuelve true en caso de ser valida y false en caso contrario.
        let flag = false;
        if (ext == '.png' || ext == '.jpg' || ext == '.jpeg' || ext == '.jfif' || ext == '.gif' || ext == '.webp') {
            flag = true;
        }
        return flag;
    },
    userExists: function(array, user) {
        // Recibe un array de objetos "usuario" y un objeto usuario con atributos "username" y "passowrd". 
        // Devuelve el usuario hallado (en caso de existir y que su usuario y contraseña sean correctos), en caso de no existir dicho usuario 
        // devulve el string "no", y en caso de existir pero que la contraseña sea invalida, retorna el string "yes".
        let userExists = false;
        let errorMsg = "no";
        let flag = false;
        let i = 0;
        while (i < array.length && flag == false) {
            if (array[i].username.toLowerCase() == user.username.toLowerCase()) {
                userExists = true;
                if (array[i].password == user.password) {
                    flag = true;
                }
            }
            i++;
        }
        if (userExists) errorMsg = "yes";

        return flag ? array[i-1] : errorMsg;
    },
    removeUserFromArray: function(array, id) {
        // Recibe un array de objetos 'usuario' y un id. Remueve el usuario cuyo id corresponda al parametro.
        // Devuelve un nuevo array (sin el elemento eliminado).
        let userToDelete = this.getUserById(array, id);
        let newArray = array.filter(user => user.id != userToDelete.id);
        return newArray;
    },
    removeUserProfileBannerImage: function(array, id) {
        // Recibe un array de objetos usuario y un id. 
        // Elimina del servidor las imagenes (Perfil y banner) correspondientes al usuario.
        let userToDelete = this.getUserById(array, id);
        const avatarImage = path.join(__dirname, '../../../public/images/users/profiles/' + userToDelete.avatarImageName);
        const bannerImage = path.join(__dirname, '../../../public/images/users/banners/' + userToDelete.bannerName);
        if (userToDelete.avatarImageName != 'default.jpg') this.removeImage(avatarImage);
        if (userToDelete.bannerName != 'default-banner.jpg') this.removeImage(bannerImage);
    },
    removeImage: function(path) {
        try {
            fs.unlinkSync(path);
        } catch(err) {
            console.log(err);
        }
    },
    getUserById: function(array, id) {
        let userIndex = array.findIndex(user => user.id == id);
        let user = array[userIndex];
        return user;
    }


};

module.exports = functionalities;