// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyBdvvdksNa0UwRT64tqx56YXiRUfuUab9k",
//     authDomain: "voting-project-6d6ca.firebaseapp.com",
//     projectId: "voting-project-6d6ca",
//     storageBucket: "voting-project-6d6ca.appspot.com",
//     messagingSenderId: "875001702099",
//     appId: "1:875001702099:web:f10f2b8b294ca71f03d626",
//     measurementId: "G-WKKH2Z36ZS",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const sendOTP = async (phoneNumber, recaptchaContainer) => {
//     const verifier = new RecaptchaVerifier(recaptchaContainer, {
//         size: "invisible",
//     });

//     try {
//         const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
//         return confirmationResult;
//     } catch (error) {
//         throw error;
//     }
// };

// const verifyOTP = async (confirmationResult, code) => {
//     try {
//         const credential = await confirmationResult.confirm(code);
//         return credential.user;
//     } catch (error) {
//         throw error;
//     }
// };

// export const firebaseFunctions = {
//     auth,
//     sendOTP,
//     verifyOTP,
// };


// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyBdvvdksNa0UwRT64tqx56YXiRUfuUab9k",
//     authDomain: "voting-project-6d6ca.firebaseapp.com",
//     projectId: "voting-project-6d6ca",
//     storageBucket: "voting-project-6d6ca.appspot.com",
//     messagingSenderId: "875001702099",
//     appId: "1:875001702099:web:f10f2b8b294ca71f03d626",
//     measurementId: "G-WKKH2Z36ZS",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const sendOTP = async (phoneNumber) => {
//     const verificationId = await signInWithPhoneNumber(auth, phoneNumber);
//     return verificationId;
// };

// const confirmOTP = async (verificationId, code) => {
//     try {
//         const credential = await signInWithPhoneNumber(auth, verificationId, code);
//         return credential.user;
//     } catch (error) {
//         throw error;
//     }
// };

// export { auth, sendOTP, confirmOTP };

import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBdvvdksNa0UwRT64tqx56YXiRUfuUab9k",
    authDomain: "voting-project-6d6ca.firebaseapp.com",
    projectId: "voting-project-6d6ca",
    storageBucket: "voting-project-6d6ca.appspot.com",
    messagingSenderId: "875001702099",
    appId: "1:875001702099:web:f10f2b8b294ca71f03d626",
    measurementId: "G-WKKH2Z36ZS",
};

const app=initializeApp(firebaseConfig);
export const auth= getAuth(app);
export default app;