'use strict';

/* ================================================================
   ABHISHEK TIWARI & SAKSHI — WEDDING WEBSITE
   Apple-inspired GSAP ScrollTrigger animations
   ================================================================ */

const WEDDING_DATE = new Date('2026-06-27T11:00:00+05:30');

gsap.registerPlugin(ScrollTrigger);

/* ── 1. HERO ENTRANCE — "Abhishek weds Sakshi" cinematic pop ── */
(function initHeroEntrance() {

  // Set initial states before timeline runs
  gsap.set('#heroOrnament',           { opacity: 0, y: -16 });
  gsap.set('#heroEyebrow',            { opacity: 0, y: 12 });
  gsap.set('#nameGroom',              { opacity: 0, x: -80, skewX: -4 });
  gsap.set('#nameBride',              { opacity: 0, x:  80, skewX:  4 });
  gsap.set('#wedsRow',                { opacity: 0, scale: 0.3, rotation: -6 });
  gsap.set(['#heroDate','#heroDivider','#countdown'], { opacity: 0, y: 18 });

  const tl = gsap.timeline({ delay: 0.25 });

  // 1. Ornament slides down
  tl.to('#heroOrnament', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })

  // 2. Eyebrow fades in
    .to('#heroEyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')

  // 3. Groom slides from left  +  Bride from right — simultaneously
    .to('#nameGroom', { opacity: 1, x: 0, skewX: 0, duration: 1.1, ease: 'power4.out' }, '-=0.1')
    .to('#nameBride', { opacity: 1, x: 0, skewX: 0, duration: 1.1, ease: 'power4.out' }, '<')

  // 4. "weds" POPS in with elastic spring — the hero moment
    .to('#wedsRow', {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: 'elastic.out(1.1, 0.5)',
      }, '-=0.55')

  // 5. Date, divider, countdown cascade in
    .to('#heroDate',    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.1')
    .to('#heroDivider', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    .to('#countdown',   { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2');
})();

/* ── 2. HERO PARALLAX on scroll ── */
(function initHeroParallax() {
  gsap.to('.hero-content', {
    y: 120,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });
})();

/* ── 3. STATEMENT SECTIONS (Apple pin + scrub) ── */
(function initStatements() {
  document.querySelectorAll('.statement').forEach(section => {
    const label   = section.querySelector('.stmt-label');
    const lines   = section.querySelectorAll('.stmt-line');
    const sub     = section.querySelector('.stmt-sub');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=180%',
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      }
    });

    // Content reveals as you scroll IN
    tl.to(label, { opacity: 1, y: 0, duration: 0.25 })
      .to(lines[0], { opacity: 1, y: 0, duration: 0.3 }, '-=0.1');

    if (lines[1]) {
      tl.to(lines[1], { opacity: 1, y: 0, duration: 0.3 }, '-=0.1');
    }

    tl.to(sub, { opacity: 1, y: 0, duration: 0.2 }, '-=0.05')
      .to({}, { duration: 0.4 }) // hold
      // Content fades OUT as you scroll PAST (Apple signature)
      .to([label, ...lines, sub], {
        opacity: 0,
        y: -60,
        stagger: 0.05,
        duration: 0.35
      });
  });
})();

/* ── 4. OUR STORY: Timeline reveals ── */
(function initStory() {
  const items = gsap.utils.toArray('.tl-item');

  items.forEach((item, i) => {
    const isRight = item.classList.contains('tl-item') && i % 2 === 1;
    const isLast  = item.classList.contains('tl-item-last');

    gsap.to(item, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      }
    });
  });
})();

/* ── 5. EVENTS CARDS: Stagger reveal ── */
(function initEvents() {
  const cards = gsap.utils.toArray('.event-card');

  gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: '.events-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    }
  });
})();

