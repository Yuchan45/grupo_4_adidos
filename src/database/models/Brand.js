module.exports = function(sequelize, dataTypes) {
    let alias = "Brand"

    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true, 
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100), 
            allowNull: false
        },
        logo: {
            type: dataTypes.STRING(200)
        }
    }

    let config = {
        tableName: "Brands"
    }

    let Brand = sequelize.define(alias, cols, config)

    return Brand
}
