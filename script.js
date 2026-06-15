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

let touchStartX = 0;

principal.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

principal.addEventListener("touchend", (e) => {

  const touchEndX = e.changedTouches[0].clientX;
  const distancia = touchEndX - touchStartX;

  if (distancia > 50) {
    mudarImagem((index - 1 + imagens.length) % imagens.length);
  }

  if (distancia < -50) {
    mudarImagem((index + 1) % imagens.length);
  }

});
// ===== ARRASTAR PARA TROCAR IMAGEM =====

let startX = 0;

principal.addEventListener("mousedown", (e) => {
  startX = e.clientX;
});

principal.addEventListener("mouseup", (e) => {

  const distancia = e.clientX - startX;

  // arrastou para esquerda
  if (distancia < -50) {
    mudarImagem((index + 1) % imagens.length);
  }

  // arrastou para direita
  if (distancia > 50) {
    mudarImagem((index - 1 + imagens.length) % imagens.length);
  }

});
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

    principal.style.opacity = "0";

    setTimeout(() => {

      principal.src = imagens[i].src;

      imagens.forEach(img => img.classList.remove("active"));
      dots.forEach(dot => dot.classList.remove("active"));

      imagens[i].classList.add("active");
      dots[i].classList.add("active");

      principal.style.opacity = "1";

    }, 150);
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

  const navbar = document.querySelector('.navbar-historia');
  const btnTopo = document.querySelector('.btn-topo');
  const btnVoltar = document.querySelector('.btn-voltar');

window.addEventListener('scroll', () => {

  // BOTÃO TOPO
  if (btnTopo) {
    if (window.scrollY > 300) {
      btnTopo.classList.add('visivel');
    } else {
      btnTopo.classList.remove('visivel');
    }
  }

  // NAVBAR
  if (navbar) {
    if (window.scrollY > window.innerHeight) {
      navbar.classList.add('visivel');
    } else {
      navbar.classList.remove('visivel');
    }
  }

  // BOTÃO VOLTAR
  if (btnVoltar) {
    if (window.scrollY > 100) {
      btnVoltar.classList.add('escondido');
    } else {
      btnVoltar.classList.remove('escondido');
    }
  }

});