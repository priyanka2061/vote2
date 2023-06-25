import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Admin from "../Layout/Admin";

// export default class ShowCandidate extends React.Component {
//   state = {
//     candidates: [],
//   };

//   componentDidMount() {
//     axios
//       .get(`http://localhost:8000/api/candidate/all`)
//       .then((res) => {
//         const candidates = res.data.candidate;
//         // this.setState({ candidates });
//         console.log(candidates);
//       })
//       .catch((err) => {
//         console.log("!!! Error !!!" + err);
//       });
//   }

//   render() {
//     return (
//       <div>
//         <div className="show">
//           <table border="1" width="100%">
//             <tr>
//               <th>Candidate Name</th>
//               <th>Party Name</th>
//               <th>Vote Count</th>
//             </tr>
//             {this.state.candidates.map((item) => {
//               return (
//                 <tr>
//                   <td>{item.candidateName}</td>
//                   <td>{item.candidatePartyName}</td>
//                   <td>{item.voteCount}</td>
//                 </tr>
//               );
//             })}
//           </table>
//           <Logout />
//         </div>
//       </div>
//     );
//   }
// }

const ShowCandidate = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/candidate/all", {
        withCredentials: true,
      });
      const data = await response.json();
      setCandidates(data.allCandidates);
    } catch (error) {
      console.log("Error fetching Candidates:", error.data.message);
    }
  };

  const deleteButtonHandler = async (_id) => {
    axios
      .delete(`http://localhost:8000/api/candidate/delete/${_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        alert(res.data.message);
        window.location.reload(true);
      })
      .catch(() => {
        alert("!!! Error Occured !!!");
        window.location.reload(true);
      });
  };

  return (
    <div className='page'>
      <Admin />
      <h2>Candidate's List</h2>
      <div className='show'>
        <table border='5' width='100%'>
          <thead>
            <tr>
              <th>Candidate Name </th>
              <th>Candidate Party Name </th>
              <th>Vote Count </th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id}>
                <td>{candidate.candidateName}</td>
                <td>{candidate.candidatePartyName}</td>
                <td>{candidate.voteCount}</td>
                <td>
                  <button
                    className='btn_delete'
                    onClick={() => deleteButtonHandler(candidate._id)}
                  >
                    Delete <RiDeleteBin7Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowCandidate;
