module.exports = (sequelize, DataTypes) => {
    // Example
    const User = sequelize.define('User', {
        oneTimeId: {
            type: DataTypes.TEXT,
            unique: true,
        },
        fullName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        clearanceLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        passwordDigest: DataTypes.TEXT,
        endpoint: DataTypes.TEXT,
    }, {
        sequelize,
        tableName: "users",
    });

    User.associate = (models) => {
        
    }

    User.prototype.toJSON = function() {
        let values = Object.assign({}, this.get());
        delete values.passwordDigest;
        return values;
    }

    return User;
};
