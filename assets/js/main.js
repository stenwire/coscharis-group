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

    // Marketplace Filtering Logic
    const filterContainer = document.querySelector('.filter-sidebar');
    if (filterContainer) {
        // Accordion functionality for categories
        const categoryToggles = filterContainer.querySelectorAll('.category-toggle .toggle-icon');
        categoryToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const parentLi = this.closest('li.has-children');
                parentLi.classList.toggle('is-open');
            });
        });

        const filterOptions = filterContainer.querySelectorAll('.filter-option');
        const productCards = document.querySelectorAll('.product-grid .product-card');

        // Function to apply filter
        const applyFilter = (filterValue) => {
            filterOptions.forEach(btn => {
                if (btn.getAttribute('data-filter') === filterValue) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            productCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        };

        // Handle direct clicks on filters
        filterOptions.forEach(option => {
            option.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                applyFilter(filterValue);
            });
        });

        // Check for URL params on page load
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');

        if (categoryParam) {
            applyFilter(categoryParam);
            const targetCategory = filterContainer.querySelector(`.filter-option[data-filter="${categoryParam}"]`);
            if (targetCategory && targetCategory.closest('.has-children')) {
                targetCategory.closest('.has-children').classList.add('is-open');
            }
        }
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
