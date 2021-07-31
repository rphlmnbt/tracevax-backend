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
        }
    });
    return Credentials;
};