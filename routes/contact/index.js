const express = require("express");
const contactAPI = require("../../controllers/contact_api");
const { verifyToken } = require("../../middleware/verifyToken");
const router = express.Router();

//Contact API

// API
// Adding teacher by admin
//API Working
router.post("/add", verifyToken, contactAPI.addContact);

router.post("/add/many", verifyToken, contactAPI.addManyContact);

router.get("/details", verifyToken, contactAPI.getContact);

router.get("/search", verifyToken, contactAPI.searchContact);

router.post("/update", verifyToken, contactAPI.updateContact);

router.post("/delete", verifyToken, contactAPI.deleteContact);

router.get("/list", verifyToken, contactAPI.allContacts);

module.exports = router;
