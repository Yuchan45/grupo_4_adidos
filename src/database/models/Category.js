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
            type: dataTypes.STRING(100), 
            allowNull: false
        },
    }

    let config = {
        tableName: "Categories",
        timestamps: false
    }

    let Category = sequelize.define(alias, cols, config)

    // Associations
    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "category_id"
        });
    }

    return Category
}
