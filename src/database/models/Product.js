module.exports = function(sequelize, dataTypes) {
    let alias = "Product"

    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true, 
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            defaultValue: null
        },
        brand_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            defaultValue: null
        },
        model: {
            type: dataTypes.STRING(100), 
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(1000),
            defaultValue: null
        },
        price: {
            type: dataTypes.DECIMAL(15,2), 
            allowNull: false
        },
        dicount: {
            type: dataTypes.DECIMAL(5,1), 
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(200),
            defaultValue: 'default.png'
        },
        gender: {
            type: dataTypes.STRING(50), 
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER(5), 
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            defaultValue: null
        },
        colors_hexa: {
            type: dataTypes.STRING(200),
            defaultValue: null
        },
        size_eur: {
            type: dataTypes.INTEGER(5), 
            allowNull: false
        },
        creation_date: {
            type: dataTypes.DATE(),
            defaultValue: null
        },
        last_update: {
            type: dataTypes.DATE(),
            defaultValue: null
        },
    }

    let config = {
        tableName: "Products"
    }

    let Product = sequelize.define(alias, cols, config)

    // Associations
    Product.associate = function (models) {
        Product.belongsTo(models.Brand, {
            as: "brands",
            foreignKey: "brand_id"
        });

        Product.belongsTo(models.Category, {
            as: "categories",
            foreignKey: "category_id"
        });

        Product.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id"
        });
    }

    return Product
}
