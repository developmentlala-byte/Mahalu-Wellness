/* ===============================
   ABOUT PAGE – PREMIUM INTERACTION
   =============================== */
   
/* Note: Navbar hide/show behavior is handled by layout.js */

/* ---------- SCROLL REVEAL (ELEGANT) ---------- */
(() => {
  const revealItems = document.querySelectorAll("[data-reveal]");

  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
})();

/* ---------- SOFT PARALLAX (VERY SUBTLE) ---------- */
(() => {
  const parallax = document.querySelectorAll("[data-parallax]");
  if (!parallax.length) return;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    parallax.forEach((el) => {
      const speed = el.dataset.parallax || 0.12;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
})();
