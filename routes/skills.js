const express = require("express");
const skillController = require("../controllers/skillController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Public
router.get("/", getAllSkills);

// Protected
router.post("/", authMiddleware, createSkill);
router.get("/my-posts", authMiddleware, getMySkills);
router.delete("/:id", authMiddleware, deleteSkill);
