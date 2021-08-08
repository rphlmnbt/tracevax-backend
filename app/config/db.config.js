// require('dotenv').config()
// module.exports = {
//     HOST: process.env.HOST,
//     USER: process.env.USER,
//     PASSWORD: process.env.PASSWORD,
//     DB: process.env.DB,
//     dialect: process.env.DIALECT,
//     pool: {
//       max: process.env.POOL_MAX,
//       min: process.env.POOL_MIN,
//       acquire: process.env.POOL_ACQUIRE,
//       idle: process.env.POOL_IDLE
//     }
// };

module.exports = {
    HOST: "Raph",
    USER: "superuser",
    PASSWORD: "password",
    DB: "tracevax",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};