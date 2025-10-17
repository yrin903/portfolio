var swiper1 = new Swiper('.swiper1', {
      //effect: 'coverflow', //살짝 회전
      grabCursor: true, //아이콘 손모양 변경
      centeredSlides: true, //정가운데에 포진이 된다
      slidesPerView: 'auto', //너비고정
      loop: true, //무한 슬라이드
      // coverflowEffect: {
      //   rotate: -20,
      //   stretch: 0,
      //   depth: 300,
      //   modifier: 1,
      //   slideShadows : false,
      // },
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });

    var gdata = [
      {'title':'동서 보리차'},
      {'title':'동서 현미녹차'},
      {'title':'맥심 모카골드 마일드'},
      {'title':'맥심 모카골드 제로슈거'},
      {'title':'맥심 슈프림골드'},
      {'title':'카누 마일드 로스트 아메리카노'},
      {'title':'맥심 티오피 스위트 아메리카노'},
      {'title':'카누 라떼'},
      {'title':'오레오 화이트크림'},
      {'title':'오레오 초코크림'},
      {'title':'리츠 크래커'},
      {'title':'미떼 핫초코 마일드'},
      {'title':'제티'},
      {'title':'티오 아이스티 레몬'},
      {'title':'티오 아이스티 복숭아'},
      {'title':'포스트 콘푸라이트'},
      {'title':'포스트 오레오오즈'},
      {'title':'포스트 오곡 코코볼'},
      {'title':'포스트 그래놀라 카카오호두'}
    ];
    var text = document.getElementById('text');
    var output ='';

    output +='<dl>';
    output +='<dt>'+ gdata[0].title +'</dt>';
    output +='</dt>';  
    text.innerHTML = output;

    $('.swiper1 .swiper-slide-active').css('transform','scale(1.3)');

    swiper1.on('transitionEnd', function() { //스와이퍼시 슬라이드 움직임이 완료
        console.log(swiper1.realIndex);
        var sind = swiper1.realIndex;  // 0~9 스와이퍼 시 인덱스 번호 추출_
        
        output ='<dl>';
        output +='<dt>'+ gdata[sind].title +'</dt>';
        output +='</dt>';  
        text.innerHTML = output;

        $('.swiper1 li').css('transform','scale(.8)');
        $('.swiper1 .swiper-slide-active').css('transform','scale(1.3)');
    });

    //년도 카운터 만들기

    var memberCountConTxt=1968; 
    var ytop = $(".company_year").offset().top-600;
    var onoff2 = false; 

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
    }

    $(window).on('scroll',function(){     //스크롤의 거리가 발생하면
      var scroll = $(window).scrollTop();   //스크롤의 top쪽 거리

      if(scroll>=ytop && onoff2 == false){

        $({ val : 0 }).animate({ val : memberCountConTxt }, {
          duration: 2000,
           step: function() {
             var number = numberWithCommas(Math.floor(this.val));
             $(".company_year").text(number);
           },
           complete: function() {
             var number = numberWithCommas(Math.floor(this.val));
             $(".company_year").text(number);
           }
         });
         onoff2 = true;
      }
    });



    //뉴스 스와이퍼

    var swiper2 = new Swiper('.swiper2', {
      //autoHeight: true, //높이유동  ( .swiper-container에 height:auto)
      slidesPerView: 'auto',  //단수
      spaceBetween:0,  //단사이 여백
      loop: true,  //무한 loop
      grabCursor: true,
      //freeMode: true,  //터치 만큼 자유롭게 이동
      //centeredSlides: true, //센터 슬라이드 위치(만약 단수가 2개이면 양쪽은 반반씩 보임)
      //effect: 'fade',   //페이드효과(단수가 1단이 된다)
      //effect: 'flip',  //3D 회전효과(단수가 1단이 된다)
     
      autoplay: {  //자동
        delay: 3000,
        disableOnInteraction: false
      },
    
    });

    $('#btn').click(function(e){
        e.preventDefault();

        var pname = $('#title').val();  //베이스
        if(pname){  //검색어를 입력했으면...
          location.href = './sub1/sub1_4.html?pname='+  pname;
        }
        else{   //검색어를 입력하지 않았다면...
          alert('검색어를 입력하세요');
        }             
  });

     