document.addEventListener("DOMContentLoaded", () => {
  // URL 파라미터에서 제품 id 읽기
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  // 제품 데이터 (이미지 경로 전부 images 로 수정)
  const products = {
    "I6-Thalassa": {
      name: "Ithaca I6 Thalassa Verde",
      price: "₩45,000",
      image: "images/detail/bracelet1.jpg",
      thumbs: [
        "images/detail/bracelet1.jpg",
        "images/detail/thumbs1.jpg",
        "images/detail/thumbs2.jpg",
        "images/detail/thumbs3.jpg",
      ],
    },
    "I6-Aegean": {
      name: "Ithaca I6 Aegean Blue",
      price: "₩45,000",
      image: "images/detail/bracelet2.jpg",
      thumbs: [
        "images/detail/bracelet2.jpg",
        "images/detail/2_thumbs1.jpg",
        "images/detail/2_thumbs2.jpg",
        "images/detail/2_thumbs3.jpg",
      ],
    },
    "I6-Dionysus": {
      name: "Ithaca I6 Dionysus Rouge",
      price: "₩45,000",
      image: "images/detail/bracelet3.jpg",
      thumbs: [
        "images/detail/bracelet3.jpg",
        "images/detail/3_thumbs1.jpg",
        "images/detail/3_thumbs2.jpg",
        "images/detail/3_thumbs3.jpg",
      ],
    },
    "I6S-Aegean": {
      name: "Ithaca I6 Aegean Steel",
      price: "₩39,000",
      image: "images/detail/bracelet4.jpg",
      thumbs: [
        "images/detail/bracelet4.jpg",
        "images/detail/4_thumbs1.jpg",
        "images/detail/4_thumbs2.jpg",
        "images/detail/4_thumbs3.jpg",
      ],
    },
    "I6S-Obsidian": {
      name: "Ithaca I6 Obsidian Steel",
      price: "₩39,000",
      image: "images/detail/bracelet5.jpg",
      thumbs: [
        "images/detail/bracelet5.jpg",
        "images/detail/5_thumbs1.jpg",
        "images/detail/5_thumbs2.jpg",
        "images/detail/5_thumbs3.jpg",
      ],
    },
    "Helios-Flame": {
      name: "Ithaca I6S Helios Flame",
      price: "₩39,000",
      image: "images/detail/bracelet6.jpg",
      thumbs: [
        "images/detail/bracelet6.jpg",
        "images/detail/6_thumbs1.jpg",
        "images/detail/6_thumbs2.jpg",
        "images/detail/6_thumbs3.jpg",
      ],
    },
    "Thalassa-S-Verde": {
      name: "Ithaca I6S Thalassa Verde",
      price: "₩39,000",
      image: "images/detail/bracelet7.jpg",
      thumbs: [
        "images/detail/bracelet7.jpg",
        "images/detail/7_thumbs1.jpg",
        "images/detail/7_thumbs2.jpg",
        "images/detail/7_thumbs3.jpg",
      ],
    },
    "Terra-S-Brown": {
      name: "Ithaca I6S Terra Brown",
      price: "₩39,000",
      image: "images/detail/bracelet8.jpg",
      thumbs: [
        "images/detail/bracelet8.jpg",
        "images/detail/7_thumbs1.jpg",
        "images/detail/7_thumbs2.jpg",
        "images/detail/7_thumbs3.jpg",
      ],
    },
  };

  const detailSets = {
    "I6-Thalassa": [
      // 1️⃣ 브레이드 디테일 (3장)
      "./images/pdp-figure/figure-Thalassa01.jpg",
      "./images/pdp-figure/figure-Thalassa02.jpg",
      "./images/pdp-figure/figure-Thalassa03.jpg",
  
      // 2️⃣ 손목 착용 컷 (3장)
      "./images/detail/thumbs1.jpg",
      "./images/detail/thumbs2.jpg",
      "./images/detail/thumbs3.jpg",
  
      // 3️⃣ 가죽 / 스틸 디테일 (3장)
      "./images/detail/thumbs1.jpg",
      "./images/detail/thumbs2.jpg",
      "./images/detail/thumbs3.jpg",

      // 4️⃣ 패키징 이미지 (3장)
      "./images/package/Thalassa-pack01.jpg",
      "./images/package/Thalassa-pack02.jpg",
      "./images/package/Thalassa-pack03.jpg"
    ],
  };

  // 현재 페이지에 맞는 제품 데이터 찾기
  const product = products[productId];
  if (!product) return;

  // 상단 정보 반영
  const titleEl = document.querySelector(".pdp-title");
  const priceEl = document.querySelector(".pdp-price");
  const mainImg = document.getElementById("pdp-hero");
  const thumbImgs = document.querySelectorAll(".pdp-thumbs img");
  
  if (titleEl) titleEl.textContent = product.name;
  if (priceEl) priceEl.textContent = product.price;
  if (mainImg) mainImg.src = product.image;

  // 썸네일 이미지 채우기
  if (thumbImgs.length > 0) {
    thumbImgs.forEach((img, i) => {
      img.src = product.thumbs[i] || product.image;
      img.dataset.full = product.thumbs[i] || product.image;
    });
  }

  // 썸네일 클릭 시 큰 이미지 변경
  thumbImgs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      if (mainImg) {
        mainImg.src = thumb.dataset.full || thumb.src;
        thumbImgs.forEach((t) => t.classList.remove("is-active"));
        thumb.classList.add("is-active");
      }
    });
  });

  // === 검색창 ===
  const searchIcon = document.querySelector(".fa-magnifying-glass");
  const searchOverlay = document.getElementById("searchOverlay");
  const closeSearch = document.getElementById("closeSearch");

  if (searchIcon) {
    searchIcon.addEventListener("click", () => {
      searchOverlay.classList.remove("hidden");
      document.querySelector("#searchOverlay input").focus();
    });
  }
  if (closeSearch) {
    closeSearch.addEventListener("click", () => {
      searchOverlay.classList.add("hidden");
    });
  }

  // === 사이즈 선택 ===
  const sizeSelect = document.getElementById("sizeSelect");
  const selectedSizes = document.getElementById("selectedSizes");
  const addCartBtn = document.getElementById("addCartBtn");
  const buyNowBtn = document.getElementById("buyNowBtn");

  if (sizeSelect && selectedSizes) {
    sizeSelect.addEventListener("change", () => {
      const value = sizeSelect.value;
      if (!value) return;

      if (selectedSizes.querySelector(`[data-size="${value}"]`)) {
        alert(`${value}cm 사이즈는 이미 선택되었습니다.`);
        sizeSelect.value = "";
        return;
      }

      const block = document.createElement("div");
      block.className = "selected-block";
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

      const qtyInput = block.querySelector(".qty-input");
      block.querySelectorAll(".qty-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const delta = parseInt(btn.dataset.delta, 10);
          qtyInput.value = Math.max(1, parseInt(qtyInput.value) + delta);
        });
      });

      block.querySelector(".remove-btn").addEventListener("click", () => {
        block.remove();
      });

      selectedSizes.appendChild(block);
      sizeSelect.value = "";
    });
  }

  // === 장바구니 담기 ===
  if (addCartBtn) {
    addCartBtn.addEventListener("click", () => {
      const blocks = selectedSizes.querySelectorAll(".selected-block");
      if (!blocks.length) {
        alert("사이즈를 선택해주세요.");
        return;
      }

      const CART_KEY = "iketa_cart_v1";
      let cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

      // ✅ 현재 상세페이지 hero 이미지(src) 가져오기
      const heroImg = document.getElementById("pdp-hero");
      const heroSrc = heroImg
        ? new URL(heroImg.getAttribute("src"), window.location.href).href
        : "";

      blocks.forEach((block) => {
        const size = block.dataset.size;
        const qty = parseInt(block.querySelector(".qty-input").value, 10);
        const cleanPrice = product?.price
          ? parseInt(product.price.replace(/[^\d]/g, ""), 10)
          : 0;

        const newItem = {
          id: productId,
          name: product?.name || "상품명 없음",
          price: cleanPrice,
          image: heroSrc, // ✅ hero 이미지 그대로 저장
          size,
          qty,
        };

        const existing = cart.find(
          (item) => item.id === newItem.id && item.size === newItem.size
        );
        if (existing) existing.qty += newItem.qty;
        else cart.push(newItem);
      });

      localStorage.setItem(CART_KEY, JSON.stringify(cart));

      // ✅ 모달 표시 후 이동
      const modal = document.getElementById("cartModal");
      modal.classList.remove("hidden");
      setTimeout(() => {
        modal.classList.add("hidden");
        window.location.href = "cart.html";
      }, 1000);
    });
  }
  // === 바로 구매 ===
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      const blocks = selectedSizes.querySelectorAll(".selected-block");
      if (!blocks.length) {
        alert("사이즈를 선택해주세요.");
        return;
      }

      let msg = "구매 내역:\n";
      blocks.forEach((block) => {
        msg += `${block.dataset.size}cm - ${
          block.querySelector(".qty-input").value
        }개\n`;
      });
      alert(msg);
    });
  }
  const immersionSection = document.querySelector('.pdp-immersion');
  const currentSet = detailSets[productId];

if (immersionSection && currentSet) {
  const figures = immersionSection.querySelectorAll('.pdp-figure');
  
  figures.forEach((figure, index) => {
    const start = index * 3;
    const slice = currentSet.slice(start, start + 3);

    figure.innerHTML = ""; // 초기화
    slice.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "디테일 이미지";
      figure.appendChild(img);
    });
  });
}
  // === 연관상품 무작위 4개 표시 ===
  const relGrid = document.querySelector(".pdp-rel-grid");
  if (relGrid) {
    const cards = Array.from(relGrid.children);

    // 순서 섞기
    const shuffled = cards.sort(() => Math.random() - 0.5);

    // 4개만 선택
    const selected = shuffled.slice(0, 4);

    // 기존 초기화 후 다시 추가
    relGrid.innerHTML = "";
    selected.forEach((card) => relGrid.appendChild(card));
  }
});
