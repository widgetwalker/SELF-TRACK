const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

//  PROTECTED ROUTE
router.get('/me', protect, authController.getMe);

module.exports = router;

