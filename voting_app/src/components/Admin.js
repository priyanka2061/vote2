import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <h1 className="page">Admin Panel</h1>
      {/* <div></div> */}
      <Link to="/admin/add_candidate" className="header_add">
        Add Candidate
      </Link>
      <Link to="/admin/add_voter" className="header_add">
        Add Voter
      </Link>
      <Link to="/admin/show_candidate" className="header_show">
        Show Candidate
      </Link>
      <Link to="/admin/show_voter" className="header_show">
        Show Voter
      </Link>
    </div>
  );
};

export default Admin;
