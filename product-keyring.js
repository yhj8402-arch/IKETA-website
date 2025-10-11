document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const products = {
    "k12-terra": {
      name: "Ithaca K12 Terra Brown",
      price: "₩59,000",
      image: "./images/detail/keyring1.jpg",
      thumbs: [
        "./images/detail/keyring1.jpg",
        "./images/detail/K1_thumbs1.jpg",
        "./images/detail/K1_thumbs2.jpg",
        "./images/detail/K1_thumbs3.jpg"
      ]
    },
    "k12-Thalassa": {
      name: "Ithaca K12 Thalassa Verde",
      price: "₩59,000",
      image: "./images/detail/keyring2.jpg",
      thumbs: [
        "./images/detail/keyring2.jpg",
        "./images/detail/K2_thumbs1.jpg",
        "./images/detail/K2_thumbs2.jpg",
        "./images/detail/K2_thumbs3.jpg"
      ]
    },
    "k10-Aegean": {
      name: "Ithaca K10 Aegean Blue",
      price: "₩55,000",
      image: "./images/detail/keyring3.jpg",
      thumbs: [
        "./images/detail/keyring3.jpg",
        "./images/detail/K3_thumbs1.jpg",
        "./images/detail/K3_thumbs2.jpg",
        "./images/detail/K3_thumbs3.jpg"
      ]
    },
    "k12-Helios": {
      name: "Ithaca K12 Helios Flame",
      price: "₩59,000",
      image: "./images/detail/keyring4.jpg",
      thumbs: [
        "./images/detail/keyring4.jpg",
        "./images/detail/K4_thumbs1.jpg",
        "./images/detail/K4_thumbs2.jpg",
        "./images/detail/K4_thumbs3.jpg"
      ]
    },
    "k12-Dionysus": {
      name: "Ithaca K12 Dionysus Rouge",
      price: "₩59,000",
      image: "./images/detail/keyring5.jpg",
      thumbs: [
        "./images/detail/keyring5.jpg",
        "./images/detail/K5_thumbs1.jpg",
        "./images/detail/K5_thumbs2.jpg",
        "./images/detail/K5_thumbs3.jpg"
      ]
    }
  };

  const product = products[productId];
  if (!product) return;

  // === 기본 정보 바인딩 ===
  document.querySelector(".pdp-title").textContent = product.name;
  document.querySelector(".pdp-price").textContent = product.price;

  const mainImg = document.getElementById("pdp-hero");
  const thumbs = document.querySelectorAll(".pdp-thumbs img");

  if (mainImg) mainImg.src = product.image;

  thumbs.forEach((img, i) => {
    img.src = product.thumbs[i] || product.image;
    img.dataset.full = product.thumbs[i] || product.image;
    img.addEventListener("click", () => {
      mainImg.src = img.dataset.full;
      thumbs.forEach(t => t.classList.remove("is-active"));
      img.classList.add("is-active");
    });
  });

  // === 장바구니 기능 ===
  const addCartBtn = document.getElementById("addCartBtn");
  const cartModal = document.getElementById("cartModal");
  const CART_KEY = "iketa_cart_v1";

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
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    const badge = document.getElementById("cartCount");
    if (badge) badge.textContent = count;
  };

  if (addCartBtn) {
    addCartBtn.addEventListener("click", () => {
      // 1️⃣ 모달 표시
      if (cartModal) cartModal.classList.remove("hidden");
  
      const titleEl = document.querySelector(".pdp-title");
      const priceEl = document.querySelector(".pdp-price");
      const imageEl = document.querySelector(".pdp-hero img");
  
      const name = titleEl ? titleEl.textContent.trim() : "IKETA Keyring";
      const priceText = priceEl ? priceEl.textContent.replace(/[^\d]/g, "") : "0";
      const price = parseInt(priceText, 10);
      const image = imageEl ? imageEl.src : "";
  
      const item = {
        id: name,
        name,
        price,
        image,
        qty: 1,
        size: "-",
      };
  
      let cart = loadCart();
      const existing = cart.find((p) => p.id === item.id);
      if (existing) existing.qty += 1;
      else cart.push(item);
  
      saveCart(cart);
      updateCartBadge();
  
      // 2️⃣ 1초 후 장바구니 페이지로 이동
      setTimeout(() => {
        if (cartModal) cartModal.classList.add("hidden");
        window.location.href = "cart.html";
      }, 1000);
    });
  }

  updateCartBadge();

  // === 연관상품 무작위 정렬 ===
  const relGrid = document.querySelector('.pdp-rel-grid');
  if (relGrid) {
    const cards = Array.from(relGrid.children);
    const shuffled = cards.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 4);
    relGrid.innerHTML = '';
    selected.forEach(card => relGrid.appendChild(card));
  }
});