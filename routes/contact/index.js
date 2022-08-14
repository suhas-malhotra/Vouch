const express = require("express");
const contactAPI = require("../../controllers/contact_api");
const { verifyToken } = require("../../middleware/verifyToken");
const router = express.Router();

//Contact API

// API
// Adding Contact
//API Working
router.post("/add", verifyToken, contactAPI.addContact);

// API
// Adding Contact in bulk
//API Working
router.post("/add/many", verifyToken, contactAPI.addManyContact);

// API
// Get a Contact
//API Working
router.get("/details", verifyToken, contactAPI.getContact);

// API
// Search a Contact with a phase
//API Working
router.get("/search", verifyToken, contactAPI.searchContact);

// API
// Update a Contact
//API Working
router.post("/update", verifyToken, contactAPI.updateContact);

// API
// Delete a Contact
//API Working
router.post("/delete", verifyToken, contactAPI.deleteContact);

// API
// List of all contacts 
//API Working
router.get("/list", verifyToken, contactAPI.allContacts);


module.exports = router;
