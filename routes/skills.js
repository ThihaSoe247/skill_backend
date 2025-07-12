const express = require("express");
const skillController = require("../controllers/skillController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public
router.get("/", skillController.getAllSkills);

// Protected
router.post("/create-skill", authMiddleware, skillController.createSkill);
router.get("/my-skills", authMiddleware, skillController.getMySkills);
router.delete("/:id", authMiddleware, skillController.deleteSkill);
router.patch("/edit/:id", authMiddleware, skillController.updateSkill);
router.get("/:id", authMiddleware, skillController.getOneSkill);

module.exports = router;