/* ── 6. SECTION HEADINGS: Fade up ── */
(function initSectionHeadings() {
  gsap.utils.toArray('.section-intro-block').forEach(block => {
    const eyebrow = block.querySelector('.section-eyebrow');
    const heading = block.querySelector('.section-heading');
    const body    = block.querySelector('.section-body');

    const els = [eyebrow, heading, body].filter(Boolean);

    gsap.set(els, { opacity: 0, y: 30 });
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: block,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });
  });
})();

/* ── 7. GALLERY: Horizontal scroll (Apple's signature technique) ── */
(function initHorizontalGallery() {
  const track = document.getElementById('galleryTrack');
  if (!track) return;

  // Drag-to-scroll (desktop + touch)
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  const wrap = document.getElementById('galleryTrackWrap');

  wrap.addEventListener('mousedown', e => {
    isDragging = true;
    wrap.classList.add('dragging');
    startX = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    wrap.classList.remove('dragging');
  });

  wrap.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - wrap.offsetLeft;
    const walk = (x - startX) * 1.5;
    wrap.scrollLeft = scrollLeft - walk;
  });

  // Touch
  wrap.addEventListener('touchstart', e => {
    startX = e.touches[0].pageX;
    scrollLeft = wrap.scrollLeft;
  }, { passive: true });

  wrap.addEventListener('touchmove', e => {
    const x = e.touches[0].pageX;
    wrap.scrollLeft = scrollLeft - (x - startX);
  }, { passive: true });

  // Set overflow for drag
  wrap.style.overflowX = 'auto';
  wrap.style.overflowY = 'hidden';
  wrap.style.scrollbarWidth = 'none';
  wrap.style.webkitOverflowScrolling = 'touch';

  // GSAP: auto-scroll gallery section horizontally on page scroll (Apple style)
  const totalWidth = () => track.scrollWidth - document.documentElement.clientWidth;

  gsap.to(track, {
    x: () => -totalWidth() * 0.6,
    ease: 'none',
    scrollTrigger: {
      trigger: '#gallery',
      start: 'top top',
      end: () => '+=' + (totalWidth() * 0.8),
      scrub: 1.5,
      pin: false,
    }
  });

  // Gallery header parallax
  gsap.to('.gallery-header', {
    y: -40,
    ease: 'none',
    scrollTrigger: {
      trigger: '#gallery',
      start: 'top bottom',
      end: 'top top',
      scrub: true
    }
  });

  // Cards fade in as they come into view (on drag)
  gsap.utils.toArray('.gallery-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      scale: 0.92,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#gallery',
        start: 'top 90%',
        once: true,
      },
      delay: i * 0.07
    });
  });
})();

/* ── 8. NAV: Transparent → dark on scroll + section-aware theming ── */
(function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  ScrollTrigger.create({
    start: 'top -10',
    end: 99999,
    onUpdate: self => {
      nav.classList.toggle('nav-scrolled', self.progress > 0);
    }
  });

  // Light nav when over light sections
  const lightSections = document.querySelectorAll('.section-light');
  lightSections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      onEnter:    () => nav.classList.add('nav-light'),
      onLeave:    () => nav.classList.remove('nav-light'),
      onEnterBack: () => nav.classList.add('nav-light'),
      onLeaveBack: () => nav.classList.remove('nav-light'),
    });
  });

  // Mobile toggle
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
})();

