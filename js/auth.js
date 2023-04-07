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
    document.querySelector(".login-container-box").style = "height: 65vh;"
})

loginFormBtn.addEventListener("click", ( )=>{
    loginForm.style = show;
    registerForm.style = hide;
    document.querySelector(".login-container-box").style = "height: 50vh;"
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
    swal("Has cerrado sesión con éxito!", "Hasta luego!", "success")
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
      swal("Los campos del email no coinciden", "Prueba de nuevo", "warning")
      isVerified = false;
  }

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if(signupPassword != confirmSignUpPassword) {
      swal("Los campos de contraseña no coinciden", "Prueba de nuevo", "warning")
      isVerified = false;
  }
  
  if(signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
    swal("Rellena todos los campos!", "Prueba de nuevo", "warning");
    isVerified = false;
  }
  
  if(isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
      const user = userCredential.user;
      let newJSON = {
        username: signupUser,
        email: user.email,
        votes: null,
        voted: false,
        timedVote: null,
        peopleVoted: 0
      }
      let endpoint = "https://volley-ranking-server.onrender.com/register";
      const options = {
        method: "POST",
        headers: {'Content-Type': "application/x-www-form-urlencoded"},
        mode: 'no-cors'
      };
    
      options.body = JSON.stringify(newJSON);
    
      fetch(endpoint, options)   
      swal("Cuenta creada con éxito!", "Enhorabuena!", "success");   
    })
    .catch((error) => {
      const errorMessage = error.message;
      swal("Ha ocurrido un error", `${errorMessage}`, "error");
    });
  }
});

submitButton.addEventListener("click", function() {
  email = emailInput.value;
  password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user; 
      swal(`Bienvenido de nuevo`, `${user.email}!`, "info");
    })
    .catch((error) => {
      const errorMessage = error.message;
      swal("Ha ocurrido un error", `${errorMessage}`, "error");
    });
});
