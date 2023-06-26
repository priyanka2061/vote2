import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../API/api";

const Admin = () => {
  const navigate = useNavigate();

  const handleSubmitLogout = (e) => {
    e.preventDefault();
    axios
      .get(`${SERVER_URL}/api/admin/logout`, {
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
      <div>
        <h1 className='page'>Admin Panel</h1>
        <Link to='/admin/add_candidate' className='header_add'>
          Add Candidate
        </Link>
        <Link to='/admin/add_voter' className='header_add'>
          Add Voter
        </Link>
        <Link to='/admin/show_candidate' className='header_show'>
          Show Candidate
        </Link>
        <Link to='/admin/show_voter' className='header_show'>
          Show Voter
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

export default Admin;
