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
    loginUser: function(array, user) {
        // Recibe un array de objetos "usuario" y un objeto usuario con atributos "username" y "passowrd". Devuelve el usuario hallado (en caso de 
        // existir y que su usuario y contraseña sean correctos). En caso de no existir dicho usuario devulve el string "no", y en caso de existir pero 
        // que la contraseña sea invalida, retorna el string "yes".
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
    }


};

module.exports = functionalities;