import React from "react";
import Footer from "./Footer";

const Voter = () => {
  return (
    <div>
      <h1 className="page">Vote Here</h1>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        {/* Voter Details */}
        <div className="formAdd voter ">
          <h3 className="page">Voter Details</h3>
          <br />
          <div className="voter_details">
            <p>Name : Koushik Dutta</p>
            <p>Mobile No. : 7980064331</p>
            <p>Aadhaar No. : 798</p>
            <p>Voted : No</p>
          </div>
        </div>
        {/* Candidate Details */}
        <div className="formAdd voter ">
          <h3 className="page">Candidate Details</h3>
          <br />
          <div className="candidate_details">
            <p>Candidate Name : Messi</p>
            <p>Party Name : Barcelona</p>
            <p>
              Vote : <button className="btn_vote">Vote</button>
            </p>
          </div>
          <br />
          <div className="candidate_details">
            <p>Candidate Name : Ronaldo</p>
            <p>Party Name : Real Madrid</p>
            <p>
              Vote : <button className="btn_vote">Vote</button>
            </p>
          </div>
          <br />
          <div className="candidate_details">
            <p>Candidate Name : SRK</p>
            <p>Party Name : KKR</p>
            <p>
              Vote : <button className="btn_vote">Vote</button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Voter;
