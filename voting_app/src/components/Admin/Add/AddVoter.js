import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Admin from "../Layout/Admin";

// export default class AddVoter extends React.Component {
//   state = {
//     name: "",
//     mobile: "",
//     adhar: "",
//   };
//   handleChange = (e) => {
//     this.setState({ [e.target.name]: [e.target.value] });
//   };

//   handleSubmitVoter = (e) => {
//     e.preventDefault();
//     const voter = {
//       name: this.state.name,
//       mobile: this.state.mobile,
//       adhar: this.state.adhar,
//     };
//     axios
//       .post("http://localhost:4000/api/addVoter", { voter })
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
//             {/*Add Voter*/}
//             <div className="formAdd ">
//               <h2 className="page">Add Voter</h2>
//               <form onSubmit={this.handleSubmitVoter}>
//                 <label>Voter Name : </label>
//                 <input
//                   type="text"
//                   name="name"
//                   autoComplete="off"
//                   placeholder="Enter voter name"
//                   onChange={this.handleChange}
//                   required
//                 />
//                 <label>Phone Number : </label>
//                 <input
//                   type="number"
//                   name="mobile"
//                   autoComplete="off"
//                   placeholder="Enter voter phone number"
//                   onChange={this.handleChange}
//                   required
//                 />
//                 <label>Aadhaar Number : </label>
//                 <input
//                   type="number"
//                   name="adhar"
//                   autoComplete="off"
//                   placeholder="Enter voter aadhaar number"
//                   onChange={this.handleChange}
//                   required
//                 />
//                 <button type="submit" className="btn btn_add">
//                   Add Voter
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

const AddVoter = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [adhar, setAdhar] = useState("");
  const [voted, setVoted] = useState("");

  const navigate = useNavigate();

  const handleSubmitVoter = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/voter/add",
        { name, mobile, adhar },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        // console.log(res.data.message);
        alert(res.data.message);
        navigate("/admin/show_voter");
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
          {/*Add Voter*/}
          <div className='formAdd '>
            <h2 className='page'>Add Voter</h2>
            <form onSubmit={handleSubmitVoter}>
              <label>Voter Name : </label>
              <input
                required
                type='text'
                autoComplete='off'
                placeholder='Enter Voter Name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Phone Number : </label>
              <input
                required
                type='number'
                autoComplete='off'
                placeholder='Enter Mobile Number'
                name='mobile'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <label>Aadhaar Number : </label>
              <input
                required
                type='text'
                autoComplete='off'
                placeholder="Enter Aadhaar Number (Last 3 digits of Voter's Mobile Number)"
                name='adhar'
                value={adhar}
                onChange={(e) => setAdhar(e.target.value)}
              />
              <label>Is Voted : </label>
              <input
                required
                type='boolean'
                autoComplete='off'
                name='voted'
                value={voted}
                // defaultValue={0}
                onChange={(e) => setVoted(false)}
              />
              <button type='submit' className='btn btn_add'>
                Add Voter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVoter;
