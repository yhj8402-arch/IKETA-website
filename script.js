document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.querySelector('.fa-magnifying-glass');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearch = document.getElementById('closeSearch');
  const searchInput = document.getElementById('searchInput'); // ✅ 수정: 실제 ID로 연결

  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      searchOverlay.classList.remove('hidden');
      setTimeout(() => searchInput.focus(), 300); // ✅ 자동 focus
    });
  }

  if (closeSearch) {
    closeSearch.addEventListener('click', () => {
      searchOverlay.classList.add('hidden');
    });
  }

  // === 히어로 슬라이더 ===
  const slider = document.querySelector('.hero-slider');
  if (slider) {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (slides.length) {
      const prevBtn = slider.querySelector('.prev');
      const nextBtn = slider.querySelector('.next');
      const dotsBox = slider.querySelector('.dots');

      let index = 0;
      let timer = null;
      let dots = [];

      function buildDots() {
        let box = dotsBox;
        if (!box) {
          box = document.createElement('div');
          box.className = 'dots';
          slider.appendChild(box);
        }
        box.innerHTML = '';
        const frag = document.createDocumentFragment();
        for (let i = 0; i < slides.length; i++) {
          const b = document.createElement('button');
          b.type = 'button';
          b.setAttribute('aria-label', `슬라이드 ${i + 1}`);
          b.dataset.index = String(i);
          frag.appendChild(b);
        }
        box.appendChild(frag);
        dots = Array.from(box.querySelectorAll('button'));
        box.addEventListener('click', (e) => {
          const btn = e.target.closest('button');
          if (!btn) return;
          const i = Number(btn.dataset.index || 0);
          go(i);
        });
      }

      function update() {
        slides.forEach((s, i) =>
          s.classList.toggle('is-active', i === index)
        );
        if (dots.length) {
          dots.forEach((d, i) =>
            d.setAttribute('aria-selected', i === index ? 'true' : 'false')
          );
        }
        const single = slides.length <= 1;
        if (prevBtn) prevBtn.style.display = single ? 'none' : '';
        if (nextBtn) nextBtn.style.display = single ? 'none' : '';
      }

      function go(to) {
        index = (to + slides.length) % slides.length;
        update();
      }

      function startAuto() {
        if (slides.length <= 1) return;
        stopAuto();
        timer = setInterval(() => go(index + 1), 5000);
      }
      function stopAuto() {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }

      if (prevBtn) prevBtn.addEventListener('click', () => go(index - 1));
      if (nextBtn) nextBtn.addEventListener('click', () => go(index + 1));
      slider.addEventListener('mouseenter', stopAuto);
      slider.addEventListener('mouseleave', startAuto);

      buildDots();
      update();
      startAuto();
    }
  }

  // === 제품 카드 클릭 → 상세페이지 이동 ===
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const products = {
    "steel6-blue": {
      name: "Steel 6 Line - Blue",
      price: "₩49,000",
      image: "./images/product-list/bracelet1.jpg",
      tagline: "The spirit of returning home"
    },
    "steel6-brown": {
      name: "Steel 6 Line - Brown",
      price: "₩49,000",
      image: "./images/product-list/bracelet2.jpg",
      tagline: "The spirit of warm journey"
    },
    "steel6-black": {
      name: "Steel 6 Line - Black",
      price: "₩49,000",
      image: "./images/product-list/bracelet3.jpg",
      tagline: "The spirit of timeless depth"
    },
    "steel6-red": {
      name: "Steel 6 Line - Red",
      price: "₩49,000",
      image: "./images/product-list/bracelet4.jpg",
      tagline: "The spirit of passion"
    },
    "steel6-green": {
      name: "Steel 6 Line - Green",
      price: "₩49,000",
      image: "./images/product-list/bracelet5.jpg",
      tagline: "The spirit of calm nature"
    },
    "nonsteel6-blue": {
      name: "NonSteel 6 Line - Blue",
      price: "₩45,000",
      image: "./images/product-list/bracelet6.jpg",
      tagline: "The spirit of breathing sea"
    },
    "nonsteel6-brown": {
      name: "NonSteel 6 Line - Brown",
      price: "₩45,000",
      image: "./images/product-list/bracelet7.jpg",
      tagline: "The spirit of classic warmth"
    },
    "nonsteel6-black": {
      name: "NonSteel 6 Line - Black",
      price: "₩45,000",
      image: "./images/product-list/bracelet8.jpg",
      tagline: "The spirit of simple strength"
    },
    "nonsteel6-red": {
      name: "NonSteel 6 Line - Red",
      price: "₩45,000",
      image: "./images/product-list/bracelet9.jpg",
      tagline: "The spirit of confident heart"
    },
    "nonsteel6-green": {
      name: "NonSteel 6 Line - Green",
      price: "₩45,000",
      image: "./images/product-list/bracelet10.jpg",
      tagline: "The spirit of natural balance"
    },
    "steel8-blue": {
      name: "Steel 8 Line - Blue",
      price: "₩54,000",
      image: "./images/product-list/bracelet11.jpg",
      tagline: "The spirit of deep voyage"
    },
    "steel8-brown": {
      name: "Steel 8 Line - Brown",
      price: "₩54,000",
      image: "./images/product-list/bracelet12.jpg",
      tagline: "The spirit of aged harmony"
    },
    "steel8-black": {
      name: "Steel 8 Line - Black",
      price: "₩54,000",
      image: "./images/product-list/bracelet13.jpg",
      tagline: "The spirit of silent power"
    },
    "steel8-red": {
      name: "Steel 8 Line - Red",
      price: "₩54,000",
      image: "./images/product-list/bracelet14.jpg",
      tagline: "The spirit of burning desire"
    },
    "steel8-green": {
      name: "Steel 8 Line - Green",
      price: "₩54,000",
      image: "./images/product-list/bracelet15.jpg",
      tagline: "The spirit of grounded peace"
    }
  };

  const product = products[productId];
  if (product) {
    document.querySelector(".product-image").src = product.image;
    document.querySelector(".product-title").textContent = product.name;
    document.querySelector(".product-price").textContent = product.price;
    document.querySelector(".product-tagline").textContent = product.tagline;
  }

  // === 장바구니 공용 기능 ===
  const CART_KEY = 'iketa_cart_v1';

  const loadCart = () => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  };
  const saveCart = (cart) =>
    localStorage.setItem(CART_KEY, JSON.stringify(cart));

  function updateCartBadge() {
    const cart = loadCart();
    const count = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
    const badge = document.getElementById('cartCount');
    if (badge) badge.textContent = count;
  }

  const cartCountEl = document.getElementById('cartCount');
  const syncCartBadge = () => {
    if (!cartCountEl) return;
    const cart = loadCart();
    const qty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    cartCountEl.textContent = qty;
  };
  syncCartBadge();

  window.IKETA = window.IKETA || {};
  window.IKETA.addToCart = function (item) {
    const cart = loadCart();
    const idx = cart.findIndex(
      (p) => p.id === item.id && p.size === item.size
    );
    if (idx > -1) {
      cart[idx].qty += item.qty;
    } else {
      cart.push(item);
    }
    saveCart(cart);
    syncCartBadge();
  };

  // === 장바구니 아이콘 클릭 → 장바구니 페이지 이동 ===
  const cartIcon = document.getElementById('cartIcon');
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  }

  // === 계속 쇼핑하기 버튼 동작 ===
  const introBrandBtn = document.getElementById('intro-brand');
  if (introBrandBtn) {
    introBrandBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'intro.html';
    });
  }
  
const fadeElems = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      // ✅ 선(divider)일 경우: 먼저 선만 표시
      if (entry.target.classList.contains('divider')) {
        entry.target.classList.add('visible');

        // 0.8초 뒤 → 바로 다음(한글문장)
        setTimeout(() => {
          const next = entry.target.nextElementSibling;
          if (next && next.classList.contains('fade-in')) {
            next.classList.add('visible');

            // 한글문장이 등장한 후 0.8초 뒤 → 영어문장 등장
            setTimeout(() => {
              const after = next.nextElementSibling;
              if (after && after.classList.contains('fade-in')) {
                after.classList.add('visible');
              }
            }, 800);
          }
        }, 800);

        observer.unobserve(entry.target);
      }

      // ✅ 일반 fade-in 요소는 따로 등장하지 않음 (자동 방지)
      else if (!entry.target.previousElementSibling?.classList.contains('divider')) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.2 });

fadeElems.forEach(elem => observer.observe(elem));
});
