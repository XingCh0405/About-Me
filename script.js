/* ============================================================
   ABOUT ME — Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. HERO ENTRANCE ANIMATION
     ---------------------------------------------------------- */
  const heroElements = document.querySelectorAll('[data-hero-anim]');
  heroElements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('animate');
    }, 400 + i * 180);
  });

  /* ----------------------------------------------------------
     2. SCROLL REVEAL (IntersectionObserver)
     ---------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay * 120);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    revealObserver.observe(el);
  });

  /* ----------------------------------------------------------
     3. HEADER SCROLL STATE
     ---------------------------------------------------------- */
  const header = document.getElementById('header');
  let lastScroll = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  /* ----------------------------------------------------------
     4. SMOOTH SCROLL FOR ANCHOR LINKS
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ----------------------------------------------------------
     5. ACTIVE NAV LINK TRACKING
     ---------------------------------------------------------- */
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '-20% 0px -60% 0px'
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  /* ----------------------------------------------------------
     6. MAGNETIC EFFECT ON CONTACT BUTTON
     ---------------------------------------------------------- */
  const contactBtn = document.querySelector('.contact-btn');
  if (contactBtn) {
    contactBtn.addEventListener('mousemove', (e) => {
      const rect = contactBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      contactBtn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    contactBtn.addEventListener('mouseleave', () => {
      contactBtn.style.transform = 'translate(0, 0)';
      contactBtn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease';
    });

    contactBtn.addEventListener('mouseenter', () => {
      contactBtn.style.transition = 'color 0.4s ease';
    });
  }

  /* ----------------------------------------------------------
     7. PARALLAX-LITE ON HERO
     ---------------------------------------------------------- */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        const progress = scrollY / window.innerHeight;
        heroContent.style.opacity = 1 - progress * 0.8;
        heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     8. STAGGERED REVEAL FOR GRID ITEMS
     ---------------------------------------------------------- */
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll('[data-stagger-child]');
        children.forEach((child, i) => {
          setTimeout(() => {
            child.classList.add('stagger-visible');
          }, i * 100);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-stagger]').forEach(el => {
    staggerObserver.observe(el);
  });

  /* ----------------------------------------------------------
     9. 3D TILT ON CARDS + GLOW TRACKING
     ---------------------------------------------------------- */
  const tiltCards = document.querySelectorAll('.skill-card, .team-card, .about-facts');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const percentX = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      const percentY = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
      card.style.setProperty('--mouse-x', percentX + '%');
      card.style.setProperty('--mouse-y', percentY + '%');
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateY(0)';
    });
  });

  /* ----------------------------------------------------------
     9b. SECTION SEPARATOR LINE REVEAL
     ---------------------------------------------------------- */
  const sectionRevealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed-section');
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.section').forEach(s => sectionRevealObs.observe(s));

  /* ----------------------------------------------------------
     10. TYPING EFFECT ON HERO GREETING
     ---------------------------------------------------------- */
  const greeting = document.querySelector('.hero-greeting');
  if (greeting) {
    const text = greeting.textContent;
    greeting.textContent = '';
    greeting.style.opacity = '1';
    greeting.style.transform = 'none';
    let charIndex = 0;

    function typeChar() {
      if (charIndex < text.length) {
        greeting.textContent += text[charIndex];
        charIndex++;
        setTimeout(typeChar, 40 + Math.random() * 30);
      }
    }

    setTimeout(typeChar, 600);
  }

  /* ----------------------------------------------------------
     11. MAGNETIC EFFECT ON CONTACT ICONS
     ---------------------------------------------------------- */
  document.querySelectorAll('.contact-icon-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-4px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'color 0.35s ease, border-color 0.35s ease, background 0.35s ease';
    });
  });

  /* ----------------------------------------------------------
     12. SMOOTH COUNTER FOR NUMBERS
     ---------------------------------------------------------- */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const end = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const duration = 1200;
        const startTime = performance.now();

        function updateCount(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.round(eased * end);
          el.textContent = current;
          if (progress < 1) requestAnimationFrame(updateCount);
        }

        requestAnimationFrame(updateCount);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
  });

  /* ----------------------------------------------------------
     13. CURSOR AMBIENT GLOW
     ---------------------------------------------------------- */
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice) {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);

    let mouseX = -500, mouseY = -500;
    let glowX = -500, glowY = -500;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      glow.style.opacity = '1';
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.transform = `translate(${glowX}px, ${glowY}px)`;
      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }

  /* ----------------------------------------------------------
     14. SECTION SEPARATOR LINE ANIMATION
     ---------------------------------------------------------- */
  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('line-drawn');
        lineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.about-accent-line, .skills-accent-line, .teams-accent-line, .contact-accent-line').forEach(el => {
    lineObserver.observe(el);
  });

  /* ----------------------------------------------------------
     15. HOVER RIPPLE ON NAV LINKS
     ---------------------------------------------------------- */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      const ripple = document.createElement('span');
      ripple.classList.add('nav-ripple');
      link.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* ----------------------------------------------------------
     17. PARALLAX ON MULTIPLE ELEMENTS
     ---------------------------------------------------------- */
  function handleParallax() {
    const scrollY = window.scrollY;

    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const fromCenter = center - window.innerHeight / 2;
      el.style.transform = `translateY(${fromCenter * speed}px)`;
    });
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(handleParallax);
  }, { passive: true });

  /* ----------------------------------------------------------
     18. FACTS LIST ITEMS - STAGGER ON REVEAL
     ---------------------------------------------------------- */
  const factsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('li');
        items.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add('fact-visible');
          }, i * 150);
        });
        factsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.facts-list').forEach(el => {
    factsObserver.observe(el);
  });

  /* ----------------------------------------------------------
     19. SMOOTH FADE FOR PAGE LOAD
     ---------------------------------------------------------- */
  document.body.classList.remove('page-loading');
  document.body.classList.add('page-loaded');

});
