const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const twilio = require('twilio');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());
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


// app.post('/api/generate-otp', async (req, res) => {
//   try {
//     const { mobile } = req.body;

//     // Generate a random 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000);

//     // Send the OTP via SMS using Twilio
//     await client.messages.create({
//       body: `Your OTP is: ${otp}`,
//       from: 'your_twilio_phone_number',
//       to: `+${mobile}`,
//     });

//     res.json({ success: true, otp });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`PORT started at ${PORT}`);
});
