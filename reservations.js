import { db, auth } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Reference to the reservations collection
const reservationsRef = collection(db, "reservations");

// Function to add a reservation
async function addReservation(reservationData) {
    try {
        const docRef = await addDoc(reservationsRef, reservationData);
        console.log("Reservation added with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding reservation: ", error);
    }
}

// Function to fetch all reservations
async function getReservations() {
    try {
        const querySnapshot = await getDocs(reservationsRef);
        let reservations = [];
        querySnapshot.forEach(doc => {
            reservations.push({ id: doc.id, ...doc.data() });
        });
        return reservations;
    } catch (error) {
        console.error("Error fetching reservations: ", error);
    }
}

// Function to delete a reservation
async function deleteReservation(reservationId) {
    try {
        await deleteDoc(doc(db, "reservations", reservationId));
        console.log("Reservation deleted:", reservationId);
    } catch (error) {
        console.error("Error deleting reservation:", error);
    }
}

// Event listener for adding a reservation (Example usage)
document.getElementById("addReservationForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;
    const siteNumber = document.getElementById("siteNumber").value;
    const user = auth.currentUser ? auth.currentUser.uid : "guest";

    const reservationData = {
        name,
        checkIn,
        checkOut,
        siteNumber,
        user,
        createdAt: new Date()
    };

    await addReservation(reservationData);
    document.getElementById("addReservationForm").reset();
});

// Export functions for use in other scripts
export { addReservation, getReservations, deleteReservation };
