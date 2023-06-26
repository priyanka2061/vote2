import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Voter from "../Layout/Voter";
import { SERVER_URL } from "../../../API/api";

const Vote = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/candidate/all`, {
        withCredentials: true,
      });
      const data = await response.json();
      setCandidates(data.allCandidates);
    } catch (error) {
      console.log("Error fetching Candidates:", error.data.message);
    }
  };

  const voteHandler = async (_id) => {
    axios
      .put(
        `${SERVER_URL}/api/voter/vote/${_id}`,
        {
          _id,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        window.location.reload(true);
        alert(res.data.message);
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        // alert("Something went wrong", err);
        window.location.reload(true);
        alert(err.response.data.message);
      });
  };

  return (
    <div className='page'>
      <Voter />
      <div>
        <h2>Vote</h2>
        <div>
          {/* Candidate Details */}
          <div className='show'>
            <table border='5' width='100%'>
              <thead>
                <tr>
                  <th>Candidate Name </th>
                  <th>Candidate Party Name </th>
                  <th>Action </th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate._id}>
                    <td>{candidate.candidateName}</td>
                    <td>{candidate.candidatePartyName}</td>
                    <td>
                      <button
                        className='btn_vote'
                        onClick={() => voteHandler(candidate._id)}
                      >
                        {/* Vote */}
                        Vote <AiOutlineCheckCircle size={"15px"} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
