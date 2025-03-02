document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const loginContainer = document.getElementById("loginContainer");
    const portalContainer = document.getElementById("portalContainer");
    const loginError = document.getElementById("loginError");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Hardcoded credentials (for testing only)
        const firebaseConfig = {
    apiKey: "AIzaSyC8dXLkSxci4m81P8zF9HZfLJkIN24XD7Y",
    authDomain: "rv-park-portal.firebaseapp.com",
    projectId: "rv-park-port"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


        if (enteredUsername.trim() === validUsername && enteredPassword.trim() === validPassword) {
            loginContainer.style.display = "none";
            portalContainer.style.display = "block";
        } else {
            loginError.style.display = "block";
        }
    });
});
