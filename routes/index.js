const express = require("express");
const router = express.Router();
//routes for authentication , contact
router.use("/contact", require("./contact"));
router.use("/auth", require("./auth"));

module.exports = router;
