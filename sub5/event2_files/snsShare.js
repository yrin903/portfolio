/**
 * sns 공유 라이브러리
 */

var snsShareFunc = null;
$(function() {
	$.funcSnsShare = function() {
		var _this = this;

		this.init = function() {

		}

		this.openSnsWin = function(openUrl, media) {
			var winObj;
			// 요즘인경우 새창.
			if (media=="yo"){
				winObj = window.open(openUrl,"sendSNSWin", 'yozmSend', 'width=466, height=356');
			}
			else{
				winObj = window.open(openUrl,"sendSNSWin","");
			}
		}

		this.sendSns = function(media, sendUrl, sj) {
			let view_url = "";

			var nowUrl = window.location.protocol + "//" +  window.location.host + sendUrl;

			switch(media) {
					case "naver":
						//var nowUrl = '';
						sendUrl = "http://blog.naver.com/openapi/share?title="+encodeURIComponent(sj) + "&url="+escape(nowUrl);
						_this.openSnsWin(sendUrl, media);
						break;
					case "kakao":
						//var nowUrl = '';
						shareKakao ();
						break;
					case "twitter":
						//var nowUrl = '';
						sendUrl = "http://twitter.com/share?text="+encodeURIComponent(sj) + "&url="+escape(nowUrl);
						_this.openSnsWin(sendUrl, media);
						break;
					case "facebook":
						sendUrl = "http://www.facebook.com/sharer.php?u="+escape(nowUrl)+"&t="+encodeURI(sj);+"&src=sp";
						//sendUrl = "http://www.facebook.com/sharer.php?u="+nowUrl+"&t=1111&src=sp";
						_this.openSnsWin(sendUrl, media);
						break;
					case "url":

						if( _this.is_ie() ) {
							window.clipboardData.setData("Text", nowUrl);
							alert("복사되었습니다.");
							return;
						}
						prompt("Ctrl+C를 눌러 복사하세요.", nowUrl);

						break;
				}
		}

		this.is_ie = function() {
			if(navigator.userAgent.toLowerCase().indexOf("chrome") != -1) return false;
			if(navigator.userAgent.toLowerCase().indexOf("msie") != -1) return true;
			if(navigator.userAgent.toLowerCase().indexOf("windows nt") != -1) return true;
			return false;
		}

		this.setKakaoShare = function(btn_id, sj, desc, imgUrl, linkMUrl, linkWUrl) {
			Kakao.Share.createDefaultButton({
		        container: '#' + btn_id,
		        objectType: 'feed',
		        content: {
		            title: sj,
		            description: desc,
		            imageUrl:
		                imgUrl,
		            link: {
		                // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
		                mobileWebUrl: linkMUrl,
		                webUrl: linkWUrl,
		            },
		        },
		        /*
		        social: {
		            likeCount: 286,
		            commentCount: 45,
		            sharedCount: 845,
		        },
		        */
		        buttons: [
			        {
			            title: '웹으로 보기',
			            link: {
			                mobileWebUrl: linkMUrl,
			                webUrl: linkWUrl,
			            },
			        },
			        {
			            title: '앱으로 보기',
			            link: {
			                mobileWebUrl: linkMUrl,
			                webUrl: linkWUrl,
			            },
			        },
		        ],
		    });
		}
	}
})