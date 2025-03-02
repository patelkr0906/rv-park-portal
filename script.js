// Import Firebase modules (Firebase v9+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Login
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
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
    signOut(auth).then(() => {
        console.log("User logged out");
        document.getElementById("portalContainer").style.display = "none";
        document.getElementById("loginContainer").style.display = "block";
    }).catch((error) => {
        console.error("Logout failed", error);
    });
});

// Check Authentication State
onAuthStateChanged(auth, (user) => {
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
