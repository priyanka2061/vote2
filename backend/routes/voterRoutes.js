const express = require("express");
const router = express.Router();
const {
  getOneVoter,
  getAllVoters,
  addVoter,
  updateVoter,
  deleteVoter,
  voterLogin,
  logout,
  profile,
  vote,
} = require("../controller/voterController");
const { isAdmin, isVoter } = require("../middleware/authMiddleware");

// Admin
router.get("/one/:id", getOneVoter);
router.get("/all", getAllVoters);
router.post("/add", addVoter);
router.delete("/update/:id", updateVoter);
router.delete("/delete/:id", deleteVoter);

// Voter
router.post("/voterlogin", voterLogin);
router.get("/logout", logout);
router.get("/me", isVoter, profile);
router.put("/vote/:id", isVoter, vote);

module.exports = router;
