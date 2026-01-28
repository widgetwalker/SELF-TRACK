const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/role.middleware");

const {
  addSkill,
  getMySkills,
  getAllSkills
} = require("../controllers/skill.controller");

router.post("/", protect, addSkill);
router.get("/me", protect, getMySkills);
router.get("/admin", protect, adminOnly, getAllSkills);

module.exports = router;



