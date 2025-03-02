document.addEventListener("DOMContentLoaded", function () {
    const siteForm = document.getElementById("siteForm");
    const sitesTableBody = document.getElementById("sitesTableBody");
    const searchInput = document.getElementById("searchInput");
    const filterCategory = document.getElementById("filterCategory");
    const filterStatus = document.getElementById("filterStatus");
    const exportCSV = document.getElementById("exportCSV");
    const importCSV = document.getElementById("importCSV");
    const toggleDarkMode = document.getElementById("toggleDarkMode");

    let sites = JSON.parse(localStorage.getItem("sites")) || [];

    // Function to render site list
    function renderSites() {
        sitesTableBody.innerHTML = "";
        let filteredSites = sites.filter(site => {
            return (
                (filterCategory.value === "" || site.type === filterCategory.value) &&
                (filterStatus.value === "" || site.status === filterStatus.value) &&
                (searchInput.value === "" || site.number.includes(searchInput.value))
            );
        });

        filteredSites.forEach((site, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${site.number}</td>
                <td>${site.type}</td>
                <td>${site.status}</td>
                <td>${site.currentOccupant || "N/A"}</td>
                <td>${site.reservationDate || "N/A"}</td>
                <td>${site.notes || "N/A"}</td>
                <td>${site.hookups || "N/A"}</td>
                <td>${site.dimensions || "N/A"}</td>
                <td>${site.maxVehicleSize || "N/A"}</td>
                <td>${site.pricing || "N/A"}</td>
                <td>${site.guestContact || "N/A"}</td>
                <td>${site.vehicleDetails || "N/A"}</td>
                <td>${site.checkInDate || "N/A"}</td>
                <td>${site.checkOutDate || "N/A"}</td>
                <td>${site.maintenanceNotes || "N/A"}</td>
                <td>${site.paymentStatus || "N/A"}</td>
                <td>
                    <button class="edit" onclick="editSite(${index})">✏️</button>
                    <button class="delete" onclick="deleteSite(${index})">🗑️</button>
                </td>
            `;
            sitesTableBody.appendChild(row);
        });

        localStorage.setItem("sites", JSON.stringify(sites));
    }

    // Function to add or update a site
    siteForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const siteData = {
            number: document.getElementById("siteNumber").value,
            type: document.getElementById("siteType").value,
            status: document.getElementById("siteStatus").value,
            currentOccupant: document.getElementById("currentOccupant").value,
            reservationDate: document.getElementById("reservationDate").value,
            notes: document.getElementById("notes").value,
            hookups: document.getElementById("hookups").value,
            dimensions: document.getElementById("siteDimensions").value,
            maxVehicleSize: document.getElementById("maxVehicleSize").value,
            pricing: document.getElementById("pricing").value,
            guestContact: document.getElementById("guestContact").value,
            vehicleDetails: document.getElementById("vehicleDetails").value,
            checkInDate: document.getElementById("checkInDate").value,
            checkOutDate: document.getElementById("checkOutDate").value,
            maintenanceNotes: document.getElementById("maintenanceNotes").value,
            paymentStatus: document.getElementById("paymentStatus").value
        };

        const existingIndex = sites.findIndex(site => site.number === siteData.number);
        if (existingIndex !== -1) {
            sites[existingIndex] = siteData;
        } else {
            sites.push(siteData);
        }

        siteForm.reset();
        renderSites();
    });

    // Function to edit site
    window.editSite = function (index) {
        const site = sites[index];
        document.getElementById("siteNumber").value = site.number;
        document.getElementById("siteType").value = site.type;
        document.getElementById("siteStatus").value = site.status;
        document.getElementById("currentOccupant").value = site.currentOccupant;
        document.getElementById("reservationDate").value = site.reservationDate;
        document.getElementById("notes").value = site.notes;
        document.getElementById("hookups").value = site.hookups;
        document.getElementById("siteDimensions").value = site.dimensions;
        document.getElementById("maxVehicleSize").value = site.maxVehicleSize;
        document.getElementById("pricing").value = site.pricing;
        document.getElementById("guestContact").value = site.guestContact;
        document.getElementById("vehicleDetails").value = site.vehicleDetails;
        document.getElementById("checkInDate").value = site.checkInDate;
        document.getElementById("checkOutDate").value = site.checkOutDate;
        document.getElementById("maintenanceNotes").value = site.maintenanceNotes;
        document.getElementById("paymentStatus").value = site.paymentStatus;
    };

    // Function to delete site
    window.deleteSite = function (index) {
        if (confirm("Are you sure you want to delete this site?")) {
            sites.splice(index, 1);
            renderSites();
        }
    };

    // Search functionality
    searchInput.addEventListener("input", renderSites);

    // Filter functionality
    filterCategory.addEventListener("change", renderSites);
    filterStatus.addEventListener("change", renderSites);

    // CSV Export
    exportCSV.addEventListener("click", function () {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Site Number,Type,Status,Current Occupant,Reservation Date,Notes,Hookups,Dimensions,Max Vehicle Size,Pricing,Guest Contact,Vehicle Details,Check-in,Check-out,Maintenance Notes,Payment Status\n";

        sites.forEach(site => {
            csvContent += `${Object.values(site).join(",")}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "rv_sites.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // CSV Import
    importCSV.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const rows = e.target.result.split("\n").slice(1);
            rows.forEach(row => {
                const values = row.split(",");
                if (values.length > 1) {
                    const newSite = {
                        number: values[0],
                        type: values[1],
                        status: values[2],
                        currentOccupant: values[3],
                        reservationDate: values[4],
                        notes: values[5],
                        hookups: values[6],
                        dimensions: values[7],
                        maxVehicleSize: values[8],
                        pricing: values[9],
                        guestContact: values[10],
                        vehicleDetails: values[11],
                        checkInDate: values[12],
                        checkOutDate: values[13],
                        maintenanceNotes: values[14],
                        paymentStatus: values[15]
                    };
                    sites.push(newSite);
                }
            });
            renderSites();
        };
        reader.readAsText(file);
    });

    // Dark Mode Toggle
    toggleDarkMode.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    renderSites();
});
