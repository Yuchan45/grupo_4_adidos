module.exports = function(sequelize, dataTypes) {
    let alias = "Shopping_cart"

    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true, 
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            defaultValue: null
        },
        transaction_number: {
            type: dataTypes.INTEGER(20),
            defaultValue: null
        },
        status: {
            type: dataTypes.TINYINT(1), 
            allowNull: false
        }
    }

    let config = {
        tableName: "Shopping_carts",
        timestamps: false
    }

    let Shopping_cart = sequelize.define(alias, cols, config);

    // Associations
    Shopping_cart.associate = function (models) {
        Shopping_cart.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id"
        });

        Shopping_cart.belongsToMany(models.Product, {
            as: "products",
            through: "Items",
            foreignKey: "shopping_cart_id",
            otherKey: "product_id",
            timestamps: false
        });
        
        
    }



    return Shopping_cart
}
