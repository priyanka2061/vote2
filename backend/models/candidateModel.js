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
    },
    voteCount: {
      type: Number,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Canditate", candidateSchema);
