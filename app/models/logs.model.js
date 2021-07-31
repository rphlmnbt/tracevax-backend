module.exports = (sequelize, Sequelize) => {
    const Logs = sequelize.define("logs", {
        uuid_creds: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        location : {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Logs;
};