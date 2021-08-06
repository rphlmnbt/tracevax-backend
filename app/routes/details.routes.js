module.exports = app => {
    const details = require("../controllers/details.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all User Details
    router.get("/", details.findAll);
  
    // Retrieve a single User's Details with uuid
    router.get("/:uuid_details", details.findOne);
  
    // Update a single User's Details with uuid
    router.put("/update/:uuid_details", details.update);
  
    // Delete a single User's Details with uuid
    router.put("/delete/:uuid_details", details.delete);
  
    // Delete all Users' Details
    router.put("/deleteall", details.deleteAll);
  
    app.use('/api/details', router);
  };