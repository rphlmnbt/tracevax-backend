module.exports = app => {
    const vaccinecard = require("../controllers/vaccinecard.controller.js");
  
    var router = require("express").Router();
  
    // Create New Vaccine Card
    router.post("/", vaccinecard.create);

    // Retrieve all Vaccine Cards
    router.get("/", vaccinecard.findAll);
  
    // Retrieve a single Vaccine Card with uuid
    router.get("/:uuid_creds", vaccinecard.findOne);
  
    // Update a single Vaccine Card with uuid
    router.put("/update/:uuid_creds", vaccinecard.update);
  
    // Delete a single Vaccine Card with uuid
    router.put("/delete/:uuid_creds", vaccinecard.delete);
  
    // Delete all Vaccine Cards
    router.put("/deleteall", vaccinecard.deleteAll);
  
    app.use('/api/vaccinecard', router);
  };