// JavaScript Document

$(document).ready(function(){
    //var cnt=3;  //탭메뉴 개수 ***
    var cnt = $('.tabs .tab_menu li').size();

    $('.tabs .csr_content:eq(0)').show(); // 첫번째 탭 내용만 열어라
    $('.tabs .tab1').addClass('current'); //첫번째 탭메뉴 활성화
               //자바스크립트의 상대 경로의 기준은 => 스크립트 파일을 불러들인 html파일이 저장된 경로 기준***
      
    $('.tabs .tab').click(function(e){
          e.preventDefault();   // <a> href="#" 값을 강제로 막는다  
          
          var ind = $(this).index('.tabs .tab');  
          // 클릭시 해당 index를 뽑아준다 0 1 2 
          //console.log(ind);

          $(".tabs .csr_content").hide(); //모든 탭내용을 안보이게...
          $(".tabs .csr_content:eq("+ind+")").fadeIn('slow'); //클릭한 해당 탭내용만 보여라
          $('.tab').removeClass('current'); //모든 탭메뉴를 비활성화
          $(this).addClass('current'); // 클릭한 해당 탭메뉴만 활성화
     });


    //  $(window).on('scroll',function(){     //스크롤의 거리가 발생하면
    //     var scroll = $(window).scrollTop();   //스크롤의 top쪽 거리

    //     if(scroll>100){
    //         $(".tabs .contlist:eq(1), .tabs .contlist:eq(2)").hide();
    //         $(window).off('scroll');
    //     }
    //  });

    setTimeout(function(){
        $(".tabs .csr_content:eq(1), .tabs .csr_content:eq(2), .tabs .csr_content:eq(3), .tabs .csr_content:eq(4)").hide();
    }, 1000);


  });