import React, { useEffect, useState } from "react";
import axios from "axios";
import Voter from "../Layout/Voter";
import { SERVER_URL } from "../../../API/api";

const Profile = () => {
  const [voterDetails, setVoterDetails] = useState({
     name: "",
    mobile: "",
    adharNumber: "",
    isVoted: false,
  });

  const fetchVoter = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/voter/getdetails`, {
        withCredentials: true,
      });
      const data = response.data;
      setVoterDetails(data);
      console.log(voterDetails); // Log the fetched data
    } catch (error) {
      console.log("Error fetching Voter Data:", error.message);
    }
  };

  useEffect(() => {
    fetchVoter();
  }, []);
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
              Mobile Number:
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
              Aadhaar Number:
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
              Is Voted:
              <input
                required
                type='text'
                autoComplete='off'
                name='isVoted'
                value={voterDetails.isVoted ? "Yes" : "No"}
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
