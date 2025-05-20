// Scroll to Top Button
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

// Helper to get embed URL from any YouTube link
function getYouTubeEmbedUrl(url) {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([\w-]{11})/;
    const match = url.match(regex);
    const videoId = match ? match[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
}

// Video Popup functionality with improved spinner
function openVideoPopup(videoUrl, caption = '') {
    const embedUrl = getYouTubeEmbedUrl(videoUrl);
    if (!embedUrl) {
        alert("Invalid YouTube URL");
        return;
    }

    // Create spinner container
    const spinnerContainer = document.createElement('div');
    spinnerContainer.className = 'spinner-container';
    spinnerContainer.innerHTML = '<div class="spinner"></div>';
    
    // Create popup container
    const popup = document.createElement('div');
    popup.className = 'video-popup';
    popup.style.display = 'flex';
    popup.appendChild(spinnerContainer);

    // Create iframe (hidden initially)
    const iframe = document.createElement('iframe');
    iframe.className = 'video-popup-iframe';
    iframe.style.display = 'none';
    iframe.src = `${embedUrl}?autoplay=1&mute=1`;
    
    // When iframe loads, hide spinner and show iframe
    iframe.onload = function() {
        spinnerContainer.style.display = 'none';
        iframe.style.display = 'block';
    };

    // Create popup content container
    const popupContent = document.createElement('div');
    popupContent.className = 'video-popup-content';
    popupContent.appendChild(iframe);
    
    if (caption) {
        const captionElement = document.createElement('p');
        captionElement.className = 'video-popup-caption';
        captionElement.textContent = caption;
        popupContent.appendChild(captionElement);
    }

    // Create close button
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-video-popup';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = closeVideoPopup;

    // Assemble popup
    popup.appendChild(closeBtn);
    popup.appendChild(popupContent);

    // Add to DOM
    document.body.appendChild(popup);
    document.body.style.overflow = 'hidden';

    // Close when clicking outside content
    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
            closeVideoPopup();
        }
    });
}

function closeVideoPopup() {
    const popup = document.querySelector('.video-popup');
    if (popup) {
        popup.remove();
    }
    document.body.style.overflow = 'auto';
}

// Project Filter Functionality
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        nav.classList.toggle('active');

        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}