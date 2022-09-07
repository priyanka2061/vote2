const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CandidateModel = require("../models/addCandidate");
const VoterModel = require("../models/addVoter");

mongoose
  .connect(
    "mongodb://uwnsmeyyfhdq51jdnwnj:ePmQ6UqxKNXK5deQEXza@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bugydgvkxbdih1u?replicaSet=rs0",
    {
      useNewUrlParser: true,
      useUnifiedtopology: true,
    }
  )
  .then(() => {
    console.log("mongoDb connected");
  })
  .catch((err) => {
    console.log(err);
  });

// http://localhost:4000
// Candidate
// add candidate data POST
// https://online-vote-app.glitch.me/api/addCandidate

router.post("/addCandidate", (req, res) => {
  let newCandidateModel = new CandidateModel();
  newCandidateModel.candidateName = req.body.candidateName;
  newCandidateModel.candidatePartyName = req.body.candidatePartyName;
  newCandidateModel.voteCount = req.body.voteCount;

  newCandidateModel
    .save()
    .then(() => {
      res.status(200).json({ message: "Candidate Data Added", status: true });
    })
    .catch((err) => {
      res.status(400).json({ err: err, status: false });
    });
});

// get candidate data GET
// https://online-vote-app.glitch.me/api/getCandidateDetails

router.get("/getCandidateDetails", (req, res) => {
  CandidateModel.find({})
    .then((data) => {
      res.status(200).json({ candidateList: data, status: true });
    })
    .catch((err) => {
      res.status(400).json({ err: err, status: false });
    });
});

// delete candidate data DELETE
// https://online-vote-app.glitch.me/api/deleteCandidate/id (replace ':id' with the id I want to delete data of)

router.delete("/deleteCandidate/:id", (req, res) => {
  CandidateModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Candidate Data Deleted", status: true });
    })
    .catch((err) => {
      res.status(400).json({ err: err, status: false });
    });
});

// addVoter
// add voter data POST
// https://online-vote-app.glitch.me/api/addVoter

router.post("/addVoter", (req, res) => {
  let newVoterModel = new VoterModel();
  newVoterModel.name = req.body.name;
  newVoterModel.mobile = req.body.mobile;
  newVoterModel.adhar = req.body.adhar;
  newVoterModel.isvote = req.body.isvote;

  newVoterModel
    .save()
    .then(() => {
      res.status(200).json({ message: "Voter Data Added", status: true });
    })
    .catch((err) => {
      res.status(400).json({ err: err, status: false });
    });
});

// get voter data GET
// https://online-vote-app.glitch.me/api/getVoterDetails

router.get("/getVoterDetails", (req, res) => {
  VoterModel.find({})
    .then((data) => {
      res.status(200).json({ voterList: data, status: true });
    })
    .catch((err) => {
      res.status(400).json({ err: err, status: false });
    });
});

// delete voter data DELETE
// https://online-vote-app.glitch.me/api/deleteVoter/id (replace ':id' with the id I want to delete data of)

router.delete("/deleteVoter/:id", (req, res) => {
  VoterModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Voter Data Deleted", status: true });
    })
    .catch((err) => {
      res.status(400).json({ err: err, status: false });
    });
});

// Recoding from 31st July TimeStamp: 45:50)
// candidate login POST
router.post("/voterlogin", async (req, res) => {
  try {
    let mobile = req.body.mobile;
    let adhar = req.body.adhar;
    await Voter.findOne({ mobile: mobile }).then((user) => {
      if (user === null) {
        res.status(200).json({
          message: "User Not Found. Ask ADMIN to add you as Voter!!!",
        });
      } else {
        if (adhar === user.adhar) {
          res.status(200).json({
            message: "Logged In Successfully",
            status: true,
            details: user,
          });
        } else {
          res.status(400).json({
            message: "Your Adhar number does match your Mobile number",
            status: false,
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// give vote POST

router.post("/vote", (req, res) => {
  try {
    let voteGivenBy = req.body.voteGivenBy;
    let voteGivenTo = req.body.voteGivenTo;

    Voter.findById(voteGivenBy).then((data) => {
      let VoterModel = new Voter();
      VoterModel = data;
      VoterModel.isvote = true;
      VoterModel.save()
        .then(() => {
          Candidate.findByIdAndDelete(voteGivenTo).then((value) => {
            let CandidateModel = new Candidate();
            CandidateModel.voteCount = CandidateModel.voteCount + 1;
            CandidateModel.save()
              .then(() => {
                res
                  .status(200)
                  .json({ message: "Vote Successfull", status: true });
              })
              .catch((err) => {
                res.status(400).json({ messege: err, status: false });
              });
          });
        })
        .catch((err) => {
          res.status(400).json({ messege: err, status: false });
        });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
