import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Admin from "../Layout/Admin";
import { SERVER_URL } from "../../../API/api";

// export default class ShowVoter extends React.Component {
//   state = {
//     voters: [],
//   };

//   componentDidMount() {
//     axios
//       .get(`http://localhost:8000/api/voter/all`)
//       .then((res) => {
//         const voters = res.data.voterList;
//         // this.setState({ voters });
//         console.log(voters);
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
//               <th>Voter Name</th>
//               <th>Mobile No.</th>
//               <th>Aadhaar No. </th>
//             </tr>
//             {this.state.voters.map((item) => {
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

const ShowVoter = () => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    fetchVoters();
  }, []);

  const fetchVoters = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/voter/all`, {
        withCredentials: true,
      });
      const data = await response.json();
      setVoters(data.allVoters);
    } catch (error) {
      console.log("Error fetching Voters:", error.data.message);
    }
  };

  const deleteButtonHandler = async (_id) => {
    axios
      .delete(`${SERVER_URL}/api/voter/delete/${_id}`, {
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
      <h2>Voter's List</h2>
      <div className='show'>
        <table border='5' width='100%'>
          <thead>
            <tr>
              <th>Voter Name</th>
              <th>Mobile Number</th>
              <th>Aadhaar Number</th>
              <th>Is Voted</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter) => (
              <tr key={voter._id}>
                <td>{voter.name}</td>
                <td>{voter.mobile}</td>
                <td>{voter.adharNumber}</td>
                <td>{String(voter.isVoted)}</td>
                <td>
                  <button
                    className='btn_delete'
                    onClick={() => deleteButtonHandler(voter._id)}
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

export default ShowVoter;
