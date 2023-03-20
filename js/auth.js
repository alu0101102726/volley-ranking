let loginForm = document.getElementById("main");
let registerForm = document.getElementById("create-acct");

function showRegister() {
    loginForm.display = none;
    registerForm.display = block;
}

function showLogin() {
    loginForm.display = block;
    registerForm.display = none;
}