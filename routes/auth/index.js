const express = require("express");
const authAPI = require("../../controllers/auth_api");
const router = express.Router();

//Authentication API

// API
// Authentication for Token
//API Working
router.get("/token", authAPI.getToken);

module.exports = router;
