// 1. Guardar al usuario en la DB
// 2- Buscar al usuario que se queire loggear por su email o userName
// 3- Buscar a un usuario por ID
// 4- Editar la informacion de un usuario
// 5- Eliminar a un usuari ode la DB
const path = require('path');

const fileOp = require('./fileControl');


const User = {
    filePath: path.join(__dirname, '../data/users.json'),
    generateId: function() {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        return lastUser ? lastUser.id + 1 : 1;
    },
    findAll: function() {
        return fileOp.readFile(this.filePath);
    },
    findByPk: function(id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user.id === id);
        return userFound;
    },
    findByField: function(field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user[field] === text); // El user[field] seria como hacer un user.id o user.email, etc
        return userFound;
    },
    create: function(userData) {
        // Recibe por parametro un objeto literal (usuario)
        let newUser = {
            id: this.generateId(),
            ...userData // Es un spreadOperator, es lo mismo que hacer name: uderData.name, etc.
        }
        fileOp.addToFile(newUser, this.filePath);
        return newUser;
    },
    delete: function(id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(user => user.id !== id); // Devuelve un array con los usuarios cuya id sea != a la id recibida por param.
        fileOp.writeFile(finalUsers, this.filePath);
        return true;
    },
    editar: function() {

    }


}

// console.log(User.create({name: 'Goku', email: 'goku@gmail.com'}));
// console.log(User.delete(8));
module.exports = User;