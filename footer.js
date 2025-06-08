
// Footer JavaScript for Funday Creamery
document.addEventListener('DOMContentLoaded', function() {
    // Initialize footer functionality
    initializeFooter();
});

function initializeFooter() {
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Add click tracking for analytics (optional)
    addClickTracking();
    
    // Add hover effects enhancement
    enhanceHoverEffects();
    
    // Add responsive behavior
    handleResponsiveDesign();
}

// Smooth scrolling for anchor links
function addSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('.footer-link[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Click tracking for analytics
function addClickTracking() {
    const footerLinks = document.querySelectorAll('.footer-link, .social-icon');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkText = this.querySelector('span')?.textContent || 
                           this.getAttribute('aria-label') || 
                           'Unknown';
            
            console.log(`Footer link clicked: ${linkText}`);
            
            // Here you can add your analytics tracking code
            // Example: gtag('event', 'click', { 'event_category': 'footer', 'event_label': linkText });
        });
    });
}

// Enhance hover effects with JavaScript
function enhanceHoverEffects() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add ripple effect to links
    const footerLinks = document.querySelectorAll('.footer-link');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

// Create ripple effect
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(229, 191, 136, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    // Add ripple animation if not exists
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Handle responsive design behaviors
function handleResponsiveDesign() {
    let resizeTimeout;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            adjustFooterLayout();
        }, 250);
    });
    
    // Initial layout adjustment
    adjustFooterLayout();
}

// Adjust footer layout based on screen size
function adjustFooterLayout() {
    const footer = document.querySelector('.footer');
    const footerContent = document.querySelector('.footer-content');
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 768) {
        footer.classList.add('mobile-layout');
    } else {
        footer.classList.remove('mobile-layout');
    }
    
    // Adjust link columns for very small screens
    if (screenWidth <= 480) {
        const linksGrid = document.querySelector('.links-grid');
        if (linksGrid) {
            linksGrid.style.gridTemplateColumns = '1fr';
        }
    } else if (screenWidth <= 768) {
        const linksGrid = document.querySelector('.links-grid');
        if (linksGrid) {
            linksGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        }
    } else {
        const linksGrid = document.querySelector('.links-grid');
        if (linksGrid) {
            linksGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        }
    }
}

// Add loading animation
function addLoadingAnimation() {
    const footerElements = document.querySelectorAll('.footer-content > *');
    
    footerElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Phone number formatting (optional enhancement)
function formatPhoneNumber() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Dialing:', this.href);
            // Add any pre-dial analytics or confirmations here
        });
    });
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', function() {
    addLoadingAnimation();
    formatPhoneNumber();
});

// Intersection Observer for scroll animations (optional)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.addEventListener('DOMContentLoaded', function() {
        const footerElements = document.querySelectorAll('.footer-content > *');
        footerElements.forEach(element => {
            observer.observe(element);
        });
    });
}