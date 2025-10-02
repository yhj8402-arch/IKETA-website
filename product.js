document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('pdp-hero');
  const thumbs = document.querySelectorAll('.pdp-thumbs img');

  // === 썸네일 클릭 시 메인 이미지 변경 ===
  if (hero && thumbs.length) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        hero.src = thumb.dataset.full;
        thumbs.forEach(t => t.classList.remove('is-active'));
        thumb.classList.add('is-active');
      });
    });
  }

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

  // === 사이즈 선택 (여러 개 가능, 블록 생성) ===
  const sizeSelect = document.getElementById('sizeSelect');
  const selectedSizes = document.getElementById('selectedSizes');
  const addCartBtn = document.getElementById('addCartBtn');
  const buyNowBtn = document.getElementById('buyNowBtn');

  if (sizeSelect) {
    sizeSelect.addEventListener('change', () => {
      const value = sizeSelect.value;
      if (!value) return;

      // 이미 선택된 사이즈면 중복 방지
      if (selectedSizes.querySelector(`[data-size="${value}"]`)) {
        alert(`${value}cm 사이즈는 이미 선택되었습니다.`);
        sizeSelect.value = "";
        return;
      }

      // ✅ 블록 생성
      const block = document.createElement('div');
      block.className = 'selected-block';
      block.dataset.size = value;
      block.innerHTML = `
        <span>${value}cm</span>
        <div class="qty-box">
          <button class="qty-btn" data-delta="-1">-</button>
          <input type="number" value="1" min="1" class="qty-input" readonly>
          <button class="qty-btn" data-delta="1">+</button>
        </div>
        <button class="remove-btn">&times;</button>
      `;

      // 수량 조절
      const qtyInput = block.querySelector('.qty-input');
      block.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const delta = parseInt(btn.dataset.delta, 10);
          let newQty = Math.max(1, parseInt(qtyInput.value) + delta);
          qtyInput.value = newQty;
        });
      });

      // 삭제 버튼
      block.querySelector('.remove-btn').addEventListener('click', () => {
        block.remove();
      });

      selectedSizes.appendChild(block);
      sizeSelect.value = "";
    });
  }

  // === 장바구니 담기 (모든 블록 담기) ===
  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      const blocks = selectedSizes.querySelectorAll('.selected-block');
      if (!blocks.length) {
        alert("사이즈를 선택해주세요.");
        return;
      }

      blocks.forEach(block => {
        const size = block.dataset.size;
        const qty = parseInt(block.querySelector('.qty-input').value, 10);

        window.IKETA.addToCart({
          id: "S6-BLUE-" + size,
          name: "Steel 6 Line - Blue",
          price: 49000,
          size: size,
          qty: qty,
          img: document.getElementById('pdp-hero')?.src || ''
        });
      });

      // ✅ 모달 표시 후 이동
      const modal = document.getElementById('cartModal');
      modal.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.add('hidden');
        window.location.href = 'cart.html';
      }, 2000);
    });
  }

  // === 바로 구매 ===
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      const blocks = selectedSizes.querySelectorAll('.selected-block');
      if (!blocks.length) {
        alert("사이즈를 선택해주세요.");
        return;
      }

      let msg = "구매 내역:\n";
      blocks.forEach(block => {
        msg += `${block.dataset.size}cm - ${block.querySelector('.qty-input').value}개\n`;
      });
      alert(msg);
    });
  }
});