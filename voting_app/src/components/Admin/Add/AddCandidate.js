import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Admin from "../Layout/Admin";
import { SERVER_URL } from "../../../API/api";


const AddCandidate = () => {
  const [candidateName, setCandidateName] = useState("");
  const [candidatePartyName, setCandidatePartyName] = useState("");
  const [voteCount, setVoteCount] = useState(0);

  const navigate = useNavigate();

  const handleSubmitCandidate = (e) => {
    e.preventDefault();
    axios
      .post(
        `${SERVER_URL}/api/candidate/add`,
        {
          candidateName,
          candidatePartyName,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        alert(res.data.message);
        navigate("/admin/show_candidate");
      })
      .catch((err) => {
        alert("!!! Error Occured !!!");
      });
  };

  return (
    <div className='page'>
      {/* <Admin /> */}
      <div className='whole'>
        <div className='containerForm'>
          {/*Add Candidate*/}
          <div className='formAdd '>
            <h2 className='page'>Add Candidate</h2>
            <form onSubmit={handleSubmitCandidate}>
              <label>Candidate Name : </label>
              <input
                required
                type='text'
                autoComplete='off'
                placeholder='Enter Candidate Name'
                name='candidateName'
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
              <label>Party Name : </label>
              <input
                required
                type='text'
                autoComplete='off'
                placeholder='Enter Party Name'
                name='candidatePartyName'
                value={candidatePartyName}
                onChange={(e) => setCandidatePartyName(e.target.value)}
              />
              <label>Vote Count : </label>
              <input
                required
                type='number'
                autoComplete='off'
                name='voteCount'
                value={voteCount}
                // defaultValue={0}
                onChange={(e) => setVoteCount(0)}
              />
              <button type='submit' className='btn btn_add'>
                Add Candidate
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCandidate;
