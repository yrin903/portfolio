
        var ymenuh = $('.slideMenu').height();
        var y2025 = $('.year1').offset().top-ymenuh*2-110; // 알아서 위쪽 공간에 계산이 됨
        var y2019 = $('.year2').offset().top-ymenuh*2-113;
        var y2010 = $('.year3').offset().top-ymenuh*2-143;
        var y1999 = $('.year4').offset().top-ymenuh*2-100;
        var y1979 = $('.year5').offset().top-ymenuh*2-107;

        console.log(ymenuh);
        
        

        $('.history_menu li a').click(function(e){
            e.preventDefault();
            var ytarget = 0;
            if($(this).hasClass('m1')){ //첫번째 클릭
                ytarget = y2025;
            }else if($(this).hasClass('m2')){
                ytarget = y2019;
            }else if($(this).hasClass('m3')){
                ytarget = y2010;
            }else if($(this).hasClass('m4')){
                ytarget = y1999;
            }else if($(this).hasClass('m5')){
                ytarget = y1979;
            }

            $('html,body').stop().animate({'scrollTop':ytarget},'slow'); //부드럽게
        });


        $(window).on('scroll', function(){
            var scroll =$(window).scrollTop();
            console.log(scroll);

            if(scroll>=1300){
                $('header').hide();
                $('#content .slideMenu .history_menu').addClass('fix');
            }else{
                $('header').show();
                $('#content .slideMenu .history_menu').removeClass('fix');
            }

            $('.history_menu li a').removeClass('spy');

            if(scroll>=y2025 && scroll<y2019){
                $('.history_menu li:eq(0) a').addClass('spy');
            }else if(scroll>=y2019 && scroll<y2010){
                $('.history_menu li:eq(1) a').addClass('spy');
            }else if(scroll>=y2010 && scroll<y1999){
                $('.history_menu li:eq(2) a').addClass('spy');
            }else if(scroll>=y1999 && scroll<y1979){
                $('.history_menu li:eq(3) a').addClass('spy');
            }else if(scroll>=y1979){
                $('.history_menu li:eq(4) a').addClass('spy');
            }
        });
