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
            type: dataTypes.STRING(100), 
            allowNull: false
        },
        username: {
            type: dataTypes.STRING(100), 
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100), 
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(500), 
            allowNull: false
        },
        street: {
            type: dataTypes.STRING(500), 
            allowNull: false
        },
        number: {
            type: dataTypes.STRING(25), 
            allowNull: false
        },
        birthdate: {
            type: dataTypes.DATEONLY(),
            defaultValue: null
        },
        role: {
            type: dataTypes.STRING(50), 
            allowNull: false
        },
        gender: {
            type: dataTypes.STRING(15), 
            allowNull: false
        },
        country: {
            type: dataTypes.STRING(100), 
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(200),
            defaultValue: 'default.jpg'
        },
        banner: {
            type: dataTypes.STRING(200),
            defaultValue: 'default-banner.jpg'
        },
        cash: {
            type: dataTypes.DECIMAL(15,2),
            allowNull: false, 
            defaultValue: 0

        },
        creation_date: {
            type: dataTypes.DATE(),
            defaultValue: null

        },
        last_updated: {
            type: dataTypes.DATE(),
            defaultValue: null
        }
    }

    let config = {
        tableName: "Users",
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config)

    // Associations
    User.associate = function (models) {
        User.hasMany(models.Product, {
            as: "products",
            foreignKey: "user_id"
        });

        User.belongsToMany(models.Product, {
            as: "favProducts",
            through: "Favorites",
            foreignKey: "user_id",
            otherKey: "product_id",
            timestamps: false
        });

        User.hasMany(models.Shopping_cart, {
            as: "shoppingCarts",
            foreignKey: "user_id"
        });

    }

    return User
}
