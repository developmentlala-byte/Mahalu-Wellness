// script.js - Main script file (refactored)

/**
 * Pause hero video when tab is not visible (saves CPU)
 */
document.addEventListener("DOMContentLoaded", function () {
    const heroVideo = document.querySelector(".hero-video");
    if (heroVideo) {
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                heroVideo.pause();
            } else {
                // Coba putar lagi, abaikan error jika browser memblokir autoplay
                heroVideo.play().catch(() => {});
            }
        });
    }
});
