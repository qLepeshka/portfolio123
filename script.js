// ====================
// CURSOR GLOW EFFECT
// ====================
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ====================
// NAVBAR SCROLL EFFECT
// ====================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '1rem 0';
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.padding = '1.5rem 0';
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// ====================
// MOBILE MENU TOGGLE
// ====================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ====================
// SCROLL ANIMATIONS
// ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ====================
// COUNTER ANIMATION
// ====================
const statNumbers = document.querySelectorAll('.stat-number');
let counted = false;

const countUp = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
            counted = true;
            statNumbers.forEach(num => countUp(num));
        }
    });
}, { threshold: 0.5 });

document.querySelector('.about-stats')?.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// ====================
// SMOOTH SCROLL
// ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================
// TYPING EFFECT FOR HERO
// ====================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);
}

// ====================
// ACTIVE NAV LINK HIGHLIGHT
// ====================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link styles
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--text-primary);
    }
    .nav-links a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--accent-green);
    }
    .nav-links a {
        position: relative;
    }
`;
document.head.appendChild(style);

// ====================
// PAGE LOAD ANIMATION
// ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add load animation styles
const loadStyle = document.createElement('style');
loadStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadStyle);

// ====================
// FIX CONTACT FORM BTN
// ====================
const contactFormOld = document.querySelector('.contact-form');
if (contactFormOld) {
    contactFormOld.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactFormOld.querySelector('.btn-full');
        const originalText = btn.textContent;
        btn.textContent = 'Отправка...';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = 'Сообщение Отправлено! ✓';
            btn.style.background = 'var(--accent-green)';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
                contactFormOld.reset();
            }, 2000);
        }, 1500);
    });
}

// ====================
// LIGHTBOX GALLERY
// ====================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCurrent = document.getElementById('lightbox-current');
const lightboxTotal = document.getElementById('lightbox-total');
let currentProject = 1;
let currentIndex = 0;

const projectImages = {
    1: ['images/screenshot-9.png', 'images/screenshot-10.png'],
    2: ['images/screenshot-3.png', 'images/screenshot-4.png'],
    3: ['images/screenshot-5.png', 'images/screenshot-6.png'],
    4: ['images/screenshot-7.png', 'images/screenshot-8.png'],
    5: ['images/screenshot-1.png', 'images/screenshot-2.png']
};

function openLightbox(project) {
    currentProject = project;
    currentIndex = 0;
    lightboxTotal.textContent = projectImages[project].length;
    showImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function showImage() {
    const images = projectImages[currentProject];
    lightboxImg.src = images[currentIndex];
    lightboxCurrent.textContent = currentIndex + 1;
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function nextImage() {
    const images = projectImages[currentProject];
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
}

function prevImage() {
    const images = projectImages[currentProject];
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
}

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const project = parseInt(card.dataset.project);
        if (project) openLightbox(project);
    });
});

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-next').addEventListener('click', nextImage);
document.querySelector('.lightbox-prev').addEventListener('click', prevImage);

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// ====================
// REVIEW FORM
// ====================
const reviewForm = document.getElementById('review-form');
const reviewsGrid = document.getElementById('reviews-grid');

if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('review-name').value.trim();
        const company = document.getElementById('review-company').value.trim();
        const rating = parseInt(document.getElementById('review-rating').value);
        const text = document.getElementById('review-text').value.trim();
        if (!name || !text) return;

        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        const avatar = name.charAt(0).toUpperCase();
        const companyHtml = company ? `<span>${company}</span>` : '';

        const card = document.createElement('div');
        card.className = 'review-card';
        card.setAttribute('data-aos', 'fade-up');
        card.innerHTML = `
            <div class="review-stars">${stars}</div>
            <p class="review-text">${text}</p>
            <div class="review-author">
                <div class="review-avatar">${avatar}</div>
                <div>
                    <strong>${name}</strong>
                    ${companyHtml}
                </div>
            </div>
        `;

        reviewsGrid.prepend(card);
        reviewForm.reset();

        const btn = reviewForm.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Отзыв отправлен! ✓';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}
