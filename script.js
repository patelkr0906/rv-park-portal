// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
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
