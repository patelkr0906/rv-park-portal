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

// Check User Authentication
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("portalContainer").style.display = "block";
        document.getElementById("loginContainer").style.display = "none";
    } else {
        document.getElementById("portalContainer").style.display = "none";
        document.getElementById("loginContainer").style.display = "block";
    }
});

// Logout Function
document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
});
