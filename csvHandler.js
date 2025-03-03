import { db } from "./firebaseConfig.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Function to import CSV and add data to Firestore
document.getElementById("importCsv").addEventListener("change", async function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function (e) {
        const csvData = e.target.result;
        const rows = csvData.split("\n").map(row => row.split(","));
        if (rows.length < 2) {
            alert("Invalid CSV file format.");
            return;
        }

        const headers = rows[0].map(header => header.trim());
        const collectionRef = collection(db, "reservations"); // Change collection as needed

        for (let i = 1; i < rows.length; i++) {
            const rowData = rows[i];
            if (rowData.length !== headers.length) continue;

            let entry = {};
            headers.forEach((header, index) => {
                entry[header] = rowData[index].trim();
            });

            try {
                await addDoc(collectionRef, entry);
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
        alert("CSV Imported Successfully!");
    };

    reader.readAsText(file);
});

// Function to export Firestore data to CSV
document.getElementById("exportCsv").addEventListener("click", async function () {
    const collectionRef = collection(db, "reservations"); // Change collection as needed
    const snapshot = await getDocs(collectionRef);
    if (snapshot.empty) {
        alert("No data available for export.");
        return;
    }

    const data = [];
    snapshot.forEach(doc => {
        data.push(doc.data());
    });

    const headers = Object.keys(data[0]).join(",") + "\n";
    const csvContent = headers + data.map(row => Object.values(row).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reservations.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
