// script.js - Main script file (refactored)

/**
 * Hide Loading Screen after page is fully loaded
 */
function hideLoadingScreen() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.classList.add('loaded');
        setTimeout(() => {
            loader.remove();
            document.body.classList.remove('loading');
        }, 600); // Match CSS transition duration
    }
}

// Hide loading screen when page is fully loaded
if (document.readyState === 'complete') {
    // If already loaded, hide immediately
    setTimeout(hideLoadingScreen, 300);
} else {
    // Wait for window load event (all resources loaded)
    window.addEventListener('load', () => {
        setTimeout(hideLoadingScreen, 300);
    });
}

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
