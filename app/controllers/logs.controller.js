const db = require("../models");
const Logs = db.logs;
const Op = db.Sequelize.Op;

// Create and Save a new Log Entry
exports.create = (req, res) => {
    // Validate request
    if (!req.body.uuid_creds) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }

    // Create a Log Entry
    const log = {
        uuid_creds: req.body.uuid_creds,
        location: req.body.location
    };
    // Save Log Entry in the database
    Logs.create(log)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Log Entry."
        });
    });
};

// Retrieve all Logs from the database.
exports.findAll = (req, res) => {
    const {uuid_creds} = req.query;
    const condition = uuid_creds ? { uuid_creds: { [Op.like]: `%${uuid_creds}%` } } : null;
  
    Logs.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving logs."
        });
      });
};

// Find a single Log Entry with an uuid
exports.findOne = (req, res) => {
    const {uuid_creds} = req.params;
  
    Logs.findByPk(uuid_creds)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Log Entry with uuid=" + uuid_creds
        });
      });
};

// Update a Log Entry by the uuid in the request
exports.update = (req, res) => {
    const {uuid_creds} = req.params;

    Logs.update(req.body, {
      where: { uuid_creds: uuid_creds }
    })
      .then(num => {
        if (num === 1) {
          res.send({
            message: "Log Entry was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Log Entry with uuid=${uuid_creds}. Maybe Log Entry was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Log Entry with uuid=" + uuid_creds
        });
      });
};

// Delete a Log Entry with the specified uuid_creds in the request
exports.delete = (req, res) => {
    const {uuid_creds} = req.params;
  
    Logs.destroy({
      where: { uuid_creds: uuid_creds }
    })
      .then(num => {
        if (num === 1) {
          res.send({
            message: "Log Entry was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Log Entry with uuid=${uuid_creds}. Maybe Log Entry was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Log Entry with uuid=" + uuid_creds
        });
      });
};

// Delete all Log Entries from the database.
exports.deleteAll = (req, res) => {
  Logs.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Log Entries were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all logs entries."
        });
      });
};

