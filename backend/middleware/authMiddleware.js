const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const AdminModel = require("../models/adminModel");

const isAdmin = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401);
    throw new Error("You are not Admin");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.admin = await AdminModel.findById(decoded._id);
  next();
});

module.exports = { isAdmin };
