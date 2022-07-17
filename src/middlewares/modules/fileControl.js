const path = require("path");
const fs = require('fs');


let functionalities = {
    // file: path.join(__dirname, '../../data/users.json'),

    readFile: function(file) {
        // Lee el archivo JSON y devuelve un array con los objetos 'usuario' que haya
        let convertedEmpty = JSON.stringify([]);
        if (!(fs.existsSync(file))) {
            fs.writeFileSync(file, convertedEmpty, function(error) {
                if (error) throw error;
                console.log('Ha ocurrido un error al intentar leer el archivo de usuarios');
            });
        }
        let rawData = fs.readFileSync(file, 'utf-8');
        let usersArray = JSON.parse(rawData);
        return usersArray;
    },
    writeFile: function(users, file) {
        // Recibe un array de objetos 'usuario' con los datos de los usuarios. Los escribe en un JSON.
        let convertedData = JSON.stringify(users);
        fs.writeFileSync(file, convertedData, function(error) {
            if (error) throw error;
            console.log('Ha ocurrido un error al intentar guardar los datos de los usuarios');
        });
    },
    addToFile: function(object, file) {
        // Recibe un objeto de tipo 'usuario' y la ruta donde guardar. Lo agrega en el archivo json.
        let array = this.readFile(file);
        array.push(object);
        this.writeFile(array, file);
    },
    writeActiveUser: function(user, file) {
        // Recibe un objeto del tipo 'usuario' y lo agrega al archivo que le pasen por parametro "file". Siempre pisa el contenido. 
        // Siempre hay un solo y unico usuario activo en el archivo.
        let convertedData = JSON.stringify(user);
        fs.writeFileSync(file, convertedData, function(error) {
            if (error) throw error;
            console.log('Ha ocurrido un error al intentar guardar el usuario activo');
        });
        
    }

};

module.exports = functionalities;