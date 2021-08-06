module.exports = (sequelize, Sequelize) => {
    const Credentials = sequelize.define("users", {
        uuid_creds: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        email : {
            type: Sequelize.STRING,
            allowNull: false
        },
        password : {
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
    return Credentials;
};