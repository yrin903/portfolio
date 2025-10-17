$(function(){
    //'./product.html?pname=베이스'
    var key, value;
  
    function getParams() {
   
    // 현재 페이지의 url   ./product.html?pname=베이스
    var url = decodeURIComponent(location.href);
    // url이 encodeURIComponent 로 인코딩 되었을때는 다시 디코딩 해준다.
    url = decodeURIComponent(url);  //  'ex2.html?num=1'
 
    var params='';
    // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
    params = url.substring( url.indexOf('?')+1, url.length );   // 'abcdefg'.substring(2,40);=> 'cdef'
    // '문자열'.substring(시작인덱스 , 자를개수) 
    // 'abcdefg'.substring(2 , 3) ->  'cde'
    // params = 'pname=베이스' 
    
    key = params.split("=")[0];  //'key=pname'
    value = params.split("=")[1];  // 'value=베이스'
    }   
    getParams();  //함수호출



   //ajax 처리

   $.ajax({
       url: './data/sam.json',
       dataType: 'json',
       success: function(data){ //js파일에 연결이 완료되면 자동으로 호출되는 함수
            //data 메개변수 -> json파일에 있는 모든 객체배열이 자동 저장된다.
           var useData = data.sam; // 이건 sam.json에서 준 이름이랑 똑같음 !!!!!! 모든 객체배열이 담겨져 있기 때문!!!
                 
           function dataPrint(arr){ //검색된 또는 전체 상품리스트를 출력
                //arr = useData(전체상품) / newArray(검색된 상품)
               
                   var txt = '<ul>';
                   
                   for(var i in arr){
                       
                       var $Name = arr[i].Name;
                       //var $Price = arr[i].Price;
                      // var $Descript = arr[i].Descript;
                       var $Image = arr[i].Image;

                       txt+='<li>';
                       txt+='<img src="'+ $Image +'" alt="">';
                       txt+='<span>'+$Name+'</span>'; 
                    //    txt+='<dl>';
                    //    txt+='<dt>'+$Name+'</dt>'; 
                    //    txt+='<dd>'+$kcal+'kcal</dd>';
                    //    txt+='<dd>'+$Descript+'</dd>';
                    //    txt+='</dl>';
                       txt+='<a href="#" class="pop_open">more</a>'; //팝업창 열기 태그 추가
                       txt +='</li>';
                   }

                   txt += '</ul>';

                   $('.product_list').html(txt);
              
           };
           
           var newArray = []; //검색된 상품을 담기위한 배열
           var search_on =false;  
           //검색어가 넘어오지 않았을 때 false , 검색어가 넘어왔을 때 true
           //초기실행, 함수호출
            
           if(value){
                //다른페이지에서 검색어 입력을 하였을때...
                newArray = useData.filter(function(element){
                    return element.Name.includes(value);//상품
                });
                //newArray -> 검색된 상품만 배열에 담겨있다
                //console.log(newArray);

                if(newArray.length!=0){ //검색된 상품의 길이가 0이 아니다  -> 검색된 상품이 배열에 있으면 ..
                  dataPrint(newArray);
                }else{ //검색된 상품이 배열에 없으면..
                    $('.product_list').html('<span style="display:block;text-align:center; font-size:30px; color:red">검색된 상품이 없습니다</span>');
                }
                search_on =true; //검색어가 넘어왔다
           }else{ //다름 페이지에서 검색어가 넘어오지 않았을 때
                dataPrint(useData); //전체상품을 다 출력~~
                search_on =false; //검색어가 넘어오지 않았다
           }
           

           //검색버튼을 클릭했을때...
           $('#btn').click(function(e){
                e.preventDefault();

                if($('#title').val()){//검색어가 있으면
                        newArray = useData.filter(function(element){
                        //console.log($('#title').val());
                        //return element.Name == $('#title').val();
                        return element.Name.includes($('#title').val());
                    });
                    //console.log(newArray);
                    if(newArray.length!=0){
                        dataPrint(newArray);
                    }else{
                        $('.product_list').html('<span style="display:block;text-align:center; font-size:30px; color:red">검색된 상품이 없습니다</span>');
                    }
                    search_on =true; //검색어를 입력했다.
                    $('#title').val('');
                }else{//검색어가 없으면
                    alert('찾으시는 상품을 입력하세요');
                }
                
           });

           $('.btn_all').click(function(e){  //모두보기 클릭시
                e.preventDefault();
               dataPrint(useData);
               search_on =false; //검색어가 입력되지 않았다
           });

        //팝업처리 함수
        var pop_txt="";
        function popchange(obj){ //obj-> 클릭한 제품에 대한 객체만 전달
            pop_txt=""; //이전에 만들어진 팝업에 삽입될 태그를 초기화(이전에 태그를 다 삭제해라)
            pop_txt+='<img src="'+ obj.pop_img +'" alt="">';
            pop_txt+='<dl>';
            pop_txt+='<dt>'+ obj.Name +'</dt>';
            pop_txt+='<dd>열량 : '+ obj.kcal +'kcal</dd>';
            pop_txt+='<dd>'+ obj.pop_tit +'</dd>';
            pop_txt+='</dl>';
            $('.modal_box .pop_con').html(pop_txt);
        }
      
        //팝업창 열기
        //$('.pop_open')는 계속해서 재랜더링이 되어 만들어지기 때문에
        //$('.pop_open')에 직접 이벤트를 연결하면 처리되지 않은다.
        $(document).on('click', '.pop_open', function(e) {//json 파일을 불러와서 dom을 새로만들때... <a> 태그가 처리되지 않을때..
            e.preventDefault();
            $('.product .modal_box').fadeIn('slow'); //팝업창 열기
            ind = $(this).index('.pop_open'); //0 1 2 3 4 5 6 7
      
            if(search_on==false){//검색 안되었을때
                popchange(useData[ind]); //전체 객체 배열에서 클릭한 인덱스에 해당하는 객체를 전달
            }else if(search_on==true){//검색 되었을때
                popchange(newArray[ind]); //검색된 객체배열에서 클릭한 인델스에 해당하는 객체를 전달
            }
        });

        //팝업창 닫기
        $('.close_pop, .modal_box').click(function(e){  //모두보기 클릭시
            e.preventDefault();
            $('.product .modal_box').fadeOut('fast');
        });


            
       } 
   });
    
});