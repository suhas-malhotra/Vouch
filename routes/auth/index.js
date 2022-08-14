const express = require("express");
const authAPI = require("../../controllers/auth_api");
const router = express.Router();

//Authentication API

// API
// Get a JWT Token for authentication
//API Working
router.get("/token", authAPI.getToken);

module.exports = router;
