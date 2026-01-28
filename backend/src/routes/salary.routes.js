const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/role.middleware");

const {
  createSalary,
  getMySalary,
  getAllSalaries,
  getSalaryStats
} = require("../controllers/salary.controller");

// ADMIN
router.post("/", protect, adminOnly, createSalary);
router.get("/admin", protect, adminOnly, getAllSalaries);
router.get("/admin/stats", protect, adminOnly, getSalaryStats);

// EMPLOYEE
router.get("/me", protect, getMySalary);

module.exports = router;





