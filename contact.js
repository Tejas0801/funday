
// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('messageModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModal = document.querySelector('.close-modal');
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }
        
        // Validate form
        if (validateForm(formObject)) {
            submitForm(formObject);
        }
    });
    
    // Form validation
    function validateForm(data) {
        const errors = [];
        
        // Required field validation
        if (!data.firstName || data.firstName.trim() === '') {
            errors.push('First name is required');
        }
        
        if (!data.lastName || data.lastName.trim() === '') {
            errors.push('Last name is required');
        }
        
        if (!data.email || data.email.trim() === '') {
            errors.push('Email is required');
        } else if (!isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.subject || data.subject.trim() === '') {
            errors.push('Please select a subject');
        }
        
        if (!data.message || data.message.trim() === '') {
            errors.push('Message is required');
        } else if (data.message.length < 10) {
            errors.push('Message must be at least 10 characters long');
        }
        
        // Phone validation (optional but if provided, should be valid)
        if (data.phone && data.phone.trim() !== '' && !isValidPhone(data.phone)) {
            errors.push('Please enter a valid phone number');
        }
        
        if (errors.length > 0) {
            showModal('error', 'Please fix the following errors:', errors);
            return false;
        }
        
        return true;
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone validation
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
        return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
    }
    
    // Form submission
    function submitForm(data) {
        const submitBtn = document.querySelector('.submit-btn');
        const btnText = document.querySelector('.btn-text');
        const btnLoading = document.querySelector('.btn-loading');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        
        // Simulate API call (replace with actual endpoint)
        setTimeout(() => {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            
            // For demo purposes, always show success
            // In real implementation, handle actual API response
            const success = Math.random() > 0.1; // 90% success rate for demo
            
            if (success) {
                showModal('success', 'Thank you for your message!', [
                    'We have received your inquiry and will get back to you within 24 hours.',
                    'Our team is excited to help you with your ice cream needs!'
                ]);
                contactForm.reset();
            } else {
                showModal('error', 'Oops! Something went wrong.', [
                    'There was an issue sending your message.',
                    'Please try again or contact us directly at hello@icecreamparadise.com'
                ]);
            }
        }, 2000); // Simulate network delay
        
        // Log form data (for debugging - remove in production)
        console.log('Form submitted with data:', data);
    }
    
    // Show modal with message
    function showModal(type, title, messages) {
        const isSuccess = type === 'success';
        const className = isSuccess ? 'success-message' : 'error-message';
        const icon = isSuccess ? '✅' : '❌';
        
        let messageHTML = `
            <div class="${className}">
                <h3 style="margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                    <span style="font-size: 1.5rem;">${icon}</span>
                    ${title}
                </h3>
        `;
        
        if (Array.isArray(messages)) {
            messageHTML += '<ul style="text-align: left; max-width: 400px; margin: 0 auto;">';
            messages.forEach(message => {
                messageHTML += `<li style="margin-bottom: 0.5rem;">${message}</li>`;
            });
            messageHTML += '</ul>';
        } else {
            messageHTML += `<p>${messages}</p>`;
        }
        
        messageHTML += '</div>';
        
        modalMessage.innerHTML = messageHTML;
        modal.style.display = 'block';
    }
    
    // Close modal handlers
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Real-time validation feedback
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear any error styling when user starts typing
            this.style.borderColor = '';
            const existingError = this.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
        });
    });
    
    // Individual field validation
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Check validation based on field type
        switch (field.name) {
            case 'firstName':
            case 'lastName':
                if (!value) {
                    isValid = false;
                    errorMessage = 'This field is required';
                }
                break;
                
            case 'email':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Email is required';
                } else if (!isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'phone':
                if (value && !isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;
                
            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a subject';
                }
                break;
                
            case 'message':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Message is required';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }
        
        // Apply validation styling
        if (!isValid) {
            field.style.borderColor = '#dc3545';
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.color = '#dc3545';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.25rem';
            errorElement.textContent = errorMessage;
            field.parentNode.appendChild(errorElement);
        } else {
            field.style.borderColor = '#28a745';
        }
        
        return isValid;
    }
    
    // Smooth scrolling for location buttons (if needed)
    document.querySelectorAll('.location-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add a small animation to indicate the click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add floating animation to store cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe store cards for animation
    document.querySelectorAll('.store-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Character counter for message textarea
    const messageTextarea = document.getElementById('message');
    const messageGroup = messageTextarea.parentNode;
    
    // Create character counter
    const charCounter = document.createElement('div');
    charCounter.style.textAlign = 'right';
    charCounter.style.fontSize = '0.875rem';
    charCounter.style.color = '#666';
    charCounter.style.marginTop = '0.25rem';
    messageGroup.appendChild(charCounter);
    
    messageTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        const maxLength = 500; // Set a reasonable max length
        
        charCounter.textContent = `${currentLength}/${maxLength} characters`;
        
        if (currentLength > maxLength) {
            charCounter.style.color = '#dc3545';
        } else if (currentLength < 10) {
            charCounter.style.color = '#ffc107';
        } else {
            charCounter.style.color = '#28a745';
        }
    });
    
    // Initialize character counter
    messageTextarea.dispatchEvent(new Event('input'));
});

// Add some utility functions for enhanced user experience
function formatPhoneNumber(input) {
    // Auto-format phone number as user types
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
    }
    
    input.value = value;
}

// Apply phone formatting to phone input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
});
