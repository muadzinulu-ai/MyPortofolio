/**
 * MUADZINUL UMMAH - MODERN EDITORIAL PORTFOLIO SCRIPT
 * Clean, lightweight, dependency-free JS for smooth interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. HAMBURGER MENU & MOBILE NAV
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links li a");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });

    // 2. STICKY NAVBAR (Elegant blur effect)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. SCROLL REVEAL (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Trigger only once for editorial feel
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 4. PORTFOLIO FILTER (Smooth Fade In/Out)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.classList.remove('hidden');
                    // Reset animation gracefully
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    setTimeout(() => { 
                        card.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
                        card.style.opacity = '1'; 
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 5. BACK TO TOP
    const backToTopBtn = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 700) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 6. IMAGE FALLBACK (Ensuring broken links don't ruin layout)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.onerror = null; 
            this.style.backgroundColor = '#E2E2DC';
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="%236B6B6B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>';
            this.style.objectFit = 'none';
        });
    });

});

// 7. MODAL LOGIC FOR VIDEOS AND HIGH-RES IMAGES
const modal = document.getElementById("videoModal");
const videoContainer = document.getElementById("videoContainer");

/**
 * Handle YouTube, Images, and External (Instagram / GDrive) Links
 */
function openModal(link, type) {
    modal.style.display = "block";
    let closeBtnWrap = `<div style="position:relative; width:100%;"></div>`;

    if (type === 'youtube') {
        videoContainer.innerHTML = `${closeBtnWrap}<iframe width="100%" height="100%" src="${link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else if (type === 'image') {
        videoContainer.innerHTML = `${closeBtnWrap}<img src="${link}" alt="Preview Artwork">`;
    } else if (type === 'external') {
        // Prompt elegan untuk IG / GDrive
        videoContainer.innerHTML = `
            ${closeBtnWrap}
            <div style="text-align:center; padding: 60px; background:#1C1C1C; border-radius:8px; border:1px solid #3A3A3A;">
                <h3 style="color:#FFF; margin-bottom:15px; font-family:sans-serif; font-size:1.8rem;">External Content</h3>
                <p style="color:#BBB; margin-bottom:35px; font-size:1.1rem;">Konten ini dialihkan dan akan dibuka pada tab platform eksternal yang aman.</p>
                <a href="${link}" target="_blank" style="background:#D4AF37; color:#1F1F1F; padding:15px 35px; text-decoration:none; border-radius:4px; font-weight:800; text-transform:uppercase; letter-spacing:1px; display:inline-block; transition:0.3s;">Buka Tautan</a>
            </div>
        `;
    }
}

function closeModal() {
    modal.style.display = "none";
    videoContainer.innerHTML = ''; 
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}