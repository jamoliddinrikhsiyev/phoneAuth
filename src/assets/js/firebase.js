import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";

import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqBkOOQpmtc-OxeowERz_l5NmEI36Mpkg",
  authDomain: "radiusdb-d3754.firebaseapp.com",
  projectId: "radiusdb-d3754",
  storageBucket: "radiusdb-d3754.appspot.com",
  messagingSenderId: "925556569383",
  appId: "1:925556569383:web:f5564260bbe6e6fcc82502",
};

export const app = initializeApp(firebaseConfig);

export { getAuth, signInWithPhoneNumber, RecaptchaVerifier };
