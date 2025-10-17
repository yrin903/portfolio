// 비주얼 스와이퍼 영역
var swiper1 = new Swiper('.swiper1', {
      autoHeight: true, //높이유동  ( .swiper-container에 height:auto)
      slidesPerView: 1,  //단수
      spaceBetween: 0,  //단사이 여백
      loop: true,  //무한 loop
      //freeMode: true,  //터치 만큼 자유롭게 이동
      //centeredSlides: true, //센터 슬라이드 위치(만약 단수가 2개이면 양쪽은 반반씩 보임)
      //effect: 'fade',   //페이드효과(단수가 1단이 된다)
      //effect: 'flip',  //3D 회전효과(단수가 1단이 된다)
      // navigation: {    //이전/다음 버튼
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
      pagination: {   //페이지 네이션
        el: '.pagination_visual',
        //dynamicBullets: true, //개수가 많을 때 사용
        clickable: true,
        //type: 'fraction'   //  현재/총개수 (페이지네이션블릿은 사라진다)
      },
      autoplay: {  //자동
        delay: 4000,
        disableOnInteraction: false
      },
      //scrollbar: {  //하단 스크롤바
        //el: '.swiper-scrollbar',
       // hide: true
      //}
    });

    var swiper2 = new Swiper('.swiper2', {
      autoHeight: false, //높이유동  ( .swiper-container에 height:auto)
      slidesPerView: 1,  //단수
      spaceBetween: 0,  //단사이 여백
      loop: true,  //무한 loop
      //freeMode: true,  //터치 만큼 자유롭게 이동
      //centeredSlides: true, //센터 슬라이드 위치(만약 단수가 2개이면 양쪽은 반반씩 보임)
      //effect: 'fade',   //페이드효과(단수가 1단이 된다)
      //effect: 'flip',  //3D 회전효과(단수가 1단이 된다)
      navigation: {    //이전/다음 버튼
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {   //페이지 네이션
        el: '.pagination_about',
        //dynamicBullets: true, //개수가 많을 때 사용
        clickable: true,
        //type: 'fraction'   //  현재/총개수 (페이지네이션블릿은 사라진다)
      },
      autoplay: {  //자동
        delay: 4000,
        disableOnInteraction: false
      },
      //scrollbar: {  //하단 스크롤바
        //el: '.swiper-scrollbar',
       // hide: true
      //}
    });

    var swiper3 = new Swiper('.swiper3', {
      spaceBetween: 0,
      slidesPerView: 1,
      centeredSlides: true,
      pagination: {
        el: '.swiper3 .swiper-pagination',  // 명확한 셀렉터 지정
        clickable: true,
      },
    });