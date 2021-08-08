'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VaccineCard extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            VaccineCard.belongsTo(models.User, {
                foreignKey: {
                    name: 'uuid_creds'
                }
            })
        }
    };
    VaccineCard.init({
        src : {
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
        modelName: 'VaccineCard',
        underscored: true
    });
    return VaccineCard;
};