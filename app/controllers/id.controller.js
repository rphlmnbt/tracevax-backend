const db = require("../models");
const ID = db.id;
const Op = db.Sequelize.Op;

// Create and Save a new ID
exports.create = (req, res) => {
    // Validate request
    if (!req.body.uuid_creds) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }

    // Create an ID Entry
    const id = {
        src: req.body.src,
        uuid_creds: req.body.uuid_creds
    };
    // Save Log Entry in the database
    ID.create(id)
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

// Retrieve all IDs from the database.
exports.findAll = (req, res) => {
    const {id} = req.query;
    const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
    ID.findAll({ where: condition })
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

// Find a single ID with an uuid
exports.findOne = (req, res) => {
    const {uuid_creds} = req.params;
  
    ID.findByPk(uuid_creds)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Log Entry with uuid=" + uuid_creds
        });
      });
};

// Update an ID by the uuid in the request
exports.update = (req, res) => {
    const {uuid_creds} = req.params;

    ID.update(req.body, {
      where: { uuid_creds: uuid_creds }
    })
      .then(num => {
        if (num == 1) {
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
  req.body.isActive = false;
  req.body.isDeleted = true;
  ID.update(req.body, {
    where: { uuid_creds: uuid_creds }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Log Entry was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Log Entry with uuid=${uuid_creds}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting Log Entry with uuid=" + uuid_creds
      });
    });
};

// Delete all Log Entries from the database.
exports.deleteAll = (req, res) => {
  req.body.isActive = false;
  req.body.isDeleted = true;
  ID.update(req.body)
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Log Entry was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Log Entry with uuid=${uuid_creds}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting Log Entry with uuid=" + uuid_creds
      });
    });
};

