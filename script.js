const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuButton.textContent = isOpen ? '×' : '☰';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    });
  });
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

window.addEventListener('load', () => {
  if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.set('.reveal', { transformPerspective: 1000, transformOrigin: '50% 100%', rotationX: 0 });

  gsap.from('.hero-grid .reveal', {
    opacity: 0,
    y: 65,
    rotationX: -12,
    scale: 0.965,
    duration: 1.05,
    stagger: 0.105,
    ease: 'power3.out',
    clearProps: 'all'
  });

  gsap.utils.toArray('.services-grid .reveal, .work-grid .reveal').forEach((tile, i) => {
    gsap.from(tile, {
      scrollTrigger: { trigger: tile, start: 'top 90%', once: true },
      opacity: 0,
      y: 75,
      rotationX: -10,
      scale: 0.96,
      duration: 0.85,
      delay: (i % 4) * 0.07,
      ease: 'power3.out',
      clearProps: 'all'
    });
  });

  gsap.from('.section-heading', {
    scrollTrigger: { trigger: '.section-heading', start: 'top 85%', once: true },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.12
  });

  gsap.from('.contact-intro, .contact-details', {
    scrollTrigger: { trigger: '.contact-section', start: 'top 80%', once: true },
    opacity: 0,
    y: 45,
    stagger: 0.14,
    duration: 0.85,
    ease: 'power3.out'
  });

  document.querySelectorAll('.tile-link').forEach((tile) => {
    tile.addEventListener('mouseenter', () => {
      gsap.to(tile, { rotationY: -3, scale: 0.985, duration: 0.28, ease: 'power2.out', transformPerspective: 1000 });
    });

    tile.addEventListener('mouseleave', () => {
      gsap.to(tile, { rotationY: 0, scale: 1, duration: 0.35, ease: 'power2.out' });
    });
  });
});

(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.gallery').forEach((gallery, gi) => {
    const frames = [...gallery.querySelectorAll('.gallery-image')];
    const count = gallery.querySelector('.gallery-count');
    let index = 0;
    let visible = false;
    let paused = false;

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
    }, { threshold: 0.2 });

    observer.observe(gallery);

    gallery.addEventListener('mouseenter', () => { paused = true; });
    gallery.addEventListener('mouseleave', () => { paused = false; });
    gallery.addEventListener('focusin', () => { paused = true; });
    gallery.addEventListener('focusout', () => { paused = false; });

    setInterval(() => {
      if (!visible || paused || document.hidden) return;

      frames[index].classList.remove('active');
      index = (index + 1) % frames.length;
      frames[index].classList.add('active');
      count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(frames.length).padStart(2, '0')}`;
    }, gi ? 2200 : 2000);
  });
})();
