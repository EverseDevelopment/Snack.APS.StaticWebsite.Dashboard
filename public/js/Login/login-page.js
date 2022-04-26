const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "WBetts" && password === "Baseteam3!") {
        
        sessionStorage.setItem('status','loggedIn');


        window.location.href = '../../viewer.html';
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})