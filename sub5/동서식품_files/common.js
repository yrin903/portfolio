// 전체페이지 공통js


//네비게이션 열고 닫기

//top메뉴 처리 및 헤더 배경처리(스크롤처리)
var smh=$('.visual').height(); 

 $(window).on('scroll',function(){//스크롤의 거리가 발생하면
         var scroll = $(window).scrollTop()
         //top버튼 나타나고 사라지기
        if(scroll>=smh){
            $('.top_move').fadeIn('slow');
         }else{
             $('.top_move').fadeOut('fast');
         }

         //헤더 배경처리
         if(scroll>smh-100){//스크롤이 비주얼의 높이-header높이 까지 내리면
                $('#headerArea').css('background','rgba(255,255,255').css('border-bottom','1px solid #ccc');

         }else{//스크롤 내리기 전 디폴트(마우스올리지않음)
                $('#headerArea').css('background','rgba(255,255,255,0.4').css('border-bottom','none');
               // $('.dropdownmenu li a').css('color','#fff');
         };         

 });

$('.top_move').click(function(e){
   e.preventDefault();
   $('html,body').stop().animate({'scrollTop':0}, 1000); //상단으로 부드럽게 스크롤을 이동
});