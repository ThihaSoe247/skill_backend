const express = require("express");

const router = express.Router();
delete require.cache[require.resolve("../controllers/AuthController")];

const authController = require("../controllers/AuthController");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
