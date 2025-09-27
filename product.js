// 썸네일 → 메인 이미지 교체
document.querySelectorAll('.pdp-thumbs img').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const hero = document.getElementById('pdp-hero');
      document.querySelectorAll('.pdp-thumbs img').forEach(t => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
      hero.src = thumb.dataset.full;
      hero.alt = thumb.alt.replace('썸네일', '메인');
    });
  });
  
  // 수량 증감
  document.querySelectorAll('.pdp-qtybtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById('pdp-qty');
      const delta = parseInt(btn.dataset.delta, 10);
      const next = Math.max(1, (parseInt(input.value, 10) || 1) + delta);
      input.value = next;
    });
  });
  
  // 사이즈 칩 선택
  document.querySelectorAll('.size-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      // 필요 시: 선택값 저장 로직 추가 가능 (예: data-size 읽기)
      // const selected = btn.dataset.size;
    });
  });