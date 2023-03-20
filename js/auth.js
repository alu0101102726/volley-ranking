const loginForm = document.getElementById("main");
const registerForm = document.getElementById("create-acct");
const formContainer = document.getElementsByClassName("login-container-box");

registerForm.addEventListener("click", ( )=>{
    formContainer.classList.add("active");
})

loginForm.addEventListener("click", ( )=>{
    formContainer.classList.remove("active");
})