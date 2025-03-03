import { auth } from "./firebase.js";
import { getReservations } from "./reservations.js";

// Ensure the user is authenticated before allowing access to the page
document.addEventListener("DOMContentLoaded", async () => {
    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.href = "index.html"; // Redirect to login if not authenticated
        } else {
            console.log("User is authenticated:", user);
            getReservations(); // Load reservations on page load
        }
    });
});
