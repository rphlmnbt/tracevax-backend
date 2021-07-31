const db = require("../models");
const Credentials = db.credentials;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const uuid_creds = req.query.uuid_creds;
    var condition = uuid_creds ? { uuid_creds: { [Op.like]: `%${uuid_creds}%` } } : null;
  
    Credentials.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving user."
        });
      });
};

// Find a single User with an uuid
exports.findOne = (req, res) => {
    const uuid_creds = req.params.uuid_creds;
  
    Credentials.findByPk(uuid_creds)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with uuid=" + uuid_creds
        });
      });
};

// Update a User by the uuid in the request
exports.update = (req, res) => {
    const uuid_creds = req.params.uuid_creds;
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 8)
    }
  
    Credentials.update(req.body, {
      where: { uuid_creds: uuid_creds }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with uuid=${uuid_creds}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with uuid=" + uuid_creds
        });
      });
};

// Delete a User with the specified uuid_creds in the request
exports.delete = (req, res) => {
    const uuid_creds = req.params.uuid_creds;
  
    Credentials.destroy({
      where: { uuid_creds: uuid_creds }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User were deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with uuid=${uuid_creds}. Maybe User were not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with uuid=" + uuid_creds
        });
      });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  Credentials.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Users were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      });
};

