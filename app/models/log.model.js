'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Log extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Log.belongsTo(models.User, {
                foreignKey: {
                    name: 'uuid_creds'
                }
            })
        }
    };
    Log.init({
        location : {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        isDeleted : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Log',
        underscored: true
    });
    return Log;
};