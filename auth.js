import { auth, db } from './firebase.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

/**
 * Logs in a user using Firebase Authentication.
 * @param {string} email - User email
 * @param {string} password - User password
 */
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("User logged in:", user.uid);

        // Retrieve user role from Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            sessionStorage.setItem("userRole", userData.role);
            window.location.href = "dashboard.html";
        } else {
            console.error("No user data found in Firestore.");
            alert("User role not assigned. Contact admin.");
        }
    } catch (error) {
        console.error("Login error:", error.message);
        alert("Login failed: " + error.message);
    }
}

/**
 * Logs out the current user.
 */
export function logoutUser() {
    signOut(auth)
        .then(() => {
            console.log("User logged out");
            sessionStorage.removeItem("userRole");
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Logout error:", error.message);
        });
}

/**
 * Monitors authentication state and redirects users accordingly.
 */
export function monitorAuthState() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("User is logged in:", user.uid);

            // Retrieve user role from Firestore
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                sessionStorage.setItem("userRole", userData.role);
            } else {
                console.warn("User role not found. Redirecting to login.");
                window.location.href = "index.html";
            }
        } else {
            console.warn("No user is logged in. Redirecting to login.");
            window.location.href = "index.html";
        }
    });
}

/**
 * Retrieves the logged-in user's role from session storage.
 * @returns {string|null} User role or null if not set
 */
export function getUserRole() {
    return sessionStorage.getItem("userRole");
}
