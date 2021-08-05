module.exports = (sequelize, Sequelize) => {
    const ID = sequelize.define("id_card", {
        id_IDCard: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        src : {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return ID;
};