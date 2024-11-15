const swiper = new Swiper(".swiper", {
    loop: true, // ループ有効
    slidesPerView: 5, // 一度に表示する枚数
    speed: 6000, // ループの時間
    allowTouchMove: false, // スワイプ無効
    autoplay: {
      delay: 0, // 途切れなくループ
    },
    slidesPerView: 1,
    breakpoints: {
      // スライドの表示枚数：500px以上の場合
      500: {
        slidesPerView: 3,
      }
    },
    
    
  });