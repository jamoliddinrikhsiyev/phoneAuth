import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "/js/firebase.js";

let re = document.querySelector(".reCaptcha");
let container = document.querySelector(".container");
const button = document.querySelector("#confirm");
const confirm_input = document.querySelector(".confirmation_code");
const form = document.querySelector("#phone_auth");
const conf_form = document.querySelector("#confirm_form");
let phone_input = document.querySelector("#user_number");
let conf_box = document.querySelector(".confirmation_box");

const auth = getAuth();
auth.languageCode = "en";
window.recaptchaVerifier = new RecaptchaVerifier(
  "recaptcha-container",
  {
    size: "normal",
    callback: (response) => {
      window.recaptchaVerifier.sitekey = response;
    },
    "expired-callback": () => {
      alert("Captcha is expired, please reload the page");
    },
  },
  auth
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const phoneNumber = phone_input.value;
  console.log(phoneNumber);
  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      console.log("success", confirmationResult);
      window.confirmationResult = confirmationResult;
      form.style.display = "none";
      conf_box.style.display = "flex";
      conf_form.addEventListener("submit", (e) => {
        e.preventDefault();

        const code = confirm_input.value;
        confirmationResult
          .confirm(code)
          .then((result) => {
            console.log(result.user);
            alert(result.user);
            const user = result.user;
          })
          .catch((error) => {
            console.error(error);
          });
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

// function renderEl(el) {
//   let div = document.createElement("div");
//   let form = document.createElement("form");
//   let label = document.createElement("label");
//   let input = document.createElement("input");
//   let button = document.createElement("button");

//   div.classList.add("confirmation_box");
//   form.setAttribute("id", "confirm_form");
//   input.setAttribute("type", "text");
//   input.setAttribute("placeholder", "Enter confirmation code");
//   button.setAttribute("id", "confirm");

//   label.appendChild(input);
//   form.appendChild(label);
//   form.appendChild(button);
//   div.appendChild(form);
//   el.appendChild(div);
// }
