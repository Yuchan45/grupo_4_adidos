const DB = require('../database/models')
const usersController = require('./usersController')
const Op = DB.sequelize.Op

module.exports = {
    userList : (req, res) => {
        DB.User
            .findAll()
            .then(users => {
                return res.json({
                    count: users.length,
                    data: users
                })
            })
    },
    userListId : (req, res) => {
        DB.User
            .findByPk(req.params.id, {
                attributes: {exclude: ['password']}
            })
            .then(users => {
                return res.json({
                    count: users.lenght,
                    data: users
                })
            })
    },

    productList : (req, res) => {
        DB.Product
            .findAll()
            .then(products => {
                return res.json({
                    count: products.length,
                    countByCategory: {
                        
                    }, 
                    data: products
                })
            })
    },
    productListId : (req, res) => {
        DB.Product
            .findByPk(req.params.id)
            .then(products => {
                return res.json({
                    count: products.lenght,
                    data: products
                })
            })
    }
    
}
