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

db.credentials = require("./credentials.model.js")(sequelize, Sequelize);
db.details = require("./details.model.js")(sequelize, Sequelize);
db.logs = require("./logs.model.js")(sequelize, Sequelize);
db.vaccinecard = require("./vaccinecard.model.js")(sequelize, Sequelize);
db.id = require("./id.model.js")(sequelize, Sequelize);

//Creds to Details - One to One
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

//Creds to ID - One to One
db.credentials.hasOne(db.id, {
  foreignKey: {
    name: 'uuid_creds'
  }
});
db.id.belongsTo(db.credentials, {
  foreignKey: {
    name: 'uuid_creds'
  }
})

//Creds to Vaccnine Card - One to One
db.credentials.hasOne(db.vaccinecard, {
  foreignKey: {
    name: 'uuid_creds'
  }
});
db.vaccinecard.belongsTo(db.credentials, {
  foreignKey: {
    name: 'uuid_creds'
  }
})

//Creds to Logs - One to Many
db.credentials.hasMany(db.logs, {
  foreignKey: {
    name: 'uuid_creds'
  }
});
db.logs.belongsTo(db.credentials, {
  foreignKey: {
    name: 'uuid_creds'
  }
})

module.exports = db;