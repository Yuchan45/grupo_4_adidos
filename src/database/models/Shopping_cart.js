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
        tableName: "Shopping_carts"
    }

    let Shopping_cart = sequelize.define(alias, cols, config)

    return Shopping_cart
}
