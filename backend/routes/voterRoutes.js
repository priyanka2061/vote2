const express = require("express");
const router = express.Router();
const controller=require('../controller/voterController')
const { isAdmin, isVoter } = require("../middleware/authMiddleware");

// Admin
// router.post("/one/:id", getOneVoter);
// router.post("/all", getAllVoters);
// router.post("/add", addVoter);
// router.delete("/update/:id", updateVoter);
// router.delete("/delete/:id", deleteVoter);

// Voter
router.route("/voterlogin").post(controller.voterLogin);
//router.get("/logout", logout);
// router.get("/me", isVoter, profile);
// router.put("/vote/:id", isVoter, vote);
router.route("/otpverification").post(controller.verificationOTP);
router.route("/numbersend").post(controller.varificationNumber); 
router.route("/getdetails").get(controller.getdata);

module.exports = router;
