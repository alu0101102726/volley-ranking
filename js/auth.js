const loginForm = document.querySelector("#main");
const registerForm = document.querySelector("#create-acct");
const formContainer = document.querySelector(".login-container-box");

let hide = "display: none;";
let show = "display: block;";

registerForm.addEventListener("click", ( )=>{
    loginForm.style = show;
    registerForm.style = hide;
})

loginForm.addEventListener("click", ( )=>{
    loginForm.style = hide;
    registerForm.style = show;
})