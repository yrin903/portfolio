$(document).ready(function() {


  var key, value;
  
  function getParams() {
    var url = decodeURIComponent(location.href);
    // url이 encodeURIComponent 로 인코딩 되었을때는 다시 디코딩 해준다.
    url = decodeURIComponent(url);  //  'ex1.html?num=1'

    var params='';
    params = url.substring( url.indexOf('?')+1, url.length );   
    key = params.split("=")[0];  //'num'
    value = params.split("=")[1];  // '1'
    value = Number(value); //숫자로 변환  1
  }  
  getParams();  //함수호출
//value 변수에 넘어온 파라미터 값이 저장된다(1,2,3,4,5)

  var screenSize, screenHeight;

  function screen_size(){
      screenSize = $(window).width(); //스크린의 너비
      screenHeight = $(window).height();  //스크린의 높이

      $("#content").css('margin-top',screenHeight);
      
      if( screenSize > 768){//일반테블릿 이상의 해상도에서는
          $("#imgBG").attr('src','./images/sub'+value+'_big.png');
      }else{//소형테블릿 이하의 해상도에서는 
          $("#imgBG").attr('src','./images/sub'+value+'_small.png');
      }
  }

  screen_size();  //최초 실행시 호출
  
 $(window).resize(function(){ 
      screen_size();
  }); 
  
  $('.down').click(function(e){
    e.preventDefault();
      screenHeight = $(window).height();
      $('html,body').animate({'scrollTop':screenHeight}, 1000);
  });
  
  
});