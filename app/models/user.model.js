'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasOne(models.UserDetails, {
                foreignKey: {
                    name: 'uuid_creds'
                }
            });
            User.hasOne(models.IdCard, {
                foreignKey: {
                    name: 'uuid_creds'
                }
            });
            User.hasOne(models.VaccineCard, {
                foreignKey: {
                    name: 'uuid_creds'
                }
            });
            User.hasMany(models.Log, {
                foreignKey: {
                    name: 'uuid_creds'
                }
            });
        }
    };
    User.init({
        uuid_creds: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'User',
        underscored: true
    });
    return User;
};