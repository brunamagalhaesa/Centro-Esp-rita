// ======= HISTORIA =======

document.addEventListener("DOMContentLoaded", () => {
  // ===== PARALAXE DO FUNDO =====

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.body.style.backgroundPositionY = `calc(center + ${scrollY * 0.3}px)`;
});
  
  // Animação de entrada ao rolar
      
  const items = document.querySelectorAll('.item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visivel');
    } else {
      e.target.classList.remove('visivel');
    }
  });
}, { 
  threshold: 0.05,
  rootMargin: '0px 0px -50px 0px' // ← aguarda um pouco antes de remover
});

items.forEach(item => observer.observe(item));
  
  // ===== AOS =====
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true
    });
  }

  // ===== CARROSSEL =====
  const carrossel = document.querySelector(".carrossel");

  function scrollCarrossel(valor) {
    if (!carrossel) return;

    carrossel.scrollBy({
      left: valor,
      behavior: "smooth"
    });
  }

  window.scrollCarrossel = scrollCarrossel;

  // ===== DRAG COM MOUSE =====
  if (carrossel) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    carrossel.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - carrossel.offsetLeft;
      scrollLeft = carrossel.scrollLeft;
      carrossel.classList.add("dragging");
    });

    carrossel.addEventListener("mouseleave", () => {
      isDown = false;
      carrossel.classList.remove("dragging");
    });

    carrossel.addEventListener("mouseup", () => {
      isDown = false;
      carrossel.classList.remove("dragging");
    });

    carrossel.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();

      const x = e.pageX - carrossel.offsetLeft;
      const walk = (x - startX) * 2;
      carrossel.scrollLeft = scrollLeft - walk;
    });
  }

  // ===== GALERIA =====
  const imagens = document.querySelectorAll("#thumbs img");
  const principal = document.getElementById("imagemPrincipal");
  const dotsContainer = document.getElementById("dots");

  if (imagens.length && principal && dotsContainer) {

    let index = 0;

    // CRIAR DOTS
    imagens.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");

      dot.addEventListener("click", () => mudarImagem(i));

      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    // FUNÇÃO PRINCIPAL
    function mudarImagem(i) {
      index = i;

      // atualiza imagem principal
      principal.src = imagens[i].src;

      // atualiza estados
      imagens.forEach(img => img.classList.remove("active"));
      dots.forEach(dot => dot.classList.remove("active"));

      imagens[i].classList.add("active");
      dots[i].classList.add("active");
    }

    // CLIQUE NAS MINIATURAS
    imagens.forEach((img, i) => {
      img.addEventListener("click", () => mudarImagem(i));
    });

    // SCROLL DAS MINIATURAS
    function scrollThumbs(valor) {
      const thumbs = document.getElementById("thumbs");
      if (!thumbs) return;

      thumbs.scrollBy({
        left: valor,
        behavior: "smooth"
      });
    }

    window.scrollThumbs = scrollThumbs;

    // INICIAR
    mudarImagem(0);
  }
});

  // NAVBAR E BOTÃO TOPO
  const navbar = document.querySelector('.navbar-historia');
  const btnTopo = document.querySelector('.btn-topo');

  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
      navbar.classList.add('visivel');
      btnTopo.classList.add('visivel');
    } else {
      navbar.classList.remove('visivel');
      btnTopo.classList.remove('visivel');
    }
});
