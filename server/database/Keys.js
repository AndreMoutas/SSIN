module.exports = (sequelize, DataTypes) => {
    // Example
    const Keys = sequelize.define('Keys', {
        from: {
            type: DataTypes.TEXT,
            primaryKey: true,
        },
        to: {
            type: DataTypes.TEXT,
            primaryKey: true,
        },
        encryptionKey: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        decryptionKey: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "keys",
    });
    return Keys;
};