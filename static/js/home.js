// === HOME PAGE JAVASCRIPT === //

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initHomePage();
});

// Initialize home page functionality
function initHomePage() {
    initHeroAnimations();
    initProfileImageEffects();
    initActionButtonEffects();
}

// === HERO SECTION ANIMATIONS === //
function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-name, .hero-title, .hero-location, .hero-description, .hero-actions');
    
    // Staggered fade-in animation
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });

    // Profile image fade-in
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.style.opacity = '0';
        profileImage.style.transform = 'scale(0.8)';
        profileImage.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            profileImage.style.opacity = '1';
            profileImage.style.transform = 'scale(1)';
        }, 100);
    }
}

// === PROFILE IMAGE EFFECTS === //
function initProfileImageEffects() {
    const profileContainer = document.querySelector('.profile-image-container');
    const profileImage = document.querySelector('.profile-image');
    
    if (!profileContainer || !profileImage) return;

    // Mouse move effect
    profileContainer.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    // Reset on mouse leave
    profileContainer.addEventListener('mouseleave', function() {
        profileImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });

    // Add click effect
    profileImage.addEventListener('click', function() {
        this.style.transform = 'perspective(1000px) scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'perspective(1000px) scale(1)';
        }, 150);
    });
}

// === ACTION BUTTON EFFECTS === //
function initActionButtonEffects() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Magnetic effect
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) * 0.1;
            const deltaY = (y - centerY) * 0.1;
            
            this.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px) translateY(-2px)`;
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) translateY(0)';
        });
    });
}

// === ADVANCED ANIMATIONS === //

// Reveal text animation
function revealText(element, delay = 0) {
    if (!element) return;
    
    const text = element.textContent;
    const words = text.split(' ');
    
    element.innerHTML = words.map((word, index) => 
        `<span class="word" style="opacity: 0; transform: translateY(20px); transition: all 0.6s ease; transition-delay: ${delay + index * 100}ms;">${word}</span>`
    ).join(' ');
    
    setTimeout(() => {
        const wordSpans = element.querySelectorAll('.word');
        wordSpans.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    }, 100);
}

// Performance monitoring
function monitorPerformance() {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'measure') {
                    console.log(`${entry.name}: ${entry.duration}ms`);
                }
            });
        });
        observer.observe({ entryTypes: ['measure'] });
    }
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    monitorPerformance();
}

// === CSS ADDITIONS FOR JAVASCRIPT EFFECTS === //
// Add dynamic styles for JavaScript-created elements
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .menu-open {
        overflow: hidden;
    }
    
    .scrolled {
        background: rgba(250, 247, 232, 0.98) !important;
        backdrop-filter: blur(15px) !important;
    }
    
    .hidden {
        transform: translateY(-100%) !important;
    }
`;
document.head.appendChild(style);