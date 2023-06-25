import React, { useEffect, useState } from "react";
import axios from "axios";
import Voter from "../Layout/Voter";

const Profile = () => {
  const [voterDetails, setVoterDetails] = useState("");
  // console.log("voterDetails",voterDetails);

  useEffect(() => {
    fetchVoter();
  }, []);

  const fetchVoter = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/voter/me`, {
        withCredentials: true,
      });
      // console.log(response, "response");
      const data = response.data;
      setVoterDetails(data.voter);
    } catch (error) {
      console.log("Error fetching Voter Data:", error.message);
    }
  };

  return (
    <div>
      <Voter />
      <div className='containerForm'>
        <div className='formAdd '>
          <h2 className='page'>Your Profile</h2>
          <form>
            <label>
              Name:
              <input
                required
                type='text'
                autoComplete='off'
                name='name'
                value={voterDetails.name}
                readOnly={true}
              />
            </label>
            <label>
              Mobile Number :
              <input
                required
                type='number'
                autoComplete='off'
                name='mobile'
                value={voterDetails.mobile}
                readOnly={true}
              />
            </label>
            <label>
              Aadhaar Number :
              <input
                required
                type='number'
                autoComplete='off'
                name='adharNumber'
                value={voterDetails.adharNumber}
                readOnly={true}
              />
            </label>
            <label>
              Is Voted :
              <input
                required
                type='boolean'
                autoComplete='off'
                name='isVoted'
                value={voterDetails.isVoted}
                readOnly={true}
              />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
