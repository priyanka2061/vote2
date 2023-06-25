exports.sendToken = (res, admin, message, statusCode) => {
  const token = admin.getJWTToken();

  const options = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: true,
    // sameSite: "none",
  };
  // 15days * 24hours * 60mins * 60secs * 1000ms

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    admin,
    token,
  });
};
