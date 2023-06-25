import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Voter = () => {
  const navigate = useNavigate();

  const handleSubmitLogout = () => {
    axios
      .get("http://localhost:8000/api/voter/logout", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.message, "Logout successful");
        localStorage.clear();
        alert(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        // console.error("Logout Failed:", err);
        alert("Logout Failed:", err);
      });
  };

  return (
    <div>
      <div className='page'>
        <h1>Voter Panel</h1>
        <Link to='/voter/profile' className='header_add'>
          My Profile
        </Link>
        <Link to='/voter/vote' className='header_show'>
          Vote
        </Link>
      </div>
      <div>
        <button className='btn btn_footer' onClick={handleSubmitLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Voter;
