import axios from "axios";
import React from "react";
import Footer from "../Footer";

export default class AddCandidate extends React.Component {
  state = {
    candidateName: "",
    candidatePartyName: "",
    voteCount: "",
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  handleSubmitCandidate = (e) => {
    e.preventDefault();
    const candidate = {
      candidateName: this.state.candidateName,
      candidatePartyName: this.state.candidatePartyName,
      voteCount: this.state.voteCount,
    };
    axios
      .post("http://localhost:4000/api/addCandidate", { candidate })
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
            {/*Add Candidate*/}
            <div className="formAdd ">
              <h2 className="page">Add Candidate</h2>
              <form>
                <label>Candidate Name:</label>
                <input
                  type="text"
                  name="candidateName"
                  autoComplete="off"
                  placeholder="Enter candidate name"
                  onChange={this.handleChange}
                  required
                />
                <label>Party Name:</label>
                <input
                  type="text"
                  name="candidatePartyName"
                  autoComplete="off"
                  placeholder="Enter party name"
                  onChange={this.handleChange}
                  required
                />
                <label>Vote Count:</label>
                <input
                  type="number"
                  name="voteCount"
                  autoComplete="off"
                  placeholder="Enter voter count"
                  onChange={this.handleChange}
                  required
                />
                <button
                  type="submit"
                  onClick={this.handleSubmitCandidate}
                  className="btn btn_add"
                >
                  Add Candidate
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
