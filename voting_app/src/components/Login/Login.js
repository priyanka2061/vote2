import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../img/voting-app-high-resolution-logo-color-on-transparent-background.png";

// export default class Login extends React.Component {
//   state = {
//     adminName: "",
//     adminName_error: "",
//     pwd: "",
//     pwd_error: "",
//     voterName: "",
//     voterName_error: "",
//     mobile: 0,
//     mobile_error: "",
//     adhar: 0,
//     adhar_error: "",
//   };

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value }, () => {
//       console.log("state", this.state);
//     });
//   };

//   handleSubmitAdmin = (e) => {
//     e.preventDefault();
//     <Link to="/admin">
//       <input className=" btn btn_login" type="submit" value="Login" />
//     </Link>;
//   };

//   handleSubmitVoter = (e) => {
//     e.preventDefault();
//   };

//   render() {
//     return (
//       <div className="container">
//         {/* For Admin Login */}
//         <div className="form">
//           <h1>Admin Login</h1>
//           <form onSubmit={this.handleSubmitAdmin}>
//             <label>Admin Name:</label>
//             <input
//               // pattern="[admin]"
//               required
//               type="text"
//               name="adminName"
//               autoComplete="off"
//               placeholder="Enter admin name"
//               onChange={this.handleChange}
//             />
//             <label>Password:</label>
//             <input
//               // pattern="[admin]"
//               required
//               type="password"
//               name="pwd"
//               autoComplete="off"
//               placeholder="Enter password"
//               onChange={this.handleChange}
//             />
//             <Link to="/admin">
//               <input className=" btn btn_login" type="submit" value="Login" />
//             </Link>
//             {/* <button className=" btn btn_login" type="submit" value="Login">
//               Login
//             </button> */}
//           </form>
//         </div>
//         {/* For Voter Login */}
//         <div className="form">
//           <h1>Voter Login</h1>
//           <form onSubmit={this.handleSubmitVoter}>
//             <label>Voter Name:</label>
//             <input
//               type="text"
//               name="voterName"
//               autoComplete="off"
//               placeholder="Enter Voter name"
//               onChange={this.handleChange}
//               pattern="[A-Za-z]"
//             />
//             <label>Phone Number:</label>
//             <input
//               type="number"
//               name="mobile"
//               autoComplete="off"
//               placeholder="Enter phone no."
//               onChange={this.handleChange}
//               pattern="[0-9]"
//             />
//             <label>Aadhaar Number:</label>
//             <input
//               type="number"
//               name="adhar"
//               autoComplete="off"
//               placeholder="First 3 digit of phone no."
//               onChange={this.handleChange}
//               pattern="[0-9]{3}"
//             />
//             {/* <Link to="/voter"> */}
//             <input className=" btn btn_login" type="submit" value="Login" />
//             {/* </Link> */}
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

const Login = () => {
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [adhar, setAdhar] = useState("");

  const navigate = useNavigate();

  const handleSubmitAdmin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/admin/login",
        {
          adminName,
          adminPassword,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        // console.log(res.data.message);
        // console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/admin");
        alert(res.data.message);
      })
      .catch((err) => {
        // console.log("Login Failed", err.response.data.message);
        alert(err.response.data.message);
      });
  };

  const handleSubmitVoter = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/voter/voterlogin",
        { name, mobile, adhar },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        // console.log(res.data.message);
        // console.log(res.data.voterToken);
        localStorage.setItem("voterToken", res.data.voterToken);
        navigate("/voter");
        alert(res.data.message);
      })
      .catch((err) => {
        // console.log("Login Failed", err.response.data.message);
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <div>
        <img src={Logo} alt='MERN Voting App' className='image-logo' />
      </div>
      <div className='container'>
        {/* For Admin Login */}
        <div className='form'>
          <h1>Admin Login</h1>
          <form onSubmit={handleSubmitAdmin}>
            <label>Admin:</label>
            <input
              required
              type='text'
              autoComplete='off'
              placeholder='Enter Admin Name'
              name='adminName'
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
            <label>Password:</label>
            <input
              required
              type='password'
              autoComplete='off'
              placeholder='Enter Admin Password'
              name='adminPassword'
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            {/* <Link to="/admin">
            <input className=" btn btn_login" type="submit" value="Login" />
            </Link> */}
            <button className=' btn btn_login' type='submit' value='Login'>
              Login
            </button>
          </form>
        </div>
        {/* For Voter Login */}
        <div className='form'>
          <h1>Voter Login</h1>
          <form onSubmit={handleSubmitVoter}>
            <label>Voter Name:</label>
            <input
              required
              type='text'
              autoComplete='off'
              placeholder='Enter Voter'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Phone Number:</label>
            <input
              required
              type='number'
              autoComplete='off'
              placeholder='Enter Phone Number'
              name='mobile'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <label>Aadhaar Number:</label>
            <input
              required
              type='number'
              autoComplete='off'
              placeholder='Enter Aadhaar Number'
              name='adhar'
              value={adhar}
              onChange={(e) => setAdhar(e.target.value)}
            />
            {/* <Link to="/voter">
            <input className=" btn btn_login" type="submit" value="Login" />
            </Link> */}
            <button className=' btn btn_login' type='submit' value='Login'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
