fetch("https://raw.githubusercontent.com/ftnick/Synthex-Roblox/main/maintenance.txt")
    .then(response => response.text())
    .then(data => {
        if (data.trim() === "true") {
            localStorage.getItem('isLoggedIn');
            localStorage.getItem("username");
            if (localStorage.getItem('isLoggedIn') === "true") {
                if (localStorage.getItem("username") === "admin") {
                   bypass = confirm("You are logged in as ftnick, do you want to bypass the maintenance?");
                   if (bypass) {
                       window.location.href = "index.html";
                   } else { 
                       window.location.href = "maintenance.html";
                   }
                } else {
                    window.location.href = "maintenance.html";
                }
            } else {
                window.location.href = "maintenance.html";
            }
        }
    });
