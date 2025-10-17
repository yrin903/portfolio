var swiper1 = new Swiper('.swiper1', {
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: false,
      shadowOffset: 50,
      shadowScale: 0.45,
    },
  
    pagination: {
      el: '.swiper-pagination',
    },
  });
  var gdata = [ 
    {'title':'Consumer', 'engtitle':'소비자','bsDd':'상품 및 서비스의 선택기준이 되는 정보를 제공받고, <br> 인증기업과 소비자문제 발생시 CCM 운영 체계에 따라 신속하고 합리적인 해결이 가능합니다.'},
    {'title':'Company', 'engtitle':'기업','bsDd':'CEO와 임직원의 소비자 권익에 대한 인식을 제고하고, <br> 상품과 서비스 수준을 소비자 관점으로 끊임없이 개선함으로써 대내ㆍ외 경쟁력을 강화할 수 있습니다.'},
    {'title':'Public', 'engtitle':'공공','bsDd':'사후 분쟁해결 및 행정조치로 인한 사회적 비용을 절감하고,<br> 소비자 중심의 선순환 시장을 조성함으로써 기업-소비자 간의 상생문화 확산에 기여합니다.'}
  ];
  var text = document.getElementById('c_txt');
  var output ='';

    output +='<dl>';
    output +='<dt>'+ gdata[0].title +'<br><br>';
    output +='<span>'+ gdata[0].engtitle+'</span>';
    output +='</dt>';  
    output +='<dd>'+ gdata[0].bsDd +'</dd>';
    output +='</dl>';  
  text.innerHTML = output;

  swiper1.on('transitionEnd', function() {
    var sind = swiper1.realIndex;

    var output = '<dl>';
    output += '<dt>' + gdata[sind].title + '<br><br>';
    output += '<span>' + gdata[sind].engtitle + '</span>';
    output += '</dt>';
    output += '<dd>' + gdata[sind].bsDd + '</dd>';
    output += '</dl>';

    text.innerHTML = output;
    
});