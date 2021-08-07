module.exports = (sequelize, Sequelize) => {
    const VaccineCard = sequelize.define("vaccine_card", {
        src : {
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
    return VaccineCard;
};