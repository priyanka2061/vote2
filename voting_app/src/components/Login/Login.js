// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Logo from "../img/voting-app-high-resolution-logo-color-on-transparent-background.png";
// import { SERVER_URL } from "../../API/api";
// import { auth,sendOTP } from "firebase/auth";
// import OTPPage from "./OTPPage";
// const Login = () => {
//   const [adminName, setAdminName] = useState("");
//   const [adminPassword, setAdminPassword] = useState("");
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [adhar, setAdhar] = useState("");

//   const navigate = useNavigate();
 

//   const handleSubmitAdmin = (e) => {
//     e.preventDefault();
//     axios
//       .post(
//         `${SERVER_URL}/api/admin/login`,
//         {
//           adminName,
//           adminPassword,
//         },
//         {
//           headers: {
//             "Content-type": "application/json",
//           },
//           withCredentials: true,
//         }
//       )
//       .then((res) => {
//         // console.log(res);
//         // console.log(res.data);
//         // console.log(res.data.message);
//         // console.log(res.data.token);
//         localStorage.setItem("token", res.data.token);
//         navigate("/admin");
//         alert(res.data.message);
//       })
//       .catch((err) => {
//         // console.log("Login Failed", err.response.data.message);
//         alert(err.response.data.message);
//       });
//   };

//   const handleSubmitVoter = (e) => {
//     e.preventDefault();
//     axios
//       .post(
//         `${SERVER_URL}/api/voter/voterlogin`,
//         { name, mobile, adhar },
//         {
//           headers: {
//             "Content-type": "application/json",
//           },
//           withCredentials: true,
//         }
//       )
//       .then((res) => {
//         // console.log(res);
//         // console.log(res.data);
//         // console.log(res.data.message);
//         // console.log(res.data.voterToken);
//         localStorage.setItem("voterToken", res.data.voterToken);
//         navigate("/voter");
//         alert(res.data.message);
//       })
//       .catch((err) => {
//         // console.log("Login Failed", err.response.data.message);
//         alert(err.response.data.message);
//       });
//   };

//   return (
//     <div>
//       <div>
//         <img src={Logo} alt='MERN Voting App' className='image-logo' />
//       </div>
//       <div className='container'>
//         {/* For Admin Login */}
//         <div className='form'>
//           <h1>Admin Login</h1>
//           <form onSubmit={handleSubmitAdmin}>
//             <label>Admin:</label>
//             <input
//               required
//               type='text'
//               autoComplete='off'
//               placeholder='Enter Admin Name'
//               name='adminName'
//               value={adminName}
//               onChange={(e) => setAdminName(e.target.value)}
//             />
//             <label>Password:</label>
//             <input
//               required
//               type='password'
//               autoComplete='off'
//               placeholder='Enter Admin Password'
//               name='adminPassword'
//               value={adminPassword}
//               onChange={(e) => setAdminPassword(e.target.value)}
//             />
//             {/* <Link to="/admin">
//             <input className=" btn btn_login" type="submit" value="Login" />
//             </Link> */}
//             <button className=' btn btn_login' type='submit' value='Login'>
//               Login
//             </button>
//           </form>
//         </div>
//         {/* For Voter Login */}
//         <div className='form'>
//           <h1>Voter Login</h1>
//           <form onSubmit={handleSubmitVoter}>
//             <label>Voter Name:</label>
//             <input
//               required
//               type='text'
//               autoComplete='off'
//               placeholder='Enter Voter'
//               name='name'
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <label>Phone Number:</label>
//             <input
//               required
//               type='number'
//               autoComplete='off'
//               placeholder='Enter Phone Number'
//               name='mobile'
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//             />
            
      
//             <label>Aadhaar Number:</label>
//             <input
//               required
//               type='number'
//               autoComplete='off'
//               placeholder='Enter Aadhaar Number'
//               name='adhar'
//               value={adhar}
//               onChange={(e) => setAdhar(e.target.value)}
//             />
           
//             <button className=' btn btn_login' type='submit' value='Login'>
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/voting-app-high-resolution-logo-color-on-transparent-background.png";
import { SERVER_URL } from "../../API/api";
import { auth, sendOTP } from "firebase/auth";
// import OTPPage from "./OTPPage";yahi page hana bas ha error ky arha h 
const Login = () => {
  const [valid,setvalid]=useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [adhar, setAdhar] = useState("");
  const [otp,setotp]=useState("");

  const navigate = useNavigate();

  const handleSubmitAdmin = (e) => {
    e.preventDefault();
   
    axios
      .post(
        `${SERVER_URL}/api/admin/login`,
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
    console.log(otp,name)
    axios
      .post(
        `${SERVER_URL}/api/voter/voterlogin`, { name, mobile, adhar,otp })
      //   {
      //     headers: {
      //       "Content-type": "application/json",
      //     },
      //     withCredentials: true,
      //   }
      // )
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
  const sendNumber = () => {
    // console.log('hello')   // ye call ha sahi ha no check karna
    axios.post(`${SERVER_URL}/api/voter/numbersend`, { number:mobile,name ,adhar})
      .then(response => {
        // Handle the response from the backend if needed
        console.log('Number sent successfully!', response);
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error sending number:', error);
      });
  }
  const  sendotp=()=>
  {
    axios.post(`${SERVER_URL}/api/voter/otpverification`,{otp,name})
    .then(response => {
      // Handle the response from the backend if needed
      console.log('Number sent successfully!', response);
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error('Error sending number:', error);
    });
  }
  
  const validatephonenumber=()=>
  {
   
      setvalid(true);
   
  }
 //Frontend show karna 
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
            <button className='btn btn_login' type='submit' value='Login'>
              Login
            </button>
          </form>
        </div>
        {/* For Voter Login dekh kiye */} 
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
             <button onClick={() => { sendNumber(); validatephonenumber(); }} className=' btn btn_login'>Validate number</button>

             {
              valid && (<div>
                <input type='text' placeholder="enter otp" value={otp} onChange={(e)=>setotp(e.target.value)}/>
                <button onClick={sendotp} className=' btn btn_login'>Validate OTP</button>
              </div>)
             }

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
            
          
            <button className=' btn btn_login' type='submit' value='Login'>
              Login
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;