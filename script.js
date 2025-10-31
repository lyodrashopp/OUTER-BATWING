// Outer Wanita Batwing Full Motif - Landing Page Script
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVIGATION & MOBILE MENU
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navbar) {
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(114, 47, 55, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // GALLERY LIGHTBOX
    // ============================================
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const galleryItems = document.querySelectorAll('.gallery-item, .testimonial-img');
    
    function openLightbox(src) {
        if (lightboxModal && lightboxImage) {
            lightboxImage.src = src;
            lightboxModal.classList.add('active');
            lightboxModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            lightboxModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Gallery item click handler
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const src = this.getAttribute('data-src') || this.src;
            openLightbox(src);
        });
        
        // Add hover effect for better UX
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Lightbox close handlers
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', closeLightbox);
    }
    
    // Escape key to close lightbox
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxModal?.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // ============================================
    // TESTIMONIALS CAROUSEL
    // ============================================
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    let autoSlideInterval;
    
    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        if (testimonialSlides[index]) {
            testimonialSlides[index].classList.add('active');
        }
        
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % testimonialSlides.length;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(prev);
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Auto advance every 5 seconds
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Event listeners for carousel controls
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide
        });
    });
    
    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.testimonials-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });
        
        carouselContainer.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    nextSlide(); // Swipe left - next slide
                } else {
                    prevSlide(); // Swipe right - previous slide
                }
                stopAutoSlide();
                startAutoSlide();
            }
        });
    }
    
    // Initialize carousel
    if (testimonialSlides.length > 0) {
        showSlide(0);
        startAutoSlide();
    }
    
    // ============================================
    // COUNTDOWN TIMER
    // ============================================
    const countdown = document.getElementById('countdown');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    function updateCountdown() {
        if (!hoursEl || !minutesEl || !secondsEl) return;
        
        // Set countdown to 24 hours from now for demo purposes
        const now = new Date().getTime();
        const countdownTime = now + (24 * 60 * 60 * 1000); // 24 hours from now
        
        const timeLeft = countdownTime - now;
        
        if (timeLeft > 0) {
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        } else {
            // If countdown ended, reset to 24 hours
            hoursEl.textContent = '23';
            minutesEl.textContent = '59';
            secondsEl.textContent = '59';
        }
    }
    
    // Update countdown every second
    if (countdown) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // ============================================
    // SOCIAL PROOF POPUP SYSTEM
    // ============================================
    const socialProofPopup = document.getElementById('social-proof-popup');
    const sppName = document.getElementById('spp-name');
    const sppCity = document.getElementById('spp-city');
    const sppTime = document.getElementById('spp-time');
    const sppAvatar = document.getElementById('spp-avatar');
    const sppClose = document.querySelector('.spp-close');
    
    // Customer data
    const customerNames = [
        'Vina', 'Dina', 'Kartika', 'Lestari', 'Putri', 'Maya Sari', 
        'Rani', 'Permata', 'Lestari F', 'Sari', 'Indah', 'Nurul',
        'Ayu', 'Dewi', 'Ratna', 'Sinta', 'Mila', 'Rina'
    ];
    
    const customerCities = [
        'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Bekasi', 
        'Tangerang', 'Depok', 'Semarang', 'Palembang', 'Makassar',
        'Yogyakarta', 'Bogor', 'Pekanbaru', 'Bandar Lampung'
    ];
    
    const customerAvatars = [
        'https://down-id.img.susercontent.com/file/bbde7dbd698cbb83d090c7b9e063cd85_tn',
        'https://down-id.img.susercontent.com/file/487ca7632ad4c014a4db1d9f12e673e6_tn',
        'https://down-id.img.susercontent.com/file/6f8269c3277870c353e747c20fddc15a_tn',
        'https://down-id.img.susercontent.com/file/ff2b2a6cf8cad171c4362ef07a599f26_tn',
        'https://down-id.img.susercontent.com/file/id-11134233-7ra0n-mdhjnw4m17da38_tn',
        'https://down-id.img.susercontent.com/file/id-11134233-7r98r-lnx3g0jfelwbac_tn',
        'https://down-id.img.susercontent.com/file/f7fb5744a301fa613304a427f17c8480_tn',
        'https://down-id.img.susercontent.com/file/3c5a853033df2e24c27359c138c5e131_tn',
        'https://down-id.img.susercontent.com/file/id-11134233-7r990-lqbb2fgvunpb8b_tn'
    ];
    
    let popupTimeout;
    let hideTimeout;
    
    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    function generateRandomTime() {
        const minutes = Math.floor(Math.random() * 15) + 1;
        return minutes === 1 ? '1 menit yang lalu' : `${minutes} menit yang lalu`;
    }
    
    function showSocialProofPopup() {
        if (!socialProofPopup) return;
        
        const randomName = getRandomItem(customerNames);
        const randomCity = getRandomItem(customerCities);
        const randomAvatar = getRandomItem(customerAvatars);
        const randomTime = generateRandomTime();
        
        // Update popup content
        if (sppName) sppName.textContent = randomName;
        if (sppCity) sppCity.textContent = `dari ${randomCity}`;
        if (sppTime) sppTime.textContent = randomTime;
        if (sppAvatar) sppAvatar.src = randomAvatar;
        
        // Show popup with slide-in animation
        socialProofPopup.classList.add('show');
        
        // Auto-hide after 5 seconds
        hideTimeout = setTimeout(() => {
            socialProofPopup.classList.remove('show');
        }, 5000);
        
        // Schedule next popup in 8 seconds
        popupTimeout = setTimeout(() => {
            showSocialProofPopup();
        }, 8000);
    }
    
    function stopSocialProofPopup() {
        if (popupTimeout) clearTimeout(popupTimeout);
        if (hideTimeout) clearTimeout(hideTimeout);
    }
    
    // Pause popup on hover
    if (socialProofPopup) {
        socialProofPopup.addEventListener('mouseenter', function() {
            if (hideTimeout) clearTimeout(hideTimeout);
        });
        
        socialProofPopup.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(() => {
                socialProofPopup.classList.remove('show');
            }, 3000);
        });
    }
    
    // Close button handler
    if (sppClose && socialProofPopup) {
        sppClose.addEventListener('click', function() {
            socialProofPopup.classList.remove('show');
            stopSocialProofPopup();
            // Restart popup cycle after 10 seconds
            setTimeout(showSocialProofPopup, 10000);
        });
    }
    
    // Start social proof popup system
    if (socialProofPopup) {
        // Initial delay of 3 seconds
        setTimeout(showSocialProofPopup, 3000);
    }
    
    // Stop social proof when user is about to leave (exit-intent)
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0) {
            stopSocialProofPopup();
        }
    });
    
    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    const scrollTopBtn = document.getElementById('scroll-top');
    
    function toggleScrollTopButton() {
        if (!scrollTopBtn) return;
        
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    window.addEventListener('scroll', toggleScrollTopButton);
    
    // ============================================
    // LAZY LOADING ENHANCEMENT
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ============================================
    // ENHANCE SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.feature-card, .testimonial-card, .gallery-item, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });
    
    // ============================================
    // PERFORMANCE OPTIMIZATIONS
    // ============================================
    
    // Preload critical images
    const criticalImages = [
        'https://cdn.orderonline.id/uploads/images_7774071761762347156.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Add loading class to body for CSS loading states
    document.body.classList.add('loaded');
    
    // ============================================
    // ERROR HANDLING & FALLBACKS
    // ============================================
    
    // Handle failed image loads
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
    
    // Handle failed OrderOnline script load
    window.addEventListener('error', function(e) {
        if (e.filename && e.filename.includes('orderonline')) {
            console.warn('OrderOnline script failed to load');
            // You can show a fallback contact form here if needed
        }
    });
    
    // ============================================
    // ANALYTICS & TRACKING READY
    // ============================================
    
    // Track CTA clicks
    document.querySelectorAll('.btn-primary, .btn-whatsapp, .cta-nav').forEach(btn => {
        btn.addEventListener('click', function() {
            // Track conversion events
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'CTA',
                    event_label: this.textContent.trim(),
                    value: 1
                });
            }
        });
    });
    
    // Track time spent on page
    let timeSpent = 0;
    const timeTracker = setInterval(() => {
        timeSpent += 10;
        
        // Track at milestones
        if ([30, 60, 120, 300].includes(timeSpent)) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'engagement', {
                    event_category: 'Time Spent',
                    event_label: `${timeSpent} seconds`,
                    value: timeSpent
                });
            }
        }
    }, 10000);
    
    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        clearInterval(timeTracker);
        stopAutoSlide();
        stopSocialProofPopup();
    });
    
    // ============================================
    // ACCESSIBILITY ENHANCEMENTS
    // ============================================
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Focus management for modal
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
        
        if (firstFocusableElement) {
            firstFocusableElement.focus();
        }
    }
    
    // Apply focus trap to lightbox
    if (lightboxModal) {
        lightboxModal.addEventListener('transitionend', function() {
            if (this.classList.contains('active')) {
                trapFocus(this);
            }
        });
    }
    
    // ============================================
    // INITIALIZATION COMPLETE
    // ============================================
    
    console.log('Outer Batwing Landing Page - All systems loaded successfully! 🚀');
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`Page Load Time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }, 0);
        });
    }
});

// ============================================
// GLOBAL UTILITY FUNCTIONS
// ============================================

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

// Throttle function for scroll events
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
    };
}

// Format currency for Indonesian Rupiah
function formatIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Generate random Indonesian name (for demo purposes)
function generateIndonesianName() {
    const firstNames = ['Siti', 'Dewi', 'Rina', 'Ayu', 'Indah', 'Maya', 'Sri', 'Lestari', 'Putri', 'Wulan'];
    const lastNames = ['Sari', 'Wati', 'Indah', 'Nur', 'Lestari', 'Sari', 'Pertiwi', 'Maharani', 'Dewi', 'Kusuma'];
    return `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`;
}

// Helper function to get random item (since it's used in multiple places)
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
