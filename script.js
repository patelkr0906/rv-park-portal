document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "password") {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("portalContainer").style.display = "block";
    } else {
        document.getElementById("loginError").style.display = "block";
    }
});

document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Booking Confirmed!");
});
