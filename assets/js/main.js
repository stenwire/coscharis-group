document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('nav-active');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Dynamic Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Optional: Add subtle scroll animations
    const animatedElements = document.querySelectorAll('.card, .news-card, .fact-item, .leadership-quote, .hero-content > *');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
    });

    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }

    const subsidiarySelector = document.getElementById('subsidiary-selector');
    if (subsidiarySelector) {
        subsidiarySelector.addEventListener('change', function(e) {
            const selectedValue = e.target.value;
            
            // Hide all info blocks
            document.querySelectorAll('.subsidiary-info').forEach(function(infoBlock) {
                infoBlock.classList.remove('active');
            });
            
            // Show the selected one
            const targetInfoBlock = document.getElementById('info-' + selectedValue);
            if (targetInfoBlock) {
                targetInfoBlock.classList.add('active');
            }
        });
    }

    // Contact Form Handling (Static Example)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the form from submitting the traditional way

            const formMessage = document.getElementById('form-message');
            const honeypot = document.getElementById('website').value;

            // Simple spam check: if honeypot is filled, it's likely a bot
            if (honeypot.length > 0) {
                console.log("Bot detected!");
                return; // Do nothing
            }

            // In a real application, you would send the form data to a server here.
            // For this example, we'll just show a success message.
            console.log("Form submitted successfully!");

            formMessage.textContent = "Thanks — we received your message and will get back to you within 2 business days.";
            formMessage.className = 'form-status-message success';
            
            contactForm.reset(); // Clear the form fields
        });
    }

    const newsFilterContainer = document.getElementById('news-filters');
    if (newsFilterContainer) {
        const filterButtons = newsFilterContainer.querySelectorAll('.filter-btn');
        const newsItems = document.querySelectorAll('#news-grid .news-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                newsItems.forEach(item => {
                    item.classList.add('hidden'); // Hide all items first
                    if (item.getAttribute('data-category') === filterValue || filterValue === 'all') {
                        item.classList.remove('hidden');
                    }
                });
            });
        });
    }

});
