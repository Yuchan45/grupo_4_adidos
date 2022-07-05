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
        if (ext == '.png' || ext == '.jpg' || ext == '.jpeg') {
            flag = true;
        }
        return flag;
    }


};

module.exports = functionalities;