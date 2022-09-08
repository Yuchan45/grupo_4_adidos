module.exports = function(sequelize, dataTypes) {
    let alias = "Category"

    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true, 
            allowNull: false
        },
        name: {
            type: dataTypes.VARCHAR(100), 
            allowNull: false
        },
    }

    let config = {
        tableName: "Categories"
    }

    let Category = sequelize.define(alias, cols, config)

    return Category
}
