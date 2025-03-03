import { auth, db } from "./firebaseConfig.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// DOM Elements
const usernameDisplay = document.getElementById("username");
const logoutButton = document.getElementById("logoutButton");

// Check if user is authenticated
auth.onAuthStateChanged(async (user) => {
    if (user) {
        // Retrieve user data from Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            usernameDisplay.textContent = userData.name || "User";
        } else {
            console.error("No user data found in Firestore.");
            usernameDisplay.textContent = "User";
        }
    } else {
        // Redirect to login page if not authenticated
        window.location.href = "index.html";
    }
});

// Logout Functionality
logoutButton.addEventListener("click", async () => {
    try {
        await signOut(auth);
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error signing out:", error);
    }
});
