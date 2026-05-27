/* ============================================================
   Jump Shack Samui — main.js
   ============================================================ */

/* ---- Nav: scroll behaviour + mobile menu ---- */
(function initNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
})();

/* ---- FAQ Accordion ---- */
(function initFaq() {
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq__item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ---- Contact form ---- */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    /* Honeypot check */
    if (form.querySelector('[name="website"]').value) return;

    const success = document.getElementById('form-success');
    if (success) {
      form.style.display = 'none';
      success.style.display = 'block';
    }
  });
})();

/* ---- GSAP Scroll Animations ---- */
(function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* Hero entrance */
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    gsap.from(heroContent.children, {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.2,
    });
  }

  /* Page hero (inner pages) */
  const pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    gsap.from(pageHero.children, {
      opacity: 0,
      y: 30,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.3,
    });
  }

  /* Generic section entrance — every .gsap-hidden element */
  gsap.utils.toArray('.gsap-hidden').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

  /* Feature strip — stagger */
  gsap.utils.toArray('.feature').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: 'power2.out',
      delay: i * 0.1,
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  });

  /* Cards — stagger within grids */
  ['event-card', 'pricing-card', 'testimonial-card', 'info-card', 'value-card'].forEach(cls => {
    const cards = gsap.utils.toArray(`.${cls}`);
    if (!cards.length) return;
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 28,
        duration: 0.65,
        ease: 'power2.out',
        delay: i * 0.08,
        scrollTrigger: {
          trigger: card,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      });
    });
  });

  /* Gallery items */
  gsap.utils.toArray('.gallery__item').forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      scale: 0.97,
      duration: 0.7,
      ease: 'power2.out',
      delay: i * 0.07,
      scrollTrigger: {
        trigger: item,
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
    });
  });

  /* Section headings */
  gsap.utils.toArray('.section-header').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

  /* Private banner */
  const banner = document.querySelector('.private-banner');
  if (banner) {
    gsap.from(banner, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: banner,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  /* Split content blocks (about/services) */
  gsap.utils.toArray('.boards-split').forEach(block => {
    const img = block.querySelector('.boards-split__img');
    const content = block.querySelector('.boards-split__content');
    if (img) {
      gsap.from(img, {
        opacity: 0,
        x: -30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: block, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }
    if (content) {
      gsap.from(content, {
        opacity: 0,
        x: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: block, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }
  });

  /* Timeline items */
  gsap.utils.toArray('.timeline__item').forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      x: -20,
      duration: 0.6,
      ease: 'power2.out',
      delay: i * 0.1,
      scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' },
    });
  });

  /* About story split */
  const storyImg = document.querySelector('.about-story__img');
  const storyText = document.querySelector('.about-story__text');
  if (storyImg && storyText) {
    gsap.from(storyImg, {
      opacity: 0,
      x: -40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: storyImg, start: 'top 85%', toggleActions: 'play none none none' },
    });
    gsap.from(storyText.children, {
      opacity: 0,
      y: 25,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: storyText, start: 'top 85%', toggleActions: 'play none none none' },
    });
  }
})();
