module.exports = function(sequelize, dataTypes) {
    let alias = "Favorite"

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
        product_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            defaultValue: null
        }
    }

    let config = {
        tableName: "Favorites"
    }

    let Favorite = sequelize.define(alias, cols, config)

    return Favorite
}
