const db = require("../models");
const Details = db.details;
const Op = db.Sequelize.Op;

// Retrieve all User's Details from the database.
exports.findAll = (req, res) => {
    const {uuid_details} = req.query;
    const condition = uuid_details ? { uuid_details: { [Op.like]: `%${uuid_details}%` } } : null;
  
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
    const {uuid_details} = req.params;
  
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
    const {uuid_details} = req.params;
  
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
  const {uuid_details} = req.params;
  req.body.isActive = false;
  req.body.isDeleted = true;
  
  Details.update(req.body, {
    where: { uuid_details: uuid_details }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete User with uuid=${uuid_details}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting User with uuid=" + uuid_details
      });
    });
};

// Delete all of User's Details from the database.
exports.deleteAll = (req, res) => {
  req.body.isActive = false;
  req.body.isDeleted = true;

  Details.update(req.body,{where: {  }})
    .then(msg => {
      res.send({
        message: "User Details were deleted successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting User Details"
      });
    });
};

