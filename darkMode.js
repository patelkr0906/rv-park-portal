// darkMode.js

document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleDarkMode");
    const body = document.body;

    // Check for saved user preference and apply it
    if (localStorage.getItem("darkMode") === "enabled") {
        enableDarkMode();
    }

    // Toggle dark mode on button click
    toggleButton.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
    }

    function disableDarkMode() {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
    }
});
