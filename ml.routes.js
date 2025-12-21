const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth.middleware');
const mlController = require('../controllers/ml.controller');
const { adminOnly } = require('../middleware/role.middleware');

// Employee ML routes
router.post('/productivity', protect, mlController.runProductivityML);
router.post('/burnout', protect, mlController.runBurnoutDetection);
router.post('/anomaly', protect, mlController.runAnomalyDetection);
router.post('/insights', protect, mlController.runPerformanceInsights);

// Admin ML dashboard routes
router.get('/admin/productivity', protect, adminOnly, mlController.adminProductivityOverview);
router.get('/admin/burnout', protect, adminOnly, mlController.adminBurnoutOverview);
router.get('/admin/anomaly', protect, adminOnly, mlController.adminAnomalyOverview);

module.exports = router;
