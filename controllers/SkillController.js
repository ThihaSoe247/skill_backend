const Skill = require("../models/Skill.js");
const mongoose = require("mongoose");
const SkillController = {
  createSkill: async (req, res) => {
    const { teach, learn, description } = req.body;

    try {
      const skill = new Skill({
        user: req.user,
        teach,
        learn,
        description,
      });
      const savedSkill = await skill.save();
      res.status(201).json(savedSkill);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to create skill", error: err.message });
    }
  },

  getAllSkills: async (req, res) => {
    try {
      const skills = await Skill.find().populate("user", "name email");
      res.json(skills);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to fetch skills", error: err.message });
    }
  },

  // Get only logged-in user's skills (private)
  getMySkills: async (req, res) => {
    try {
      const skills = await Skill.find({ user: req.user }).populate(
        "user",
        "name email"
      );

      res.json({ skills });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to fetch skills", error: err.message });
    }
  },

  deleteSkill: async (req, res) => {
    try {
      const skill = await Skill.findById(req.params.id);

      if (!skill) {
        return res.status(404).json({ message: "Skill not found" });
      }

      if (skill.user.toString() !== req.user) {
        return res.status(403).json({ message: "Not authorized" });
      }

      await skill.deleteOne();
      res.json({ message: "Skill deleted" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to delete skill", error: err.message });
    }
  },
  updateSkill: async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Invalid ID format" });
      }

      const skill = await Skill.findById(id);
      if (!skill) {
        return res.status(404).json({ msg: "Skill not found" });
      }

      // Optional: Check if logged in user owns the skill
      if (skill.user.toString() !== req.user) {
        return res.status(403).json({ message: "Not authorized" });
      }

      skill.teach = req.body.teach;
      skill.learn = req.body.learn;
      skill.description = req.body.description;

      const updatedSkill = await skill.save();
      return res.json(updatedSkill);
    } catch (e) {
      console.error("Update Skill Error:", e.message);
      return res
        .status(500)
        .json({ msg: "Internal Server Error", error: e.message });
    }
  },
  getOneSkill: async (req, res) => {
    try {
      const skill = await Skill.findById(req.params.id).populate(
        "user",
        "name email"
      );

      if (!skill) {
        return res.status(404).json({ message: "Skill not found" });
      }

      return res.status(200).json({ skill }); // ✅ Wrap it here
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  },
};
module.exports = SkillController;
