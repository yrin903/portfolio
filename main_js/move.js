// JavaScript Document

$(document).ready(function() {

    var timeonoff;   //타이머 처리  홍길동 정보
    var imageCount=$('.gallery ul li').size();   //이미지 총개수
    var cnt=1;   //이미지 순서 1 2 3 4 5 1 2 3 4 5....(주인공!!=>현재 이미지 순서)
    var onoff=true; // (가정법) true=>타이머 동작중 , false=>동작하지 않을때
    
    $('.btn1').css('background','#FF1A00'); //첫번째 버튼 불켜
    $('.btn1').css('width','30px'); // 버튼의 너비 증가
    
    $('.gallery .link1').fadeIn('slow'); //첫번째 이미지 보인다..
    $('.gallery .link1 .visual_text_1').delay(1300).animate({top:400, opacity:1},'slow'); 
    $('.gallery .link1 .visual_text_2').delay(1800).animate({top:480, opacity:1},'slow'); 
    // 애니메이션 후에 보여질 투명도 & 위로 올라간 높이 고쳐주기
 
    //자동기능
    function moveg(){ 
      if(cnt==imageCount+1)cnt=1;
      if(cnt==imageCount)cnt=0;  //카운트 초기화

      cnt++;  //카운트 1씩 증가.. 5가되면 다시 초기화 0  1 2 3 4 5 1 2 3 4 5..
     
    //  for(var i=1;i<=imageCount;i++){
    //         $('.gallery .link'+i).hide(); //모든 이미지를 보이지 않게.
    //  }
    
    $('.gallery li').fadeOut('slow'); //모든 이미지 안보인다.
     $('.gallery .link'+cnt).fadeIn('slow'); //자신만 이미지가 보인다..
     //$('.gallery li:eq('+(cnt-1)+')').fadeIn('slow'); //이름을 안 붙여줬을 때의 코드!!


    //  for(var i=1;i<=imageCount;i++){
    //       $('.btn'+i).css('background','#00f'); //버튼불다꺼!!
    //      $('.btn'+i).css('width','16'); // 버튼 원래의 너비
    //   }
      
      $('.mbutton').css('background','rgb(204,204,204)'); //버튼불다꺼!!
      $('.mbutton').css('width','16px'); // 버튼 원래의 너비
      $('.btn'+cnt).css('background','#FF1A00');//자신만 불켜
      $('.btn'+cnt).css('width','30px');    

      // $('.gallery li span').css('top',210).css('opacity',0); // 아래쪽 투명하게
      // $('.gallery .link'+cnt).find('span').delay(1500).animate({top:170, opacity:1},'slow');

      $('.gallery li .visual_text_1').css('top',450).css('opacity',0);
      $('.gallery li .visual_text_2').css('top',500).css('opacity',0);
      $('.gallery .link'+ cnt +' .visual_text_1').delay(1300).animate({top:400, opacity:1},'slow');
      $('.gallery .link'+ cnt +' .visual_text_2').delay(1800).animate({top:480, opacity:1},'slow');
       if(cnt==imageCount)cnt=0;  //사진이 5까지 됐으면 다시 카운트의 초기화 0 !!!!!!!!!!!!!!!!
     }
     
    timeonoff= setInterval( moveg , 4000);// (4초마다)타이머를 동작 1~5이미지를 순서대로 자동 처리
      //var 변수 = setInterval( function(){처리코드} , 4000);  //홍길동의 정보를 담아놓는다
      //clearInterval(변수); -> 살인마/사이코패스/살인청부업자

   $('.mbutton').click(function(){  //각각의 버튼 클릭시
	     //var $target=$(event.target); //클릭한 버튼 $target == $(this) (자바스크립트 앞에 $를 붙일 수 있음)
       clearInterval(timeonoff); //타이머 중지 중요!!!!!!!!!!   (한 번에 두장의 이미지가 넘어갈 수 있기 때문에)
	 
	    //  for(var i=1;i<=imageCount;i++){
	    //      $('.gallery .link'+i).hide(); //모든 이미지 안보인다.
      //    } 
	    $('.gallery li').fadeOut('slow'); //모든 이미지 안보인다.

      var ind = $(this).index('.mbutton'); // 0+1 1+1 2+1 3+1 4+1
      cnt = ind+1; // (밑에 10줄을 간단히 한 코드) 해당 버튼 클릭시 index번호 +1 -> cnt 변환
    
		  // if($(this).is('.btn1')){  //첫번째 버튼 클릭??
			// 	 cnt=1;  //클릭한 해당 카운트를 담아놓는다
		  // }else if($(this).is('.btn2')){  //두번째 버튼 클릭??
			// 	 cnt=2; 
		  // }else if($(this).is('.btn3')){ 
			// 	 cnt=3; 
		  // }else if($(this).is('.btn4')){
			// 	 cnt=4; 
		  // }else if($(this).is('.btn5')){
			// 	 cnt=5; 
		  // } 

		  $('.gallery .link'+cnt).fadeIn('slow');  //자기 자신만 이미지가 보인다
		  
		  // for(var i=1;i<=imageCount;i++){
			//   $('.btn'+i).css('background','#00f'); //버튼 모두불꺼
      //   $('.btn'+i).css('width','16');
		  // }
      $('.mbutton').css('background','rgb(204,204,204)'); //버튼 모두불꺼
      $('.mbutton').css('width','16px');
      $('.btn'+cnt).css('background','#FF1A00');//자신 버튼만 불켜 
      $('.btn'+cnt).css('width','30px');
      
      $('.gallery li .visual_text_1').css('top',450).css('opacity',0);
      $('.gallery li .visual_text_2').css('top',500).css('opacity',0);
      $('.gallery .link'+ cnt +' .visual_text_1').delay(1300).animate({top:400, opacity:1},'slow');
      $('.gallery .link'+ cnt +' .visual_text_2').delay(1800).animate({top:480, opacity:1},'slow');

      if(cnt==imageCount)cnt=0;  //카운트 초기화
     
      timeonoff= setInterval( moveg , 4000); //타이머의 부활!!!
     
      if(onoff==false){ //중지상태냐??
            onoff=true; //동작~~
            $('.ps').html('<span class="hidden">stop</span><i class="fa-regular fa-circle-stop"></i>');
      }
      
    });

	 //stop/play 버튼 클릭시 타이머 동작/중지
  $('.ps').click(function(){ 
     if(onoff==true){ // 타이머가 동작 중이냐??
	       clearInterval(timeonoff);   //살인마 고용 stop버튼 클릭시
		     $(this).html('<span class="hidden">play</span><i class="fa-regular fa-circle-play"></i>'); //js파일에서는 경로의 기준이 html파일이 기준!!
         onoff=false;   //중지상태로 변경
	   }else{  // false 타이머가 중지 상태냐??
		   timeonoff= setInterval( moveg , 4000); //play버튼 클릭시  부활
		   $(this).html('<span class="hidden">stop</span><i class="fa-regular fa-circle-stop"></i>');
		   onoff=true; //동작상태로 변경
	   }
  });	

    //왼쪽/오른쪽 버튼 처리
    $('.visual .btn').click(function(){ //왼쪽/오른쪽 버튼을 클릭하면

      clearInterval(timeonoff); //타이머를 잠깐 죽인다.

      if($(this).is('.btnRight')){ // 오른쪽 버튼 클릭
          if(cnt==imageCount)cnt=0;  //카운트가 마지막 번호(5)라면 초기화 0
          //if(cnt==imageCount+1)cnt=1;  
          cnt++; //카운트 1씩증가 1 2 3 4 5 1 ~
      }else if($(this).is('.btnLeft')){  //왼쪽 버튼 클릭
          if(cnt==1)cnt=imageCount+1;   // 1->6  최초..
          if(cnt==0)cnt=imageCount; 
          cnt--; //카운트 감소 5 4 3 2 1 5 ~ /// 6을 만들어줘야 하나 빼서 5로 시작 가능!!!
      }

    // for(var i=1;i<=imageCount;i++){
    //     $('.gallery .link'+i).hide(); //모든 이미지를 보이지 않게.
    // }
    $('.gallery li').fadeOut('slow'); //모든 이미지를 보이지 않게.
    $('.gallery .link'+cnt).fadeIn('slow'); //자신만 이미지가 보인다..
                        
    $('.mbutton').css('background','rgb(204,204,204)'); //버튼 모두불꺼
    $('.mbutton').css('width','16');
    $('.btn'+cnt).css('background','#FF1A00');//자신 버튼만 불켜 
    $('.btn'+cnt).css('width','30px');

    $('.gallery li .visual_text_1').css('top',450).css('opacity',0);
    $('.gallery li .visual_text_2').css('top',500).css('opacity',0);
    $('.gallery .link'+ cnt +' .visual_text_1').delay(1300).animate({top:400, opacity:1},'slow');
    $('.gallery .link'+ cnt +' .visual_text_2').delay(1800).animate({top:480, opacity:1},'slow');

    // if($(this).is('.btnRight')){
    //   if(cnt==imageCount)cnt=0;
    // }else if($(this).is('.btnLeft')){
    //   if(cnt==1)cnt=imageCount+1;
    // }

    timeonoff= setInterval( moveg , 4000); //부활

    if(onoff==false){ // 사용 중지 중에 강제로 눌렀을 때 타이머가 중지 상태면...
      onoff=true; // 이 코드를 사용해서 동작 상태로 만들고 밑에 코드 추가!!
      $('.ps').html('<span class="hidden">stop</span><i class="fa-regular fa-circle-stop"></i>');
    }
  });


});




