// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
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

// Form submission handling
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            // Here you would typically send the form data to your server
            // For now, we'll just show a success message
            formSuccess.style.display = 'block';
            formError.style.display = 'none';
            contactForm.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 3000);
        } catch (error) {
            formError.style.display = 'block';
            formSuccess.style.display = 'none';
            
            // Hide error message after 3 seconds
            setTimeout(() => {
                formError.style.display = 'none';
            }, 3000);
        }
    });
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .value-card, .team-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial check for elements in view
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Scroll Animation for Service Cards
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
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

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCount = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCount();
    });
}

// Timeline Animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                entry.target.classList.add('visible');
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Enhanced Timeline Interactions
function enhanceTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const icon = item.querySelector('.timeline-icon');
        
        // Add click animation
        content.addEventListener('click', () => {
            content.style.transform = 'scale(0.95)';
            setTimeout(() => {
                content.style.transform = '';
            }, 150);
        });
        
        // Enhanced hover effects
        content.addEventListener('mouseenter', () => {
            icon.style.animationPlayState = 'paused';
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        content.addEventListener('mouseleave', () => {
            icon.style.animationPlayState = 'running';
            icon.style.transform = '';
        });
        
        // Add ripple effect on click
        content.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(59, 130, 246, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = e.clientX - content.offsetLeft + 'px';
            ripple.style.top = e.clientY - content.offsetTop + 'px';
            ripple.style.width = ripple.style.height = '20px';
            ripple.style.pointerEvents = 'none';
            
            content.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .timeline-content {
        cursor: pointer;
    }
    
    .timeline-item {
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .timeline-item.visible {
        animation: timelineItemAppear 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes timelineItemAppear {
        0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;
document.head.appendChild(style);

// Initialize timeline animations
document.addEventListener('DOMContentLoaded', () => {
    animateTimeline();
    enhanceTimelineInteractions();
});

// Initialize animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize stats counter
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        observer.observe(statsSection);
    }
});

// Enhanced Animation Scripts

// Initialize AOS with custom settings
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out-cubic',
            once: true,
            mirror: false,
            offset: 100
        });
    }

    // Add scroll-triggered animations
    addScrollAnimations();
    
    // Add counter animations
    addCounterAnimations();
    
    // Add interactive hover effects
    addInteractiveEffects();
    
    // Add typing effect for hero title
    addTypingEffect();
});

// Scroll-triggered animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for service cards
                if (entry.target.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll('.service-card, .hero-content, .hero-image');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}

// Counter animations for stats
function addCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Interactive hover effects
function addInteractiveEffects() {
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 25px 50px rgba(0, 123, 255, 0.2)';
            
            // Animate icon
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.color = '#28a745';
            }
            
            // Animate features
            const features = this.querySelectorAll('.service-features li');
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(10px)';
                    feature.style.color = '#28a745';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            
            // Reset icon
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '#007bff';
            }
            
            // Reset features
            const features = this.querySelectorAll('.service-features li');
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
                feature.style.color = '#333';
            });
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(0, 123, 255, 0.4)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 123, 255, 0.3)';
        });
    });
}

