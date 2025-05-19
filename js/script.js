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

// Video Popup functionality
function openVideoPopup(videoUrl, caption = '') {
    const embedUrl = getYouTubeEmbedUrl(videoUrl);
    if (!embedUrl) {
        alert("Invalid YouTube URL");
        return;
    }

    const popup = document.createElement('div');
    popup.className = 'video-popup';
    popup.style.display = 'flex';

    popup.innerHTML = `
        <span class="close-video-popup" onclick="closeVideoPopup()">&times;</span>
        <div class="video-popup-content">
            <div class="spinner" id="videoSpinner"></div>
<iframe class="video-popup-iframe"
        src="${embedUrl}?autoplay=1&mute=1&loop=1&playlist=${embedUrl.split('/').pop()}"
        onload="document.getElementById('videoSpinner').style.display='none';"
        ...
></iframe>

            ${caption ? `<p class="video-popup-caption">${caption}</p>` : ''}
        </div>
    `;

    document.body.appendChild(popup);
    document.body.style.overflow = 'hidden';

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
