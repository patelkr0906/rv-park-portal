// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js"; // Ensure you have this file for Firebase config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to handle login
async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user.uid);
        checkUserRole(userCredential.user.uid); // Check role after login
    } catch (error) {
        console.error("Login error:", error.message);
        alert("Login failed: " + error.message);
    }
}

// Function to handle logout
async function logoutUser() {
    try {
        await signOut(auth);
        console.log("User logged out.");
        window.location.href = "index.html"; // Redirect to login page
    } catch (error) {
        console.error("Logout error:", error.message);
    }
}

// Function to handle new user registration
async function registerUser(email, password, fullName, role) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        
        // Create user document in Firestore
        await setDoc(doc(db, "users", uid), {
            fullName: fullName,
            email: email,
            role: role,
            createdAt: new Date()
        });

        console.log("User registered and document created:", uid);
        alert("Registration successful! You can now log in.");
    } catch (error) {
        console.error("Registration error:", error.message);
        alert("Registration failed: " + error.message);
    }
}

// Function to check user's role and grant access
async function checkUserRole(uid) {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("User role:", userData.role);

            if (userData.role === "admin") {
                window.location.href = "dashboard.html"; // Redirect admins
            } else {
                window.location.href = "sites.html"; // Redirect regular users
            }
        } else {
            console.warn("No user document found!");
        }
    } catch (error) {
        console.error("Error fetching user role:", error.message);
    }
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User signed in:", user.uid);
        checkUserRole(user.uid);
    } else {
        console.log("No user signed in.");
    }
});

// Export functions for use in other scripts
export { loginUser, logoutUser, registerUser };
