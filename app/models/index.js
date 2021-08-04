const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

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

db.credentials = require("./credentials.model.js")(sequelize, Sequelize);
db.details = require("./details.model.js")(sequelize, Sequelize);
db.logs = require("./logs.model.js")(sequelize, Sequelize);
db.vaccinecard = require("./vaccinecard.model.js")(sequelize, Sequelize);
db.id = require("./id.model.js")(sequelize, Sequelize);

db.credentials.hasOne(db.details, {
  foreignKey: {
    name: 'uuid_creds'
  }
});
db.details.belongsTo(db.credentials, {
  foreignKey: {
    name: 'uuid_creds'
  }
});

db.id.hasOne(db.vaccinecard, {
  foreignKey: {
    name: 'id_IDCard'
  }
})
db.vaccinecard.belongsTo(db.id, {
  foreignKey: {
    name: 'id_IDCard'
  }
})

module.exports = db;