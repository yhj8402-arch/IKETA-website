document.addEventListener('DOMContentLoaded', () => {
  // === 검색창 ===
  const searchIcon = document.querySelector('.fa-magnifying-glass');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearch = document.getElementById('closeSearch');
  const searchInput = document.querySelector('#searchOverlay input'); // ✅ ID 없는 input 대응

  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      searchOverlay.classList.remove('hidden');
      setTimeout(() => searchInput.focus(), 300);
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
        slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
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

  // === 제품 상세 데이터 매핑 ===
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  const products = {
    "steel6-blue": {
      name: "Steel 6 Line - Blue",
      price: "₩49,000",
      image: "images/product-list/bracelet1.jpg",
      tagline: "The spirit of returning home"
    },
    "steel6-brown": {
      name: "Steel 6 Line - Brown",
      price: "₩49,000",
      image: "images/product-list/bracelet2.jpg",
      tagline: "The spirit of warm journey"
    },
    "steel6-black": {
      name: "Steel 6 Line - Black",
      price: "₩49,000",
      image: "images/product-list/bracelet3.jpg",
      tagline: "The spirit of timeless depth"
    },
    "steel6-red": {
      name: "Steel 6 Line - Red",
      price: "₩49,000",
      image: "images/product-list/bracelet4.jpg",
      tagline: "The spirit of passion"
    },
    "steel6-green": {
      name: "Steel 6 Line - Green",
      price: "₩49,000",
      image: "images/product-list/bracelet5.jpg",
      tagline: "The spirit of calm nature"
    },
    "Helios-Flame": {
      name: "NonSteel 6 Line - Blue",
      price: "₩39,000",
      image: "images/product-list/bracelet6.jpg",
      tagline: "The spirit of breathing sea"
    },
    "Thalassa-S-Verde": {
      name: "NonSteel 6 Line - Brown",
      price: "₩39,000",
      image: "images/product-list/bracelet7.jpg",
      tagline: "The spirit of classic warmth"
    },
    "Terra-S-Brown": {
      name: "NonSteel 6 Line - Black",
      price: "₩39,000",
      image: "images/product-list/bracelet8.jpg",
      tagline: "The spirit of simple strength"
    },
    "k12-terra": {
      name: "NonSteel 6 Line - Red",
      price: "₩59,000",
      image: "images/product-list/keyring1.jpg",
      tagline: "The spirit of confident heart"
    },
    "k12-black": {
      name: "NonSteel 6 Line - Red",
      price: "₩59,000",
      image: "images/product-list/keyring2.jpg",
      tagline: "The spirit of confident heart"
    },
  };

  const product = products[productId];
  if (product) {
    const img = document.querySelector(".product-image");
    const title = document.querySelector(".product-title");
    const price = document.querySelector(".product-price");
    const tagline = document.querySelector(".product-tagline");
    if (img) img.src = product.image;
    if (title) title.textContent = product.name;
    if (price) price.textContent = product.price;
    if (tagline) tagline.textContent = product.tagline;
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
  const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));

  const updateCartBadge = () => {
    const cart = loadCart();
    const count = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
    const badge = document.getElementById('cartCount');
    if (badge) badge.textContent = count;
  };

  updateCartBadge();

  window.IKETA = window.IKETA || {};
  window.IKETA.addToCart = function (item) {
    const cart = loadCart();
    const idx = cart.findIndex((p) => p.id === item.id && p.size === item.size);
    if (idx > -1) cart[idx].qty += item.qty;
    else cart.push(item);
    saveCart(cart);
    updateCartBadge();
  };

  // === 장바구니 아이콘 클릭 ===
  const cartIcon = document.getElementById('cartIcon');
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  }

  // === 스크롤 애니메이션 (divider + fade-in) ===
  const fadeElems = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('divider')) {
            entry.target.classList.add('visible');
            setTimeout(() => {
              const next = entry.target.nextElementSibling;
              if (next && next.classList.contains('fade-in')) {
                next.classList.add('visible');
                setTimeout(() => {
                  const after = next.nextElementSibling;
                  if (after && after.classList.contains('fade-in')) {
                    after.classList.add('visible');
                  }
                }, 800);
              }
            }, 800);
            observer.unobserve(entry.target);
          } else if (
            !entry.target.previousElementSibling?.classList.contains('divider')
          ) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeElems.forEach((elem) => observer.observe(elem));
});