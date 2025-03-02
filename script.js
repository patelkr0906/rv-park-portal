document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const loginContainer = document.getElementById("loginContainer");
    const portalContainer = document.getElementById("portalContainer");
    const loginError = document.getElementById("loginError");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Hardcoded credentials (for testing only)
        const validUsername = "admin";
        const validPassword = "password123";

        const enteredUsername = document.getElementById("username").value;
        const enteredPassword = document.getElementById("password").value;

        if (enteredUsername === validUsername && enteredPassword === validPassword) {
            loginContainer.style.display = "none";
            portalContainer.style.display = "block";
        } else {
            loginError.style.display = "block";
        }
    });
});

