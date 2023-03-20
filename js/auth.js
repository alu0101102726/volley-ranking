const loginForm = document.querySelector("#main");
const registerForm = document.querySelector("#create-acct");
const formContainer = document.querySelector(",login-container-box");

registerForm.addEventListener("click", ( )=>{
    console.log(formContainer);
    formContainer.classList.add("active");
})

loginForm.addEventListener("click", ( )=>{
    console.log(formContainer);
    formContainer.classList.remove("active");
})