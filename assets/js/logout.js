// script.js

// Check if the user is logged in
function checkLoggedIn() {
    // You might want to implement a more robust check here (e.g., token validation)
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    console.warn('isLoggedIn:', isLoggedIn);

    if (!isLoggedIn) {
        // Redirect to the login page if not logged in
        window.location.href = "login.html";
    }
}

// Function to handle the logout functionality
function handleLogout() {
    // Implement your logout logic here
    // For example, clearing the isLoggedIn flag and redirecting to the login page
    localStorage.removeItem('isLoggedIn');
    window.location.href = "login.html";
}

// Call the checkLoggedIn function when the page loads
checkLoggedIn();

// Add click event listener to the logout button
var logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', handleLogout);
