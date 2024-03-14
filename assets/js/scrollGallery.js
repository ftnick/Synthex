const scrollSpeed = 1; // Adjust as needed
const intervalTime = 20; // Adjust as needed

function scrollGallery() {
  const galleryContainer = document.querySelector(".gallery-container");
  galleryContainer.scrollLeft += scrollSpeed;

  // Check if scrolled to the end
  if (
    galleryContainer.scrollLeft >=
    galleryContainer.scrollWidth - galleryContainer.offsetWidth
  ) {
    // Clone all images and append them to the end
    const projectImages = galleryContainer.querySelectorAll(".project-image");
    projectImages.forEach((image) => {
      const cloneImage = image.cloneNode(true);
      galleryContainer.appendChild(cloneImage);
    });
    // Reset scroll position
    galleryContainer.scrollLeft = 0;
  }
}

// Call the function repeatedly for smooth scrolling effect
setInterval(scrollGallery, intervalTime); // Adjust as needed
