module.exports = app => {
    const credentials = require("../controllers/credentials.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Users
    router.get("/", credentials.findAll);
  
    // Retrieve a single User with uuid
    router.get("/:uuid_creds", credentials.findOne);
  
    // Update a single User with uuid
    router.put("/update/:uuid_creds", credentials.update);
  
    // Delete a single User with uuid
    router.put("/delete/:uuid_creds", credentials.delete);
  
    // Delete all Users
    router.put("/deleteall", credentials.deleteAll);
  
    app.use('/api/credentials', router);
  };