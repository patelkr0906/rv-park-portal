<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - RV Park Management</title>
    <link rel="stylesheet" href="styles.css">
    <script defer src="dashboard.js"></script>
</head>
<body>
    <nav>
        <ul>
            <li><a href="dashboard.html">Dashboard</a></li>
            <li><a href="sites.html">RV Sites Management</a></li>
            <li><a href="settings.html">Settings</a></li>
        </ul>
    </nav>

    <div class="container">
        <h1>Dashboard</h1>
        
        <!-- Dashboard Statistics -->
        <div class="dashboard-stats">
            <div class="stat-card">
                <h3>Total Sites</h3>
                <p id="totalSites">0</p>
            </div>
            <div class="stat-card available">
                <h3>Available Sites</h3>
                <p id="availableSites">0</p>
            </div>
            <div class="stat-card reserved">
                <h3>Reserved Sites</h3>
                <p id="reservedSites">0</p>
            </div>
            <div class="stat-card occupied">
                <h3>Occupied Sites</h3>
                <p id="occupiedSites">0</p>
            </div>
            <div class="stat-card maintenance">
                <h3>Maintenance Sites</h3>
                <p id="maintenanceSites">0</p>
            </div>
        </div>

        <!-- Recent Reservations -->
        <div class="dashboard-section">
            <h2>Recent Reservations</h2>
            <ul id="recentReservations">
                <li>Loading...</li>
            </ul>
        </div>

        <!-- Maintenance Alerts -->
        <div class="dashboard-section">
            <h2>Maintenance Alerts</h2>
            <ul id="maintenanceAlerts">
                <li>Loading...</li>
            </ul>
        </div>
    </div>
</body>
</html>
