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
        });
});

// Handle Logout
document.getElementById("logoutBtn").addEventListener("click", function() {
    auth.signOut().then(() => {
        document.getElementById("portalContainer").style.display = "none";
        document.getElementById("loginContainer").style.display = "block";
    });
});

// Check Authentication State
auth.onAuthStateChanged((user) => {
    if (user) {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("portalContainer").style.display = "block";
    } else {
        document.getElementById("portalContainer").style.display = "none";
        document.getElementById("loginContainer").style.display = "block";
    }
});
