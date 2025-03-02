import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Redirect if not logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("userInfo").innerText = `Logged in as: ${user.email}`;
        loadDashboardData();
    } else {
        window.location.href = "index.html";
    }
});

// Logout function
document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Logout failed:", error);
    });
});

// Function to load real-time data
function loadDashboardData() {
    // Listening for total sales updates
    onSnapshot(doc(db, "dashboard", "sales"), (doc) => {
        if (doc.exists()) {
            document.getElementById("totalSales").innerText = `$${doc.data().total}`;
        }
    });

    // Listening for inventory count updates
    onSnapshot(doc(db, "dashboard", "inventory"), (doc) => {
        if (doc.exists()) {
            document.getElementById("inventoryCount").innerText = doc.data().count;
        }
    });

    // Listening for active users updates
    onSnapshot(doc(db, "dashboard", "users"), (doc) => {
        if (doc.exists()) {
            document.getElementById("activeUsers").innerText = doc.data().active;
        }
    });
}
