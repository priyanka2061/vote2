const AdminModel = require("../models/adminModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { sendToken } = require("../utils/sendToken");

// Register
const register = asyncHandler(async (req, res) => {
  const { adminName, adminPassword } = req.body;
  if (!adminName || !adminPassword) {
    res.status(400);
    // throw new Error("Please add all fields");
  }

  const adminExists = await AdminModel.findOne({ adminName });
  if (adminExists) {
    res.status(400);
    // throw new Error("Admin already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminPassword, salt);

  const admin = await AdminModel.create({
    adminName,
    adminPassword: hashedPassword,
  });

  if (admin) {
    sendToken(res, admin, "Registered Successfully", 201);
  } else {
    res.status(400);
    // throw new Error("Invalid admin data");
  }
});

// Admin Login
const logIn = asyncHandler(async (req, res) => {
  const { adminName, adminPassword } = req.body;
  if (!adminName || !adminPassword) {
    res.status(400);
    // throw new Error("Please add all fields");
  }

  const admin = await AdminModel.findOne({ adminName });
  if (!admin) {
    res.status(401);
    // throw new Error("Incorrect Credentials");
  }

  if (admin && (await bcrypt.compare(adminPassword, admin.adminPassword))) {
    sendToken(res, admin, `Welcome to Voting App... Hope you have fun`, 200);
  } else {
    res.status(400);
    // throw new Error("Invalid Credentials");
  }
});

// Logout
const logout = asyncHandler(async (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out...Sorry to see you go",
    });
});

// Admin Profile
const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await AdminModel.findById(req.admin._id);
  // console.log("hello");
  if (!admin) {
    // res.status(401);
    // throw new Error("Something went wrong");
  }
  res.status(200).json({
    // admin,
    id: admin._id,
    admin: admin.adminName,
  });
});

module.exports = {
  register,
  logIn,
  logout,
  getAdminProfile,
};
