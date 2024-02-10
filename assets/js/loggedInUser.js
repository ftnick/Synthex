document.addEventListener("DOMContentLoaded", function () {
    var usernameLabel = document.getElementById("usernameLabel");
  
    if (usernameLabel) {
      var isLoggedIn = localStorage.getItem("isLoggedIn");
      var username = localStorage.getItem("username");
  
      // Check if isLoggedIn is a string "true"
      if (isLoggedIn === "true" && username) {
        usernameLabel.textContent = username;
      } else {
        usernameLabel.textContent = "Unknown";
      }
    } else {
      console.error("Error: usernameLabel element not found.");
    }
  });
  