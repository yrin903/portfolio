/**
    header 관련 클래스
*/
let headerFunc = null;

$(function() {
	$.funcHeader = function() {
		let _this = this;

		this.opt = {
		}

		this.init = function() {
			//검색버튼 클릭
			$('#headerWrap .utils > button.btn.btn-search').off().on('click', function(e) {
				e.preventDefault();

				$('#headerSearch').focus();

				$('#headerWrap .search-wrap .ds-input.text > button.btn-search').off().on('click', function(e) {
					e.preventDefault();

					let searchKeyword = $('#headerSearch').val();

					if (searchKeyword == "") {
						$('#headerSearch').focus();
					} else {
						document.location.href = '/etc/search?q=' + searchKeyword;
					}
				})

				$("#headerSearch").keypress(function(e){
	                //검색어 입력 후 엔터키 입력하면 조회버튼 클릭
	                if(e.keyCode && e.keyCode == 13){
	                    $('#headerWrap .search-wrap .ds-input.text > button.btn-search').trigger("click");
	                    return false;
	                }
	                //엔터키 막기
	                if(e.keyCode && e.keyCode == 13){
	                    e.preventDefault();
	                }
	            });

	            _this.getRecomSearchData();
			})
		}

		this.getRecomSearchData = function() {
$           .ajax({
            	url: __apiRoot + '/search/recomSearchData',	// 요청 할 주소
            	async:true,

				type:'GET', 							// GET, PUT, DELETE
				data: {},							// 전송할 데이터
				dataType:'json',						// xml, json, script, html
				beforeSend:function(jqXHR) {			// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
					libUtil.ajaxLoadingStart();
				},
				success:function(jqXHR) {
					let resultCode = jqXHR.header.code;
					let resultMsg = jqXHR.header.message;

					if (resultCode == "C000") {
						let recomSearchData = jqXHR.data.recomSearchData;

						$('#headerWrap .search-wrap .tag-wrap .tag-list').empty();
						
						$(recomSearchData).each(function(idx, rsData) {
							$('#headerWrap .search-wrap .tag-wrap .tag-list').append('<button type="button" class="ds-tag">' + rsData + '</button>');
						});

						$('#headerWrap .search-wrap .tag-wrap .tag-list > button').off().on('click', function(e) {
			                e.preventDefault();

			                let searchKeyword = $(this).text();

			                $('#headerSearch').val(searchKeyword);
			                $('#headerWrap .search-wrap .ds-input.text > button.btn-search').trigger("click");
			            })
					}
				},
				error:function(jqXHR) {					// 요청 실패.

				},
				complete:function(jqXHR) {				// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
					libUtil.ajaxLoadingEnd();
				}
			})
		}
	}
});