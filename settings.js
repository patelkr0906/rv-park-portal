// settings.js

document.addEventListener("DOMContentLoaded", () => {
    loadSettings();
    
    const settingsForm = document.getElementById("settingsForm");
    if (settingsForm) {
        settingsForm.addEventListener("submit", saveSettings);
    }
});

// Load settings from local storage or default values
function loadSettings() {
    const darkModeEnabled = localStorage.getItem("darkMode") === "true";
    document.getElementById("darkModeToggle").checked = darkModeEnabled;
    applyDarkMode(darkModeEnabled);

    document.getElementById("businessName").value = localStorage.getItem("businessName") || "";
    document.getElementById("contactEmail").value = localStorage.getItem("contactEmail") || "";
    document.getElementById("phoneNumber").value = localStorage.getItem("phoneNumber") || "";
    document.getElementById("address").value = localStorage.getItem("address") || "";
}

// Save settings to local storage
function saveSettings(event) {
    event.preventDefault();

    const businessName = document.getElementById("businessName").value;
    const contactEmail = document.getElementById("contactEmail").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const address = document.getElementById("address").value;
    
    localStorage.setItem("businessName", businessName);
    localStorage.setItem("contactEmail", contactEmail);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("address", address);

    alert("Settings saved successfully!");
}

// Dark mode toggle
document.getElementById("darkModeToggle").addEventListener("change", (event) => {
    const isEnabled = event.target.checked;
    localStorage.setItem("darkMode", isEnabled);
    applyDarkMode(isEnabled);
});

// Apply dark mode styling
function applyDarkMode(enable) {
    document.body.classList.toggle("dark-mode", enable);
}
