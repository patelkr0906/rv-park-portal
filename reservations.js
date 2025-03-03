import { db } from "./firebase.js";
import { 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const reservationsRef = collection(db, "reservations");

// Function to fetch all reservations
async function getReservations() {
    try {
        const querySnapshot = await getDocs(reservationsRef);
        let reservations = [];
        querySnapshot.forEach(doc => {
            reservations.push({ id: doc.id, ...doc.data() });
        });

        // Call a function to display reservations in HTML
        displayReservations(reservations);
    } catch (error) {
        console.error("Error fetching reservations: ", error);
    }
}

// Function to display reservations in an HTML table
function displayReservations(reservations) {
    const reservationsTable = document.getElementById("reservationsTableBody");
    if (!reservationsTable) return;

    reservationsTable.innerHTML = ""; // Clear existing data

    reservations.forEach(reservation => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${reservation.name}</td>
            <td>${reservation.checkIn}</td>
            <td>${reservation.checkOut}</td>
            <td>${reservation.siteNumber}</td>
            <td>
                <button class="delete-btn" data-id="${reservation.id}">Delete</button>
            </td>
        `;
        reservationsTable.appendChild(row);
    });

    // Attach event listeners to delete buttons
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", async (e) => {
            const reservationId = e.target.getAttribute("data-id");
            await deleteReservation(reservationId);
            getReservations(); // Refresh list
        });
    });
}

// Function to add a new reservation
async function addReservation(name, checkIn, checkOut, siteNumber) {
    try {
        await addDoc(reservationsRef, {
            name,
            checkIn,
            checkOut,
            siteNumber
        });
        getReservations(); // Refresh the list after adding
    } catch (error) {
        console.error("Error adding reservation: ", error);
    }
}

// Function to delete a reservation
async function deleteReservation(reservationId) {
    try {
        await deleteDoc(doc(db, "reservations", reservationId));
        getReservations(); // Refresh the list
    } catch (error) {
        console.error("Error deleting reservation: ", error);
    }
}

// Automatically fetch reservations when the page loads
window.addEventListener("DOMContentLoaded", () => {
    getReservations();
});

// Export functions for use in other scripts if needed
export { getReservations, addReservation, deleteReservation };
