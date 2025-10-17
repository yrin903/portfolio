/**
 * 공통 라이브러리
 */

let libUtil = null;
let loadingCnt = 0;
$(function() {
	$.funcLibUtil = function() {
		var _this = this;

		this.opt = {}

		var cookie_start = "ckAmin_";
		this.datatable_config = {
			"responsive": true, 
			"lengthChange": false, 
			"autoWidth": false,
		    "searching": false,
		    "ordering": false,
		    "info": false,
		    "paging": false,
			"buttons": {
				"dom": {
			        "button": {
			          "tag": 'button',
			          "className": ''
			        }
			    },
			    buttons: [
					{ extend: "csv", "className": 'btn btn-outline-secondary', "charset": "utf-8", "bom": true},
					{ extend: "excel", "className": 'btn btn-outline-secondary'},
					{ extend: "pdf", "className": 'btn btn-outline-secondary', "charset": "utf-8",},
					{ extend: "print", "className": 'btn btn-outline-secondary'}
				]
			},
			"language": {
			      "emptyTable": "조회된 데이터가 없습니다."
		    }
		}
		
		this.init = function() {
			//숫자만
			$(".onlyNum").keyup(function(){
				$(this).val( $(this).val().replace(/[^0-9]/g,"") );
			});
		
			//영문만
			$(".onlyEng").keyup(function(){
				$(this).val( $(this).val().replace(/[^\!-z]/g,"") );
			});
		
			//한글만
			$(".onlyKor").keyup(function(){
				//console.log("onlyKor");
				//$(this).val( $(this).val().replace(/^[가-힣]/g,"") );
				regexp = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
				v = $(this).val();
				if( regexp.test(v) ) {
					alert("한글만 입력하세요");
					$(this).val(v.replace(regexp,''));
				}
			});
		
			//숫자+영문
			$(".onlyNumEng").keyup(function(e){
				//console.log("onlyNumEng");
				//$(this).val( $(this).val().replace(/[a-zA-Z0-9]/g,"") );
				if (!(e.keyCode >=37 && e.keyCode<=40)) {
					var inputVal = $(this).val();
					$(this).val(inputVal.replace(/[^a-z0-9]/gi,''));
				}
			});

			_this.setDateragepicker();
		}
		
		//페이징
		this.pagination = function() {
			
		}
		
		this.replaceAll = function(str, find, replace) {
		  return str.replace(new RegExp(find, 'g'), replace);
		}
		
		//모바일 체크
		this.checkMobile = function() {
			let check = false;
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
			return check;
		}
		
		//날짜형식 변경
		this.changeDateFormat = function(date, format) {
			//return date.substr(0, 10).replace('-', '.').replace('-', '.');
			moment.locale('ko');
			return moment(date).format(format);
		}
		
		this.numberWithCommas = function(number) {
			if (!number || number.toString().trim() == '') {
				return '0';
			}
			
		    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		
		this.isNumber = function(str) {
			if (!str || str.trim() == '') {
				return false;
			}
			
			return str.match(/^[1-9][0-9]*$/);
		}
		
		this.roundToTwoDecimal = function(num) {
		    return +(Math.round(num + "e+2")  + "e-2");
		}
		
		this.capitalizeFirstLetter = function(string) {
		  return string.charAt(0).toUpperCase() + string.slice(1);
		}
		
		this.secondCountdown = function(duration, timestep, onUpdate, onFinish) {
			var timer = duration, minutes, seconds;
			var interval = setInterval(function() {
				minutes = parseInt(timer / 60, 10);
		        seconds = parseInt(timer % 60, 10);

		        minutes = minutes < 10 ? "0" + minutes : minutes;
		        seconds = seconds < 10 ? "0" + seconds : seconds;
		        if (onUpdate) { onUpdate(minutes, seconds); }
				
				if (--timer < 0) {
					 if (onFinish) { onFinish(); }
					clearInterval(interval);
		        }
			}, timestep);
			
			return interval;
		}
		
		this.convertSecondToMinute = function(duration) {
			var timer = duration, minutes, seconds;
			minutes = parseInt(timer / 60, 10);
	        seconds = parseInt(timer % 60, 10);
	        
	        minutes = minutes < 10 ? "0" + minutes : minutes;
	        seconds = seconds < 10 ? "0" + seconds : seconds;
	        
	        return minutes + ":" + seconds;
		}
		
		this.padNumber =  function(num, size) {
		    num = num.toString();
		    while (num.length < size) num = "0" + num;
		    return num;
		}
		
		this.pagination = function(total, row_per_page, page_per_view, curr_page, link_fn) {
			total = parseInt(total);
			page_per_view = parseInt(page_per_view);
			row_per_page = parseInt(row_per_page);
			curr_page = parseInt(curr_page);
			
			if (_this.checkMobile() == true) {
				page_per_view = 5;
			}
			
			var strPagingLink = '';
			var leftNavLink = '';
			var rightNavLink = '';
			var leftBlockLink = '';
			var rightBlockLink = '';

			var intTotalPage = 0;
			var intCurBlock = 0;
			var intStartPageBlock = 0;
			var intEndPageBlock = 0;

			if (parseInt(total, 10) > 0) {
				//전체 페이지
				intTotalPage = Math.ceil(total / row_per_page);
				//전체 블럭
				intTotalBlock = Math.ceil(intTotalPage / page_per_view);
				//현재 블럭
				intCurBlock = Math.ceil(curr_page / page_per_view);

				intPrevPage = curr_page - 1;
				intNextPage = curr_page + 1;
				intStartPageBlock = (intCurBlock - 1) * page_per_view + 1;
				intEndPageBlock = intStartPageBlock + page_per_view - 1;
				intNextPageBlock = intEndPageBlock + 1;
				intPrevPageBlock = intStartPageBlock - page_per_view;
				
				if (intStartPageBlock < 1) {
					intStartPageBlock = 1;
					
				}
				if (intEndPageBlock > intTotalPage) {
					intEndPageBlock = intTotalPage;
				}

				// 이전 블록 및 다음 블록
				if (intPrevPageBlock < 1) {
					intPrevPageBlock = 1;
					leftNavLink += '<li class="page-item disabled"><a class="page-link" href="javascript:void(0)">&lsaquo;</a></li> \r\n';
				} else {
					leftNavLink += '<li class="page-item"><a class="page-link" href="javascript:' + link_fn + '(' + intPrevPageBlock + ')">&lsaquo;</a></li> \r\n';
				}
				
				if (intNextPageBlock > intTotalPage) {
					intNextPageBlock = intTotalPage;
					rightNavLink += '<li class="page-item disabled"><a class="page-link" href="javascript:void(0)">&rsaquo;</a></li> \r\n';
				} else {
					rightNavLink += '<li class="page-item"><a class="page-link" href="javascript:' + link_fn + '(' + intNextPageBlock + ')">&rsaquo;</a></li> \r\n';
				}

				if (intTotalPage > page_per_view) {
					leftBlockLink = '<li class="page-item"><a class="page-link" href="javascript:' + link_fn + '(1)">&laquo;</a></li> \r\n';
				}
				
				
				while (intStartPageBlock <= intEndPageBlock) {
					if (intStartPageBlock != curr_page) {
						strPagingLink += '<li class="page-item"><a class="page-link" href="javascript:' + link_fn + '(' + intStartPageBlock +  ');" >' + intStartPageBlock + '</a></li> \r\n';
						intStartPageBlock++;
						continue;
					}
					
					strPagingLink += '<li class="page-item active"><a class="page-link" href="javascript:' + link_fn + '(' + intStartPageBlock +  ');">' + intStartPageBlock + '</a></li> \r\n';
					intStartPageBlock++;
				}

				if (intTotalPage > page_per_view) {
					rightBlockLink = '<li class="page-item"><a class="page-link" href="javascript:' + link_fn + '(' + intTotalPage + ')">&raquo;</a></li> \r\n';
				}
			}
			
			strPagingLink = leftBlockLink + leftNavLink + strPagingLink + rightNavLink + rightBlockLink;
			return strPagingLink;
		}
		
		this.frontPagination = function(total, row_per_page, page_per_view, curr_page, link_fn) {
			total = parseInt(total);
			page_per_view = parseInt(page_per_view);
			row_per_page = parseInt(row_per_page);
			curr_page = parseInt(curr_page);
			
			if (_this.checkMobile() == true) {
				page_per_view = 5;
			}
			
			var strPagingLink = '';
			var leftNavLink = '';
			var rightNavLink = '';

			var intTotalPage = 0;
			var intTotalBlock = 0;
			var intCurBlock = 0;
			var intPrevPage = 0;
			var intNextPage = 0;
			var intStartPageBlock = 0;
			var intEndPageBlock = 0;

			if (parseInt(total, 10) > 0) {
				//전체 페이지
				intTotalPage = Math.ceil(total / row_per_page);
				//전체 블럭
				intTotalBlock = Math.ceil(intTotalPage / page_per_view);
				//현재 블럭
				intCurBlock = Math.ceil(curr_page / page_per_view);

				intPrevPage = curr_page - 1;
				intNextPage = curr_page + 1;
				intStartPageBlock = (intCurBlock - 1) * page_per_view + 1;
				intEndPageBlock = intStartPageBlock + page_per_view - 1;
				intNextPageBlock = intEndPageBlock + 1;
				intPrevPageBlock = intStartPageBlock - page_per_view;
				
				if (intStartPageBlock < 1) {
					intStartPageBlock = 1;
					
				}
				if (intEndPageBlock > intTotalPage) {
					intEndPageBlock = intTotalPage;
				}
				/*
				if (intPrevPageBlock < 1) {
					intPrevPageBlock = 1;
					leftNavLink += '<button class="prev"><span class="ir">이전</span></button> \r\n';
				} else {
					leftNavLink += '<button onclick="' + link_fn + '(' + intPrevPageBlock + ')" class="prev"><span class="ir">이전</span></button> \r\n';
				}
				
				if (intNextPageBlock > intTotalPage) {
					intNextPageBlock = intTotalPage;
					rightNavLink += '<button class="next"><span class="ir">다음</span></button> \r\n';
				} else {
					rightNavLink += '<button onclick="' + link_fn + '(' + intNextPageBlock + ')" class="next"><span class="ir">다음</span></button> \r\n';
				}
				
				strPagingLink = strPagingLink + '<span class="num-wrap">';
				if (intTotalPage > page_per_view) {
					strPagingLink = strPagingLink + '<button onclick="' + link_fn + '(1)" class="num first">1</button>';
					strPagingLink = strPagingLink + '<span class="point">…</span>';
				}
				
				while (intStartPageBlock <= intEndPageBlock) {
					if (intStartPageBlock != curr_page) {
						strPagingLink += '<button onclick="' + link_fn + '(' + intStartPageBlock +  ')" class="num">' + intStartPageBlock + '</button> \r\n';
						intStartPageBlock++;
						continue;
					}
					
					strPagingLink += '<button onclick="' + link_fn + '(' + intStartPageBlock +  ')" class="num active">' + intStartPageBlock + '</button> \r\n';
					intStartPageBlock++;
				}
				
				if (intTotalPage > page_per_view) {
					strPagingLink = strPagingLink + '<span class="point">…</span>';
					strPagingLink = strPagingLink + '<button onclick="' + link_fn + '(' + intTotalPage +  ')" class="num end">' + intTotalPage + '</button>';
				}
				
				strPagingLink = strPagingLink + '</span>';

				strPagingLink = leftNavLink + strPagingLink + rightNavLink;
				*/

				if (curr_page > 1) {
					strPagingLink += '<button type="button" class="pagination-nav prev" data-go-page="' + intPrevPage + '"></button>';
				} else {
					strPagingLink += '<button type="button" class="pagination-nav prev disabled" disabled></button>';
				}

				while (intStartPageBlock <= intEndPageBlock) {
					if (intStartPageBlock == curr_page) {
						strPagingLink += '<button type="button" class="pagination-item active">' + intStartPageBlock + '</button>';
					} else {
						strPagingLink += '<button type="button" class="pagination-item" data-go-page="' + intStartPageBlock + '">' + intStartPageBlock + '</button>';
					}

					intStartPageBlock++;
				}

				if (curr_page < intTotalPage) {
    				strPagingLink += '<button type="button" class="pagination-nav next" data-go-page="' + intNextPage + '"></button>';
    			} else {
    				strPagingLink += '<button type="button" class="pagination-nav next disabled" disabled></button>';
    			}
			}

			return strPagingLink;
		}
		
		this.frontCommentPagination = function(total, row_per_page, page_per_view, curr_page, link_fn) {
			total = parseInt(total);
			page_per_view = parseInt(page_per_view);
			row_per_page = parseInt(row_per_page);
			curr_page = parseInt(curr_page);
			
			var strPagingLink = '';
			var leftNavLink = '';
			var rightNavLink = '';

			var intTotalPage = 0;
			var intTotalBlock = 0;
			var intCurBlock = 0;
			var intPrevPage = 0;
			var intNextPage = 0;
			var intStartPageBlock = 0;
			var intEndPageBlock = 0;

			if (parseInt(total, 10) > 0) {
				//전체 페이지
				intTotalPage = Math.ceil(total / row_per_page);
				//전체 블럭
				intTotalBlock = Math.ceil(intTotalPage / page_per_view);
				//현재 블럭
				intCurBlock = Math.ceil(curr_page / page_per_view);

				intPrevPage = curr_page - 1;
				intNextPage = curr_page + 1;
				intStartPageBlock = (intCurBlock - 1) * page_per_view + 1;
				intEndPageBlock = intStartPageBlock + page_per_view - 1;
				intNextPageBlock = intEndPageBlock + 1;
				intPrevPageBlock = intStartPageBlock - page_per_view;
				
				if (intStartPageBlock < 1) {
					intStartPageBlock = 1;
					
				}
				if (intEndPageBlock > intTotalPage) {
					intEndPageBlock = intTotalPage;
				}

				if (intPrevPageBlock < 1) {
					intPrevPageBlock = 1;
					leftNavLink += '<button class="prev"><span class="ir">이전</span></button> \r\n';
				} else {
					leftNavLink += '<button onclick="' + link_fn + '(' + intPrevPageBlock + ')" class="prev"><span class="ir">이전</span></button> \r\n';
				}
				
				if (intNextPageBlock > intTotalPage) {
					intNextPageBlock = intTotalPage;
					rightNavLink += '<button class="next"><span class="ir">다음</span></button> \r\n';
				} else {
					rightNavLink += '<button onclick="' + link_fn + '(' + intNextPageBlock + ')" class="next"><span class="ir">다음</span></button> \r\n';
				}
				
				strPagingLink = strPagingLink + '<span class="num-wrap">';
				
				while (intStartPageBlock <= intEndPageBlock) {
					if (intStartPageBlock != curr_page) {
						strPagingLink += '<button onclick="' + link_fn + '(' + intStartPageBlock +  ')" class="num">' + intStartPageBlock + '</button> \r\n';
						intStartPageBlock++;
						continue;
					}
					
					strPagingLink += '<button onclick="' + link_fn + '(' + intStartPageBlock +  ')" class="num active">' + intStartPageBlock + '</button> \r\n';
					intStartPageBlock++;
				}
				
				strPagingLink = strPagingLink + '</span>';
			}
			
			strPagingLink = leftNavLink + strPagingLink + rightNavLink;
			return strPagingLink;
		}
		
		this.arrSuffle = function(arr) {
			var j, x, i; 
			for (i = arr.length; i; i -= 1) { 
				//j = Math.floor(Math.random() * i);
				j = this.getRandomSecureInt(i); // 0부터 i-1까지의 난수 생성

				x = arr[i - 1]; 
				arr[i - 1] = arr[j]; 
				arr[j] = x; 
			}
			
			return arr;
		}

		this.getRandomSecureInt = function(max) {
            if (max <= 0) {
                throw new Error("Maximum value must be a positive integer.");
            }

            // 32비트 부호 없는 정수 배열 생성 (하나의 난수 필요)
            const randomBytes = new Uint32Array(1);

			/*
            // window.crypto는 웹 브라우저 환경에서 사용 가능
            if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
                window.crypto.getRandomValues(randomBytes);
            } else if (typeof require === 'function' && require('crypto')) { // Node.js 환경 체크 (간략화)
                const nodeCrypto = require('crypto');
                // Node.js의 randomBytes는 버퍼를 반환하므로 UInt32로 변환
                const buffer = nodeCrypto.randomBytes(4);
                randomBytes[0] = buffer.readUInt32LE(0); // Little Endian으로 32비트 정수 읽기
            } else {
                // 암호학적으로 안전한 난수 생성기가 없는 경우 (매우 드묾, 경고 또는 오류 처리)
                //console.warn("Crypto module not available, falling back to Math.random() (not secure for sensitive operations).");
                return Math.floor(Math.random() * max);
            }
			*/
            // 생성된 32비트 난수에서 max로 나눈 나머지를 취함
            // 이 방법은 max가 매우 클 경우 약간의 편향이 있을 수 있으나,
            // 배열 셔플에서는 일반적으로 허용 가능한 수준입니다.
            return randomBytes[0] % max;
        }
		
		this.getYoutubeId = function(url) {
		    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		    const match = url.match(regExp);

		    return (match && match[2].length === 11)
		      ? match[2]
		      : null;
		}
		
		this.copyTextToClipboard = function(text) {
			var textArea = document.createElement("textarea");
			
			textArea.style.position = 'fixed';
			textArea.style.top = 0;
			textArea.style.left = 0;
			
			textArea.style.width = '2em';
			textArea.style.height = '2em';
			
			textArea.style.padding = 0;
			
			textArea.style.border = 'none';
			textArea.style.outline = 'none';
			textArea.style.boxShadow = 'none';
			
			textArea.style.background = 'transparent';
			textArea.value = text;
			  
			document.body.appendChild(textArea);
			textArea.select();
			
			try {
			   var successful = document.execCommand('copy');
			   toastr.success("홈페이지 URL이 복사되었습니다.");
			} catch (err) {
			   //console.log('Oops, unable to copy');
			   toastr.error("Oops, unable to copy");
			}
			
			document.body.removeChild(textArea);
		}
		
		this.formatBytes = function(bytes,decimals) {
	   	   if(bytes == 0) return '0 Bytes';
	   	   var k = 1024,
	   	       dm = decimals || 2,
	   	       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	   	       i = Math.floor(Math.log(bytes) / Math.log(k));
	   	   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
		}
		
		this.getInputFileInfo = function(file_upload) {
			var filename = "";
			var file_extension = "";
			var file_size = 0;
			// 값이 변경되면 
			if (window.FileReader) {
				// modern browser
				if(file_upload !== undefined){
					filename = file_upload.name;
					file_extension = filename.split('.').pop();
					file_size = file_upload.size;
				}else{
					filename = '첨부 파일을 선택해주세요.';
				}
			} else {
				// old IE 
				if(file_upload !== undefined){
					filename = $(this).val().split(contextPath  + '/').pop().split('\\').pop(); // 파일명만 추출 
					file_extension = filename.split('.').pop();
				}else{
					filename = '첨부 파일을 선택해주세요.';
				}
			}
			
			return {filename, file_extension, file_size};
		}
		
		this.isEmpty = function(data) {
			if (data == undefined || data == null || data.trim() == '' || data == 'undefined' || data == 'null') {
				return true;
			} else {
				return false;
			}
		}
		
		this.isInput = function(label, data){
			if (data == null || data.trim() == '') {
				alert(_this.hangeulPostfix(label, '를') + " 입력해주세요");
				return true;
			}else{
				return false;
			}
		}
		
		this.emailChk = function(label = "", email){
		//this.emailChk = function(email){
			var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
			
			if(email.match(regExp) == null){
				if (label == "") {
					customAlert({message:label + " 형태에 맞게 작성해주세요", btn_txt1:"확인"});
				}
				return true;
			}else{
				return false;
			}
		}

		this.sendingEmailChk = function(label, email){
            var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

            if(email.match(regExp) == null){
                customAlert({message:label + " 주소를 정확히 입력해주세요.", btn_txt1:"확인"});
                return true;
            }else{
                //customAlert({message:label + " 주소로 이메일이 발송됩니다.", btn_txt1:"확인"});
                return false;
            }
        }
		
		//정규식 비밀번호 검사(  )
		this.passwdChk = function(label, passwd){
			var regPw = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
			
			if(false === regPw.test(passwd)){
				customAlert({message:label + "는 8자~16자, 숫자/영어대소문자/특수문자를 모두 포함해야 합니다", btn_txt1:"확인"});
				return true;
			}else{
				return false;
			}
		}
		
		//정규식 새 비밀번호 검사(  )
		this.newPasswdChk = function(label, newPasswd){
			var regPw = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
			
			if(false === regPw.test(newPasswd)){
				customAlert({message:label + "는 8자~16자, 숫자/영어대소문자/특수문자를 모두 포함해야 합니다", btn_txt1:"확인"});
				return true;
			}else{
				return false;
			}
		}
		
		//휴대폰 번호 숫자만(  )
		this.mbtlnumChk = function(label = "", mbtlnum){
			if (label != "") {
				mbtlnum = mbtlnum.replace(/\-/g,"");//중간 하이픈 제거
			}
			//
			mbtlnum = mbtlnum.replace(/(\s*)/g, "");//전체 공백 제거
			var check = /^(01[016789]{1})?[0-9]{3,4}?[0-9]{4}$/;//하이픈 없이 휴대폰 번호
			if (label == "") {
				check = /^01[016789]-\d{3,4}-\d{4}$/;
			}
			if (!check.test(mbtlnum)) {
				if (label == "") {
					customAlert({message:label+"를 정확히 입력해주세요", btn_txt1:"확인"});
				}
				return true;			
			}else{
				return false;
			}

		}
		
		//클라이언트 모바일 번호 숫자만(  )
		this.clientMbtlnumChk = function(label, mbtlnum){
			mbtlnum = mbtlnum.replace(/\-/g,"");//중간 하이픈 제거
			mbtlnum = mbtlnum.replace(/(\s*)/g, "");//전체 공백 제거
			var check = /^(01[016789]{1})?[0-9]{3,4}?[0-9]{4}$/;//하이픈 없이 휴대폰 번호
			if (!check.test(mbtlnum)) {
				alert(_this.hangeulPostfix(label, '를') + "형식에 맞게 입력해주세요");
				return true;			
			}else{
				return false;
			}

		}
		
		//생년월일 체크
		this.brdtChk = function(label, brdt){
			brdt = brdt.replace(/\-/g,"");//중간 하이픈 제거
			brdt = brdt.replace(/(\s*)/g, "");//전체 공백 제거
			var check = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/
			if (!check.test(brdt)) {
				customAlert({message:label+"를 정확히 입력해주세요", btn_txt1:"확인"});
				return true;			
			}else{
				return false;
			}

		}
		
		//한글의 경우 접미사를 붙이는 방법(단어, 접미사)
		this.hangeulPostfix = function(text, postfix) {
			var postArr = ['을|를', '과|와', '은|는', '이가|가']  // 한글 받침에 따른 조사 (받침있는것|받침없는것)를 추가
			
			var strGA = 44032; //가
			var strHI = 55203; //힣
			var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
			var textReg = text.replace(reg, "");
			var lastStrCode = text.charCodeAt(textReg.length-1);
			var prop=true;
			var msg;
			
			if (postfix == null || postfix == ''){
				return false;
			}
			
			var index = -1;
			for(i = 0; i < postArr.length; i++) {
				if(postArr[i].includes(postfix)){
					index = i
				}
			}
			
			if(lastStrCode < strGA || lastStrCode > strHI) {
			  msg = text + postfix;
			 }
		
			if (( lastStrCode - strGA ) % 28 == 0) prop = false;
			
			
			if(prop) {
				//받침이 있는 경우
				msg = text + postArr[index].split('|')[0];
			} else {
				//받침이 없는 경우
				msg = text + postArr[index].split('|')[1];
			}
			return msg;
		}
		
		//비밀번호 등록 시 회원의 모바일 번호 유무 체크
		this.isValidPassword = function (onlyNumber, rtnTelNo) {

            // rtnTelNo의 연속된 숫자 추출
            var telNoDigits = rtnTelNo.match(/\d+/g).join('');

            // 패스워드에서 연속된 숫자가 3자리 이상이고, rtnTelNo의 숫자와 3자리 이상으로 일치하지 않으면 true
            var result = onlyNumber && onlyNumber.every(digit => digit.length < 3 || !telNoDigits.includes(digit));
            //    var result = onlyNumber && passDigits.some(digit => digit.length >= 3 && !telNoDigits.includes(digit));

            // 조건을 충족하는지 확인
            return result;
        }

		this.nl2br = function(str) {
			return str.replace(/\n/g, "<br />");
		}
		
		this.br2nl = function(str) {
			return str.replace(/<\s*\/?br\s*[\/]?>/gi, "\n");
		}
		
		//검색, 검색어를 쿠키에 넣는 작업
		this.setCookies = function(param, page) {
			var url = window.location.pathname;
			var c_url = url.substring(0, url.lastIndexOf('/')+1);
			
			$.cookie(cookie_start + 'page', page, {path: c_url});
			for (key in param) {
				$.cookie(cookie_start + key, param[key], {path: c_url});
			}
		}
		
		// 쿠키 가지로 오기
		this.loadCookies = function(callback) {
			var cookies = $.cookie();
			var page = 1;
			
			for (var key in cookies) {
				if (key.startsWith(cookie_start)) {
					var id_value = cookies[key];
					var name = key.replace(cookie_start, '');
					var id = '#' + name;
					
					if($(id).length && name != 'page'){
						$(id).val(id_value);
					} else if ($('input[name=' + name + ']').length) {
						$('input[name=' + name + ']').attr('value', id_value);
					} else if (name =='page'){
						page = id_value;
					} else {
						// 	해결해야 할 것들
					}
				}
			}
			callback(page);
		}
		
		// 위에서 생성한 쿠키 삭제
		this.removeCookie = function() {
			var url = window.location.pathname;
			var c_url = url.substring(0, url.lastIndexOf('/')+1);
			var cookies = $.cookie();
			
			for (var key in cookies) {
				if (key.startsWith(cookie_start)) {
					$.removeCookie(key, {path: c_url});
				}
			}
			$.removeCookie('isMenuLink', {path: _cmsRoot});
		}
		
		//테이블 헤더 만들기
	 	this.renderHdTable = function(tbObj, tbClass, sortCl) {
			$('.card-body table colgroup').remove();
			$('.card-body table thead').remove();
			//console.log("thClass.header : " + tbClass.header);
			setWid  = '<colgroup>'
			addCol  = '	<thead>';
			addCol += '		<tr>';
			$.each(tbObj, function(idx, obj) {
				setWid += '  <col width="' + obj.width + '">'
				if (obj.display == "N"){
					//don't make Header
				} else if (obj.sortYn != 'N'){
					addCol += '      <th class="' + obj.extend_class+" "+ sortCl + '"data-id="' + obj.id +'">'
					 + obj.name + '&nbsp;&nbsp;<span id=' + obj.id + '_way style="color: #1099A7"></span></th>';
				} else if (obj.check == 'Y'){
					addCol += '      <th class="' + obj.extend_class + '"><div class="icheck-primary d-inline ml-2"><input type="checkbox" id="' + obj.id + '_cbbAll"/><label for="' + obj.id + '_cbbAll"></label></div></th>';
				} else {
					addCol += '      <th class="' + obj.extend_class + '">' + obj.name + '</th>';
				}
			});
			setWid += '		</colgroup>'
			addCol += '	</thead>';
			addCol += '</tr>';
			
			renderHd = setWid + addCol
		return renderHd;
		}
		
		// 날짜 + 시분 형식으로 만들기
		this.stringDate = function(obj) {
			var strDate = ""
			let year = obj.getFullYear(); // 년도
			let month = obj.getMonth() + 1;  // 월
			let date = obj.getDate();  // 날짜
			let hours = obj.getHours(); // 시
			let minutes = obj.getMinutes();  // 분
			
			strDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes;
		return strDate;
		}
		
		// 날짜 형식으로 만들기 YYY-MM_DD
		this.strDate = function(obj) {
			var strDate = ""
			var year = obj.getFullYear();
			var month = ('0' + (obj.getMonth() + 1)).slice(-2);
			var day = ('0' + obj.getDate()).slice(-2);
			
			strDate = year + "-" + month + "-" + day;
		return strDate;
		}
		
		
		//자동으로 숫자값 올리기
		this.counter = function(id, max) {
			var now = max
			var handle = setInterval(function(){
				 no = String(Math.ceil(max - now)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				$('#'+id).text(no);
				if (now < 1) {
					clearInterval(handle);
				}
				var step = now / 10 ;
				now -= step;
			}, 20);
		}
		this.isInputAdm = function(label, data){
			if (data == null || data.trim() == '') {
				alert(_this.hangeulPostfix(label, '를') + " 입력해주세요");
				return true;
			}else{
				return false;
			}
		}
		
		this.emailChkAdm = function(label, email){
			var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
			//console.log(label, email)
			if(email.match(regExp) == null){
				alert(label + " 형태에 맞게 작성해주세요");
				return true;
			}else{
				return false;
			}
		}
		
		//정규식 비밀번호 검사(  )
		this.passwdChkAdm = function(label, passwd){
			var regPw = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
			
			if(false === regPw.test(passwd)){
				alert(label + "는 8자~16자, 숫자/영어대소문자/특수문자를 모두 포함해야 합니다");
				return true;
			}else{
				return false;
			}
		}
		
		//정규식 새 비밀번호 검사(  )
		this.newPasswdChkAdm = function(label, newPasswd){
			var regPw = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
			
			if(false === regPw.test(newPasswd)){
				alert(label + "는 8자~16자, 숫자/영어대소문자/특수문자를 모두 포함해야 합니다");
				return true;
			}else{
				return false;
			}
		}
		
		//휴대폰 번호 숫자만(  )
		this.mbtlnumChkAdm = function(label, mbtlnum){
			mbtlnum = mbtlnum.replace(/\-/g,"");//중간 하이픈 제거
			mbtlnum = mbtlnum.replace(/(\s*)/g, "");//전체 공백 제거
			var check = /^(01[016789]{1})?[0-9]{3,4}?[0-9]{4}$/;//하이픈 없이 휴대폰 번호
			if (!check.test(mbtlnum)) {
				alert(label+"를 정확히 입력해주세요");
				return true;			
			}else{
				return false;
			}
		}
		
		this.getEmbedVideoHtml = function(cnDomId) {
			if (_this.isEmpty(cnDomId)) {
				return false;
			}
			
			$(cnDomId + " oembed[url]").each(function() {
				let embedUrl = $(this).attr("url");
				if (_this.isEmpty(embedUrl)) {
					
				} else if (embedUrl.indexOf("facebook") >= 0) {
					let embedHtml = '';
					
					embedHtml += '<div class="fb-video"';
					embedHtml += '	data-href="' + embedUrl + '"';
					embedHtml += '	data-width="500"';
					embedHtml += '	data-allowfullscreen="true"';
					embedHtml += '	data-autoplay="true"';
					embedHtml += '	data-show-captions="true">';
					embedHtml += '</div>';
					
					$(this).closest("figure").removeClass("media")
					$(this).closest("figure").addClass("image")
					$(this).closest("figure").html(embedHtml)
					
					FB.XFBML.parse();
				} else if (embedUrl.indexOf("youtube") >= 0) {
					let embedHtml = '';
					
					embedUrl = "https://www.youtube.com/embed/" + _this.getYoutubeId(embedUrl)
						
					embedHtml += '<iframe';
					embedHtml += '	src="' + embedUrl + '"';
					embedHtml += '	style="width: 500px; height: 300px;"';
					embedHtml += '	frameborder="0"';
					embedHtml += '	allow="autoplay; encrypted-media"';
					embedHtml += '	allowfullscreen="">';
					embedHtml += '</iframe>';
					
					$(this).closest("figure").removeClass("media")
					$(this).closest("figure").addClass("image")
					$(this).closest("figure").html(embedHtml)
				} else if (embedUrl.indexOf("cdninstagram") >= 0) {
					let embedHtml = '';
						
					embedHtml += '<video width="500" controls>';
					embedHtml += '	<source src="' + embedUrl +  '" type="video/mp4">';
					embedHtml += '	비디오는 귀하의 브라우저에서 지원되지 않습니다.';
					embedHtml += '</video>';
					
					$(this).closest("figure").removeClass("media")
					$(this).closest("figure").addClass("image")
					$(this).closest("figure").html(embedHtml)
				} else if (embedUrl.indexOf("/common/imageShow/") >= 0) {
					embedUrl = embedUrl.replace("https://", "");
					embedUrl = embedUrl.replace("http://", "");
					let embedHtml = '';
						
					embedHtml += '<video width="500" controls>';
					embedHtml += '	<source src="' + embedUrl +  '" type="video/mp4">';
					embedHtml += '	비디오는 귀하의 브라우저에서 지원되지 않습니다.';
					embedHtml += '</video>';
					
					$(this).closest("figure").removeClass("media")
					$(this).closest("figure").addClass("image")
					$(this).closest("figure").html(embedHtml)
				}
			});
		}
		
		//게시물, SEO컨텐츠 요약 기능
		this.description = function(rtnCnExtract) {
			//토스트 버튼 옵션 위치
			toastr.options.positionClass = 'toast-top-right';
			
			var sj = $('#sj').val();
			var title = $('#title').val();
			var cnExtract = rtnCnExtract;	
			var content = $('#content').val();			
			var model = $('#model').val();
			var tone = $('#tone').val();
			var summaryCount = $('#summaryCount').val();
						
			//content가 없을 경우 cnExtract를 content에 담는다
			if(!content) {
				content = cnExtract;
			}
			
			//title가 없을 경우 sj를 title에 담는다
			if(sj){
				title = sj;
			}
			
			var param = {
				document: {
					title: title,
			      	content: content
			    },
			    option: {
			      	language: "ko",
			      	model: model,
			      	tone: tone ,
			      	summaryCount: summaryCount
			    }
			}
			//console.log("최종 desciprion을 위한 데이터 param :"+ JSON.stringify(param))

			$.ajax({
				url: '/api/v1/board/summary',			// 요청 할 주소
				async:true,								// false 일 경우 동기 요청으로 변경
				type:'POST', 							// GET, PUT, DELETE
				data: param,							// 전송할 데이터
				dataType:'json',						// xml, json, script, html
				beforeSend:function(jqXHR) {			// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
					
				},	
				success:function(jqXHR) {
					var resultCode = jqXHR.header.code;
					var resultMsg = jqXHR.header.message;					
					
					if (resultCode == "S000") {
						var summary= jqXHR.data.summary;
						toastr.success(resultMsg);						
						$('#summary').val(summary);
					} else {
						toastr.error(resultMsg);
					}
				},
				error:function(jqXHR) {					// 요청 실패.
					
				},		
				complete:function(jqXHR) {				// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
					
				}
			});
		}
		
		// 컨텐츠 SEO '화면 본문 내용' 2000자 초과 시 글자색 변환 기능
		this.textLengthLimitMark = function(){
			//토스트 버튼 옵션 위치
			toastr.options.positionClass = 'toast-top-right';
			
			var cCount = $('#content').val().length;
			var tCount = $('#title').val().length;
			var totalContentCount = cCount + tCount;
			if(totalContentCount > 2000){
				$('#cnCount').css("color","red");
				toastr.error("2000자 초과하였습니다.");
			} else {
				$('#cnCount').css("color","black");
			}
		}

		this.getFileInfo = function(fileList, fileKind) {
        	fileInfos = [];
        	$.each(fileList, function(index, info) {
        	    if (info.fileKnd == fileKind) {
        		    fileInfos.push(info);
        		}
        	});

        	return fileInfos;
        }

        this.chkUseCookie = function() {
			return _this.getVisitCookie('c_use_cookie');
        }
        this.setUseCookie = function() {
			//_this.setVisitCookie('c_use_cookie', "Y", 365);
			let day = 365;
			let key = "c_use_cookie";
			let value = "Y";
			let date = new Date();
			date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
			document.cookie = key + "=" + JSON.stringify(value) + ";expires=" + date.toUTCString() + ";path=/";
        }

        //방문 쿠키 관련 처리
        this.setVisitMenu = function(menuName) {
			let setVisitMenu = _this.getVisitCookie('c_visit_menu');

			if (setVisitMenu == undefined || setVisitMenu == null) {
				setVisitMenu = {}
			}

			switch (menuName) {
				case "about__":
					if (setVisitMenu.about == undefined) {
						setVisitMenu.about = 1;
					} else {
						setVisitMenu.about = parseInt(setVisitMenu.about, 10) + 1;
					}
					break;
				case "insight":
					if (setVisitMenu.insight == undefined) {
                        setVisitMenu.insight = 1;
                    } else {
                        setVisitMenu.insight = parseInt(setVisitMenu.insight, 10) + 1;
					}
					break;
				case "capability":
					if (setVisitMenu.capability == undefined) {
                        setVisitMenu.capability = 1;
                    } else {
                        setVisitMenu.capability = parseInt(setVisitMenu.capability, 10) + 1;
                    }
					break;
				case "work":
					if (setVisitMenu.work == undefined) {
                        setVisitMenu.work = 1;
                    } else {
                        setVisitMenu.work = parseInt(setVisitMenu.work, 10) + 1;
                    }
					break;
				case "customer__":
					if (setVisitMenu.customer == undefined) {
                        setVisitMenu.customer = 1;
                    } else {
                        setVisitMenu.customer = parseInt(setVisitMenu.customer, 10) + 1;
                    }
					break;
				default:
					if (setVisitMenu.visit == undefined) {
                        setVisitMenu.visit = 1;
                    } else {
                        setVisitMenu.visit = parseInt(setVisitMenu.visit, 10) + 1;
                    }
					break;
			}

			_this.setVisitCookie('c_visit_menu', setVisitMenu, 365);
        }

        this.getVisitMenu = function() {
			return _this.getVisitCookie('c_visit_menu');
        }

        this.setVisitCookie = function(key, value, day=1) {

			if (_this.chkUseCookie() == "Y") {
				let date = new Date();
				date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
				document.cookie = key + "=" + JSON.stringify(value) + ";expires=" + date.toUTCString() + ";path=/";
			} else {
				document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			}
        }

        this.getVisitCookie = function(key) {
			let value = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
			return value ? JSON.parse(value[2]) : null;
        }

        this.deleteCookie = function(name) {
                document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }

        this.showLoadingScreen = function() {

			$('#loading_mask').remove();
            let loadingScreen = '';
            loadingScreen += '  <div id="loading_mask">';
            loadingScreen += '  </div>';
            $('body').append(loadingScreen);

			var maskHeight = $(document).height();
			var maskWidth = $(window).width();

			//마스크의 너비와 높이를 화면의 크기값을 받아 전체 화면으로 채운다.
			$("#loading_mask").css({"position":"absolute", "left":0, "top":0, "z-index":9000, "background-color":"#000", "display":"none",  "width":maskWidth, "height":maskHeight, "opacity":0.8});
			$("#loading_mask").show();

			//애니메이션 효과
			//$("#loading_mask").fadeIn(100);
			//$("#loading_mask").fadeTo("slow",0.8);

			$(window).resize(function() {
				var maskHeight = $(document).height();
                var maskWidth = $(window).width();
                $("#loading_mask").css({"width":maskWidth, "height":maskHeight});
			})

        }

        this.hideLoadingScreen = function() {

            $("#loading_mask").fadeOut(500);
            setTimeout(function() {
                $('#loading_mask').remove();
            }, 500)
        }

        this.keyCodeLog = function(param) {
            $.ajax({
            	url: '/common/keyCodeLog',			// 요청 할 주소
            	async:true,								// false 일 경우 동기 요청으로 변경
            	type:'GET', 							// GET, PUT, DELETE
            	data: param,							// 전송할 데이터
            	dataType:'json',						// xml, json, script, html
            	beforeSend:function(jqXHR) {			// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단

            	},
            	success:function(jqXHR) {
            		var resultCode = jqXHR.header.code;
            		var resultMsg = jqXHR.header.message;

            		if (resultCode == "S000") {

            		} else {
            			
            		}
            	},
            	error:function(jqXHR) {					// 요청 실패.

            	},
            	complete:function(jqXHR) {				// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출

            	}
            });
        }

        this.keyCodeLog = function(param) {
            $.ajax({
            	url: '/common/keyCodeLog',			// 요청 할 주소
            	async:true,								// false 일 경우 동기 요청으로 변경
            	type:'GET', 							// GET, PUT, DELETE
            	data: param,							// 전송할 데이터
            	dataType:'json',						// xml, json, script, html
            	beforeSend:function(jqXHR) {			// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단

            	},
            	success:function(jqXHR) {
            		var resultCode = jqXHR.header.code;
            		var resultMsg = jqXHR.header.message;

            		if (resultCode == "S000") {

            		} else {
            			
            		}
            	},
            	error:function(jqXHR) {					// 요청 실패.

            	},
            	complete:function(jqXHR) {				// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출

            	}
            });
        }

        this.getParameterValue = function(paramName, searchUrl = '') {

            let rtn = '';

            if (searchUrl == '') {
                searchUrl = location.search;
            }

			const searchParams = new URLSearchParams(searchUrl);

            for (const param of searchParams) {
                if (paramName == param[0]) {
                    rtn = param[1];
                }
            }

            return rtn;
        }

        this.setDateragepicker = function() {
            $('.datepicker').each(function() {
				//console.log("##### date format : " + $(this).attr('data-date-format'));
				//console.log("##### date time : " + $(this).attr('data-date-time'));
				//console.log("##### date single : " + $(this).attr('data-date-single'));
                let dateFormat = $(this).attr('data-date-format') ? $(this).attr('data-date-format') : 'YYYY-MM-DD';
                let dateTime = $(this).attr('data-date-time') ? $(this).attr('data-date-time') : false;
                let dateAuto = $(this).attr('data-date-auto') ? $(this).attr('data-date-auto') : true;
                let dateSingle = $(this).attr('data-date-single') ? $(this).attr('data-date-single') : true;

                $(this).daterangepicker({
                    locale: {
	                    "separator": " ~ ",                     // 시작일시와 종료일시 구분자
	                    "format": dateFormat,           // 일시 노출 포맷
	                    "applyLabel": "확인",                    // 확인 버튼 텍스트
	                    "cancelLabel": "취소",                   // 취소 버튼 텍스트
	                    "daysOfWeek": ["일", "월", "화", "수", "목", "금", "토"],
	                    "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
                    },
                    timePicker: dateTime,                    // 시간 노출 여부
                    showDropdowns: true,                     // 년월 수동 설정 여부
                    autoApply: dateAuto,                     // 확인/취소 버튼 사용여부
                    timePicker24Hour: false,                 // 24시간 노출 여부(ex> true : 23:50, false : PM 11:50)
                    timePickerSeconds: false,                // 초 노출 여부
                    singleDatePicker: dateSingle             // 하나의 달력 사용 여부
                });
            })
        }

		// ckeditor 5...
		this.setEditor = function(funcObj, postId, toolbarType = 'default', imageUploadType = 'simple') {
			let toolbarConfig = {}; // 툴바 설정을 담을 객체

            // toolbarType에 따라 다른 툴바 구성을 정의합니다.
            switch (toolbarType) {
                case 'full':
                    toolbarConfig = {
                        items: [
                            'undo', 'redo', '|',
                            'heading', '|',
                            'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', '|',
                            'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'code', '|',
                            'link', 'bulletedList', 'numberedList', 'todoList', '|',
                            'alignment', 'outdent', 'indent', 'blockQuote', '|',
                            'insertTable', 'imageUpload', 'mediaEmbed', 'horizontalLine', 'specialCharacters', 'htmlEmbed', '|',
                            'sourceEditing', 'highlight', 'removeFormat', 'codeBlock'
                        ],
                        shouldNotGroupWhenFull: false // 필요에 따라 그룹화 허용
                    };
                    break;
                case 'basic':
                    toolbarConfig = {
                        items: [
                            'heading', '|',
                            'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                            'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', '|',
                            'undo', 'redo'
                        ],
                        shouldNotGroupWhenFull: false // 필요에 따라 그룹화 허용
                    };
                    break;
                case 'simple': // 더 간소화된 툴바
                    toolbarConfig = {
                        items: [
                            'bold', 'italic', 'link', '|',
                            'bulletedList', 'numberedList', '|',
                            'imageUpload', 'mediaEmbed', '|',
                            'undo', 'redo'
                        ],
                        shouldNotGroupWhenFull: false
                    };
                    break;
                case 'comment': // 댓글/간단한 입력용 툴바
                    toolbarConfig = {
                        items: [
                            'bold', 'italic', 'link', '|',
                            'bulletedList', 'numberedList', '|',
                            'undo', 'redo'
                        ],
                        shouldNotGroupWhenFull: false
                    };
                    break;
                case 'openFndBugEvt':
					toolbarConfig = {
                        items: [
                            'bold', 'italic', '|',
                            'bulletedList', 'numberedList', '|',
                            'imageUpload', '|',
                            'undo', 'redo'
                        ],
                        shouldNotGroupWhenFull: false
                    };
                    break;
                default: // 'default' 또는 정의되지 않은 경우 사용자의 기본 툴바 설정 사용
                    toolbarConfig = {
                        shouldNotGroupWhenFull: true // 사용자 요청에 따라 이 옵션만 적용
                    };
                    break;
            }

            //const baseUrl = window.location.origin;
            _this.opt.postId = postId;

            let editorConfig = {
                toolbar: toolbarConfig,
                mediaEmbed: {
                    providers: [
                        {
                            name: 'instagram',
                            url: [
                                /^instagram\.com\/p\/(\w+)/,
                                /^instagram\.com\/reel\/(\w+)/,
                                /^(video)+?[\w-]*(\.cdninstagram\.com)+?[\w-/]*\.mp4/,
                            ]
                        },
                        {
                            name: 'facebook',
                            url: /^facebook\.com/
                        },
                        {
                            name: 'youtube',
                            url: [
                                /^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)(?:&t=(\d+))?/,
                                /^(?:m\.)?youtube\.com\/v\/([\w-]+)(?:\?t=(\d+))?/,
                                /^youtube\.com\/embed\/([\w-]+)(?:\?start=(\d+))?/,
                                /^youtu\.be\/([\w-]+)(?:\?t=(\d+))?/
                            ],
                            html: match => {
                                const id = match[ 1 ];
                                const time = match[ 2 ];

                                return (
                                    '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
                                       `<iframe src="https://www.youtube.com/embed/${ id }${ time ? `?start=${ time }` : '' }" ` +
                                          'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                                          'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                                       '</iframe>' +
                                    '</div>'
                                );
                            }
                        },
                        {
                            name: 'incms',
                            url: /\/common\/imageShow\/([\w-]+)(?:\?start=(FILE_+))?/,
                            html: match => {
                                return (
                                    '<div style="position: relative; width: 50%; margin: 0 auto;">' +
                                       '<video controls="" autoplay="" name="media" style="width: 100%;">' +
                                          '<source src="' + match[0] + '" type="video/mp4">' +
                                       '</video>' +
                                    '</div>'
                                );
                            }
                        },
                    ]
                }
            };

            if (imageUploadType == "base64") {
                // Base64 업로드를 사용하는 경우
                editorConfig.extraPlugins = [ImageUploadBase64AdapterPlugin];
                // simpleUpload 설정은 포함하지 않습니다.
            } else {
                // simpleUpload (서버 업로드)를 사용하는 경우
                editorConfig.simpleUpload = {
                    uploadUrl: '/common/editImageUpload/' + postId,
                };
                // extraPlugins는 비워 두거나, 다른 필요한 플러그인을 추가할 수 있습니다.
                // editorConfig.extraPlugins = [];
            }

			ClassicEditor.create(document.querySelector( '#cnHtml' ), editorConfig)
			.then( newEditor => {
				funcObj.opt.ckEditor = newEditor;
				newEditor.editing.view.document.on( 'enter', ( evt, data ) => {
					if ( data.isSoft ) {
						newEditor.execute( 'enter' );
					} else {
						newEditor.execute( 'shiftEnter' );
					}
					data.preventDefault();
					evt.stop();
					newEditor.editing.view.scrollToTheSelection();
				},
				{ priority: 'high' } )

				 const keyupHandler = (evt, data) => {
					//var currentUrl = window.location.href;
	                $("#btn_summary").attr("disabled", false);
					$(".col-sm-1").show();

					toastr.info("SEO 최적화를 위한 요약 버튼을 활성화 합니다. ")

	                data.preventDefault();
					evt.stop();
	            };

	            if ($('#summary').val() != undefined) {
	                newEditor.editing.view.document.once('keyup', keyupHandler);
	            }
			})
			.catch( error => {
				//console.error( error );
			});
		}

		this.ajaxLoadingStart = function() {
			if (loadingCnt == 0) {
				_this.showLoadingScreen();
			}

			loadingCnt++;
		}

		this.ajaxLoadingEnd = function() {
        	loadingCnt--;

        	if (loadingCnt == 0) {
				_this.hideLoadingScreen();
        	}
        }

        this.formatKSTDate = function(dateStr) {
            // "Fri May 16 15:28:24 KST 2025" → "Fri May 16 15:28:24 2025"
                const cleaned = dateStr.replace(" KST", "");

                // "Fri May 16 15:28:24 2025" → parseable by Date
                const date = new Date(cleaned);

                if (isNaN(date.getTime())) {
                    return "날짜 파싱 실패";
                }

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');

                let hour = date.getHours();
                const minute = String(date.getMinutes()).padStart(2, '0');
                const second = String(date.getSeconds()).padStart(2, '0');

                const isAM = hour < 12;
                const ampm = isAM ? "오전" : "오후";

                hour = hour % 12;
                if (hour === 0) hour = 12;

                const hourStr = String(hour).padStart(2, '0');

                return `${year}-${month}-${day} ${ampm} ${hourStr}:${minute}:${second}`;
        }
	}
	
	libUtil = new $.funcLibUtil();
	libUtil.init();
})

class ImageUploadBase64Adapter {
	constructor(loader) {
		this.loader = loader;
	}

	upload() {
        return this.loader.file
            .then(file => {
                return new Promise((resolve, reject) => {
                    // FileReader 객체를 생성하여 파일을 읽습니다.
                    const reader = new FileReader();

                    // 파일 읽기 성공 시 호출될 이벤트 핸들러
                    reader.onload = function(event) {
                        // event.target.result에 Base64로 인코딩된 문자열이 담겨 있습니다.
                        const base64Data = event.target.result;

                        // CKEditor에 Base64 문자열을 이미지 소스로 전달합니다.
                        resolve({
                            default: base64Data
                        });
                    };

                    // 파일 읽기 실패 시 호출될 이벤트 핸들러
                    reader.onerror = function(error) {
                        reject(new Error('파일을 Base64로 인코딩하는 데 실패했습니다.'));
                    };

                    // 파일을 Data URL (Base64) 형태로 읽기 시작합니다.
                    reader.readAsDataURL(file);
                });
            });
    }

	abort() {
		// 업로드 중단이 필요할 경우 구현
	}
}

function ImageUploadBase64AdapterPlugin(editor) {
	editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new ImageUploadBase64Adapter(loader);
    };
}