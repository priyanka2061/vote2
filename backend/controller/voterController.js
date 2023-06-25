const VoterModel = require("../models/voterModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { sendTokenVoter } = require("../utils/sendToken");

// Get One Voter
exports.getOneVoter = asyncHandler(async (req, res) => {
  const id = req.params;
  const voter = await VoterModel.findOne(id);
  if (!voter) {
    res.status(404);
    throw new Error("No voter found");
  }

  res.status(201).json({
    voter,
  });
});

// Get All Voter
exports.getAllVoters = asyncHandler(async (req, res) => {
  const allVoters = await VoterModel.find();
  if (allVoters.length === 0) {
    res.status(404);
    throw new Error("Something went wrong");
  }

  res.status(201).json({
    message: "All Voters",
    allVoters,
  });
});

// Add Voter
exports.addVoter = asyncHandler(async (req, res) => {
  const { name, mobile, adhar } = req.body;
  const voterExists = await VoterModel.findOne({ mobile });
  if (voterExists) {
    res.status(400);
    throw new Error("Voter already exists");
  }

  let number = mobile;
  // Using slice()
  let lastThreeSlice = number.slice(-3);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adhar, salt);

  const voter = await VoterModel.create({
    name,
    mobile,
    adharNumber: lastThreeSlice,
    adhar: hashedPassword,
    isVoted: false,
  });

  if (voter) {
    sendTokenVoter(res, voter, "Voter added", 201);
  } else {
    res.status(400);
    throw new Error("Invalid Voter data");
  }
});

// Update Voter
exports.updateVoter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const voter = await VoterModel.findById(id);
  if (!voter) {
    res.status(404);
    throw new Error("No voter found");
  }

  const updatedVoter = await VoterModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({ message: "Voter Updated", updatedVoter });
});

// Delete Voter
exports.deleteVoter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const voter = await VoterModel.findByIdAndDelete(id);
  if (!voter) {
    res.status(404);
    throw new Error("No voter found");
  }
  res.status(200).json({ message: "Voter Deleted" });
});

// Voter Login
exports.voterLogin = asyncHandler(async (req, res) => {
  const { name, mobile, adhar } = req.body;
  if (!name || !mobile || !adhar) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const voter = await VoterModel.findOne({ mobile });
  if (!voter) {
    res.status(401);
    throw new Error("Voter Not Found. Ask ADMIN to add you as Voter !!!");
  }

  // if (voter && (await bcrypt.compare(adhar, voter.adhar))) {
  //   const voterToken = voter.mobile;
  //   const options = {
  //     expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  //     httpOnly: true,
  //   };
  //   res
  //     .status(200)
  //     .cookie("voterToken", voterToken, options)
  //     .json({ message: "Logged In", voter, voterToken });
  // } else {
  //   res.status(400);
  //   throw new Error("Invalid Credentials");
  // }

  if (voter && (await bcrypt.compare(adhar, voter.adhar))) {
    sendTokenVoter(
      res,
      voter,
      `Welcome to Voting App... Hope you have fun`,
      200
    );
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// Voter Logout
exports.logout = asyncHandler(async (req, res) => {
  res
    .status(200)
    .cookie("voterToken", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out...Sorry to see you go",
    });
});

// Voter Profile
exports.profile = asyncHandler(async (req, res) => {
  const voter = await VoterModel.findById(req.voter._id);
  if (!voter) {
    res.status(401);
    throw new Error("Something went wrong");
  }
  res.status(200).json({ voter });
});

// Vote Functionality
