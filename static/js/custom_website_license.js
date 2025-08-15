// === LICENSE PAGE JAVASCRIPT === //

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initLicensePage();
});

// Initialize license page functionality
function initLicensePage() {
    initLicenseImageZoom();
    initLicenseTextSelection();
}

// === IMAGE ZOOM FUNCTIONALITY === //
function initLicenseImageZoom() {
    const images = document.querySelectorAll('.license-content img');
    
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        
        img.addEventListener('click', function() {
            createLicenseImageModal(this);
        });
    });
}

function createLicenseImageModal(img) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'license-image-modal';
    modal.innerHTML = `
        <div class="license-image-modal-backdrop"></div>
        <div class="license-image-modal-content">
            <img src="${img.src}" alt="${img.alt}" class="license-image-modal-img">
            <button class="license-image-modal-close" aria-label="Close">×</button>
        </div>
    `;
    
    // Add modal styles if not already present
    if (!document.querySelector('.license-image-modal-styles')) {
        const style = document.createElement('style');
        style.className = 'license-image-modal-styles';
        style.textContent = `
            .license-image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                animation: licenseModalFadeIn 0.3s ease forwards;
            }
            
            .license-image-modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                cursor: pointer;
            }
            
            .license-image-modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                margin: auto;
            }
            
            .license-image-modal-img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                border-radius: 5px;
            }
            
            .license-image-modal-close {
                position: absolute;
                top: -40px;
                right: -40px;
                background: rgba(255, 255, 255, 0.9);
                border: none;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .license-image-modal-close:hover {
                background: white;
                transform: scale(1.1);
            }
            
            @keyframes licenseModalFadeIn {
                to { opacity: 1; }
            }
            
            @media (max-width: 768px) {
                .license-image-modal-close {
                    top: 10px;
                    right: 10px;
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
            document.body.style.overflow = '';
        }, 300);
    }
    
    modal.querySelector('.license-image-modal-backdrop').addEventListener('click', closeModal);
    modal.querySelector('.license-image-modal-close').addEventListener('click', closeModal);
    
    // Close on escape key
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleKeyDown);
        }
    }
    document.addEventListener('keydown', handleKeyDown);
}

// === TEXT SELECTION ENHANCEMENT === //
function initLicenseTextSelection() {
    // Add double-click to select paragraph functionality
    const paragraphs = document.querySelectorAll('.license-content p');
    
    paragraphs.forEach(paragraph => {
        paragraph.addEventListener('dblclick', function() {
            selectText(this);
        });
    });
}

function selectText(element) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
}

// === UTILITY FUNCTIONS === //

// Smooth scroll to element
function scrollToLicenseElement(element, offset = 100) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// Check if element is in viewport
function isLicenseElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Export for external use
window.LicensePage = {
    scrollToLicenseElement,
    isLicenseElementInViewport,
    selectText
};