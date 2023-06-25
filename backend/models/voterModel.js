const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const voterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    adharNumber: {
      type: String,
      required: true,
    },
    adhar: {
      type: String,
      required: true,
    },
    isVoted: {
      type: Boolean,
    },
  },
  { versionKey: false }
);

voterSchema.methods.getJWTToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15d",
    }
  );
};
module.exports = mongoose.model("Voter", voterSchema);
