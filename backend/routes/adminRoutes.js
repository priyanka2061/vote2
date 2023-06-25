const express = require("express");
const router = express.Router();
const {
  register,
  logIn,
  logout,
  getAdminProfile,
} = require("../controller/adminController");
const { isAdmin } = require("../middleware/authMiddleware");

// To Register a new Admin
router.route("/register").post(register);

// Login
router.route("/login").post(logIn);

// Logout
router.route("/logout").get(logout);

// Admin Profile
router.route("/me").get(isAdmin, getAdminProfile);

module.exports = router;
