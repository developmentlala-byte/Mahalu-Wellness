// owner.js - Load and render owner quote from JSON

/**
 * Load owner data from JSON file and render it
 */
async function loadOwner() {
  try {
    const response = await fetch('data/owner.json');
    if (!response.ok) {
      throw new Error('Failed to load owner data');
    }
    
    const data = await response.json();
    const owner = data.owner;
    const ownerText = document.querySelector('.owner-text');
    const ownerImage = document.querySelector('.owner-img');
    
    if (!ownerText) {
      return; // Exit if owner section doesn't exist on this page
    }
    
    // Update owner quote
    const quoteElement = ownerText.querySelector('.owner-quote');
    if (quoteElement) {
      quoteElement.textContent = owner.quote;
    }
    
    // Update owner name
    const nameElement = ownerText.querySelector('.owner-name');
    if (nameElement) {
      nameElement.textContent = `— ${owner.name}`;
    }
    
    // Update owner image
    if (ownerImage) {
      ownerImage.src = owner.image;
      ownerImage.alt = owner.imageAlt;
    }
  } catch (error) {
    console.error('Error loading owner data:', error);
  }
}

// Load owner data when DOM is ready
document.addEventListener('DOMContentLoaded', loadOwner);
