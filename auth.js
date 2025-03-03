// Import Firebase authentication module
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "./firebaseConfig.js";

// Initialize Firebase authentication and Firestore
the const auth = getAuth(app);
const db = getFirestore(app);

// User Registration Function
async function registerUser(email, password, fullName, role) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user details in Firestore
        await setDoc(doc(db, "users", user.uid), {
            fullName: fullName,
            email: email,
            role: role,
            createdAt: new Date()
        });
        
        console.log("User registered successfully:", user);
        return user;
    } catch (error) {
        console.error("Error registering user:", error.message);
        throw error;
    }
}

// User Login Function
async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error;
    }
}

// User Logout Function
async function logoutUser() {
    try {
        await signOut(auth);
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Error logging out:", error.message);
        throw error;
    }
}

// Check User Authentication State
function checkAuthState(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}

// Get User Data from Firestore
async function getUserData(uid) {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            console.log("No such user found in Firestore");
            return null;
        }
    } catch (error) {
        console.error("Error retrieving user data:", error.message);
        throw error;
    }
}

export { registerUser, loginUser, logoutUser, checkAuthState, getUserData };
