document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let email = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            document.getElementById("loginContainer").style.display = "none";
            document.getElementById("portalContainer").style.display = "block";
        })
        .catch((error) => {
            document.getElementById("loginError").style.display = "block";
            document.getElementById("loginError").innerText = error.message;

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
