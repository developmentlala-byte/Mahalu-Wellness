// services-preview.js - Load and render services preview from JSON

/**
 * Load services preview from JSON file and render them
 */
async function loadServicesPreview() {
  try {
    const response = await fetch('data/services-preview.json');
    if (!response.ok) {
      throw new Error('Failed to load services preview');
    }
    
    const data = await response.json();
    const services = data.services;
    const servicesGrid = document.querySelector('.services-grid');
    
    if (!servicesGrid) {
      return; // Exit if services preview section doesn't exist on this page
    }
    
    // Clear existing services (if any)
    servicesGrid.innerHTML = '';
    
    // Render services
    services.forEach(service => {
      const serviceItem = document.createElement('a');
      serviceItem.href = service.link;
      serviceItem.className = 'service-item';
      serviceItem.style.backgroundImage = `url('${service.image}')`;
      serviceItem.innerHTML = `
        <div class="overlay">
          <div class="overlay-box">
            <h3>${service.title}</h3>
            <span class="view-more">VIEW MORE</span>
          </div>
        </div>
      `;
      servicesGrid.appendChild(serviceItem);
    });
  } catch (error) {
    console.error('Error loading services preview:', error);
  }
}

// Load services preview when DOM is ready
document.addEventListener('DOMContentLoaded', loadServicesPreview);
