$(window).on('scroll',function(){ //스크롤 값의 변화가 생기면

    var scroll = $(window).scrollTop(); //스크롤의 거리

    var win_height =$(window).height();

    var header_height =$('header').height();

   

    if(scroll>win_height){ //300이상의 거리가 발생되면

        $('.top_move').fadeIn('slow');  //top보여라~~~~

    }else{

        $('.top_move').fadeOut('fast');//top안보여라~~~~

    }


    if(scroll>win_height-header_height){ //300이상의 거리가 발생되면

        $('header').css('background','#000');  //top보여라~~~~

        $('header').css('border-bottom','2px solid #333');  

    }else{

        $('header').css('background','transparent');//top안보여라~~~~

        $('header').css('border-bottom','2px solid transparent');  

    }

});


$('.top_move').click(function(e){

    e.preventDefault();

     //상단으로 스르륵 이동합니다.

    $("html,body").stop().animate({"scrollTop":0},1000); 

 });

 $(document).ready(function() {

   var onoff = false; //false(메뉴닫힘) true(메뉴열림)
   $(".menuOpen").click(function(e){
      e.preventDefault();
      if(onoff == false){
        $("#gnb").slideDown('slow');
        $('#headerArea').addClass('mn_open');//메뉴모양변경
        onoff = true;
      }else{
        $("#gnb").slideUp('fast');
        $('#headerArea').removeClass('mn_open');
        onoff = false;
      }
   });

  //  네비높이 맞추기(페이지 로딩시 1회)
  var screenSize = $(window).width();
  var winh =  $(document).height();

  if( screenSize > 1031){
    $("#gnb").height('auto');
  }else{
    $("#gnb").height(winh);
  }
  
  var current=0; // 0(해상도가 모바일), 1(소형테블릿이상)

   $(window).resize(function(){ 
      var screenSize = $(window).width();  //가로 해상도
      if( screenSize > 1031){  //소형테블릿 이상이면
        $("#gnb").show();
        $("#gnb").height('auto');
		    current=1; //소형테블릿이상
      }
      if(current==1 && screenSize <= 1031){
        $("#gnb").hide();
        $("#gnb").height(winh);
        $('#headerArea').removeClass('mn_open');
         current=0; //모바일
      }
    }); 
    
  });