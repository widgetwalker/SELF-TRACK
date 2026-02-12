const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/role.middleware");

const {
  runProductivityML,
  runBurnoutDetection,
  runAnomalyDetection,
  runPerformanceInsights,
  getProductivityHistory,
  adminProductivityOverview,
  adminBurnoutOverview,
  adminAnomalyOverview
} = require("../controllers/ml.controller");

/* =======================
   EMPLOYEE ML ROUTES
======================= */
router.post("/productivity", protect, runProductivityML);
router.get("/productivity/history", protect, getProductivityHistory);

router.post("/burnout", protect, runBurnoutDetection);
router.post("/anomaly", protect, runAnomalyDetection);
router.get("/insights", protect, runPerformanceInsights);

/* =======================
   ADMIN ML ROUTES
======================= */
router.get("/admin/productivity", protect, adminOnly, adminProductivityOverview);
router.get("/admin/burnout", protect, adminOnly, adminBurnoutOverview);
router.get("/admin/anomaly", protect, adminOnly, adminAnomalyOverview);

module.exports = router;


