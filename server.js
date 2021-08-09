require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// var corsOptions = {
//   origin: ["http://localhost:3000","http://localhost:19006"],
//   optionsSuccessStatus: 200
// };
``
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "TRACEVAX" });
});

// import models
const db = require("./app/models");

// sync database
db.sequelize.sync();

// drop and resync
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
// });

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/credentials.routes')(app);
require('./app/routes/details.routes')(app);
require('./app/routes/logs.routes')(app);
require('./app/routes/image.routes')(app);
require('./app/routes/id.routes')(app);
require('./app/routes/vaccinecard.routes')(app);

// set port, listen for requests
const PORT = process.env.BACKEND_PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}.`);
});