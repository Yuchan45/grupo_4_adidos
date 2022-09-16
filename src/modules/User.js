// 1. Guardar al usuario en la DB
// 2- Buscar al usuario que se queire loggear por su email o userName
// 3- Buscar a un usuario por ID
// 4- Editar la informacion de un usuario
// 5- Eliminar a un usuario de la DB

// Sequelize
const db = require('../database/models');
const sequelize = db.sequelize;
//Otra forma de llamar a los modelos
const Users = db.User;

const path = require('path');

const fileOp = require('./fileControl');


const User = {
    filePath: path.join(__dirname, '../data/users.json'),
    generateId: function() {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        return lastUser ? lastUser.id + 1 : 1;
    },
    generateDbId: async function() {
        const lastUser = await Users.findAll({
            order: [['id', 'DESC']],
            limit: 1
        });
        console.log(lastUser);
        console.log("Generated id:", lastUser[0] ? lastUser[0].id + 1 : 1)
        return lastUser[0] ? lastUser[0].id + 1 : 1;
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
    findByEmailDb: async function(email) {
        const usersDb = await Users.findAll({
            where: {
                email: email
            },
            limit: 1
        });
        return usersDb;
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
    createUserDb: async function(userData) {
        // Recibe por parametro un objeto literal (usuario)
        let newUser = {
            //id: this.generateDbId(),  // No hace falta esto, el id se agrega automaticamente al crear el registro en la tabla
            ...userData, // Es un spreadOperator, es lo mismo que hacer name: uderData.name, etc.
            creation_date: null,
            last_updated: null
        }
        const createdUser = await Users.create({ 
            ...newUser
        });
        console.log("hice el create...")
        return createdUser;
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