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
                console.log('Ha ocurrido un error al intentar guardar el usuario');
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
            console.log('Ha ocurrido un error al intentar guardar la tarea');
        });
    },
    saveUser: function(user, file) {
        // Recibe un objeto de tipo 'usuario' y la ruta donde guardar. Lo guarda en el archivo json.
        let usersArray = this.readFile(file);
        usersArray.push(user);
        this.writeFile(usersArray, file);
    }

};

module.exports = functionalities;