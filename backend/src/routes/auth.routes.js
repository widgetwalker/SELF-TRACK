const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

/*  DEBUG MIDDLEWARE (TEMPORARY) */
router.use((req, res, next) => {
  console.log("---- AUTH ROUTE HIT ----");
  console.log("METHOD:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("HEADERS content-type:", req.headers["content-type"]);
  console.log("BODY:", req.body);
  console.log("------------------------");
  next();
});

/* AUTH ROUTES */
router.post("/register", authController.register);
router.post("/login", authController.login);

/* PROTECTED ROUTE */
router.get("/me", protect, authController.getMe);

module.exports = router;