/* ── 9. RSVP FORM ── */
(function initRSVP() {
  const WHATSAPP_NUMBER = '919599338972';

  function openWhatsApp(rsvp) {
    const attending = rsvp.attending === 'yes' ? '✅ Attending' : '❌ Not Attending';
    const events    = rsvp.events.length ? rsvp.events.join(', ') : 'None selected';
    const msg = [
      `🎊 *New RSVP — Abhishek & Sakshi Wedding*`,
      ``,
      `👤 *Name:* ${rsvp.name}`,
      `📧 *Email:* ${rsvp.email}`,
      `👥 *Guests:* ${rsvp.count}`,
      `*${attending}*`,
      `📅 *Events:* ${events}`,
      rsvp.message ? `💬 *Message:* "${rsvp.message}"` : null,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  const form      = document.getElementById('rsvpForm');
  const thank     = document.getElementById('rsvpThank');
  const thankMsg  = document.getElementById('thankMsg');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  gsap.from(form, {
    opacity: 0, y: 40, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: form, start: 'top 80%', once: true },
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const name      = document.getElementById('guestName');
    const email     = document.getElementById('guestEmail');
    const count     = document.getElementById('guestCount');
    const attending = form.querySelector('input[name="attending"]:checked');

    document.querySelectorAll('.field-err').forEach(el => el.classList.remove('visible'));

    if (!name.value.trim()) {
      document.getElementById('nameErr').classList.add('visible');
      valid = false;
    }

    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email.value)) {
      document.getElementById('emailErr').classList.add('visible');
      valid = false;
    }

    if (!attending) {
      document.getElementById('attendErr').classList.add('visible');
      valid = false;
    }

    if (!valid) return;

    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoad = submitBtn.querySelector('.btn-loading');
    btnText.style.display = 'none';
    btnLoad.style.display = 'inline';
    submitBtn.disabled = true;

    const checkedEvents = [...form.querySelectorAll('input[name="events"]:checked')]
      .map(cb => cb.value.charAt(0).toUpperCase() + cb.value.slice(1));

    const rsvp = {
      name:      name.value.trim(),
      email:     email.value.trim(),
      count:     count.value || '—',
      attending: attending.value,
      events:    checkedEvents,
      message:   document.getElementById('message').value.trim(),
    };

    setTimeout(() => {
      const isYes = attending.value === 'yes';
      thankMsg.textContent = isYes
        ? `We're so excited to celebrate with you, ${name.value.split(' ')[0]}! See you on June 27, 2026!`
        : `We'll miss you, ${name.value.split(' ')[0]}. You'll be in our hearts on the big day!`;

      gsap.to(form, {
        opacity: 0, y: -30, duration: 0.5, ease: 'power2.in',
        onComplete: () => {
          form.style.display = 'none';
          thank.style.display = 'block';
          gsap.from(thank, { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' });
          openWhatsApp(rsvp);
        }
      });
    }, 1000);
  });
})();

/* ── 10. LIVE COUNTDOWN ── */
(function initCountdown() {
  const days    = document.getElementById('days');
  const hours   = document.getElementById('hours');
  const minutes = document.getElementById('minutes');
  const seconds = document.getElementById('seconds');

  function pad(n, len = 2) { return String(n).padStart(len, '0'); }

  function tick() {
    const now  = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
      days.textContent = '000';
      hours.textContent = minutes.textContent = seconds.textContent = '00';
      return;
    }

    days.textContent    = pad(Math.floor(diff / 864e5), 3);
    hours.textContent   = pad(Math.floor((diff % 864e5) / 36e5));
    minutes.textContent = pad(Math.floor((diff % 36e5) / 6e4));
    seconds.textContent = pad(Math.floor((diff % 6e4) / 1e3));
  }

  tick();
  setInterval(tick, 1000);
})();

/* ── 11. HERO PARTICLES ── */
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = window.matchMedia('(max-width: 600px)').matches ? 15 : 30;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.setProperty('--dur',   (6 + Math.random() * 8) + 's');
    p.style.setProperty('--delay', (Math.random() * 8) + 's');
    p.style.left = (Math.random() * 100) + '%';
    p.style.top  = (40 + Math.random() * 50) + '%';
    p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
    container.appendChild(p);
  }
})();

