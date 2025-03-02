document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const loginContainer = document.getElementById("loginContainer");
    const portalContainer = document.getElementById("portalContainer");
    const loginError = document.getElementById("loginError");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Hardcoded credentials (for testing only)
        const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID"
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
