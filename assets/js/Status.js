document.addEventListener("DOMContentLoaded", function () {
  const TextElement = document.getElementById("txt")
  const ImageElement = document.getElementById("svg")
  const ImageElement2 = document.getElementById("svg2")
  var sp = new StatusPage.page({ page: 'tnb0dn74gt5z' });
  sp.status({
    success: function(data) {
      const readableDate = formatISODate(data.page.updated_at);
      if (data.status.indicator === "none") {
        TextElement.innerHTML = data.status.description
      } else {
        TextElement.innerHTML = '<a href="https://synthexdevelopment.statuspage.io/">' + data.status.description + " Reported At: " + readableDate + "</a>"
      }
      ImageElement.className = '';
      if (data.status.indicator === "none") {
        ImageElement.classList.add("svgOperational")
        ImageElement2.classList.add("svgOperational")

      } if (data.status.description === "Partially Degraded Service") {
        ImageElement.classList.add("svgDegraded")
        ImageElement2.classList.add("svgDegraded")

      } if (data.status.description === "Minor Service Outage") {
        ImageElement.classList.add("svgPartial")
        ImageElement2.classList.add("svgPartial")

      } if (data.status.description === "Partial System Outage") {
        ImageElement.classList.add("svgMajor")
        ImageElement2.classList.add("svgMajor")

      } if (data.status.indicator === "maintenance") {
        ImageElement.classList.add("svgMaintenance")
        ImageElement2.classList.add("svgMaintenance")

      }
    }
  });
  });