// Typing effect for hero title
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '3px solid #007bff';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Parallax effect for hero section
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (hero && heroContent && heroImage) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate * 0.5}px)`;
            heroImage.style.transform = `translateY(${rate * 0.3}px)`;
        }
    });
}

// Add smooth scroll for navigation links
function addSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
    addParallaxEffect();
    addSmoothScroll();
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Add CSS for loading state
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .service-card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .service-icon i {
        transition: all 0.3s ease;
    }
    
    .service-features li {
        transition: all 0.3s ease;
    }
    
    .btn {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Continuous Animation Scripts

// Initialize continuous animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out-cubic',
            once: false, // Changed to false for continuous animations
            mirror: true, // Enable mirror effect for continuous animations
            offset: 100
        });
    }

    // Add continuous scroll-triggered animations
    addContinuousScrollAnimations();
    
    // Add continuous counter animations
    addContinuousCounterAnimations();
    
    // Add continuous interactive effects
    addContinuousInteractiveEffects();
    
    // Add continuous typing effect
    addContinuousTypingEffect();
    
    // Add continuous parallax effect
    addContinuousParallaxEffect();
    
    // Add continuous color transitions
    addContinuousColorTransitions();
});

// Continuous scroll-triggered animations
function addContinuousScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add continuous animation for service cards
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animation = 'continuousCardFloat 6s ease-in-out infinite';
                }
            } else {
                entry.target.classList.remove('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll('.service-card, .hero-content, .hero-image');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Continuous counter animations
function addContinuousCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                
                // Continuous counting animation
                let current = 0;
                const increment = target / 100;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                        // Restart counting after 3 seconds
                        setTimeout(() => {
                            current = 0;
                            updateCounter();
                        }, 3000);
                    }
                };
                
                updateCounter();
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Continuous interactive effects
function addContinuousInteractiveEffects() {
    // Continuous service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Add continuous rotation to icons
        const icon = card.querySelector('.service-icon i');
        if (icon) {
            setInterval(() => {
                icon.style.transform = `rotate(${Math.random() * 360}deg) scale(${1 + Math.random() * 0.2})`;
            }, 3000 + index * 500);
        }
        
        // Add continuous color changes
        setInterval(() => {
            const colors = ['#007bff', '#28a745', '#ffc107', '#dc3545'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            card.style.borderColor = randomColor;
        }, 4000 + index * 300);
    });
    
    // Continuous button effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        setInterval(() => {
            btn.style.transform = `translateY(${Math.random() * 5 - 2.5}px) scale(${1 + Math.random() * 0.1})`;
        }, 2000);
    });
}

// Continuous typing effect
function addContinuousTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;
    
    const texts = [
        'Innovative Technology Solutions',
        'Digital Transformation Experts',
        'Future-Ready Solutions',
        'Technology Excellence'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const typeWriter = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            heroTitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroTitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeWriter, typeSpeed);
    };
    
    setTimeout(typeWriter, 1000);
}

// Continuous parallax effect
function addContinuousParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (hero && heroContent && heroImage) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate * 0.5}px) rotate(${scrolled * 0.01}deg)`;
            heroImage.style.transform = `translateY(${rate * 0.3}px) rotate(${-scrolled * 0.005}deg)`;
        }
    });
}

// Continuous color transitions
function addContinuousColorTransitions() {
    const elements = document.querySelectorAll('.service-card, .btn, .hero-content h1');
    
    setInterval(() => {
        elements.forEach((el, index) => {
            const colors = [
                'rgba(0, 123, 255, 0.1)',
                'rgba(40, 167, 69, 0.1)',
                'rgba(255, 193, 7, 0.1)',
                'rgba(220, 53, 69, 0.1)'
            ];
            
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            el.style.backgroundColor = randomColor;
            
            // Reset after 2 seconds
            setTimeout(() => {
                el.style.backgroundColor = '';
            }, 2000);
        });
    }, 5000);
}

// Continuous floating elements
function addContinuousFloatingElements() {
    const floatingElements = document.querySelectorAll('.service-icon, .stat-icon, .logo-icon');
    
    floatingElements.forEach((el, index) => {
        setInterval(() => {
            const x = Math.random() * 10 - 5;
            const y = Math.random() * 10 - 5;
            const rotation = Math.random() * 360;
            
            el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        }, 3000 + index * 200);
    });
}

// Continuous pulse effects
function addContinuousPulseEffects() {
    const pulseElements = document.querySelectorAll('.service-card, .stat-card');
    
    pulseElements.forEach((el, index) => {
        setInterval(() => {
            el.style.boxShadow = `0 0 ${20 + Math.random() * 30}px rgba(0, 123, 255, ${0.3 + Math.random() * 0.4})`;
            
            setTimeout(() => {
                el.style.boxShadow = '';
            }, 1000);
        }, 4000 + index * 300);
    });
}

// Initialize all continuous functions
document.addEventListener('DOMContentLoaded', function() {
    addContinuousParallaxEffect();
    addSmoothScroll();
    addContinuousFloatingElements();
    addContinuousPulseEffects();
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Add CSS for continuous animations
const continuousStyle = document.createElement('style');
continuousStyle.textContent = `
    .animate-in {
        animation: continuousEntrance 1s ease-out forwards;
    }
    
    @keyframes continuousEntrance {
        0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .service-card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .service-icon i {
        transition: all 0.3s ease;
    }
    
    .service-features li {
        transition: all 0.3s ease;
    }
    
    .btn {
        transition: all 0.3s ease;
    }
    
    /* Continuous hover effects */
    .service-card:hover {
        animation: continuousHover 0.6s ease-in-out infinite alternate;
    }
    
    @keyframes continuousHover {
        0% { transform: translateY(-5px) scale(1.02); }
        100% { transform: translateY(-10px) scale(1.03); }
    }
    
    /* Continuous background pulse */
    .hero::before {
        animation: continuousBackgroundPulse 8s ease-in-out infinite;
    }
    
    @keyframes continuousBackgroundPulse {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.3; }
    }
`;
document.head.appendChild(continuousStyle); 