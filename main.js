// ===== NAVBAR APARECE AO ROLAR =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > window.innerHeight * 0.8) {
    navbar.classList.add('visivel');
  } else {
    navbar.classList.remove('visivel');
  }
});

// ===== MENU MOBILE =====
function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('aberto');
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
