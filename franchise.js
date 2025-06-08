// Smooth scrolling functions?
function scrollToForm() {
    document.getElementById('form-section').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToWhy() {
    document.getElementById('why-section').scrollIntoView({
        behavior: 'smooth'
    });
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('franchiseForm');
    const successMessage = document.getElementById('successMessage');
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {};
        
        // Convert FormData to regular object
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'city', 'state', 'investmentRange'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!data[field] || data[field].trim() === '') {
                showFieldError(input, 'This field is required');
                isValid = false;
            } else {
                clearFieldError(input);
            }
        });
        
        // Validate email format
        if (data.email && !isValidEmail(data.email)) {
            const emailInput = document.getElementById('email');
            showFieldError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone format
        if (data.phone && !isValidPhone(data.phone)) {
            const phoneInput = document.getElementById('phone');
            showFieldError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        }
        
        if (isValid) {
            // Log the data (replace with actual submission logic)
            console.log('Franchise application submitted:', data);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
});

// Validation functions
function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return cleanPhone.length >= 10 && phoneRegex.test(cleanPhone);
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#ef4444';
    field.style.backgroundColor = '#fef2f2';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '4px';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    field.style.backgroundColor = '';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('hidden');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('hidden');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Close success message when clicking outside
document.getElementById('successMessage').addEventListener('click', function(e) {
    if (e.target === this) {
        closeSuccessMessage();
    }
});

// Escape key to close success message
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSuccessMessage();
    }
});

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.benefit-card, .investment-card, .support-card, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when page loads
window.addEventListener('load', addScrollAnimations);

// Form auto-save to localStorage (optional)
function saveFormData() {
    const form = document.getElementById('franchiseForm');
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    localStorage.setItem('franchiseFormData', JSON.stringify(data));
}

function loadFormData() {
    const savedData = localStorage.getItem('franchiseFormData');
    if (savedData) {
        const data = JSON.parse(savedData);
        const form = document.getElementById('franchiseForm');
        
        Object.keys(data).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field && data[key]) {
                field.value = data[key];
            }
        });
    }
}

// Auto-save form data on input
document.addEventListener('DOMContentLoaded', function() {
    loadFormData();
    
    const form = document.getElementById('franchiseForm');
    form.addEventListener('input', debounce(saveFormData, 1000));
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        localStorage.removeItem('franchiseFormData');
    });
});

// Debounce function for auto-save
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading state to submit button
function setSubmitLoading(loading) {
    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    if (loading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            Submitting...
        `;
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Add CSS for spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
