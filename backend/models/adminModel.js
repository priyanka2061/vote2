const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
    },
    adminPassword: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

adminSchema.methods.getJWTToken = function () {
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

module.exports = mongoose.model("Admin", adminSchema);
