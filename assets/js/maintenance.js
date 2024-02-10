fetch("https://raw.githubusercontent.com/ftnick/Synthex-Roblox/main/maintenance.txt")
    .then(response => response.text())
    .then(data => {
        if (data.trim() === "true") {
            window.location.href = "maintenance.html";
        }
    });
