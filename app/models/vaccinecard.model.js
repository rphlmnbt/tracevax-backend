module.exports = (sequelize, Sequelize) => {
    const VaccineCard = sequelize.define("vaccine_card", {
        id_VaccineCard: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        src : {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return VaccineCard;
};