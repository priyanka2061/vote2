// Models
const  validator = require('aadhaar-validator')
const textflow=require("textflow.js")
const VoterModel = require("../models/voterModel");
const CandidateModel = require("../models/candidateModel");
textflow.useKey("Ki7ZVxBWRKk37Vrz03GWm7IO3e0fEu6tpXah5trINJji23YgMgRwysH8OeQVU3fZ");
// // Modules
// const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcrypt");
// // Utils
// const { sendTokenVoter } = require("../utils/sendToken");

// // Get One Voter
// exports.getOneVoter = asyncHandler(async (req, res) => {
//   const id = req.params;
//   const voter = await VoterModel.findOne(id);
//   if (!voter) {
//     res.status(404);
//     throw new Error("No voter found");
//   }

//   res.status(201).json({
//     voter,
//   });
// });

// // Get All Voter
// exports.getAllVoters = asyncHandler(async (req, res) => {
//   const allVoters = await VoterModel.find();
//   if (allVoters.length === 0) {
//     res.status(404);
//     throw new Error("Something went wrong");
//   }

//   res.status(201).json({
//     message: "All Voters",
//     allVoters,
//   });
// });

// // Add Voter
// exports.addVoter = asyncHandler(async (req, res) => {
//   const { name, mobile, adhar } = req.body;
//   const voterExists = await VoterModel.findOne({ mobile });
//   if (voterExists) {
//     res.status(400);
//     throw new Error("Voter already exists");
//   }

//   let number = mobile;
//   // Using slice()
//   let lastThreeSlice = number.slice(-3);

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(adhar, salt);

//   const voter = await VoterModel.create({
//     name,
//     mobile,
//     adharNumber: lastThreeSlice,
//     adhar: hashedPassword,
//     isVoted: false,
//   });

//   if (voter) {
//     sendTokenVoter(res, voter, "Voter added", 201);
//   } else {
//     res.status(400);
//     throw new Error("Invalid Voter data");
//   }
// });

// // Update Voter
// exports.updateVoter = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const voter = await VoterModel.findById(id);
//   if (!voter) {
//     res.status(404);
//     throw new Error("No voter found");
//   }

//   const updatedVoter = await VoterModel.findByIdAndUpdate(id, req.body, {
//     new: true,
//   });

//   res.status(200).json({ message: "Voter Updated", updatedVoter });
// });

// // Delete Voter
// exports.deleteVoter = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const voter = await VoterModel.findByIdAndDelete(id);
//   if (!voter) {
//     res.status(404);
//     throw new Error("No voter found");
//   }
//   res.status(200).json({ message: "Voter Deleted" });
// });
//send otp
module.exports.varificationNumber = async (req, res) => {
  const { number, name,adhar } = req.body;
  console.log(name,number)
  const min = 1000; // Minimum 4-digit number
  const max = 9999; // Maximum 4-digit number
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;
 console.log(otp)
  try {
    const newData = new VoterModel({
      otp,
      name,
      mobile:number,
      adharNumber:adhar,
    });
   
    const savedData = await newData.save();
    // if(savedData.ok){
    //   res.json('added succesfuuly')
    // }
    textflow.sendSMS(`+91${number}`, `Your OTP:${otp}`)
      .then(response => {
        console.log("SMS sent successfully:", response);
        res.status(201).json(savedData); // Send a response to the client after saving and sending SMS
      })
      .catch(error => {
        console.error("Error sending SMS:", error);
        res.status(500).json({ error: 'Failed to send SMS' }); // Send an error response to the client
      });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data' }); // Send an error response to the client
  }
};


module.exports.verificationOTP = async (req, res) => {
  try {
    const { otp, name } = req.body;
    if (!otp || !name) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Find a document based on the provided OTP
    const foundData = await VoterModel.findOne({ otp:otp });

    if (!foundData) {
      return res.status(404).json({ error: 'OTP not found' });
    }

    // Check if the retrieved document's name matches the received name
    if (foundData.name !== name) {
      return res.status(400).json({ error: 'Name does not match with OTP' });
    }

    // OTP and name verification successful
    return res.status(200).json({ message: 'OTP and name verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ error: 'An error occurred during verification' });
  }};


  

module.exports.voterLogin = async (req, res) => {
  const { name, mobile, adhar, otp } = req.body;

  if (!name || !mobile || !adhar || !otp) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  if (!validator.isValidNumber(`${adhar}`)) {
    return res.status(400).json({ error: 'Invalid Aadhar number' });
  }

  try {
    const voter = await VoterModel.findOne({ mobile: mobile, name: name, otp: otp });

    if (!voter) {
      return res.status(401).json({ error: 'Unauthorized - Incorrect credentials' });
    }

    // Update Aadhar if credentials match
    if (voter.mobile === mobile && voter.name === name && voter.otp === otp) {
      const filter = { otp: otp };
      const updateData = { $set: { adharNumber: adhar } };

      await VoterModel.updateOne(filter, updateData);

      return res.status(200).json({ message: 'Login successful and Aadhar updated' });
    } else {
      return res.status(401).json({ error: 'Unauthorized - Incorrect credentials' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

  // Import the VoterModel if not already imported

module.exports.getdata = async (req, res) => {
  try {
    // Fetch data using VoterModel.find()
    const data = await VoterModel.find();
    
    // Send the retrieved data as a JSON response
    res.json(data);
    
    // Make the collection empty after sending the data

  } catch (error) {
    // Handle errors if the data fetching or deletion fails
    console.error('Error fetching data:', error);

    // Send a 500 Internal Server Error response with an error message
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};

  
  // if (voter && (await bcrypt.compare(adhar, voter.adhar))) {
  //   const voterToken = voter.mobile;
  //   const options = {
  //     expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  //     httpOnly: true,
  //   };
  //   res
  //     .status(200)
  //     .cookie("voterToken", voterToken, options)
  //     .json({ message: "Logged In", voter, voterToken });
  // } else {
  //   res.status(400);
  //   throw new Error("Invalid Credentials");
  // }

//   if (voter && (await bcrypt.compare(adhar, voter.adhar))) {
//     sendTokenVoter(
//       res,
//       voter,
//       `Welcome to Voting App... Hope you have fun`,
//       200
//     );
//   } else {
//     res.status(400);
//     throw new Error("Invalid Credentials");
//   }
// });

// // Voter Logout
exports.logout = (async (req, res) => {
  res
    .status(200)
    .cookie("voterToken", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out...Sorry to see you go",
    });
});

// Voter Profile
exports.profile = (async (req, res) => {
  const voter = await VoterModel.findById(req.voter._id);
  if (!voter) {
    res.status(401);
    throw new Error("Something went wrong");
  }
  res.status(200).json({ voter });
});

// Vote Functionality
exports.vote = (async (req, res) => {
  const voter = await VoterModel.findById(req.voter._id);
  if (voter.isVoted === true) {
    res.status(400);
    throw new Error("Your have already voted");
  }

  const { id } = req.params;
  const candidate = await CandidateModel.findById(id);
  if (!candidate) {
    res.status(404).json({ message: "Voter not found" });
  }

  candidate.voteCount++;
  await candidate.save();

  voter.isVoted = true;
  await voter.save();

  res.status(200).json({
    message: "Voting Done... Thank you for your Contribution",
    voteCount: candidate.voteCount,
    isVoted: voter.isVoted,
  });
});
