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
    }, 300 + i * 150);
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
        }, delay * 100);
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
  let ticking = false;

  function updateHeader() {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
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
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
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
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '-15% 0px -55% 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));

  /* ----------------------------------------------------------
     6. STAGGERED REVEAL FOR GRID ITEMS
     ---------------------------------------------------------- */
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll('[data-stagger-child]');
        children.forEach((child, i) => {
          setTimeout(() => {
            child.classList.add('stagger-visible');
          }, i * 80);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-stagger]').forEach(el => {
    staggerObserver.observe(el);
  });

  /* ----------------------------------------------------------
     7. SECTION ACCENT LINE ANIMATION
     ---------------------------------------------------------- */
  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('line-drawn');
        lineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.about-accent-line, .skills-accent-line, .teams-accent-line').forEach(el => {
    lineObserver.observe(el);
  });

  /* ----------------------------------------------------------
     8. FACTS LIST ITEMS — STAGGER ON REVEAL
     ---------------------------------------------------------- */
  const factsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('li');
        items.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add('fact-visible');
          }, i * 120);
        });
        factsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.facts-list').forEach(el => {
    factsObserver.observe(el);
  });

  /* ----------------------------------------------------------
     9. BIRTHDAY COUNTDOWN (April 5)
     ---------------------------------------------------------- */
  function updateCountdown() {
    const now = new Date();
    let birthday = new Date(now.getFullYear(), 3, 5);
    if (now > birthday) {
      birthday = new Date(now.getFullYear() + 1, 3, 5);
    }

    const diff = birthday - now;
    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');
    const daysEl  = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl  = document.getElementById('cd-mins');
    const secsEl  = document.getElementById('cd-secs');

    if (daysEl)  daysEl.textContent  = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minsEl)  minsEl.textContent  = pad(mins);
    if (secsEl)  secsEl.textContent  = pad(secs);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ----------------------------------------------------------
     10. PAGE LOAD FADE
     ---------------------------------------------------------- */
  document.body.classList.remove('page-loading');
  document.body.classList.add('page-loaded');

});
