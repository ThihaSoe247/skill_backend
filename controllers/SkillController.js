const Skill = required("../models/Skill.js");
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
      const savedSkill = await skill.saved();
      res.status(201).json(savedSkill);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to create skill", error: err.message });
    }
  },

  // GET /api/skills
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

  // GET /api/skills/my-posts
  getMySkills: async (req, res) => {
    try {
      const skills = await Skill.find({ user: req.user });
      res.json(skills);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to fetch your skills", error: err.message });
    }
  },

  // DELETE /api/skills/:id
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
};
