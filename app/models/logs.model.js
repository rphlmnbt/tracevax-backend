module.exports = (sequelize, Sequelize) => {
    const Logs = sequelize.define("logs", {
        location : {
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
    return Logs;
};