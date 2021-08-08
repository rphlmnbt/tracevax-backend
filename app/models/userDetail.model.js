'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserDetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserDetails.belongsTo(models.User, {
                foreignKey: {
                    name: 'uuid_creds'
                }
            });
        }
    };
    UserDetails.init({
        uuid_details: {
            type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
                allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
                allowNull: false
        },
        contact_number : {
            type: DataTypes.STRING,
                allowNull: false
        },
        gender : {
            type: DataTypes.STRING,
                allowNull: false
        },
        civil_status : {
            type: DataTypes.STRING,
                allowNull: false
        },
        birth_date : {
            type: DataTypes.STRING,
                allowNull: false
        },
        home_address : {
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
        modelName: 'UserDetails',
        underscored: true
    });
    return UserDetails;
};