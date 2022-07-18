const path = require('path');
const fs = require('fs');

let functionalities = {
    getProdById: function(array, id) {
        let userIndex = array.findIndex(user => user.id == id);
        let user = array[userIndex];
        return user;
    },
    removeProdFromArray: function(array, id) {
        // Recibe un array de objetos 'producto' y un id. Remueve el producto cuyo id corresponda al parametro.
        // Devuelve un nuevo array (sin el elemento eliminado).
        let userToDelete = this.getProdById(array, id);
        let newArray = array.filter(user => user.id != userToDelete.id);
        return newArray;
    },
    removeProductImage: function(array, id) {
        // Recibe un array de objetos producto y un id. 
        // Elimina del servidor las imagenes del producto correspondientes al producto.
        let prodToDelete = this.getProdById(array, id);
        const prodImage = path.join(__dirname, '../../public/images/products/' + prodToDelete.image);
        if (prodToDelete.image != 'default.jpg') this.removeImage(prodImage);
    },
    removeImage: function(path) {
        try {
            fs.unlinkSync(path);
        } catch(err) {
            console.log(err);
        }
    },

};

module.exports = functionalities;