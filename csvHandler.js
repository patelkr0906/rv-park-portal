// csvHandler.js

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("exportCSV").addEventListener("click", exportCSV);
    document.getElementById("importCSV").addEventListener("change", importCSV);
});

// Export table data to CSV
function exportCSV() {
    const table = document.querySelector("table");
    let csvContent = "";
    
    // Get table headers
    const headers = [];
    table.querySelectorAll("thead th").forEach(th => {
        headers.push(th.innerText.trim());
    });
    csvContent += headers.join(",") + "\n";

    // Get table rows
    table.querySelectorAll("tbody tr").forEach(row => {
        const rowData = [];
        row.querySelectorAll("td").forEach(td => {
            rowData.push(td.innerText.trim());
        });
        csvContent += rowData.join(",") + "\n";
    });

    // Create downloadable CSV file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "rv_sites_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Import CSV file and update table
function importCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const csvData = e.target.result;
        parseCSV(csvData);
    };
    reader.readAsText(file);
}

// Parse CSV data and add it to Firestore
function parseCSV(csvData) {
    const rows = csvData.split("\n").map(row => row.split(","));
    
    if (rows.length < 2) {
        alert("Invalid CSV format");
        return;
    }

    const headers = rows[0].map(header => header.trim());
    const dataRows = rows.slice(1);

    dataRows.forEach(row => {
        if (row.length !== headers.length) return; // Skip malformed rows

        const siteData = {};
        headers.forEach((header, index) => {
            siteData[header.toLowerCase().replace(/\s+/g, "_")] = row[index].trim();
        });

        // Add to Firestore
        addSiteToFirestore(siteData);
    });

    alert("CSV data imported successfully!");
}

// Function to add site data to Firestore
function addSiteToFirestore(siteData) {
    db.collection("rv_sites").add(siteData)
        .then(() => console.log("Site added:", siteData))
        .catch(error => console.error("Error adding site:", error));
}
