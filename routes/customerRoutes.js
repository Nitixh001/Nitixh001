const express = require("express");
const router = express.Router();
const {
    registerCustomer,
     allCustomer, 
     singleCustomer}
      = require("../controllers/customerController");
      //[POST]: register customer
    router.post("/register",registerCustomer);

    //GET getall customer
    router.get("/customer",allCustomer); 

    //GET single customer
    router.get("/:id",singleCustomer);
    module.exports = router;
