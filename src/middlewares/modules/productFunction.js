const path = require('path');
const fs = require('fs');

let functionalities = {
    getProdById: function(array, id) {
        let userIndex = array.findIndex(user => user.id == id);
        let user = array[userIndex];
        return user;
    }

};

module.exports = functionalities;