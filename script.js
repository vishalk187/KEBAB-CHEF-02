/**
 * Fusion Flavors Restaurant Website
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Navigation Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });
    
    // Close menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('show');
        });
    });
    
    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Menu Tabs
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            menuTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all menu categories
            menuCategories.forEach(category => category.classList.remove('active'));
            
            // Show the corresponding menu category
            const menuCategory = document.getElementById(this.dataset.menu);
            menuCategory.classList.add('active');
        });
    });
    
    // Gallery Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter gallery items
            const filter = this.dataset.filter;
            
            galleryItems.forEach(item => {
                if(filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Reset interval when manually changing slides
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });
    
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetInterval();
        });
    });
    
    // Reservation Form
    const bookingForm = document.getElementById('booking-form');
    const reservationModal = document.getElementById('reservation-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values for confirmation
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        
        // Display formatted values in confirmation modal
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        document.getElementById('confirm-date').textContent = formattedDate;
        
        // Get the selected option's text for time
        const timeOption = document.querySelector(`#time option[value="${time}"]`);
        document.getElementById('confirm-time').textContent = timeOption ? timeOption.textContent : time;
        
        // Get the selected option's text for guests
        const guestsOption = document.querySelector(`#guests option[value="${guests}"]`);
        document.getElementById('confirm-guests').textContent = guestsOption ? guestsOption.textContent : guests;
        
        // Show confirmation modal
        reservationModal.classList.add('show');
        
        // Reset form
        bookingForm.reset();
    });
    
    function closeReservationModal() {
        reservationModal.classList.remove('show');
    }
    
    closeModal.addEventListener('click', closeReservationModal);
    modalCloseBtn.addEventListener('click', closeReservationModal);
    
    // Close modal when clicking outside of it
    reservationModal.addEventListener('click', function(e) {
        if(e.target === reservationModal) {
            closeReservationModal();
        }
    });
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if(window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Scroll Animations
    function revealOnScroll() {
        const elements = document.querySelectorAll('.dish-card, .menu-item, .gallery-item, .info-item, .feature');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if(elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Apply initial styles for animation
    const animatedElements = document.querySelectorAll('.dish-card, .menu-item, .gallery-item, .info-item, .feature');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Call once to check for elements in view on page load
    revealOnScroll();
    
    // Fix for iOS hover states
    document.addEventListener('touchstart', function() {}, true);
});
