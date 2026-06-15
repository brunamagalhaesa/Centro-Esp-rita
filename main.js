// ===== NAVBAR APARECE AO ROLAR =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > window.innerHeight * 0.8) {
    navbar.classList.add('visivel');
  } else {
    navbar.classList.remove('visivel');
  }
});

function toggleMenu() {
  const toggle = document.getElementById('toggle');
  const lateral = document.getElementById('menu-lateral');
  const backdrop = document.getElementById('menu-backdrop');
  toggle.classList.toggle('active');
  lateral.classList.toggle('open');
  backdrop.classList.toggle('open');
  document.body.style.overflow = lateral.classList.contains('open') ? 'hidden' : '';
}

// ===== ANIMAÇÃO DE ENTRADA DAS SEÇÕES =====
const animados = document.querySelectorAll('.horario-card, .bazar-item, .doacao-lista');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.classList.add('visivel');
      }, i * 80);
    } else {
      e.target.classList.remove('visivel');
    }
  });
}, {
  threshold: 0.05,
  rootMargin: '0px 0px -50px 0px'
});

animados.forEach(el => observer.observe(el));

// ===== PARALAXE DO FUNDO =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.body.style.backgroundPositionY = `calc(center + ${scrollY * 0.3}px)`;
});

// ===== TIMELINE =====

const tlWrap = document.querySelector('.tl-wrap');

if (tlWrap) {
  let isDown = false;
  let startX;
  let scrollLeft;
  let velocity = 0;
  let lastX;
  let momentumID;

  function cancelMomentum() {
    if (momentumID) cancelAnimationFrame(momentumID);
  }

  function momentumLoop() {
    tlWrap.scrollLeft += velocity;
    velocity *= 0.95;
    if (Math.abs(velocity) > 0.5) {
      momentumID = requestAnimationFrame(momentumLoop);
    }
  }

  tlWrap.addEventListener('mousedown', (e) => {
    isDown = true;
    cancelMomentum();
    tlWrap.classList.add('arrastando');
    startX = e.pageX - tlWrap.offsetLeft;
    lastX = startX;
    scrollLeft = tlWrap.scrollLeft;
    velocity = 0;
  });

  tlWrap.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      tlWrap.classList.remove('arrastando');
      momentumLoop();
    }
  });

  tlWrap.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      tlWrap.classList.remove('arrastando');
      momentumLoop();
    }
  });

  tlWrap.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - tlWrap.offsetLeft;
    const walk = (x - startX) * 1.5;
    tlWrap.scrollLeft = scrollLeft - walk;
    velocity = lastX - x;
    lastX = x;
  });
}

// ===== BANNERS =====
const bannersWrap = document.getElementById('bannersWrap');
const bannersTrack = document.getElementById('bannersTrack');
const bannersDots = document.getElementById('bannersDots');

if (bannersWrap && bannersTrack) {
  const slides = bannersTrack.children;
  const total = slides.length;
  let atual = 0;
  let autoplayID;
  let autoplayPausado = false;

  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => irPara(i));
    bannersDots.appendChild(dot);
  }
  const dots = bannersDots.querySelectorAll('.dot');

  function irPara(i) {
    atual = (i + total) % total;
    bannersTrack.style.transform = `translateX(-${atual * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[atual].classList.add('active');
  }

  function proximo() {
    irPara(atual + 1);
  }

  function autoplayStep() {
    if (!autoplayPausado) proximo();
  }

  autoplayID = setInterval(autoplayStep, 4000);

  function pausarAutoplay() {
    autoplayPausado = true;
  }

  function retomarAutoplay() {
    setTimeout(() => { autoplayPausado = false; }, 1500);
  }

  // ARRASTAR PARA TROCAR DE SLIDE
  let isDown = false;
  let startX;

  bannersWrap.addEventListener('mousedown', (e) => {
    isDown = true;
    pausarAutoplay();
    bannersWrap.classList.add('arrastando');
    startX = e.pageX;
    bannersTrack.style.transition = 'none';
  });

  bannersWrap.addEventListener('mouseup', (e) => {
    if (!isDown) return;
    isDown = false;
    bannersWrap.classList.remove('arrastando');
    bannersTrack.style.transition = 'transform 0.2s ease';

    const diff = e.pageX - startX;
    if (diff > 60) irPara(atual - 1);
    else if (diff < -60) irPara(atual + 1);
    else irPara(atual);

    retomarAutoplay();
  });

  bannersWrap.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      bannersWrap.classList.remove('arrastando');
      bannersTrack.style.transition = 'transform 0.2s ease';
      irPara(atual);
      retomarAutoplay();
    }
  });

  bannersWrap.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const diff = e.pageX - startX;
    bannersTrack.style.transform = `translateX(calc(-${atual * 100}% + ${diff}px))`;
  });

  // SUPORTE A TOUCH (MOBILE)
  bannersWrap.addEventListener('touchstart', (e) => {
    pausarAutoplay();
    startX = e.touches[0].pageX;
    bannersTrack.style.transition = 'none';
  });

  bannersWrap.addEventListener('touchmove', (e) => {
    const diff = e.touches[0].pageX - startX;
    bannersTrack.style.transform = `translateX(calc(-${atual * 100}% + ${diff}px))`;
  });

  bannersWrap.addEventListener('touchend', (e) => {
    bannersTrack.style.transition = 'transform 0.2s ease';
    const diff = e.changedTouches[0].pageX - startX;
    if (diff > 60) irPara(atual - 1);
    else if (diff < -60) irPara(atual + 1);
    else irPara(atual);
    retomarAutoplay();
  });

  irPara(0);
}