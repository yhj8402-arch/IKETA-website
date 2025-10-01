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
  document.querySelectorAll('.plist-card[data-id]').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      if (!id) return;
      window.location.href = `product.html?id=${encodeURIComponent(id)}`;
    });
  });

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

  // === 브랜드 드롭다운 ===
  // === 브랜드 드롭다운 ===
const brandTrigger = document.getElementById('brandMenuTrigger');
const brandDropdown = document.getElementById('brandDropdown');
const closeDropdown = document.querySelector('.close-dropdown');
const brandSearchInput = document.getElementById('brandSearch'); // ✅ 패널 검색창 input

if (brandTrigger && brandDropdown) {
  // 브랜드에 마우스 올리면 열림
  brandTrigger.addEventListener('mouseenter', () => {
    brandDropdown.classList.add('open');
    setTimeout(() => {
      if (brandSearchInput) brandSearchInput.focus(); // ✅ 열리자마자 자동 focus
    }, 300);
  });

  // 패널 영역 벗어나면 닫힘
  brandDropdown.addEventListener('mouseleave', () => {
    brandDropdown.classList.remove('open');
  });
}

// 닫기 버튼 (-) 클릭 시 닫힘
if (closeDropdown && brandDropdown) {
  closeDropdown.addEventListener('click', () => {
    brandDropdown.classList.remove('open');
  });
}
});