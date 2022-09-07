const mongoose = require("mongoose");
const voterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    adhar: {
      type: Number,
      required: true,
      unique: true,
    },
    isvote: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);
module.exports = new mongoose.model("Voter", voterSchema, "voterCollection");
