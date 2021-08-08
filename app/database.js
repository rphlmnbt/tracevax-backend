const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    dialectOptions: {
        useUTC: false, // for reading from database
    },
    timezone: '+08:00', // for writing to database
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.credentials = require("./user.model.js")(sequelize, Sequelize);
db.details = require("./userDetail.model.js")(sequelize, Sequelize);
db.logs = require("./log.model.js")(sequelize, Sequelize);
db.vaccinecard = require("./vaccineCard.model.js")(sequelize, Sequelize);
db.id = require("./idCard.model.js")(sequelize, Sequelize);

module.exports = db;