const Favorite = require("./Favorite")

module.exports = function(sequelize, dataTypes) {
    let alias = "User"

    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true, 
            allowNull: false
        },
        fullname: {
            type: dataTypes.VARCHAR(100), 
            allowNull: false
        },
        username: {
            type: dataTypes.VARCHAR(100), 
            allowNull: false
        },
        password: {
            type: dataTypes.VARCHAR(100), 
            allowNull: false
        },
        email: {
            type: dataTypes.VARCHAR(500), 
            allowNull: false
        },
        street: {
            type: dataTypes.VARCHAR(500), 
            allowNull: false
        },
        number: {
            type: dataTypes.VARCHAR(25), 
            allowNull: false
        },
        birthday: {
            type: dataTypes.DATE(),
            defaultValue: null
        },
        role: {
            type: dataTypes.VARCHAR(50), 
            allowNull: false
        },
        gender: {
            type: dataTypes.VARCHAR(15), 
            allowNull: false
        },
        country: {
            type: dataTypes.VARCHAR(100), 
            allowNull: false
        },
        avatar: {
            type: dataTypes.VARCHAR(200),
            defaultValue: 'default.jpg'
        },
        banner: {
            type: dataTypes.VARCHAR(200),
            defaultValue: 'default-banner.jpg'
        },
        cash: {
            type: dataTypes.DECIMAL(15,2),
            allowNull: false, 
            defaultValue: 0

        },
        creation_date: {
            type: dataTypes.DATETIME(),
            defaultValue: null

        },
        last_update: {
            type: dataTypes.DATETIME(),
            defaultValue: null
        }
    }

    let config = {
        tableName: "Users"
    }

    let User = sequelize.define(alias, cols, config)

    User.associate = function(models) {
        User.hasMany(User.Favorite, {
            as: "Favorite",
        });
    }

    return User
}
