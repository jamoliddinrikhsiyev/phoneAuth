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

let re = document.querySelector(".reCaptcha");
const button = document.querySelector("#confirm");
const confirm_input = document.querySelector(".confirmation_code");
const form = document.querySelector("#phone_auth");
const conf_form = document.querySelector("#confirm_form");
let phone_input = document.querySelector("#user_number");

const auth = getAuth();
auth.languageCode = "en";
window.recaptchaVerifier = new RecaptchaVerifier(
  "recaptcha-container",
  {
    size: "normal",
    callback: (response) => {
      // window.recaptchaVerifier.sitekey = response;
      console.log(response);
    },
    "expired-callback": () => {
      alert("Captcha is expired, please reload the page");
    },
  },
  auth
);

// window.recaptchaVerifier = new RecaptchaVerifier(
//   button,
//   {
//     size: "invisible",
//     callback: (response) => {
//       // reCAPTCHA solved, allow signInWithPhoneNumber.
//       // console.log(response);
//       onSignInSubmit();
//       // const phoneNumber = phone_input.value;
//       // const appVerifier = window.recaptchaVerifier;
//       // signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//       //   .then((confirmationResult) => {
//       //     console.log("success");
//       //     window.confirmationResult = confirmationResult;
//       //   })
//       //   .catch((error) => {});
//     },
//   },
//   auth
// );

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // window.recaptchaVerifier.render().then((widgetId) => {
  //   window.recaptchaWidgetId = widgetId;
  // });
  const phoneNumber = phone_input.value;
  console.log(phoneNumber);
  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      console.log("success", confirmationResult);
      window.confirmationResult = confirmationResult;
      conf_form.addEventListener("submit", (e) => {
        e.preventDefault();

        const code = confirm_input.value;
        confirmationResult
          .confirm(code)
          .then((result) => {
            // User signed in successfully.
            console.log(result.user);
            alert(result.user);
            const user = result.user;
            // ...
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
          });
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

// var verifyCallback = function (response) {
//   alert(response);
// };

// recaptchaVerifier.render("recaptcha-container", {
//   sitekey: "your-site-key-from-recaptcha-json-response",
//   callback: verifyCallback,
//   theme: "dark",
// });
