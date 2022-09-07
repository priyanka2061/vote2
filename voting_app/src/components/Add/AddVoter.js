import axios from "axios";
import React from "react";
import Footer from "../Footer";

export default class AddVoter extends React.Component {
  state = {
    name: "",
    mobile: "",
    adhar: "",
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  handleSubmitVoter = (e) => {
    e.preventDefault();
    const voter = {
      name: this.state.name,
      mobile: this.state.mobile,
      adhar: this.state.adhar,
    };
    axios
      .post("http://localhost:4000/api/addVoter", { voter })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("!!! Error !!!" + err);
      });
  };

  render() {
    return (
      <div>
        <div className="whole">
          <div className="containerForm">
            {/*Add Voter*/}
            <div className="formAdd ">
              <h2 className="page">Add Voter</h2>
              <form onSubmit={this.handleSubmitVoter}>
                <label>Voter Name : </label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  placeholder="Enter voter name"
                  onChange={this.handleChange}
                  required
                />
                <label>Phone Number : </label>
                <input
                  type="number"
                  name="mobile"
                  autoComplete="off"
                  placeholder="Enter voter phone number"
                  onChange={this.handleChange}
                  required
                />
                <label>Aadhaar Number : </label>
                <input
                  type="number"
                  name="adhar"
                  autoComplete="off"
                  placeholder="Enter voter aadhaar number"
                  onChange={this.handleChange}
                  required
                />
                <button type="submit" className="btn btn_add">
                  Add Voter
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
