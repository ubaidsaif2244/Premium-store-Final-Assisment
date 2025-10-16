// 📰 News Page Functionality

document.addEventListener("DOMContentLoaded", () => {
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Add click handlers for news cards
    addNewsCardHandlers();
    
    // Initialize fade animations
    applyFadeAnimation();
});

async function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const emailInput = e.target.querySelector('input[type="email"]');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const email = emailInput.value;
    
    try {
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual newsletter API)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showNotification('Successfully subscribed to newsletter!', 'success');
        emailInput.value = '';
        
    } catch (error) {
        console.error('Newsletter subscription failed:', error);
        showNotification('Failed to subscribe. Please try again.', 'error');
    } finally {
        submitBtn.textContent = 'Subscribe';
        submitBtn.disabled = false;
    }
}

function addNewsCardHandlers() {
    // Add click handlers to news cards for future expansion
    document.querySelectorAll('.news-card, .featured-article').forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent click if clicking on a link
            if (e.target.tagName === 'A') return;
            
            const title = card.querySelector('h2, h3').textContent;
            showNotification(`Opening article: ${title}`, 'info');
            
            // Here you could implement modal or navigation to full article
        });
    });
}

function applyFadeAnimation() {
    const fadeElements = document.querySelectorAll('.news-card, .featured-article, .newsletter-section');
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );

    fadeElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1001;
        transition: all 0.3s ease;
        ${type === 'success' ? 'background-color: #4CAF50;' : 
          type === 'error' ? 'background-color: #f44336;' : 
          'background-color: #2196F3;'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}