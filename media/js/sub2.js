document.addEventListener('DOMContentLoaded', function() {
  // Section 1 슬라이더
  let sec1CurrentPage = 1;
  const sec1MaxPage = 3;
  const sec1Images = {
      // 각 페이지별 이미지 경로를 저장할 객체
      // 실제 이미지 경로로 교체 필요
      page1: {
          img4: './images/sub2/f4.png',
          img5: './images/sub2/f5.png',
          img8: './images/sub2/f8.png'
      },
      page2: {
          img4: './images/sub2/f4_2.png',
          img5: './images/sub2/f5_2.png',
          img8: './images/sub2/f8_2.png'
      },
      page3: {
          img4: './images/sub2/f4_3.png',
          img5: './images/sub2/f5_3.png',
          img8: './images/sub2/f8_3.png'
      }
  };

  // Section 2 슬라이더
  let sec2CurrentPage = 1;
  const sec2MaxPage = 3;
  const sec2Images = {
      // 각 페이지별 이미지 경로를 저장할 객체
      // 실제 이미지 경로로 교체 필요
      page1: {
          img10: './images/sub2/f10.png',
          img12: './images/sub2/f12.png',
          img13: './images/sub2/f13.png'
      },
      page2: {
          img10: './images/sub2/f10_2.png',
          img12: './images/sub2/f12_2.png',
          img13: './images/sub2/f13_2.png'
      },
      page3: {
          img10: './images/sub2/f10_3.png',
          img12: './images/sub2/f12_3.png',
          img13: './images/sub2/f13_3.png'
      }
  };

  // Section 1 이미지 변경 함수
  function updateSec1Images() {
      const images = sec1Images[`page${sec1CurrentPage}`];
      document.querySelector('.sec1_4 img').src = images.img4;
      document.querySelector('.sec1_5 img').src = images.img5;
      document.querySelector('.sec1_9 img').src = images.img8;
      document.querySelector('.sec1_8 .page-number').textContent = 
          `${String(sec1CurrentPage).padStart(2, '0')}/${String(sec1MaxPage).padStart(2, '0')}`;
  }

  // Section 2 이미지 변경 함수
  function updateSec2Images() {
      const images = sec2Images[`page${sec2CurrentPage}`];
      document.querySelector('.sec2_3 img').src = images.img10;
      document.querySelector('.sec2_5 img').src = images.img12;
      document.querySelector('.sec2_6 img').src = images.img13;
      document.querySelector('.sec2_2 .page-number').textContent = 
          `${String(sec2CurrentPage).padStart(2, '0')}/${String(sec2MaxPage).padStart(2, '0')}`;
  }

  // Section 1 버튼 이벤트
  document.querySelector('.prev-sec1').addEventListener('click', () => {
      sec1CurrentPage = sec1CurrentPage > 1 ? sec1CurrentPage - 1 : sec1MaxPage;
      updateSec1Images();
  });

  document.querySelector('.next-sec1').addEventListener('click', () => {
      sec1CurrentPage = sec1CurrentPage < sec1MaxPage ? sec1CurrentPage + 1 : 1;
      updateSec1Images();
  });

  // Section 2 버튼 이벤트
  document.querySelector('.prev-sec2').addEventListener('click', () => {
      sec2CurrentPage = sec2CurrentPage > 1 ? sec2CurrentPage - 1 : sec2MaxPage;
      updateSec2Images();
  });

  document.querySelector('.next-sec2').addEventListener('click', () => {
      sec2CurrentPage = sec2CurrentPage < sec2MaxPage ? sec2CurrentPage + 1 : 1;
      updateSec2Images();
  });
});

   //겔러리 효과
    // $('li').hover(function(){
    //   $('li img').css('filter','grayscale(100%)');
    //   $(this).find('img').css('filter','grayscale(0)');
    // },function(){
    //   $('li img').css('filter','grayscale(0)');
    // });
