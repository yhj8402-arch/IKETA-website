document.addEventListener('DOMContentLoaded', () => {
  // === 검색창 ===
  const searchIcon = document.querySelector('.fa-magnifying-glass');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearch = document.getElementById('closeSearch');

  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      searchOverlay.classList.remove('hidden');
      document.getElementById('searchInput').focus();
    });
  }

  if (closeSearch) {
    closeSearch.addEventListener('click', () => {
      searchOverlay.classList.add('hidden');
    });
  }

  // === 장바구니 ===
  const CART_KEY = 'iketa_cart_v1';
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');

  const loadCart = () => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  };
  const saveCart = (cart) =>
    localStorage.setItem(CART_KEY, JSON.stringify(cart));

  // ✅ 상단 장바구니 숫자 갱신
  function updateCartBadge() {
    const cart = loadCart();
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    const badge = document.getElementById('cartCount');
    if (badge) badge.textContent = count;
  }

  // ✅ 장바구니 렌더링
  function renderCart() {
    const cart = loadCart();
    cartItemsEl.innerHTML = '';

    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p>장바구니가 비어 있습니다.</p>';
      cartTotalEl.textContent = '₩0';
      updateCartBadge();
      return;
    }

    let total = 0;
    cart.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-thumb">
        <div class="cart-info">
          <p>${item.name} (${item.size})</p>
          <p>₩${item.price.toLocaleString()} × ${item.qty}</p>
        </div>
        <button class="remove-btn" data-id="${item.id}" data-size="${item.size}">×</button>
      `;
      cartItemsEl.appendChild(div);
      total += item.price * item.qty;
    });

    cartTotalEl.textContent = `₩${total.toLocaleString()}`;

    // ✅ 삭제 버튼 이벤트 연결 (항상 최신화)
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const size = btn.dataset.size;

        let cart = loadCart();
        cart = cart.filter(i => !(i.id === id && i.size === size));
        saveCart(cart);

        renderCart();      // 다시 렌더링
        updateCartBadge(); // 숫자 갱신
      });
    });

    updateCartBadge(); // 렌더 후 숫자 갱신
  }

  // 실행
  renderCart();
  // === 계속 쇼핑하기 버튼 동작 ===
const continueShoppingBtn = document.getElementById('continueShopping');
if (continueShoppingBtn) {
  continueShoppingBtn.addEventListener('click', () => {
    window.location.href = 'index.html'; // 메인 페이지로 이동
  });
}
});