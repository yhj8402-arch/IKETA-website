document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('pdp-hero');
  const thumbs = document.querySelectorAll('.pdp-thumbs img');

  if (hero && thumbs.length) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        hero.src = thumb.dataset.full;
        thumbs.forEach(t => t.classList.remove('is-active'));
        thumb.classList.add('is-active');
      });
    });
  }
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
  let selectedSize = null;
  let quantity = 1;

  const sizeBtns = document.querySelectorAll('.size-btn');
  if (!sizeBtns.length) return; // 상세페이지 아닐 경우 종료

  const qtyInput = document.getElementById('pdp-qty');
  const qtyBtns = document.querySelectorAll('.pdp-qtybtn');
  const addCartBtn = document.getElementById('addCartBtn');
  const buyNowBtn = document.getElementById('buyNowBtn');

  // 사이즈 선택
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedSize = btn.dataset.size;

      qtyInput.disabled = false;
      addCartBtn.disabled = false;
      buyNowBtn.disabled = false;
    });
  });

    const sizeHelpBtn = document.getElementById('sizeHelpBtn');
    const sizeHelpModal = document.getElementById('sizeHelpModal');
    const closeSizeHelp = document.getElementById('closeSizeHelp');
  
    if (sizeHelpBtn) {
      sizeHelpBtn.addEventListener('click', () => {
        sizeHelpModal.classList.remove('hidden');
      });
    }
    if (closeSizeHelp) {
      closeSizeHelp.addEventListener('click', () => {
        sizeHelpModal.classList.add('hidden');
      });
    }
  
  // 수량 증감
  qtyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (qtyInput.disabled) return;
      const delta = parseInt(btn.dataset.delta, 10);
      quantity = Math.max(1, quantity + delta);
      qtyInput.value = quantity;
    });
  });

  // 장바구니 담기
  addCartBtn.addEventListener('click', () => {
    if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
      return;
    }
    window.IKETA.addToCart({
      id: "S6-BLUE"  + Date.now(),
      name: "Sjkhkhke",
      price: 49000,
      size: selectedSize,
      qty: quantity,
      img: "./images/detail/bracelet1.jpg" 
    });
    // ✅ 모달 표시
    const modal = document.getElementById('cartModal');
    modal.classList.remove('hidden');
    // ✅ 2초 뒤 장바구니 페이지 이동
    setTimeout(() => {
      modal.classList.add('hidden');
      window.location.href = 'cart.html';
    }, 2000);
  });

  // 바로 구매
  buyNowBtn.addEventListener('click', () => {
    if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
      return;
    }
    alert(`${selectedSize} 사이즈, ${quantity}개 바로 구매 진행`);
  });
});