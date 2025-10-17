$('#total_btn').click(function(e){
    e.preventDefault();
    var pname = $('#total_title').val();  //베이스
    if(pname){  //검색어를 입력했으면...
      location.href = './sub1/sub1_4.html?pname='+  pname;
    }
     else{   //검색어를 입력하지 않았다면...
       alert('찾으시는 상품을 입력하세요');
     }
 });