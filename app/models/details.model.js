module.exports = (sequelize, Sequelize) => {
    const Details = sequelize.define("user_details", {
        uuid_details: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contact_number : {
            type: Sequelize.STRING,
            allowNull: false
        },
        gender : {
            type: Sequelize.STRING,
            allowNull: false
        },
        civil_status : {
            type: Sequelize.STRING,
            allowNull: false
        },
        birth_date : {
            type: Sequelize.STRING,
            allowNull: false
        },
        home_address : {
            type: Sequelize.STRING,
            allowNull: false
        },
        isActive : {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        isDeleted : {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    return Details;
};