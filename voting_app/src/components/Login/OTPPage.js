import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./OTPPage.css"; // Import the CSS file

const OTPPage = (props) => {
    const [otp, setOTP] = useState("");
    const navigate = useNavigate();

    function createOtp()
    {
          
    }

    const handleVerify = () => {
        // Add OTP verification logic here
        // For simplicity, let's assume the correct OTP is '123456'
        const correctOTP = createOtp();

        if (otp === correctOTP) {
            // OTP is correct, navigate to the next page
            console.log("OTP Verified");
            navigate("/voter");
        } else {
            // Incorrect OTP, you may display an error message
            alert("Wrong OTP")
            console.log("Incorrect OTP");
        }
    };

    return (
        <div className="otp-container">
            <h1>Enter OTP</h1>
            <form>
                <label htmlFor="otp">OTP:</label>
                <input
                    type="text"
                    id="otp"
                    required
                    autoComplete="off"
                    placeholder="Enter OTP"
                    className="input-class"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                />

                <button type="button" className="button-class" onClick={handleVerify}>
                    Verify
                </button>
            </form>
        </div>
    );
};

export default OTPPage;
