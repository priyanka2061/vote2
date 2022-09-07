import React from "react";
import axios from "axios";
import Footer from "../Footer";

export default class ShowCandidate extends React.Component {
  state = {
    candidates: [],
  };

  componentDidMount() {
    axios
      .get(`https://online-vote-app.glitch.me/api/getCandidateDetails`)
      .then((res) => {
        const candidates = res.data.candidateList;
        // this.setState({ candidates });
        console.log(candidates);
      })
      .catch((err) => {
        console.log("!!! Error !!!" + err);
      });
  }

  render() {
    return (
      <div>
        <div className="show">
          <table border="1" width="100%">
            <tr>
              <th>Candidate Name</th>
              <th>Party Name</th>
              <th>Vote Count</th>
            </tr>
            {this.state.candidates.map((item) => {
              return (
                <tr>
                  <td>{item.candidateName}</td>
                  <td>{item.candidatePartyName}</td>
                  <td>{item.voteCount}</td>
                </tr>
              );
            })}
          </table>
          <Footer />
        </div>
      </div>
    );
  }
}
