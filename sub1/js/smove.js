//해당 연도로 부드럽게 이동하는 코드

$('.history_menu li a').click(function(e){//각각의 년도 버튼을 클릭하면 
    e.preventDefault();

    var target_value=0;

    if($(this).hasClass('m1')){ //첫번째 버튼 클릭시
        var target_value= 1500;
    }else if($(this).hasClass('m2')){
        var target_value= 4600;
    }else if($(this).hasClass('m3')){
        var target_value=8950;
    }else if($(this).hasClass('m4')){
        var target_value=13900;
    }else if($(this).hasClass('m5')){
        var target_value=13900;
    }

    $("html,body").stop().animate({"scrollTop":target_value},1000)
});

$(window).on('scroll',function(){
    var scroll = $(window).scrollTop();
    //console.log(scroll);
    //현재 - 1500
    //2019 - 4600
    //2010 - 8952
    //13000
    //13900
})