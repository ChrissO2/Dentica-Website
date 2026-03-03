// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}


function scrollReviews(direction) {
  const track = document.getElementById('reviewsTrack');
  const cardWidth = document.querySelector('.review-card').offsetWidth;
  const gap = 32; // 2rem gap in pixels
  const scrollAmount = cardWidth + gap;
  
  track.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// Update scroll indicator and button states
function updateScrollIndicator() {
  const track = document.getElementById('reviewsTrack');
  const indicator = document.getElementById('scrollIndicator');
  const prevBtn = document.querySelector('.carousel-button.prev');
  const nextBtn = document.querySelector('.carousel-button.next');
  
  if (!track || !indicator) return;
  
  const scrollLeft = track.scrollLeft;
  const scrollWidth = track.scrollWidth - track.clientWidth;
  const percentage = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
  
  // Width indicatora to około 20% + progress
  const indicatorWidth = 20 + (percentage * 0.8);
  indicator.style.width = indicatorWidth + '%';
  
  // Disable prev button when at the start
  if (prevBtn) {
    prevBtn.disabled = scrollLeft <= 5;
  }
  
  // Disable next button when at the end
  if (nextBtn) {
    nextBtn.disabled = scrollLeft >= scrollWidth - 5;
  }
}

// Listen for scroll events
const reviewsTrack = document.getElementById('reviewsTrack');
if (reviewsTrack) {
  reviewsTrack.addEventListener('scroll', updateScrollIndicator);
  // Initialize indicator on page load
  window.addEventListener('load', () => {
    updateScrollIndicator();
  });
  // Update on window resize
  window.addEventListener('resize', updateScrollIndicator);
}

// Allow keyboard navigation
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft') {
    scrollReviews(-1);
  } else if (event.key === 'ArrowRight') {
    scrollReviews(1);
  }
});
