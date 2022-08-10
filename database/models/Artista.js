module.exports = (sequelize, dataTypes) => {
    let alias = "Artista";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName: "artistas",
        timestamps: false // No tengo columnas que sean de created_at o updated_at.
    };


    const Artista = sequelize.define(alias, cols, config);
    return Artista;
}