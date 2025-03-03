document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("darkModeToggle");
    const body = document.body;

    // Check and apply stored preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        if (toggleButton) toggleButton.checked = true;
    }

    // Toggle dark mode
    if (toggleButton) {
        toggleButton.addEventListener("change", function () {
            if (this.checked) {
                body.classList.add("dark-mode");
                localStorage.setItem("darkMode", "enabled");
            } else {
                body.classList.remove("dark-mode");
                localStorage.setItem("darkMode", "disabled");
            }
        });
    }
});
