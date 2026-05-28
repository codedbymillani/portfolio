document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navigation Active Link State Management ---
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath === href || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active-link');
        }
    });

    // --- 2. Mobile Responsive Hamburguer Panel Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 3. Typing Text Effect Logic ---
    const typeTarget = document.querySelector('.typing-target');
    if (typeTarget) {
        const phrases = [
            "Computer Science Student",
            "Design + Code Architect",
            "Future Software Engineer"
        ];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function typeLoop() {
            const currentPhrase = phrases[phraseIdx];
            
            if (isDeleting) {
                typeTarget.textContent = currentPhrase.substring(0, charIdx - 1);
                charIdx--;
                typingSpeed = 40;
            } else {
                typeTarget.textContent = currentPhrase.substring(0, charIdx + 1);
                charIdx++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIdx === currentPhrase.length) {
                typingSpeed = 1500; // Pause at end of text
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                typingSpeed = 400; // Slight pause before restarting
            }

            setTimeout(typeLoop, typingSpeed);
        }
        typeLoop();
    }

    // --- 4. Portfolio Cards Category Filter Control ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Adjust active toggle button state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hide');
                        // Optional simple fade re-trigger effect
                        card.style.animation = 'none';
                        card.offsetHeight; // Trigger DOM layout recalculation
                        card.style.animation = 'fadeIn 0.4s ease-in-out forwards';
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }

    // --- 5. Scroll Reveal Animation Logic ---
    const revealItems = document.querySelectorAll('.scroll-reveal');
    if (revealItems.length > 0) {
        const revealOnScroll = () => {
            const triggerBottom = window.innerHeight * 0.85;
            revealItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                if (itemTop < triggerBottom) {
                    item.classList.add('visible');
                }
            });
        };
        
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Initial activation execution loop
    }
});
