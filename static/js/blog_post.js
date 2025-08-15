// === BLOG POST JAVASCRIPT === //

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initBlogPost();
});

// Initialize blog post functionality
function initBlogPost() {
    initShareButtons();
    initCopyLink();
    initImageZoom();
}

// === SHARE FUNCTIONALITY === //
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn[data-share]');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.dataset.share;
            const url = window.location.href;
            const title = document.title;
            
            shareContent(platform, url, title);
        });
    });
}

function shareContent(platform, url, title) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    
    let shareUrl = '';
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
            break;
        default:
            return;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    }
}

// === COPY LINK FUNCTIONALITY === //
function initCopyLink() {
    const copyButton = document.querySelector('.copy-link');
    
    if (!copyButton) return;
    
    copyButton.addEventListener('click', async function() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            showCopySuccess();
        } catch (err) {
            // Fallback for older browsers
            fallbackCopyToClipboard(window.location.href);
        }
    });
}

function showCopySuccess() {
    // Remove existing success message
    const existingMessage = document.querySelector('.copy-success');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and show new success message
    const successMessage = document.createElement('div');
    successMessage.className = 'copy-success';
    successMessage.textContent = 'Link copied!';
    
    document.body.appendChild(successMessage);
    
    // Trigger animation
    setTimeout(() => successMessage.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
        setTimeout(() => successMessage.remove(), 300);
    }, 3000);
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
}

// === IMAGE ZOOM FUNCTIONALITY === //
function initImageZoom() {
    const images = document.querySelectorAll('.article-content img');
    
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        
        img.addEventListener('click', function() {
            createImageModal(this);
        });
    });
}

function createImageModal(img) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-backdrop"></div>
        <div class="image-modal-content">
            <img src="${img.src}" alt="${img.alt}" class="image-modal-img">
            <button class="image-modal-close" aria-label="Close">×</button>
        </div>
    `;
    
    // Add modal styles if not already present
    if (!document.querySelector('.image-modal-styles')) {
        const style = document.createElement('style');
        style.className = 'image-modal-styles';
        style.textContent = `
            .image-modal {
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
                animation: modalFadeIn 0.3s ease forwards;
            }
            
            .image-modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                cursor: pointer;
            }
            
            .image-modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                margin: auto;
            }
            
            .image-modal-img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                border-radius: 5px;
            }
            
            .image-modal-close {
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
            
            .image-modal-close:hover {
                background: white;
                transform: scale(1.1);
            }
            
            @keyframes modalFadeIn {
                to { opacity: 1; }
            }
            
            @media (max-width: 768px) {
                .image-modal-close {
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
    
    modal.querySelector('.image-modal-backdrop').addEventListener('click', closeModal);
    modal.querySelector('.image-modal-close').addEventListener('click', closeModal);
    
    // Close on escape key
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleKeyDown);
        }
    }
    document.addEventListener('keydown', handleKeyDown);
}

// === UTILITY FUNCTIONS === //

// Smooth scroll to element
function scrollToElement(element, offset = 100) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Export for external use
window.BlogPost = {
    scrollToElement,
    isElementInViewport
};