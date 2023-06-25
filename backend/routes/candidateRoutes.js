const express = require("express");
const router = express.Router();
const {
  getOneCandidate,
  getAllCandidates,
  addCandidate,
  updateCandidate,
  deleteCandidate,
} = require("../controller/candidateController");
const { isAdmin, isVoter } = require("../middleware/authMiddleware");

router.get("/one/:id", getOneCandidate);
router.get("/all", getAllCandidates);
router.post("/add", addCandidate);
router.put("/update/:id", updateCandidate);
router.delete("/delete/:id", deleteCandidate);

module.exports = router;
