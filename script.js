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

    // Animate skill progress bars
    function animateSkillBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progressValue = progressBar.getAttribute('data-progress');
                    
                    // Animate progress bar
                    setTimeout(() => {
                        progressBar.style.width = `${progressValue}%`;
                    }, 300);
                    
                    observer.unobserve(progressBar);
                }
            });
        }, {
            threshold: 0.5
        });
        
        progressBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    // Initialize skill bars animation
    animateSkillBars();
    
    // Add hover effect to kelas cards with tilt
    const kelasCards = document.querySelectorAll('.kelas-card');
    
    kelasCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateY = mouseX / 20;
            const rotateX = -mouseY / 20;
            
            this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) rotateX(0deg) rotateY(0deg)';
        });
    });
    
    // Animate kontak items on scroll
    const kontakItems = document.querySelectorAll('.kontak-item');
    
    const kontakObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2
    });
    
    kontakItems.forEach(item => {
        kontakObserver.observe(item);
    });
    
    // Add CSS for kontak animation
    const kontakAnimationStyle = document.createElement('style');
    kontakAnimationStyle.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .kontak-item.animate-in {
            animation: slideUp 0.6s ease-out forwards;
        }
        
        .kontak-item {
            opacity: 0;
        }
    `;
    document.head.appendChild(kontakAnimationStyle);
    
    // Add click handler for daftar button
    const daftarButton = document.querySelector('.daftar-button');
    if (daftarButton) {
        daftarButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Show notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, var(--color-secondary), var(--color-accent));
                color: white;
                padding: 1rem 2rem;
                border-radius: var(--border-radius);
                z-index: 9999;
                box-shadow: var(--shadow-glow);
                animation: slideInRight 0.3s ease-out;
            `;
            
            const notificationStyle = document.createElement('style');
            notificationStyle.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(notificationStyle);
            
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>Pendaftaran belum bisa dilakukan! Hubungi kami lewat kontak dibawah.</span>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse forwards';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        });
    }
    
    // Add parallax effect to daftar section
    const daftarSection = document.querySelector('.daftar');
    if (daftarSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            daftarSection.style.backgroundPosition = `center ${rate}px`;
        });
    }
    
    // Update navigation for new sections
    const navLinksContainer = document.querySelector('.nav-menu ul');
    
    // Add new sections to navigation if needed
    const sections = ['home', 'produk', 'tentang', 'kelas', 'skill', 'daftar'];
    
    // Add smooth scrolling for new sections
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
