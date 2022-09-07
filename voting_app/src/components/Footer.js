import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <Link to="/" className="btn btn_footer">
        Sign Out
      </Link>
    </div>
  );
};

export default Footer;
