/**
    event 관련 클래스
*/
let eventFunc = null;

$(function() {
	$.funcEvent = function() {
		let _this = this;

		this.opt = {
		    "page": 1
		    , "searchKeyword":""
		}

		this.listInit = function(page) {
			_this.opt.page = page;
			_this.getListData();
		}

		this.infoInit = function(idx) {
			_this.getInfoData(idx);
        }

		this.getListData = function() {
            //리스트 지우기
            $('section.ds-container ul.event-list > li.board-list-item').remove();

			let param = {
				"page":_this.opt.page
				, "recordCountPerPage":12
			}

			$.ajax({
            	url: __apiRoot + '/event/listData/' + _this.opt.page,	// 요청 할 주소
            	async:true,

				type:'POST', 							// GET, PUT, DELETE
				data: param,							// 전송할 데이터
				dataType:'json',						// xml, json, script, html
				beforeSend:function(jqXHR) {			// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
					libUtil.ajaxLoadingStart();
				},
				success:function(jqXHR) {
					let resultCode = jqXHR.header.code;
					let resultMsg = jqXHR.header.message;

					if (resultCode == "C000") {
                    	let eventInfoList = jqXHR.data.eventInfoList;

                    	let eventAdd = '';
                    	$(eventInfoList).each(function(idx, eventInfo) {
							let thumbImg = '';
                            let lstAtchFileVO = eventInfo.lstAtchFileVO;
                            if (lstAtchFileVO != undefined) {
                                thumbImgInfo = libUtil.getFileInfo(lstAtchFileVO, 'thumbImg');
                            	if (thumbImgInfo != "") {
                            	    thumbImg = '<img src="/common/imageShow/' + thumbImgInfo[0].fileId + '"  class="thumb-img" alt="" />';
                                }
                            }

							eventAdd  = '   <li class="board-list-item">';
							eventAdd += '       <a href="#" class="layout-inner" data-event-idx="' + eventInfo.idx + '" data-view_file="' + eventInfo.viewFile + '">';
		                    eventAdd += '           <span class="ds-thumb-cm">';
		                    eventAdd += '               <span class="thumb-wrap">';
                            eventAdd += '                   ' + thumbImg;
                            eventAdd += '               </span>';
                            eventAdd += '           </span>';
                            eventAdd += '           <div class="ds-card-body">';
                            eventAdd += '               <em class="title">' + eventInfo.sj + '</em>';
                            eventAdd += '               <span class="detail">';
                            eventAdd += '                  ' + eventInfo.period.replace(/-/g, '.');
                            if (eventInfo.viewIsIng == 'Y') {
                                eventAdd += '                   <span class="ds-action-btn secondary sm event-link js-event-link" data-href="#" role="link" tabindex="0">진행중</span>';
                            } else {
                                eventAdd += '                   <span class="ds-action-btn secondary sm event-link js-event-link" data-href="#" role="link" tabindex="0">당첨자발표</span>';
                            }
                            eventAdd += '               </span>';
                            eventAdd += '           </div>';
                            eventAdd += '       </a>';
                            eventAdd += '   </li>';

                    	    $('section.ds-container ul.event-list').append(eventAdd);
                    	})

                    	//제품 링크 기능 추가
                    	$('section.ds-container ul.event-list > li.board-list-item > a').off().on('click', function(e) {
                    	    e.preventDefault();

                    	    let event_idx = $(this).attr('data-event-idx');
                    	    let view_file = $(this).attr('data-view_file');

                    	    $.cookie('cEventPage', _this.opt.page);

                    	    document.location.href = "/mediaCenter/event/info/" + event_idx + (view_file != "" && view_file != "undefined" ? '?view_file=' + view_file:'');
                    	});

                    	//페이징
                    	let paginationInfo = jqXHR.data.paginationInfo;
                    	let total = paginationInfo.totalRecordCount;
						let total_page = paginationInfo.totalPageCount;
                    	let row_per_page = paginationInfo.recordCountPerPage;
                    	let page_per_view = 10;
                    	let curr_page = paginationInfo.currentPageNo;
                    	let link_fn = "";
						$('section.ds-container .ds-pagination').html(libUtil.frontPagination(total, row_per_page, page_per_view, curr_page, link_fn));
						$('section.ds-container .ds-pagination .next').before('<span class="total-page">' + total_page + '</span>');

						//페이징 링크
						$('section.ds-container .ds-pagination button').off().on('click', function(e) {
							e.preventDefault();

							let goPage = $(this).attr('data-go-page');
							if (goPage != undefined) {
								_this.opt.page = goPage;

								_this.getListData();
							}
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

        this.getInfoData = function(idx) {
            let param = {}

			$.ajax({
            	url: __apiRoot + '/event/infoData/' + idx,	// 요청 할 주소
            	async:true,

				type:'POST', 							// GET, PUT, DELETE
				data: param,							// 전송할 데이터
				dataType:'json',						// xml, json, script, html
				beforeSend:function(jqXHR) {			// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
					libUtil.ajaxLoadingStart();
				},
				success:function(jqXHR) {
					let resultCode = jqXHR.header.code;
					let resultMsg = jqXHR.header.message;

					let eventInfo = jqXHR.data.eventInfo;
					//let prevNextEventInfo = jqXHR.data.prevNextEventInfo;

					//제품 정보
					let eventImg = '';
					let lstAtchFileVO = eventInfo.lstAtchFileVO;
                    if (lstAtchFileVO != undefined) {
                        prodImgInfo = libUtil.getFileInfo(lstAtchFileVO, 'prodImg');
                        if (prodImgInfo != "") {
                            prodImg = '<img src="/common/imageShow/' + prodImgInfo[0].fileId + '" alt=""/>';
                        }
                    }

					$('#contentsWrap .board-view-info .board-view-title').text(eventInfo.sj);
					$('#contentsWrap .board-view-info .board-view-date').text(eventInfo.period.replace(/-/g, '.'));

					$('#contentsWrap .board-view-contents > div.ck-content').html(eventInfo.cnHtml);

					$('#contentsWrap .event-period p.event-period-detail').text(eventInfo.period.replace(/-/g, '.'));

					$('a.btn-go-list').off().on('click', function(e) {
						e.preventDefault();

						let page = $.cookie('cEventPage');

						if (page == undefined) {
							page = 1;
						}

						document.location.href = "/mediaCenter/event/list/" + page;
					})

					//sns share
					snsShareFunc = new $.funcSnsShare();

					$('.board-view-share button.btn-share.facebook').off().on('click', function(e) {
						e.preventDefault();

						snsShareFunc.sendSns('facebook', '/mediaCenter/event/info/' + eventInfo.idx, eventInfo.sj);
					})

					$('.board-view-share button.btn-share.x').off().on('click', function(e) {
						e.preventDefault();

						snsShareFunc.sendSns('twitter', '/mediaCenter/event/info/' + eventInfo.idx, eventInfo.sj);
					})

					$('.board-view-share button.btn-share.link').off().on('click', function(e) {
						e.preventDefault();

						snsShareFunc.sendSns('url', '/mediaCenter/event/info/' + eventInfo.idx, eventInfo.sj);
					})
				},
				error:function(jqXHR) {					// 요청 실패.

				},
				complete:function(jqXHR) {				// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
					libUtil.ajaxLoadingEnd();
				}
			})
        }

        this.openEvtInfoInit = function(idx) {

            //더보기 버튼
            $('#moreOpen').off().on('click', function(e) {
                e.preventDefault();

                _this.getFndBugListData(1, "p");
            })

            //이벤트 응모
            $('#btnJoinEvent').off().on('click', function() {
                _this.chkJoinEvt();
            })

			let param = {}

			$.ajax({
            	url: __apiRoot + '/event/infoData/' + idx,	// 요청 할 주소
            	async:true,

				type:'GET', 							// GET, PUT, DELETE
				data: param,							// 전송할 데이터
				dataType:'json',						// xml, json, script, html
				beforeSend:function(jqXHR) {			// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
					libUtil.ajaxLoadingStart();
				},
				success:function(jqXHR) {
					let resultCode = jqXHR.header.code;
					let resultMsg = jqXHR.header.message;

					let eventInfo = jqXHR.data.eventInfo;

					if (eventInfo.viewFile == undefined) {
						document.location.href = "/mediaCenter/event/list";
						return;
					} else if (eventInfo.viewFile != libUtil.getParameterValue("view_file")) {
						document.location.href = "/mediaCenter/event/list";
						return;
					}

					_this.getFndBugListData(1, "b");

					//sns share
					snsShareFunc = new $.funcSnsShare();

					$('.board-view-share button.btn-share.facebook').off().on('click', function(e) {
						e.preventDefault();

						snsShareFunc.sendSns('facebook', '/mediaCenter/event/info/' + eventInfo.idx + '?view_file=event_info_open', eventInfo.sj);
					})

					$('.board-view-share button.btn-share.x').off().on('click', function(e) {
						e.preventDefault();

						snsShareFunc.sendSns('twitter', '/mediaCenter/event/info/' + eventInfo.idx + '?view_file=event_info_open', eventInfo.sj);
					})

					$('.board-view-share button.btn-share.link').off().on('click', function(e) {
						e.preventDefault();

						snsShareFunc.sendSns('url', '/mediaCenter/event/info/' + eventInfo.idx + '?view_file=event_info_open', eventInfo.sj);
					})

					libUtil.setEditor(_this, 'eventFndBug', 'openFndBugEvt');

				},
				error:function(jqXHR) {					// 요청 실패.

				},
				complete:function(jqXHR) {				// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
					libUtil.ajaxLoadingEnd();
				}
			})
        }

        this.getFndBugListData = function(page, kind = "b") {

			let param = {
				"page":page
				, "recordCountPerPage":10
			}

			if (kind == 'p') {
				param.recordCountPerPage = 10000;
			}

			$('#join_list_' + kind + ' tbody tr').remove();

			$.ajax({
            	url: __apiRoot + '/event/fndbug/listData/' + _this.opt.page,	// 요청 할 주소
            	async:true,

				type:'POST', 							// GET, PUT, DELETE
				data: param,							// 전송할 데이터
				dataType:'json',						// xml, json, script, html
				beforeSend:function(jqXHR) {			// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
					libUtil.ajaxLoadingStart();
				},
				success:function(jqXHR) {
					let resultCode = jqXHR.header.code;
					let resultMsg = jqXHR.header.message;

					if (resultCode == "C000") {
                    	let eventFndBugInfoList = jqXHR.data.eventFndBugInfoList;
                    	let paginationInfo = jqXHR.data.paginationInfo;

                    	let addRow = '';
                    	let viewIdx = (page - 1) * param.recordCountPerPage + 1;
                    	$(eventFndBugInfoList).each(function(idx, eventFndBugInfo) {
							addRow  = ' <tr>';
							addRow += '     <td>' + viewIdx++ + '</td>';
							addRow += '     <td>' + eventFndBugInfo.name + '</td>';
							addRow += '     <td>' + eventFndBugInfo.dept + '</td>';
							addRow += '     <td>' + eventFndBugInfo.fndCnt + '</td>';
							addRow += ' </tr>';
							$('#join_list_' + kind + ' tbody').append(addRow);
						});

						if (kind == 'b' && parseInt(paginationInfo.totalRecordCount, 10) <= param.recordCountPerPage) {
							$('#moreOpen').closest('.btn-wrap').hide();
						}
					}
				},
				error:function(jqXHR) {					// 요청 실패.

				},
				complete:function(jqXHR) {				// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
					libUtil.ajaxLoadingEnd();
				}
			})
        }

        this.chkJoinEvt = function() {
            let _dept = $('#dept').val();
            let _name = $('#name').val();
            let _sabun = $('#sabun').val();

            let _errKnd = $('#errKnd option:selected').attr('data-val');
            let _fndCnt = $('#fndCnt').val();

            let _sj = $('#sj').val();
            let _cnHtml = _this.opt.ckEditor.getData();
            let _cn = _cnHtml.replace(/(<([^>]+)>)/ig,"");

            if(_dept == '') {
               alert('소속을 입력하세요.');
               $('#dept').focus();
               return;
            }

            if (_name == "") {
				alert('이름을 입력하세요.');
				$('#name').focus();
				return;
            }

			if (_sabun == "") {
				alert('시번을 입력하세요.');
				$('#sabun').focus();
				return;
            }

			if (_errKnd == "") {
				alert('오류종류를 선택하세요.');
				//$('#sabun').focus();
				return;
            }

            if (_fndCnt == '' || _fndCnt < 0) {
                alert('발견오류를 입력하세요.');
                $('#fndCnt').focus();
                return;
            }

            if (_sj == '') {
                alert('제목을 입력하세요.');
                $('#sj').focus();
                return;
            }

			if (_cnHtml == '') {
                alert('내용을 입력하세요.');
                return;
            }

            let param = {
                "cors":_cors
                , "dept":_dept
                , "name":_name
                , "sabun":_sabun
                , "errKnd":_errKnd
                , "fndCnt":_fndCnt
                , "sj":_sj
                , "cnHtml":_cnHtml
                , "cn":_cn
            };

			let ans = confirm("등록 하시겠습니까?");

			if (ans == false) {
				return;
			}

			//saveContentWithImageUpload(param);

			$.ajax({
            	url: __apiRoot + '/event/fndbug/insert',	// 요청 할 주소
            	async:true,

				type:'POST', 							// GET, PUT, DELETE
				data: param,							// 전송할 데이터
				dataType:'json',						// xml, json, script, html
				beforeSend:function(jqXHR) {			// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
					libUtil.ajaxLoadingStart();
				},
				success:function(jqXHR) {
					let resultCode = jqXHR.header.code;
					let resultMsg = jqXHR.header.message;

					if (resultCode == "C000") {
						alert('이벤트 응모가 완료 되었습니다.');
						document.location.reload(); // 새로고침
					} else {
						alert(resultMsg); // 메시지 출력
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

// 이 함수는 글을 저장하는 버튼의 클릭 이벤트 핸들러 등에서 호출될 것입니다.
async function saveContentWithImageUpload(param) {

	libUtil.ajaxLoadingStart();

	let postId = libUtil.opt.postId;
    let editorData = eventFunc.opt.ckEditor.getData(); // 현재 에디터의 HTML 내용 가져오기

    // 1. Base64 이미지 찾기
    const parser = new DOMParser();
    const doc = parser.parseFromString(editorData, 'text/html');
    const imgElements = doc.querySelectorAll('img[src^="data:image/"]'); // Base64 이미지 선택

    if (imgElements.length === 0) {
        // Base64 이미지가 없으면 바로 저장 로직 실행
        //console.log('No Base64 images found. Saving content directly.');
        //await sendContentToServer(editorData);
        return;
    }

    const uploadPromises = [];
    const imageMap = new Map(); // 기존 src(Base64)와 새 src(서버 URL) 매핑

    imgElements.forEach(img => {
        const base64Data = img.src;
        // Blob 또는 File 객체로 변환 (서버로 전송하기 위함)
        const mimeType = base64Data.match(/^data:(image\/[a-z]+);base64,/)?.[1] || 'image/png';
        const byteCharacters = atob(base64Data.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mimeType });

        let ext = mimeType.split('/')[1];
        if (ext == "jpeg") {
            ext = "jpg";
        }

        // FormData에 파일 추가
        const formData = new FormData();
        formData.append('upload', blob, `image_${Date.now()}.${ext}`); // 파일명 지정

        // 서버 업로드 요청 Promise 생성
        const uploadPromise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const uploadUrl = `${window.location.origin}/common/editImageBase64Upload/${postId}`; // 실제 업로드 URL 및 postId

            xhr.open('POST', uploadUrl, true);
            xhr.responseType = 'json';

            xhr.onload = () => {
                if (xhr.status === 200 && xhr.response?.url) {
                    imageMap.set(base64Data, xhr.response.url); // 매핑 저장
                    resolve();
                } else {
                    reject(new Error(xhr.response?.message || '이미지 업로드 실패'));
                    libUtil.ajaxLoadingEnd();
                }
            };
            xhr.onerror = () => reject(new Error('네트워크 오류로 이미지 업로드 실패'));
            xhr.send(formData);
        });
        uploadPromises.push(uploadPromise);
    });

    try {
        // 모든 이미지 업로드가 완료될 때까지 기다립니다.
        await Promise.all(uploadPromises);
        //console.log('All Base64 images uploaded successfully.');

        // 2. 에디터 내용의 Base64 src를 서버 URL로 교체
        for (const [base64Src, newUrl] of imageMap.entries()) {
            // 정규식을 사용하여 정확하게 src 속성만 교체
            // 주의: 이 방법은 아주 정확하지 않을 수 있습니다. DOM 조작 후 HTML을 직렬화하는 것이 더 안전합니다.
            // 여기서는 단순화를 위해 문자열 교체를 사용하지만, 프로덕션에서는 DOMParser/XMLSerializer 사용을 권장합니다.
            editorData = editorData.replace(new RegExp(escapeRegExp(base64Src), 'g'), newUrl);
        }
        // DOMParser를 사용한 HTML 업데이트 (더 안전한 방법)
        let updatedHtml = doc.documentElement.outerHTML; // 변경된 DOM을 다시 HTML 문자열로
        for (const [base64Src, newUrl] of imageMap.entries()) {
            doc.querySelectorAll(`img[src="${base64Src}"]`).forEach(img => {
                img.src = newUrl;
            });
        }
        updatedHtml = doc.documentElement.outerHTML;
		//console.log(updatedHtml);

        // 3. 업데이트된 HTML 내용을 서버에 저장
        //await sendContentToServer(updatedHtml);
        param.cnHtml = updatedHtml;

		$.ajax({
            	url: __apiRoot + '/event/fndbug/insert',	// 요청 할 주소
            	async:true,

				type:'POST', 							// GET, PUT, DELETE
				data: param,							// 전송할 데이터
				dataType:'json',						// xml, json, script, html
				beforeSend:function(jqXHR) {			// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
					libUtil.ajaxLoadingStart();
				},
				success:function(jqXHR) {
					let resultCode = jqXHR.header.code;
					let resultMsg = jqXHR.header.message;

					if (resultCode == "C000") {
						alert('이벤트 응모가 완료 되었습니다.');
						document.location.reload(); // 새로고침
					} else {
						alert(resultMsg); // 메시지 출력
					}
				},
				error:function(jqXHR) {					// 요청 실패.

				},
				complete:function(jqXHR) {				// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
					libUtil.ajaxLoadingEnd();
				}
			})

    } catch (error) {
        //console.error('이미지 업로드 중 오류 발생:', error);
        alert('글 저장 중 오류가 발생했습니다: ' + error.message);
    }
}

// HTML 문자열에서 src를 안전하게 교체하기 위한 보조 함수 (정규식 이스케이프)
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the matched substring
}


// 최종 HTML 내용을 서버에 전송하는 함수 (예시)
async function sendContentToServer(htmlContent) {
    const response = await fetch('/api/save-post', { // 실제 저장 API 엔드포인트로 변경
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer YOUR_AUTH_TOKEN' // 필요시 인증 헤더 추가
        },
        body: JSON.stringify({
            postId: postId, // 필요한 경우 글 ID도 함께 전송
            content: htmlContent
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '글 저장 실패');
    }

    //console.log('Content successfully saved to server.');
    return response.json(); // 서버 응답 반환
}

// '저장' 버튼 클릭 이벤트에 연결 (예시)
// document.getElementById('saveButton').addEventListener('click', saveContentWithImageUpload);