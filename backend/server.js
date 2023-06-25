const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const cookieParser = require("cookie-parser");
// Database
const connectDB = require("./config/database");
connectDB();
// Middleware
const { errorHandler } = require("./middleware/errorHandler");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes Call
const adminRoutes = require("./routes/adminRoutes");
const voterRoutes = require("./routes/voterRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

// Routes Use
app.use("/api/admin", adminRoutes);
app.use("/api/voter", voterRoutes);
app.use("/api/candidate", candidateRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Server run successfully");
});

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`PORT started at ${PORT}`);
});
