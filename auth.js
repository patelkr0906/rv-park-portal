// auth.js
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Login Function
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                await signInWithEmailAndPassword(auth, email, password);
                window.location.href = "dashboard.html"; // Redirect to dashboard after login
            } catch (error) {
                alert("Login Failed: " + error.message);
            }
        });
    }
});

// Logout Function
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        try {
            await signOut(auth);
            window.location.href = "index.html"; // Redirect to login page after logout
        } catch (error) {
            alert("Logout Failed: " + error.message);
        }
    });
}

// Authentication State Change
onAuthStateChanged(auth, (user) => {
    const protectedPages = ["dashboard.html", "sites.html", "settings.html"];
    const currentPage = window.location.pathname.split("/").pop();

    if (user) {
        console.log("User logged in:", user.email);
    } else {
        if (protectedPages.includes(currentPage)) {
            window.location.href = "index.html"; // Redirect unauthorized users to login page
        }
    }
});
