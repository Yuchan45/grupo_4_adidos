const path = require("path");
const fs = require('fs');


let functionalities1 = {
    file: path.join(__dirname, '../../data/newProduct.json'),

    readFile: function() {
        // Lee el archivo JSON y devuelve un array con los objetos 'usuario' que haya
        let convertedEmpty = JSON.stringify([]);
        if (!(fs.existsSync(this.file))) {
            fs.writeFileSync(this.file, convertedEmpty, function(error) {
                if (error) throw error;
                console.log('Ha ocurrido un error al intentar guardar el usuario');
            });
        }
        let rawData = fs.readFileSync(this.file, 'utf-8');
        let productsArray = JSON.parse(rawData);
        return productsArray;
    },
    writeFile: function(products) {
        // Recibe un array de objetos 'usuario' con los datos de los usuarios. Los escribe en un JSON.
        let convertedData = JSON.stringify(products);
        fs.writeFileSync(this.file, convertedData, function(error) {
            if (error) throw error;
            console.log('Ha ocurrido un error al intentar guardar la tarea');
        });
    },
    saveUser: function(products) {
        // Recibe un objeto de tipo 'usuario' y lo guarda en el archivo json.
        let productsArray = this.readFile();
        productsArray.push(user);
        this.writeFile(productsArray);
    }

};

module.exports = functionalities1;