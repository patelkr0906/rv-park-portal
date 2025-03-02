// Import Firebase modules (Firebase v9+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const db = getFirestore(app);

// Check User Authentication
onAuthStateChanged(auth, async (user) => {
    if (user) {
        document.getElementById("portalContainer").style.display = "block";
        document.getElementById("loginContainer").style.display = "none";
        loadUserRole(user.uid);
        loadReservations();
        loadSettings();
    } else {
        document.getElementById("portalContainer").style.display = "none";
        document.getElementById("loginContainer").style.display = "block";
    }
});

// Logout Function
document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    });
});

// Function to Load User Role
async function loadUserRole(userId) {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
        const userData = userDoc.data();
        document.getElementById("userRole").innerText = `Role: ${userData.role}`;
    }
}

// Function to Load Reservations
async function loadReservations() {
    // Future implementation for fetching reservations from Firestore
    console.log("Fetching reservations...");
}

// Function to Load Settings
async function loadSettings() {
    // Future implementation for fetching settings from Firestore
    console.log("Fetching settings...");
}
