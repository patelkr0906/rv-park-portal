// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8dXLkSxci4m81P8zF9HZfLJkIN24XD7Y",
    authDomain: "rv-park-portal.firebaseapp.com",
    projectId: "rv-park-portal",
    storageBucket: "rv-park-portal.firebasestorage.app",
    messagingSenderId: "1026865868698",
    appId: "1:1026865868698:web:b1a3e3729a5ff5625e5423"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Handle Login
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Login successful", userCredential.user);
            document.getElementById("loginContainer").style.display = "none";
            document.getElementById("portalContainer").style.display = "block";
        })
        .catch((error) => {
            console.error("Login failed", error);
            document.getElementById("loginError").style.display = "block";
            document.getElementById("loginError").innerText = error.message;
        });
});

// Handle Logout
document.getElementById("logoutBtn").addEventListener("click", function() {
    auth.signOut().then(() => {
        console.log("User logged out");
        document.getElementById("portalContainer").style.display = "none";
        document.getElementById("loginContainer").style.display = "block";
    }).catch((error) => {
        console.error("Logout failed", error);
    });
});

// Check Authentication State
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User is logged in:", user);
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("portalContainer").style.display = "block";
    } else {
        console.log("No user is logged in.");
        document.getElementById("portalContainer").style.display = "none";
        document.getElementById("loginContainer").style.display = "block";
    }
});

