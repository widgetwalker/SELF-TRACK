const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/role.middleware');
const skillController = require('../controllers/skill.controller');

//  Employee
router.get('/my', protect, skillController.getMySkills);
router.post('/my', protect, skillController.addMySkill);
router.put('/my', protect, skillController.updateMySkills);

//  Admin
router.get('/all', protect, adminOnly, skillController.getAllSkills);

module.exports = router;
