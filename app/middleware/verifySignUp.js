const db = require("../models");
const Credentials = db.User;

checkDuplicateEmail = (req, res, next) => {
   // Email
   Credentials.findOne({
    where: {
      email: req.body.email
    }
  }).then(credentials => {
    if (credentials) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return;
    }

    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,

};

module.exports = verifySignUp;