// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');
const ctaButton = document.querySelector('.cta-button');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle hamburger animation
    const bars = document.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        bars[0].style.transform = 'rotate(0) translate(0, 0)';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'rotate(0) translate(0, 0)';
    }
    
    // Close all dropdowns when hamburger is toggled
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
});

// Close mobile menu when clicking on a nav item
document.querySelectorAll('.nav-item:not(.dropdown)').forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Reset hamburger icon
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'rotate(0) translate(0, 0)';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'rotate(0) translate(0, 0)';
    });
});

// Handle dropdowns on mobile
dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('a');
    
    dropdownLink.addEventListener('click', (e) => {
        // If on mobile, prevent default and toggle dropdown
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        header.style.padding = '15px 0';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        header.style.padding = '20px 0';
    }
});

// CTA Button interaction
ctaButton.addEventListener('click', () => {
    // Animation effect
    ctaButton.style.transform = 'scale(0.95)';
    
    // Reset animation after a delay
    setTimeout(() => {
        ctaButton.style.transform = 'scale(1)';
    }, 150);
    
    // Show admission message
    alert('Thank you for your interest in Platinum Jubilee School!\n\nOur admissions team will contact you shortly to schedule a campus tour and provide you with all the necessary information.');
    
    // In a real implementation, this would open a form or redirect
    // window.location.href = '/admission';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Don't apply smooth scrolling for dropdowns on mobile
        if (window.innerWidth <= 768 && this.parentElement.classList.contains('dropdown')) {
            return;
        }
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger icon
            const bars = document.querySelectorAll('.bar');
            bars[0].style.transform = 'rotate(0) translate(0, 0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
});

// Add animation to features on scroll
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

// Apply animation to features and programs
document.querySelectorAll('.feature, .program').forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
    
    observer.observe(element);
});

// Initialize page with animations
window.addEventListener('DOMContentLoaded', () => {
    // Add fade-in effect to hero content only
    const heroText = document.querySelector('.hero-text');
    
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        heroText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
    }, 300);
    
    // Initialize stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
        }, 40);
    });
});