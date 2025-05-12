const express = require("express");
const router = express.Router();
const {
    registerCustomer,
     allCustomer, 
     singleCustomer}
      = require("../controllers/customerController");
      //[POST]: register customer
    router.post("/register",customerController.registerCustomer);

    //GET getall customer
    router.get("/all", customerController.allCustomer); 

    //GET single customer
    router.get("/:id", customerController.singleCustomer);
    module.exports = router;