/* ── 12. EVENT CARD CLICK ANIMATIONS ── */
(function initEventClickAnimations() {
  const events = [
    {
      theme: 'tilak',
      particleColor: '#c9a84c',
      particleType: 'marigold',
      emoji: '🪔',
      imgUrl: 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?w=800&q=85',
      detail: 'Families gather with joy as the sacred tilak is placed on the groom\'s forehead, followed by a grand feast celebrating the union of two families.',
    },
    {
      theme: 'haldi',
      particleColor: '#f0c000',
      particleType: 'turmeric',
      emoji: '🌿',
      imgUrl: 'https://images.unsplash.com/photo-1583939411023-14783179e581?w=800&q=85',
      detail: 'Fragrant turmeric paste is lovingly applied by family and friends — a radiant ritual blessing the groom with warmth and good fortune.',
    },
    {
      theme: 'janeu',
      particleColor: '#ff6b2b',
      particleType: 'embers',
      emoji: '🔥',
      imgUrl: 'https://images.unsplash.com/photo-1775500165449-512ecafd60a8?w=800&q=85',
      detail: 'The sacred Yagyopavit ceremony — a holy thread of duty and dharma is bestowed upon the groom as he steps toward married life.',
    },
    {
      theme: 'barat',
      particleColor: '#e8c97a',
      particleType: 'stars',
      emoji: '💫',
      imgUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85',
      detail: 'Music, celebration and joy fill the air as Abhishek\'s grand barat procession arrives at Ram Mandap for the Panigrahan ceremony.',
    },
  ];

  const overlay = document.createElement('div');
  overlay.id = 'eventOverlay';
  document.body.appendChild(overlay);

  const burstContainer = document.createElement('div');
  burstContainer.id = 'burstContainer';
  document.body.appendChild(burstContainer);

  const modal = document.createElement('div');
  modal.id = 'eventModal';
  modal.innerHTML = `
    <button class="event-modal-close" id="eventModalClose">✕</button>
    <div class="event-modal-photo" id="eventModalPhoto">
      <img id="eventModalImg" src="" alt="" />
      <div class="event-modal-photo-overlay">
        <span class="event-modal-emoji" id="eventModalEmoji"></span>
      </div>
    </div>
    <div class="event-modal-num" id="eventModalNum"></div>
    <h3 class="event-modal-title" id="eventModalTitle"></h3>
    <div class="event-modal-meta">
      <span id="eventModalDate"></span>
      <span class="event-modal-sep">·</span>
      <span id="eventModalTime"></span>
    </div>
    <div class="event-modal-venue" id="eventModalVenue"></div>
    <div class="event-modal-divider"></div>
    <p class="event-modal-detail" id="eventModalDetail"></p>
  `;
  document.body.appendChild(modal);

  function spawnBurst(rect, type, color) {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const configs = {
      marigold: { count: 28, spread: 200, colors: ['#c9a84c', '#e8c97a', '#f5d78a', '#d4a01a', '#fff0aa'] },
      turmeric: { count: 36, spread: 220, colors: ['#f0c000', '#f5d400', '#ffec50', '#e8b500', '#fffaaa'] },
      embers:   { count: 32, spread: 170, colors: ['#ff3d00', '#ff6b2b', '#ff8c42', '#ffb347', '#fff0b0'] },
      stars:    { count: 34, spread: 250, colors: ['#e8c97a', '#ffb3c6', '#a0c4ff', '#b8f0b8', '#ffffff', '#c9a84c'] },
    };

    const cfg = configs[type] || configs.marigold;
    const starChars = ['✦', '★', '✸', '✺', '✻'];

    for (let i = 0; i < cfg.count; i++) {
      const p = document.createElement('div');
      const clr = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
      const size = 4 + Math.random() * 9;
      const angle = Math.random() * 360;
      const dist = cfg.spread * (0.35 + Math.random() * 0.65);
      const tx = Math.cos(angle * Math.PI / 180) * dist;
      let ty = Math.sin(angle * Math.PI / 180) * dist;
      if (type === 'embers') ty -= 50 + Math.random() * 80;

      const isStarText = type === 'stars' && Math.random() > 0.5;

      if (isStarText) {
        p.style.cssText = `
          position: fixed; left: ${cx}px; top: ${cy}px;
          width: auto; height: auto; background: none;
          color: ${clr}; font-size: ${9 + Math.random() * 13}px;
          pointer-events: none; z-index: 9999; line-height: 1;
        `;
        p.textContent = starChars[Math.floor(Math.random() * starChars.length)];
      } else {
        const br = type === 'turmeric'
          ? '35% 65% 65% 35% / 35% 35% 65% 65%'
          : type === 'embers' ? '2px' : '50%';
        p.style.cssText = `
          position: fixed; left: ${cx}px; top: ${cy}px;
          width: ${size}px; height: ${size}px;
          background: ${clr}; border-radius: ${br};
          pointer-events: none; z-index: 9999;
        `;
      }

      burstContainer.appendChild(p);

      gsap.fromTo(p,
        { x: 0, y: 0, opacity: 1, scale: 1, rotation: 0 },
        {
          x: tx, y: ty,
          opacity: 0,
          scale: isStarText ? 0 : (type === 'marigold' ? 0.15 : 0),
          rotation: (Math.random() - 0.5) * 400,
          duration: 0.65 + Math.random() * 0.55,
          ease: type === 'embers' ? 'power1.out' : 'power2.out',
          delay: Math.random() * 0.1,
          onComplete: () => p.remove(),
        }
      );
    }
  }

  function openModal(cardEl, data) {
    const rect = cardEl.getBoundingClientRect();

    gsap.timeline()
      .to(cardEl, { scale: 1.07, duration: 0.13, ease: 'power2.out' })
      .to(cardEl, { scale: 1,    duration: 0.3,  ease: 'elastic.out(1.2, 0.5)' });

    spawnBurst(rect, data.particleType, data.particleColor);

    document.getElementById('eventModalEmoji').textContent  = data.emoji;
    document.getElementById('eventModalImg').src            = data.imgUrl;
    document.getElementById('eventModalImg').alt            = cardEl.querySelector('h3').textContent;
    document.getElementById('eventModalNum').textContent    = cardEl.querySelector('.event-num').textContent;
    document.getElementById('eventModalTitle').textContent  = cardEl.querySelector('h3').textContent;
    document.getElementById('eventModalDate').textContent   = cardEl.querySelector('.event-date').textContent;
    document.getElementById('eventModalTime').textContent   = cardEl.querySelector('.event-time').textContent;
    document.getElementById('eventModalVenue').textContent  = cardEl.querySelector('.event-venue').textContent;
    document.getElementById('eventModalDetail').textContent = data.detail;
    modal.style.setProperty('--event-color', data.particleColor);

    overlay.style.display = 'block';
    modal.style.display   = 'flex';

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(modal,
      { opacity: 0, y: 48, scale: 0.94 },
      { opacity: 1, y: 0,  scale: 1,    duration: 0.48, ease: 'power3.out' }
    );
    gsap.fromTo('#eventModalEmoji',
      { scale: 0, rotation: -18 },
      { scale: 1, rotation: 0, duration: 0.65, ease: 'elastic.out(1.1, 0.45)', delay: 0.16 }
    );
    gsap.fromTo('.event-modal-divider',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: 'power2.out', delay: 0.3 }
    );
  }

  function closeModal() {
    gsap.to(modal,   { opacity: 0, y: 28, scale: 0.96, duration: 0.26, ease: 'power2.in',
      onComplete: () => { modal.style.display = 'none'; }
    });
    gsap.to(overlay, { opacity: 0, duration: 0.26,
      onComplete: () => { overlay.style.display = 'none'; }
    });
  }

  document.querySelectorAll('.event-card').forEach((card, i) => {
    const hint = document.createElement('div');
    hint.className = 'event-tap-hint';
    hint.innerHTML = '<span>✦</span> Tap to explore';
    card.appendChild(hint);
    card.addEventListener('click', () => openModal(card, events[i]));
  });

  document.getElementById('eventModalClose').addEventListener('click', e => {
    e.stopPropagation();
    closeModal();
  });
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

/* ── 13. SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
