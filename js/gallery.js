const galleryItems = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.querySelector(".lightbox-close");

/* Note: Navbar hide/show behavior is handled by layout.js */

galleryItems.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}
