module.exports = app => {
    const logs = require("../controllers/logs.controller.js");
  
    var router = require("express").Router();

    // Create New Logs
    router.post("/", logs.create);

    // Retrieve all Logs
    router.get("/", logs.findAll);
  
    // Retrieve a single Log Entry with uuid
    router.get("/:uuid_creds", logs.findOne);
  
    // Update a single Log Entry with uuid
    router.put("/update/:uuid_creds", logs.update);
  
    // Delete a single Log Entry with uuid
    router.put("/delete/:uuid_creds", logs.delete);
  
    // Delete all Log Entries
    router.put("/deleteall", logs.deleteAll);
  
    app.use('/api/logs', router);
  };