//innovation
var swiper1 = new Swiper('.swiper1', {
   effect: 'coverflow',
   grabCursor: true,
   centeredSlides: true,
   slidesPerView: 'auto',
   loop: true,
   coverflowEffect: {
     rotate: -15,
     stretch: 0,
     depth: 300,
     modifier: 1,
     slideShadows : true,
   },
   pagination: {
     el: '.swiper-pagination',
   },
 });

 var gdata = [
   {'title':'reusability. affordability. future', 'desc':"Pioneering a new era of space exploration."},
   {'title':'reusability', 'desc':'Falcon 9 returns safely, lowering the cost of access to space.'},
   {'title':'precision landings', 'desc':"Autonomous drone ships enable rockets to land at sea with accuracy."},
   {'title':'starship', 'desc':'A fully reusable spacecraft designed for missions to the Moon, Mars, and beyond.'},
   {'title':'impact', 'desc':"Innovation today opens space for humanity’s future exploration."},
   ];
 var text = document.getElementById('text');
 var output ='';

 output +='<dl>';
 output +='<dt>'+ gdata[0].title +'</dt>';
 output +='<dd>'+ gdata[0].desc +'</dd>';
 output +='</dt>';  
 text.innerHTML = output;

 swiper1.on('transitionEnd', function() {
     //console.log(swiper.realIndex);
     var sind = swiper1.realIndex;  // 0~9
     
     output ='<dl>';
     output +='<dt>'+ gdata[sind].title +'</dt>';
     output +='<dd>'+ gdata[sind].desc +'</dd>';
     output +='</dt>';  
     text.innerHTML = output;
 });
 

 var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 5,
      loop: true,
      freeMode: true,
      loopedSlides: 5, //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      pagination: {
     el: '.swiper-pagination_bar',
   },
      loop:true,
      loopedSlides: 5, //looped slides should be the same
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: galleryThumbs,
      },
      
    });

    //겔러리 효과
    $('.section5 li').hover(function(){
      $('.section5 li img').css('filter','grayscale(100%)');
      $(this).find('img').css('filter','grayscale(0)');
    },function(){
      $('.section5 li img').css('filter','grayscale(0)');
    });
