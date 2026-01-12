const galleryItems = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.querySelector(".lightbox-close");

/* ================= NAVBAR SCROLL HIDE ================= */
let lastScrollY = window.scrollY;
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // efek background saat scroll
  if (currentScrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // hide / show navbar
  if (currentScrollY > lastScrollY && currentScrollY > 120) {
    // scroll ke bawah
    header.classList.add("hide");
  } else {
    // scroll ke atas
    header.classList.remove("hide");
  }

  lastScrollY = currentScrollY;
});

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
