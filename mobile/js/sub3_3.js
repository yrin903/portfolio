var swiper = new Swiper('.swiper1', {
            autoHeight: false,
            slidesPerView: 1,
            loop: true,
            pagination: {   //페이지 네이션
            el: '.swiper-pagination',
            dynamicBullets: true,
            
            clickable: true,
            //type: 'fraction'   //  현재/총개수 (페이지네이션블릿은 사라진다)
      },
            pagination: {   //페이지 네이션
                    el: '.swiper-pagination',
                    //dynamicBullets: true,
                    clickable: true,
                    //type: 'fraction'   //  현재/총개수 (페이지네이션블릿은 사라진다)
            },
            spaceBetween: 30,  //단사이 여백

        });
 