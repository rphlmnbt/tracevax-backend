module.exports = app => {
    const id = require("../controllers/id.controller.js");
  
    var router = require("express").Router();
  
    // Create New ID
    router.post("/", id.create);

    // Retrieve all IDs
    router.get("/", id.findAll);
  
    // Retrieve a single ID with uuid
    router.get("/:uuid_creds", id.findOne);
  
    // Update a single ID with uuid
    router.put("/update/:uuid_creds", id.update);
  
    // Delete a single ID with uuid
    router.put("/delete/:uuid_creds", id.delete);
  
    // Delete all IDs
    router.put("/deleteall", id.deleteAll);
  
    app.use('/api/id', router);
  };