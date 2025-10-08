document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
  
    const products = {
      "k12-terra": {
        name: "Ithaca K12 Terra Brown",
        price: "₩59,000",
        image: "./images/detail/bracelet6.jpg",
        thumbs: [
          "./images/detail/bracelet6.jpg",
          "./images/detail/6_thumbs1.jpg",
          "./images/detail/6_thumbs2.jpg",
          "./images/detail/6_thumbs3.jpg"
        ]
      },
      "k12-black": {
        name: "Ithaca K12 Obsidian Black",
        price: "₩35,000",
        image: "./images/detail/keyring2.jpg",
        thumbs: [
          "./images/detail/keyring2.jpg",
          "./images/detail/keyring2-2.jpg",
          "./images/detail/keyring2-3.jpg",
          "./images/detail/keyring2-4.jpg"
        ]
      }
    };
  
    const product = products[productId];
    if (!product) return;
  
    // 이름 / 가격 / 이미지 교체
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
  });