import { collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebaseConfig.js";  // Import Firestore from your config file

// Function to add a reservation to Firestore
async function addReservation() {
    try {
        const docRef = await addDoc(collection(db, "reservations"), {
            userId: "testUser123",  // Replace with actual user ID
            checkInDate: Timestamp.fromDate(new Date("2025-03-05")),
            checkOutDate: Timestamp.fromDate(new Date("2025-03-10")),
            siteNumber: 1,
            status: "pending",
            totalPrice: 100.00,  // Example price
            paymentStatus: "pending",
            notes: "Near the lake",
            createdAt: Timestamp.now()
        });

        console.log("Reservation added with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding reservation: ", error);
    }
}

// Call the function to add a reservation
addReservation();
