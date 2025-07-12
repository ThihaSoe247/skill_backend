const express = require("express");
const router = express.Router();

const authC = require("../controllers/authController");

router.post("/register", authC.register);
router.post("/login", authC.login);

module.exports = router; // ✅ Only the router is exported
