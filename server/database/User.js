module.exports = (sequelize, DataTypes) => {
    // Example
    const User = sequelize.define('User', {
        oneTimeId: {
            type: DataTypes.TEXT,
            primaryKey: true,
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        clearanceLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: "users",
    });

    User.associate = (models) => {
        
    }

    User.prototype.toJSON = function() {
        let values = Object.assign({}, this.get());
        delete values.password_digest;
        return values;
    }

    return User;
};
