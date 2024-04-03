const {Model , DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {};

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
    },
    {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});

module.exports = User;