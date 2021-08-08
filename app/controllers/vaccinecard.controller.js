const db = require("../models");
const VaccineCard = db.VaccineCard;
const Op = db.Sequelize.Op;

// Create and Save a new Vaccine Card
exports.create = (req, res) => {
    // Validate request
    if (!req.body.uuid_creds) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }

    // Create a Vaccine Card
    const vaccinecard = {
        src: req.body.src,
        uuid_creds: req.body.uuid_creds
    };
    // Save Vaccine Card in the database
    VaccineCard.create(vaccinecard)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Vaccine Card."
        });
    });
};

// Retrieve all Vaccine Cards from the database.
exports.findAll = (req, res) => {
    const {id} = req.query;
    const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
    VaccineCard.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Vaccine Cards."
        });
      });
};

// Find a single Vaccine Card with an uuid
exports.findOne = (req, res) => {
    const {uuid_creds} = req.params;
  
    VaccineCard.findByPk(uuid_creds)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Vaccine Card with uuid=" + uuid_creds
        });
      });
};

// Update a Vaccine Card by the uuid in the request
exports.update = (req, res) => {
    const {uuid_creds} = req.params;

    VaccineCard.update(req.body, {
      where: { uuid_creds: uuid_creds }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Vaccine Card was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Vaccine Card with uuid=${uuid_creds}. Maybe Vaccine Card was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Vaccine Card with uuid=" + uuid_creds
        });
      });
};

// Delete an Vaccine Card with the specified uuid_creds in the request
exports.delete = (req, res) => {
  const {uuid_creds} = req.params;
  req.body.isActive = false;
  req.body.isDeleted = true;
  VaccineCard.update(req.body, {
    where: { uuid_creds: uuid_creds }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vaccine Card was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Vaccine Card with uuid=${uuid_creds}. Maybe Vaccine Card was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting Vaccine Card with uuid=" + uuid_creds
      });
    });
};

// Delete all IDs from the database.
exports.deleteAll = (req, res) => {
  req.body.isActive = false;
  req.body.isDeleted = true;
  VaccineCard.update(req.body,{where: {  }})
  .then(msg => {
    res.send({
      message: "Vaccine Cards were deleted successfully."
    });
  })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting Vaccine Cards"
      });
    });
};

