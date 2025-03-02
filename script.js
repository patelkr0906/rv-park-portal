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
const db = getFirestore(app);

/** 
 * ==========================
 * RESERVATIONS MANAGEMENT
 * ==========================
 */

// Add a new reservation
async function addReservation(userId, guestName, checkInDate, checkOutDate, siteNumber, status) {
    try {
        const docRef = await addDoc(collection(db, "Reservations"), {
            userId: userId,
            guestName: guestName,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            siteNumber: siteNumber,
            status: status,
            createdAt: new Date()
        });

        console.log("Reservation added with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding reservation: ", error);
    }
}

// Get all reservations
async function getReservations() {
    const querySnapshot = await getDocs(collection(db, "Reservations"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}

// Get a reservation by ID
async function getReservationById(reservationId) {
    const docRef = doc(db, "Reservations", reservationId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Reservation Data:", docSnap.data());
    } else {
        console.log("No such reservation!");
    }
}

// Update a reservation
async function updateReservation(reservationId, newStatus) {
    const docRef = doc(db, "Reservations", reservationId);

    try {
        await updateDoc(docRef, {
            status: newStatus,
            updatedAt: new Date()
        });
        console.log("Reservation updated successfully!");
    } catch (error) {
        console.error("Error updating reservation: ", error);
    }
}

// Delete a reservation
async function deleteReservation(reservationId) {
    try {
        await deleteDoc(doc(db, "Reservations", reservationId));
        console.log("Reservation deleted successfully!");
    } catch (error) {
        console.error("Error deleting reservation: ", error);
    }
}

/** 
 * ==========================
 * SETTINGS MANAGEMENT
 * ==========================
 */

// Add a setting
async function addSetting(settingName, settingValue) {
    try {
        const docRef = await addDoc(collection(db, "Settings"), {
            settingName: settingName,
            settingValue: settingValue,
            updatedAt: new Date()
        });

        console.log("Setting added with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding setting: ", error);
    }
}

// Get all settings
async function getSettings() {
    const querySnapshot = await getDocs(collection(db, "Settings"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}

// Update a setting
async function updateSetting(settingId, newValue) {
    const docRef = doc(db, "Settings", settingId);

    try {
        await updateDoc(docRef, {
            settingValue: newValue,
            updatedAt: new Date()
        });
        console.log("Setting updated successfully!");
    } catch (error) {
        console.error("Error updating setting: ", error);
    }
}

/** 
 * ==========================
 * USER MANAGEMENT
 * ==========================
 */

// Get a user's role from Firestore
async function getUserRole(userId) {
    const docRef = doc(db, "Users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("User Role:", docSnap.data().role);
    } else {
        console.log("No such user!");
    }
}

// Add a new user
async function addUser(userId, name, email, role) {
    try {
        const docRef = await addDoc(collection(db, "Users"), {
            userId: userId,
            name: name,
            email: email,
            role: role,
            createdAt: new Date()
        });

        console.log("User added with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding user: ", error);
    }
}

// Update user role
async function updateUserRole(userId, newRole) {
    const docRef = doc(db, "Users", userId);

    try {
        await updateDoc(docRef, {
            role: newRole,
            updatedAt: new Date()
        });
        console.log("User role updated successfully!");
    } catch (error) {
        console.error("Error updating user role: ", error);
    }
}

/** 
 * ==========================
 * TESTING FUNCTION CALLS
 * ==========================
 */

// Example Calls
// Uncomment to test functions

// Add a test reservation
// addReservation("user123", "John Doe", "2025-03-10", "2025-03-15", 5, "Confirmed");

// Retrieve all reservations
// getReservations();

// Get a reservation by ID
// getReservationById("reservationDocID");

// Update a reservation status
// updateReservation("reservationDocID", "Checked In");

// Delete a reservation
// deleteReservation("reservationDocID");

// Add a test setting
// addSetting("siteAvailability", "Open");

// Get all settings
// getSettings();

// Update a setting
// updateSetting("settingDocID", "Closed");

// Get a user's role
// getUserRole("user123");

// Add a new user
// addUser("user123", "Alice Smith", "alice@example.com", "admin");

// Update a user's role
// updateUserRole("user123", "manager");

