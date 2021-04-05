module.exports = (sequelize, DataTypes) => {
    // Example
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        password_digest: {
            type: DataTypes.TEXT,
            allowNull: false
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
