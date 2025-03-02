document.addEventListener("DOMContentLoaded", function () {
    updateDashboard();
});

// Function to update the dashboard statistics
function updateDashboard() {
    let sites = JSON.parse(localStorage.getItem("rvSites")) || [];

    let totalSites = sites.length;
    let availableSites = sites.filter(site => site.status === "available").length;
    let reservedSites = sites.filter(site => site.status === "reserved").length;
    let occupiedSites = sites.filter(site => site.status === "occupied").length;

    document.getElementById("totalSites").textContent = totalSites;
    document.getElementById("availableSites").textContent = availableSites;
    document.getElementById("reservedSites").textContent = reservedSites;
    document.getElementById("occupiedSites").textContent = occupiedSites;
}

// Simulated data for first-time users
if (!localStorage.getItem("rvSites")) {
    const initialSites = [
        { siteNumber: "1", status: "available" },
        { siteNumber: "2", status: "occupied" },
        { siteNumber: "3", status: "reserved" },
        { siteNumber: "4", status: "available" },
        { siteNumber: "5", status: "maintenance" }
    ];
    localStorage.setItem("rvSites", JSON.stringify(initialSites));
    updateDashboard();
}
