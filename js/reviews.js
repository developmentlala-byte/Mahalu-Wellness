// reviews.js - Load and render reviews from JSON

/**
 * Load reviews from JSON file and render them
 */
async function loadReviews() {
  try {
    const response = await fetch('data/reviews.json');
    if (!response.ok) {
      throw new Error('Failed to load reviews');
    }
    
    const data = await response.json();
    const reviews = data.reviews;
    const reviewTrack = document.querySelector('.review-track');
    
    if (!reviewTrack) {
      return; // Exit if review section doesn't exist on this page
    }
    
    // Clear existing reviews (if any)
    reviewTrack.innerHTML = '';
    
    // Render reviews
    reviews.forEach(review => {
      const reviewItem = document.createElement('div');
      reviewItem.className = 'review-item';
      reviewItem.innerHTML = `
        <p class="review-text">"${review.text}"</p>
        <p class="review-name">– ${review.name} –</p>
      `;
      reviewTrack.appendChild(reviewItem);
    });
    
    // Initialize slider after reviews are loaded
    initializeReviewSlider();
  } catch (error) {
    console.error('Error loading reviews:', error);
  }
}

/**
 * Initialize review slider functionality
 */
function initializeReviewSlider() {
  const track = document.querySelector('.review-track');
  if (!track) return;
  
  const slides = Array.from(document.querySelectorAll('.review-item'));
  const prevBtn = document.querySelector('.review-btn.prev');
  const nextBtn = document.querySelector('.review-btn.next');
  
  if (slides.length === 0 || !prevBtn || !nextBtn) {
    return;
  }
  
  let index = 0;
  let autoSlideInterval;
  const AUTO_SLIDE_DELAY = 5000; // 5 seconds
  
  const updateSlider = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };
  
  const nextSlide = () => {
    index = (index + 1) % slides.length;
    updateSlider();
  };
  
  const prevSlide = () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
  };
  
  const startAutoSlide = () => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, AUTO_SLIDE_DELAY);
  };
  
  const resetAutoSlide = () => {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  };
  
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });
  
  // Start auto-slide when page loads
  startAutoSlide();
}

// Load reviews when DOM is ready
document.addEventListener('DOMContentLoaded', loadReviews);
