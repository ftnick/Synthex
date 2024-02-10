// script.js

// Check if the user is logged in
document.addEventListener("DOMContentLoaded", function () {
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    console.warn('isLoggedIn:', isLoggedIn);

    if (!isLoggedIn) {
        // Redirect to the login page if not logged in
        window.location.href = "login.html";
    }
});
  