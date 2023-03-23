import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile  } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const loginForm = document.querySelector("#main");
const registerForm = document.querySelector("#create-acct");
const loginFormBtn = document.querySelector("#return-btn");
const registerFormBtn = document.querySelector("#sign-up");
const formContainer = document.querySelector(".login-container-box");

let hide = "display: none;";
let show = "display: block;";

registerFormBtn.addEventListener("click", ( )=>{
    loginForm.style = hide;
    registerForm.style = show;
})

loginFormBtn.addEventListener("click", ( )=>{
    loginForm.style = show;
    registerForm.style = hide;
})

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCiE3x-D8uzBDfzepyjS4HwGrol_PS3e9I",
    authDomain: "volley-rank-105ba.firebaseapp.com",
    projectId: "volley-rank-105ba",
    storageBucket: "volley-rank-105ba.appspot.com",
    messagingSenderId: "639696193648",
    appId: "1:639696193648:web:1d3f896994efc79bfb0cb5",
    measurementId: "G-L17C854GWV"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const signupEmailIn = document.getElementById("email-signup");
const signupUserIn = document.getElementById("user-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");
const logoutbtn = document.getElementById("logout");

let email, password, signupEmail, signupUser, signupPassword, confirmSignupEmail, confirmSignUpPassword;

window.onload = () => {
  auth.onAuthStateChanged(function(user) {
    let topNavUser = document.querySelector(".login-container").childNodes[1];
    let topNavAuth = document.querySelector(".login-container").childNodes[3];
    if (user) {
      localStorage.setItem('user', user.email)
      document.querySelector(".not-logged").style = "display: none;"
      document.querySelector(".logged").style = "display: block;"
      topNavUser.innerText = `${user.email}`
      topNavAuth.childNodes[0].nodeValue = `Cerrar sesión`
    } else {
      window.localStorage.removeItem('user');
      document.querySelector(".not-logged").style = "display: block;"
      document.querySelector(".logged").style = "display: none;"
      topNavUser.innerText = ``
      topNavAuth.childNodes[0].nodeValue = `Autenticarse`
    }
  });
}

logoutbtn.addEventListener("click", function() {
  signOut(auth).then(() => {
    alert("Has cerrado sesión con éxito!")
  }).catch((error) => {
    console.log(error)
  });
});


createacctbtn.addEventListener("click", function() {
  let isVerified = true;

  signupEmail = signupEmailIn.value;
  signupUser = signupUserIn.value;
  confirmSignupEmail = confirmSignupEmailIn.value;
  if(signupEmail != confirmSignupEmail) {
      window.alert("Email fields do not match. Try again.")
      isVerified = false;
  }

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if(signupPassword != confirmSignUpPassword) {
      window.alert("Password fields do not match. Try again.")
      isVerified = false;
  }
  
  if(signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }
  
  if(isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
      const user = userCredential.user;
      window.alert("Success! Account created.");      
      return userCredential.user.updateProfile({
        displayName: signupUser
    })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert("Error occurred. Try again.");
    });
  }
});

submitButton.addEventListener("click", function() {
  email = emailInput.value;
  password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Success! Welcome back!");
      window.alert("Bienvenido de nuevo!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error occurred. Try again.");
      window.alert("Ha ocurrido un error, prueba de nuevo!");
    });
});
