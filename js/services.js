// services.js - Load and render services from JSON (refactored)

/**
 * Load services from JSON file and render them
 */
async function loadServices() {
  try {
    const response = await fetch('data/services.json');
    if (!response.ok) {
      throw new Error('Failed to load services');
    }
    
    const data = await response.json();
    const services = data.services;
    const menuTrack = document.querySelector('.menu-track');
    
    if (!menuTrack) {
      return; // Exit if services section doesn't exist on this page
    }
    
    // Clear existing services (if any)
    menuTrack.innerHTML = '';
    
    // Render services
    services.forEach(service => {
      const menuCard = document.createElement('div');
      menuCard.className = 'menu-card';
      menuCard.setAttribute('data-title', service.title);
      menuCard.setAttribute('data-desc', service.description);
      menuCard.setAttribute('data-image', service.image);
      menuCard.innerHTML = `
        <img src="${service.image}" alt="${service.alt}" />
        <div class="menu-overlay">
          <h3>${service.cardTitle}</h3>
          <span class="view-detail">VIEW DETAILS</span>
        </div>
      `;
      menuTrack.appendChild(menuCard);
    });
    
    // Initialize services functionality after services are loaded
    initializeServicesFunctionality();
  } catch (error) {
    console.error('Error loading services:', error);
  }
}

/**
 * Initialize services slider and modal functionality
 */
function initializeServicesFunctionality() {
  const track = document.querySelector('.menu-track');
  const prev = document.querySelector('.menu-nav.prev');
  const next = document.querySelector('.menu-nav.next');
  const modal = document.getElementById('serviceModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const cards = document.querySelectorAll('.menu-card');
  const closeBtn = document.querySelector('.modal-close');
  const backdrop = document.querySelector('.modal-backdrop');
  
  if (!track || !prev || !next || !modal) {
    return; // Exit if required elements don't exist
  }
  
  let isDown = false;
  let startX;
  let scrollLeft;
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  // Header scroll behavior
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('nav-hidden');
      return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 120) {
      header.classList.add('nav-hidden');
    } else {
      header.classList.remove('nav-hidden');
    }
    
    lastScroll = currentScroll;
  });
  
  // Navigation buttons - scroll by card width
  const cardWidth = track.querySelector('.menu-card')?.offsetWidth || 600;
  
  prev.addEventListener('click', () => {
    track.scrollBy({ left: -cardWidth - 16, behavior: 'smooth' });
  });
  
  next.addEventListener('click', () => {
    track.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
  });
  
  // Drag scroll
  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  
  track.addEventListener('mouseleave', () => {
    isDown = false;
  });
  
  track.addEventListener('mouseup', () => {
    isDown = false;
  });
  
  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.4;
    track.scrollLeft = scrollLeft - walk;
  });
  
  // Open modal
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      modalImage.src = card.dataset.image;
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
}

// Load services when DOM is ready
document.addEventListener('DOMContentLoaded', loadServices);
