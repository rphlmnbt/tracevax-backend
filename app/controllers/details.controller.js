const db = require("../models");
const Details = db.details;
const Op = db.Sequelize.Op;

// Retrieve all User's Details from the database.
exports.findAll = (req, res) => {
    const uuid_details = req.query.uuid_details;
    var condition = uuid_details ? { uuid_details: { [Op.like]: `%${uuid_details}%` } } : null;
  
    Details.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving User's Details."
        });
      });
};

// Find a single User's Details with an uuid
exports.findOne = (req, res) => {
    const uuid_details = req.params.uuid_details;
  
    Details.findByPk(uuid_details)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User's Details with uuid=" + uuid_details
        });
      });
};

// Update a User's Details by the uuid in the request
exports.update = (req, res) => {
    const uuid_details = req.params.uuid_details;
  
    Details.update(req.body, {
      where: { uuid_details: uuid_details}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User's Details were updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User's Details with uuid=${uuid_details}. Maybe User's Details were not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User's Details with uuid=" + uuid_details
        });
      });
};

// Delete a User's Details with the specified uuid_details in the request
exports.delete = (req, res) => {
    const uuid_details = req.params.uuid_details;
  
    Details.destroy({
      where: { uuid_details: uuid_details }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User's Details were deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User's Details with uuid=${uuid_details}. Maybe User's Details were not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User's Details with uuid=" + uuid_details
        });
      });
};

// Delete all of User's Details from the database.
exports.deleteAll = (req, res) => {
  Details.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} User's Details were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all user details."
        });
      });
};

