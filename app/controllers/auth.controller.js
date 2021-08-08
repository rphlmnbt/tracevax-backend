const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
const UserDetails = db.UserDetails;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(credentials => {
        // Save User Details to Database
        UserDetails.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            contact_number: req.body.contact_number,
            gender : req.body.gender,
            civil_status : req.body.civil_status,
            birth_date : req.body.birth_date,
            home_address : req.body.home_address,
            uuid_creds : credentials.uuid_creds
        })
        res.send({ message: "User registered successfully!" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  const {uuid_creds} = req.params;
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 8)
  }
    User.update(req.body, {
    where: { uuid_creds: uuid_creds }
  }).then(credentials => {
    UserDetails.update(req.body, {
      where: { uuid_creds: uuid_creds}
    })
  })
    .then(() => {
      res.send({
        message: "User was updated successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with uuid=" + uuid_creds
      });
    });
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(credentials => {
      if (!credentials) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        credentials.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: credentials.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        uuid: credentials.uuid_creds,
        email: credentials.email,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

