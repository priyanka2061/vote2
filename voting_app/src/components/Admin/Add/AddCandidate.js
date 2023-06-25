import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Admin from "../Layout/Admin";

// export default class AddCandidate extends React.Component {
//   state = {
//     candidateName: "",
//     candidatePartyName: "",
//     voteCount: "",
//   };
//   handleChange = (e) => {
//     this.setState({ [e.target.name]: [e.target.value] });
//   };

//   handleSubmitCandidate = (e) => {
//     e.preventDefault();
//     const candidate = {
//       candidateName: this.state.candidateName,
//       candidatePartyName: this.state.candidatePartyName,
//       voteCount: this.state.voteCount,
//     };
//     axios
//       .post("http://localhost:4000/api/addCandidate", { candidate })
//       .then((res) => {
//         console.log(res);
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.log("!!! Error !!!" + err);
//       });
//   };

//   render() {
//     return (
//       <div>
//         <div className="whole">
//           <div className="containerForm">
//             {/*Add Candidate*/}
//             <div className="formAdd ">
//               <h2 className="page">Add Candidate</h2>
//               <form>
//                 <label>Candidate Name:</label>
//                 <input
//                   type="text"
//                   name="candidateName"
//                   autoComplete="off"
//                   placeholder="Enter candidate name"
//                   onChange={this.handleChange}
//                   required
//                 />
//                 <label>Party Name:</label>
//                 <input
//                   type="text"
//                   name="candidatePartyName"
//                   autoComplete="off"
//                   placeholder="Enter party name"
//                   onChange={this.handleChange}
//                   required
//                 />
//                 <label>Vote Count:</label>
//                 <input
//                   type="number"
//                   name="voteCount"
//                   autoComplete="off"
//                   placeholder="Enter voter count"
//                   onChange={this.handleChange}
//                   required
//                 />
//                 <button
//                   type="submit"
//                   onClick={this.handleSubmitCandidate}
//                   className="btn btn_add"
//                 >
//                   Add Candidate
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//         <Logout />
//       </div>
//     );
//   }
// }

const AddCandidate = () => {
  const [candidateName, setCandidateName] = useState("");
  const [candidatePartyName, setCandidatePartyName] = useState("");
  const [voteCount, setVoteCount] = useState(0);

  const navigate = useNavigate();

  const handleSubmitCandidate = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/candidate/add",
        {
          candidateName,
          candidatePartyName,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        // console.log(res.data.message);
        alert(res.data.message);
        navigate("/admin/show_candidate");
      })
      .catch((err) => {
        // console.log("!!! Error Occured !!!", err.message);
        alert("!!! Error Occured !!!");
      });
  };

  return (
    <div className='page'>
      <Admin />
      <div className='whole'>
        <div className='containerForm'>
          {/*Add Candidate*/}
          <div className='formAdd '>
            <h2 className='page'>Add Candidate</h2>
            <form onSubmit={handleSubmitCandidate}>
              <label>Candidate Name : </label>
              <input
                required
                type='text'
                autoComplete='off'
                placeholder='Enter Candidate Name'
                name='candidateName'
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
              <label>Party Name : </label>
              <input
                required
                type='text'
                autoComplete='off'
                placeholder='Enter Party Name'
                name='candidatePartyName'
                value={candidatePartyName}
                onChange={(e) => setCandidatePartyName(e.target.value)}
              />
              <label>Vote Count : </label>
              <input
                required
                type='number'
                autoComplete='off'
                name='voteCount'
                value={voteCount}
                // defaultValue={0}
                onChange={(e) => setVoteCount(0)}
              />
              <button type='submit' className='btn btn_add'>
                Add Candidate
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCandidate;
