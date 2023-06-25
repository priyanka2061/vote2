// Models
const CandidateModel = require("../models/candidateModel");
// Modules
const asyncHandler = require("express-async-handler");

// Get One Candidate
exports.getOneCandidate = asyncHandler(async (req, res) => {
  const id = req.params;
  const candidate = await CandidateModel.findOne(id);
  if (!candidate) {
    res.status(404);
    throw new Error("No Candidate Found");
  }

  res.status(200).json({ candidate });
});

// Get All Candidates
exports.getAllCandidates = asyncHandler(async (req, res) => {
  const allCandidates = await CandidateModel.find();
  if (allCandidates.length === 0) {
    res.status(404);
    throw new Error("Something went wrong");
  }

  res.status(200).json({
    message: "All Candidates",
    allCandidates,
  });
});

// Add Candidate
exports.addCandidate = asyncHandler(async (req, res) => {
  const { candidateName, candidatePartyName } = req.body;
  const candidate = await CandidateModel.create({
    candidateName,
    candidatePartyName,
    voteCount: 0,
  });

  res.status(201).json({
    message: "Candidate Added",
    candidate,
  });
});

// Update Candidate
exports.updateCandidate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const candidate = await CandidateModel.findById(id);
  if (!candidate) {
    res.status(404);
    throw new Error("No Candidate found");
  }

  const updatedCandidate = await CandidateModel.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({ message: "Candidate Updated", updatedCandidate });
});

// Delete Candidate
exports.deleteCandidate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const candidate = await CandidateModel.findByIdAndDelete(id);
  if (!candidate) {
    res.status(404);
    throw new Error("No Candidate found");
  }
  res.status(200).json({ message: "Candidate Deleted" });
});
