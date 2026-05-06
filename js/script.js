/* ==========================================================
   MEU CROCHÊ ATELIÊ — JavaScript Principal
   Arquivo: js/script.js
   ========================================================== */

/* ===================== 1. SCROLL REVEAL ===================== */
function iniciarScrollReveal() {
  const elementos = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.12 }
  );
  elementos.forEach((el) => observer.observe(el));
}

/* ===================== 2. HEADER AO ROLAR ===================== */
function iniciarHeaderScroll() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* ===================== 3. TOAST / NOTIFICAÇÃO ===================== */
function mostrarToast(mensagem) {
  const toast = document.getElementById('toast');
  toast.textContent = mensagem;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ===================== 4. SELECIONAR PRODUTO PARA ENCOMENDA =====================
   Ao clicar em "Encomendar esta Peça", preenche automaticamente
   o select e a textarea no formulário de encomenda.
   =============================================================================== */
function selecionarProduto(nomeProduto) {
  // Mapeamento: nome do produto → opção do select
  const mapa = {
    'Tapete Redondo Hortência':  'Tapetes',
    'Top Cropped Margarida':     'Croppeds',
    'Vaso Decorativo Crochê':    'Decoração',
    'Kit Presente Crochê':       'Apresentação',
    'Urso Amigurumi':            'Amigurumi',
    'Colar Boho Crochê':         'Colares',
    'Ecopads Demaquilantes':     'Ecopads',
    'Pingente Coração Crochê':   'Pingentes',
    'Sousplat Natural Redondo':  'Sousplats',
    'Bolsa Tote Boho':           'Bolsas',
    'Cesta Organizadora Crochê': 'Organizadores',
  };

  const select = document.getElementById('produto');
  const opcao  = mapa[nomeProduto];

  if (select && opcao) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text === opcao) {
        select.selectedIndex = i;
        break;
      }
    }
  }

  const textarea = document.getElementById('mensagem');
  if (textarea && textarea.value === '') {
    textarea.value = 'Olá! Tenho interesse em encomendar: ' + nomeProduto + '.\n\nDetalhes (cor, tamanho, prazo): ';
  }

  mostrarToast('📋 "' + nomeProduto + '" selecionado! Preencha o formulário abaixo.');
}

/* ===================== 5. FILTRO DE CATEGORIAS ===================== */
function filtrarProdutos(categoria, elementoClicado) {
  document.querySelectorAll('.categoria-card').forEach((card) => card.classList.remove('active'));
  elementoClicado.classList.add('active');

  document.querySelectorAll('.produto-card').forEach((card) => {
    const catProduto = card.getAttribute('data-cat');
    const mostrar    = categoria === 'todos' || catProduto === categoria;

    if (mostrar) {
      card.style.display = 'block';
      card.style.opacity   = '0';
      card.style.transform = 'translateY(20px)';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity    = '1';
          card.style.transform  = 'translateY(0)';
        });
      });
    } else {
      card.style.display = 'none';
    }
  });
}

/* ===================== 6. FAVORITOS ===================== */
function iniciarFavoritos() {
  document.querySelectorAll('.btn-fav').forEach((btn) => {
    btn.addEventListener('click', function () {
      if (this.textContent === '❤️') {
        this.textContent = '🤍';
        mostrarToast('💔 Produto removido dos favoritos.');
      } else {
        this.textContent = '❤️';
        mostrarToast('❤️ Produto adicionado aos favoritos!');
      }
    });
  });
}

/* ===================== 7. MENU MOBILE ===================== */
function iniciarMenuMobile() {
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');
  if (!hamburger || !navMobile) return;

  hamburger.addEventListener('click', () => {
    navMobile.classList.toggle('open');
    const barras = hamburger.querySelectorAll('span');
    if (navMobile.classList.contains('open')) {
      barras[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      barras[1].style.opacity   = '0';
      barras[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      barras[0].style.transform = '';
      barras[1].style.opacity   = '';
      barras[2].style.transform = '';
    }
  });

  navMobile.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      hamburger.querySelectorAll('span').forEach((b) => {
        b.style.transform = '';
        b.style.opacity   = '';
      });
    });
  });
}

/* ===================== 8. FORMULÁRIO DE ENCOMENDA ===================== */
function iniciarFormulario() {
  const btnEnviar = document.getElementById('btnEnviar');
  if (!btnEnviar) return;

  btnEnviar.addEventListener('click', () => {
    const nome     = document.getElementById('nome').value.trim();
    const email    = document.getElementById('email').value.trim();
    const produto  = document.getElementById('produto').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !produto || !mensagem) {
      mostrarToast('⚠️ Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      mostrarToast('⚠️ Digite um e-mail válido.');
      return;
    }

    mostrarToast('✅ Encomenda enviada! Entraremos em contato em breve, ' + nome + '!');

    document.getElementById('nome').value      = '';
    document.getElementById('email').value     = '';
    document.getElementById('whatsapp').value  = '';
    document.getElementById('produto').value   = '';
    document.getElementById('mensagem').value  = '';
  });
}

/* ===================== INICIALIZAÇÃO ===================== */
document.addEventListener('DOMContentLoaded', () => {
  iniciarScrollReveal();
  iniciarHeaderScroll();
  iniciarFavoritos();
  iniciarMenuMobile();
  iniciarFormulario();
});
