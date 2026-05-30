// ===== DESKTOP DROPDOWNS =====
const dropdownBtns = document.querySelectorAll('.nav-item > button');
const dropdowns = document.querySelectorAll('.dropdown');

dropdownBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = 'dd-' + btn.id.replace('btn-', '');
        const target = document.getElementById(targetId);
        const isOpen = target.classList.contains('open');

        // Close all
        dropdowns.forEach(d => d.classList.remove('open'));
        dropdownBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
            target.classList.add('open');
            btn.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});

document.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('open'));
    dropdownBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-expanded', 'false');
    });
});

// ===== HAMBURGER / MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    if (open) {
        mobileNav.style.display = 'block';
        requestAnimationFrame(() => mobileNav.classList.add('open'));
        document.body.style.overflow = 'hidden';
    } else {
        mobileNav.classList.remove('open');
        setTimeout(() => {
            mobileNav.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }
});

// ===== MOBILE DROPDOWNS =====
document.querySelectorAll('.mobile-nav-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const targetId = trigger.dataset.target;
        const target = document.getElementById(targetId);
        const isOpen = target.classList.contains('open');

        document.querySelectorAll('.mobile-dropdown').forEach(d => d.classList.remove('open'));
        document.querySelectorAll('.mobile-nav-trigger').forEach(t => t.classList.remove('active'));

        if (!isOpen) {
            target.classList.add('open');
            trigger.classList.add('active');
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
