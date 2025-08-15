// === BASE JAVASCRIPT FUNCTIONALITY === //

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    initMobileMenu();
    initSmoothScrolling();
    initHeaderScroll();
    initThemeEffects();
    initEmailCopy();
}

// === MOBILE NAVIGATION === //
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!mobileToggle || !navMenu) return;

    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// === SMOOTH SCROLLING === //
function initSmoothScrolling() {
    // Handle anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === HEADER SCROLL EFFECTS === //
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    let lastScrollTop = 0;
    let isScrolling = false;

    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Add/remove scrolled class for styling
                if (scrollTop > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Optional: Hide header on scroll down, show on scroll up
                // Uncomment if you want this behavior
                /*
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }
                */

                lastScrollTop = scrollTop;
                isScrolling = false;
            });
        }
        isScrolling = true;
    }

    // Throttled scroll event
    window.addEventListener('scroll', handleScroll);
}

// === THEME AND VISUAL EFFECTS === //
function initThemeEffects() {
    // Initialize intersection observer for animations
    initScrollAnimations();
}

function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for multiple elements
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.animationDelay = `${delay}ms`;
            }
        });
    }, observerOptions);

    // Observe elements that should animate in
    const animatedElements = document.querySelectorAll('.hero-content, .section-title');
    animatedElements.forEach(el => observer.observe(el));
}

// === EMAIL COPY FUNCTIONALITY === //
function initEmailCopy() {
    const emailCopyButton = document.querySelector('.email-copy');
    
    if (!emailCopyButton) return;
    
    emailCopyButton.addEventListener('click', async function(e) {
        e.preventDefault();
        const email = this.dataset.email;
        
        try {
            await navigator.clipboard.writeText(email);
            showEmailCopySuccess();
        } catch (err) {
            // Fallback for older browsers
            fallbackCopyEmailToClipboard(email);
        }
    });
}

function showEmailCopySuccess() {
    // Remove existing success message
    const existingMessage = document.querySelector('.email-copy-success');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and show new success message
    const successMessage = document.createElement('div');
    successMessage.className = 'email-copy-success';
    successMessage.textContent = 'Email copied!';
    
    document.body.appendChild(successMessage);
    
    // Trigger animation
    setTimeout(() => successMessage.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
        setTimeout(() => successMessage.remove(), 300);
    }, 3000);
}

function fallbackCopyEmailToClipboard(email) {
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showEmailCopySuccess();
    } catch (err) {
        console.error('Failed to copy email: ', err);
    }
    
    document.body.removeChild(textArea);
}

// === UTILITY FUNCTIONS === //

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// === EXPORT FOR MODULAR USE === //
// Make functions available globally for other scripts
window.BaseApp = {
    debounce,
    throttle,
    isInViewport,
    initSmoothScrolling,
    initHeaderScroll
};