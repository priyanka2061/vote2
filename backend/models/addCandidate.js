const mongoose = require("mongoose");
const candidateSchema = mongoose.Schema(
  {
    candidateName: {
      type: String,
      required: true,
    },
    candidatePartyName: {
      type: String,
      required: true,
      unique: true,
    },
    voteCount: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);
module.exports = new mongoose.model(
  "Candidate",
  candidateSchema,
  "candidateCollection"
);
