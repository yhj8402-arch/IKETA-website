// script.js — 견고한 히어로 슬라이더
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return; // 섹션이 없으면 아무 것도 안 함
  
    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (slides.length === 0) return; // 슬라이드 없으면 종료
  
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const dotsBox = slider.querySelector('.dots');
  
    let index = 0;
    let timer = null;
    let dots = [];
  
    // 도트 생성 (없으면 자동 생성)
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
  
      // 이벤트 위임
      box.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const i = Number(btn.dataset.index || 0);
        go(i);
      }, { passive: true });
    }
  
    function update() {
      slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
      if (dots.length) {
        dots.forEach((d, i) => d.setAttribute('aria-selected', i === index ? 'true' : 'false'));
      }
      // 슬라이드가 1개면 화살표 숨김
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
      if (timer) { clearInterval(timer); timer = null; }
    }
  
    // 화살표 이벤트 (있을 때만)
    if (prevBtn) prevBtn.addEventListener('click', () => go(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => go(index + 1));
  
    // 마우스 올리면 정지 / 떼면 재생
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);
  
    // 초기화
    buildDots();
    update();
    startAuto();
  });