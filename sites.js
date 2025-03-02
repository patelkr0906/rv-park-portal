document.addEventListener("DOMContentLoaded", async function () {
    const siteForm = document.getElementById("siteForm");
    const sitesTableBody = document.getElementById("sitesTableBody");
    const searchInput = document.getElementById("searchInput");
    const filterStatus = document.getElementById("filterStatus");
    const filterCategory = document.getElementById("filterCategory");
    const exportCSVButton = document.getElementById("exportCSV");
    const importCSVInput = document.getElementById("importCSV");
    const toggleDarkMode = document.getElementById("toggleDarkMode");
    let darkMode = false;

    // Firestore Setup
    const db = firebase.firestore();
    const sitesCollection = db.collection("rv_sites");

    // Load Sites from Firestore
    async function loadSites() {
        sitesTableBody.innerHTML = "";
        const querySnapshot = await sitesCollection.get();
        querySnapshot.forEach(doc => {
            const site = { id: doc.id, ...doc.data() };
            addSiteToTable(site);
        });
    }

    // Add site to Firestore
    siteForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const newSite = {
            siteNumber: siteForm.siteNumber.value,
            siteType: siteForm.siteType.value,
            siteStatus: siteForm.siteStatus.value,
            currentOccupant: siteForm.currentOccupant.value,
            reservationDate: siteForm.reservationDate.value,
            notes: siteForm.notes.value,
            hookups: siteForm.hookups.value,
            siteDimensions: siteForm.siteDimensions.value,
            maxVehicleSize: siteForm.maxVehicleSize.value,
            pricing: siteForm.pricing.value,
            guestContact: siteForm.guestContact.value,
            vehicleDetails: siteForm.vehicleDetails.value,
            checkInDate: siteForm.checkInDate.value,
            checkOutDate: siteForm.checkOutDate.value,
            maintenanceNotes: siteForm.maintenanceNotes.value,
            paymentStatus: siteForm.paymentStatus.value
        };

        await sitesCollection.add(newSite);
        siteForm.reset();
        loadSites();
    });

    // Add site to table
    function addSiteToTable(site) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${site.siteNumber}</td>
            <td>${site.siteType}</td>
            <td>${site.siteStatus}</td>
            <td>${site.currentOccupant || "-"}</td>
            <td>${site.reservationDate || "-"}</td>
            <td>${site.notes || "-"}</td>
            <td>${site.hookups || "-"}</td>
            <td>${site.siteDimensions || "-"}</td>
            <td>${site.maxVehicleSize || "-"}</td>
            <td>${site.pricing || "-"}</td>
            <td>${site.guestContact || "-"}</td>
            <td>${site.vehicleDetails || "-"}</td>
            <td>${site.checkInDate || "-"}</td>
            <td>${site.checkOutDate || "-"}</td>
            <td>${site.maintenanceNotes || "-"}</td>
            <td>${site.paymentStatus || "-"}</td>
            <td>
                <button onclick="deleteSite('${site.id}')">Delete</button>
            </td>
        `;
        sitesTableBody.appendChild(row);
    }

    // Delete site from Firestore
    window.deleteSite = async function (id) {
        await sitesCollection.doc(id).delete();
        loadSites();
    };

    // Search functionality
    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase();
        document.querySelectorAll("tbody tr").forEach(row => {
            row.style.display = row.innerText.toLowerCase().includes(searchValue) ? "" : "none";
        });
    });

    // Dark Mode Toggle
    toggleDarkMode.addEventListener("click", function () {
        darkMode = !darkMode;
        document.body.classList.toggle("dark-mode", darkMode);
    });

    // Load sites on page load
    loadSites();
});
