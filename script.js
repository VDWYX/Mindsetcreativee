// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Update active nav link
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = '#' + section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // Call updateActiveNavLink on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Product card hover animations
    const productCards = document.querySelectorAll('.produk-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Background animation enhancement
    const backgroundAnimation = document.querySelector('.background-animation');
    
    // Add floating particles to background
    function createParticles() {
        // Only add particles if performance allows
        if (window.innerWidth > 768) {
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random properties
                const size = Math.random() * 4 + 1;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                
                // Apply styles
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.backgroundColor = `rgba(${i % 2 === 0 ? '138, 43, 226' : '187, 134, 252'}, ${Math.random() * 0.3 + 0.1})`;
                particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
                particle.style.borderRadius = '50%';
                particle.style.position = 'absolute';
                particle.style.zIndex = '-1';
                
                backgroundAnimation.appendChild(particle);
            }
        }
    }
    
    // Add CSS for particle animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-20px) translateX(10px);
            }
            50% {
                transform: translateY(-10px) translateX(-10px);
            }
            75% {
                transform: translateY(10px) translateX(5px);
            }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Initialize particles
    createParticles();
    
    // Hero visual animation on scroll
    function animateHeroOnScroll() {
        const heroSection = document.querySelector('.hero');
        const visualElement = document.querySelector('.visual-element');
        
        if (heroSection && visualElement) {
            const rect = heroSection.getBoundingClientRect();
            const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
            
            if (isInView) {
                const scrollPercent = 1 - Math.max(0, Math.min(1, rect.top / window.innerHeight));
                visualElement.style.transform = `scale(${0.9 + scrollPercent * 0.1})`;
            }
        }
    }
    
    // Call on scroll
    window.addEventListener('scroll', animateHeroOnScroll);
    
    // Add glow effect to CTA button on hover
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 25px rgba(138, 43, 226, 0.7)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 0 15px rgba(138, 43, 226, 0.5)';
        });
    }
    
    // Add random subtle animation to product cards on load
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
    
    // Add CSS for fade-in-up animation
    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
        }
    `;
    document.head.appendChild(fadeInStyle);
    
    // Add parallax effect to background animation
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        backgroundAnimation.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    });
    
    // Initialize active nav link on page load
    updateActiveNavLink();
});

