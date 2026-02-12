const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/role.middleware');

//  Admin-only test route
router.get('/dashboard', protect, adminOnly, (req, res) => {
  res.json({
    message: 'Welcome Admin ',
    admin: req.user.email
  });
});

module.exports = router;
