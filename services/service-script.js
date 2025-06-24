// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('Animating:', entry.target);
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate elements when they come into view
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.feature-card, .tech-item, .process-step, .stat, .section-fade-in');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Add hover effect to tech stack items
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Process Steps Animation
const steps = document.querySelectorAll('.step');
steps.forEach((step, index) => {
    step.style.animationDelay = `${index * 0.2}s`;
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
}); 