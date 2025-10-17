$(document).ready(function(){
     
    
        var timeonoff;
        var imageCount=3;  
        var cnt=1;		
	
         $('.eventSlideMenu ul li:eq(0) dt').css('transform','rotate(0deg)');

        function move_gallery(){
	         cnt++;

            $('.eventSlideMenu ul li').removeClass('current');
            $('.eventSlideMenu ul li:eq('+ (cnt-1) +')').addClass('current'); 
            $('.eventSlideMenu ul li dt').css('transform','rotate(90deg)');
            $('.eventSlideMenu ul li:eq('+ (cnt-1) +') dt').css('transform','rotate(0deg)');

            if(cnt==1){
            // 80 / 10 / 10  (left: 0 / 80 / 90)
            $('.eventSlideMenu .img01').stop(true).animate({ left:["0%","easeOutQuad"],  width:["80%","easeOutQuad"] },450);
            $('.eventSlideMenu .img02').stop(true).animate({ left:["80%","easeOutQuad"], width:["10%","easeOutQuad"] },450);
            $('.eventSlideMenu .img03').stop(true).animate({ left:["90%","easeOutQuad"], width:["10%","easeOutQuad"] },450);

            }else if(cnt==2){
            // 10 / 80 / 10  (left: 0 / 10 / 90)
            $('.eventSlideMenu .img01').stop(true).animate({ left:["0%","easeOutQuad"],  width:["10%","easeOutQuad"] },450);
            $('.eventSlideMenu .img02').stop(true).animate({ left:["10%","easeOutQuad"], width:["80%","easeOutQuad"] },450);
            $('.eventSlideMenu .img03').stop(true).animate({ left:["90%","easeOutQuad"], width:["10%","easeOutQuad"] },450);

            }else if(cnt==3){
            // 10 / 10 / 80  (left: 0 / 10 / 20)
            $('.eventSlideMenu .img01').stop(true).animate({ left:["0%","easeOutQuad"],  width:["10%","easeOutQuad"] },450);
            $('.eventSlideMenu .img02').stop(true).animate({ left:["10%","easeOutQuad"], width:["10%","easeOutQuad"] },450);
            $('.eventSlideMenu .img03').stop(true).animate({ left:["20%","easeOutQuad"], width:["80%","easeOutQuad"] },450);
            }
	  
	          if(cnt==imageCount)cnt=0;
       }
	
      timeonoff= setInterval(move_gallery, 4000);
    
    $('.eventSlideMenu ul li:eq(0)').addClass('current');  

    $('.eventSlideMenu ul li span').mouseenter(function(event){
       var $target=$(event.target);  // var $target = $(this)

     clearInterval(timeonoff);
     $('.eventSlideMenu ul li').removeClass('current');
        $(this).parent().addClass('current');   

        if($target.is('.buttonMenu01')){      // 1번 활성
        $('.eventSlideMenu .img01').stop(true).animate({ left:["0%","easeOutQuad"],  width:["80%","easeOutQuad"] },450);
        $('.eventSlideMenu .img02').stop(true).animate({ left:["80%","easeOutQuad"], width:["10%","easeOutQuad"] },450);
        $('.eventSlideMenu .img03').stop(true).animate({ left:["90%","easeOutQuad"], width:["10%","easeOutQuad"] },450);
        cnt=1;

        }else if($target.is('.buttonMenu02')){ // 2번 활성
        $('.eventSlideMenu .img01').stop(true).animate({ left:["0%","easeOutQuad"],  width:["10%","easeOutQuad"] },450);
        $('.eventSlideMenu .img02').stop(true).animate({ left:["10%","easeOutQuad"], width:["80%","easeOutQuad"] },450);
        $('.eventSlideMenu .img03').stop(true).animate({ left:["90%","easeOutQuad"], width:["10%","easeOutQuad"] },450);
        cnt=2;

        }else if($target.is('.buttonMenu03')){ // 3번 활성
        $('.eventSlideMenu .img01').stop(true).animate({ left:["0%","easeOutQuad"],  width:["10%","easeOutQuad"] },450);
        $('.eventSlideMenu .img02').stop(true).animate({ left:["10%","easeOutQuad"], width:["10%","easeOutQuad"] },450);
        $('.eventSlideMenu .img03').stop(true).animate({ left:["20%","easeOutQuad"], width:["80%","easeOutQuad"] },450);
        cnt=3;
        }

         $('.eventSlideMenu ul li dt').css('transform','rotate(90deg)');
         $('.eventSlideMenu ul li:eq('+ (cnt-1) +') dt').css('transform','rotate(0deg)');


       //timeonoff= setInterval(move_gallery, 4000);  //부활~~
    });
 });