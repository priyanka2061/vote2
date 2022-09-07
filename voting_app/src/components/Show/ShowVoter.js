import React from "react";
import axios from "axios";
import Footer from "../Footer";

export default class ShowVoter extends React.Component {
  state = {
    voters: [],
  };

  componentDidMount() {
    axios
      .get(`https://online-vote-app.glitch.me/api/getVoterDetails`)
      .then((res) => {
        const voters = res.data.voterList;
        // this.setState({ voters });
        console.log(voters);
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
              <th>Voter Name</th>
              <th>Mobile No.</th>
              <th>Aadhaar No. </th>
            </tr>
            {this.state.voters.map((item) => {
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
