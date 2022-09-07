import React from "react";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
  state = {
    adminName: "",
    adminName_error: "",
    pwd: "",
    pwd_error: "",
    voterName: "",
    voterName_error: "",
    mobile: 0,
    mobile_error: "",
    adhar: 0,
    adhar_error: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log("state, this.state");
    });
  };

  handleSubmitAdmin = (e) => {
    e.preventDefault();
    <Link to="/admin">
      <input className=" btn btn_login" type="submit" value="Login" />
    </Link>;
  };

  handleSubmitVoter = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="container">
        {/* For Admin Login */}
        <div className="form">
          <h1>Admin Login</h1>
          <form onSubmit={this.handleSubmitAdmin}>
            <label>Admin Name:</label>
            <input
              // pattern="[admin]"
              required
              type="text"
              name="adminName"
              autoComplete="off"
              placeholder="Enter admin name"
              onChange={this.handleChange}
            />
            <label>Password:</label>
            <input
              // pattern="[admin]"
              required
              type="password"
              name="pwd"
              autoComplete="off"
              placeholder="Enter password"
              onChange={this.handleChange}
            />
            <Link to="/admin">
              <input className=" btn btn_login" type="submit" value="Login" />
            </Link>
            {/* <button className=" btn btn_login" type="submit" value="Login">
              Login
            </button> */}
          </form>
        </div>
        {/* For Voter Login */}
        <div className="form">
          <h1>Voter Login</h1>
          <form onSubmit={this.handleSubmitVoter}>
            <label>Voter Name:</label>
            <input
              type="text"
              name="voterName"
              autoComplete="off"
              placeholder="Enter Voter name"
              onChange={this.handleChange}
              pattern="[A-Za-z]"
            />
            <label>Phone Number:</label>
            <input
              type="number"
              name="mobile"
              autoComplete="off"
              placeholder="Enter phone no."
              onChange={this.handleChange}
              pattern="[0-9]"
            />
            <label>Aadhaar Number:</label>
            <input
              type="number"
              name="adhar"
              autoComplete="off"
              placeholder="First 3 digit of phone no."
              onChange={this.handleChange}
              pattern="[0-9]{3}"
            />
            <Link to="/voter">
              <input className=" btn btn_login" type="submit" value="Login" />
            </Link>
          </form>
        </div>
      </div>
    );
  }
}
