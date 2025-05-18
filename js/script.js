const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { 
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });
    
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Image Popup Lightbox
        document.querySelectorAll('.lightbox-trigger').forEach(img => {
  img.addEventListener('click', function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = this.getAttribute('data-full');
    lightboxImg.alt = this.getAttribute('data-alt');
    lightbox.style.display = 'flex';
  });
});

document.getElementById('lightbox').addEventListener('click', function (e) {
  if (e.target.classList.contains('lightbox') || e.target.classList.contains('close-lightbox')) {
    this.style.display = 'none';
    document.getElementById('lightbox-img').src = '';
  }
});



// GIF Popup functionality
function openGifPopup(gifSrc, caption) {
    const popup = document.getElementById('gifPopup');
    const popupGif = document.getElementById('popupGif');
    const popupCaption = document.getElementById('popupCaption');
    
    popupGif.src = gifSrc;
    popupCaption.textContent = caption;
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGifPopup() {
    const popup = document.getElementById('gifPopup');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close when clicking outside the image
window.onclick = function(event) {
    const popup = document.getElementById('gifPopup');
    if (event.target == popup) {
        closeGifPopup();
    }
}

// Close with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeGifPopup();
    }
});

// Filter Buttons in Featured Projects
// Project Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
        console.log('Hamburger clicked'); // Debugging
        this.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Toggle body overflow to prevent scrolling when menu is open
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// Rest of your existing JavaScript...