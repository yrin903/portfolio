 $(document).ready(function(){
     
      $('.openBtn').on('click', function(e){ //썸네일 버튼 클릭하면
          e.preventDefault();
          
          $(this).next('.big').fadeIn('slow');//클릭한 썸네일의 해당하는 파업을 열어라
          $('.box').show(); //반투명 박스를 보여라 
      });
     
     $('.closeBtn, .box').on('click', function(e){ //닫기버튼이나 반투명 박스를 클릭하면
          e.preventDefault();

          $('.big').fadeOut('fast'); 
          $('.box').hide();
     });
 });

