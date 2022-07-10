const path = require("path");
const fs = require('fs');


let functionalities1 = {
    file: path.join(__dirname, '../../data/newProduct.json'),

    readFile: function() {
        // Lee el archivo JSON y devuelve un array con los objetos 'productos' que haya
        let convertedEmpty = JSON.stringify([]);
        if (!(fs.existsSync(this.file))) {
            fs.writeFileSync(this.file, convertedEmpty, function(error) {
                if (error) throw error;
                console.log('Ha ocurrido un error al intentar guardar el producto');
            });
        }
        let rawData = fs.readFileSync(this.file, 'utf-8');
        let productsArray = JSON.parse(rawData);
        return productsArray;
    },
    writeFile: function(products) {
        // Recibe un array de objetos 'productos' con los datos de los productos. Los escribe en un JSON.
        let convertedData = JSON.stringify(products);
        fs.writeFileSync(this.file, convertedData, function(error) {
            if (error) throw error;
            console.log('Ha ocurrido un error al intentar guardar la tarea');
        });
    },
    saveProduct: function(products) {
        // Recibe un objeto de tipo 'producto' y lo guarda en el archivo json.
        let productsArray = this.readFile();
        productsArray.push(products);
        this.writeFile(productsArray);
    }

};

module.exports = functionalities1;