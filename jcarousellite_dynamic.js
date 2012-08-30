//--- jcl_dynamic.js
;(function($) {

	var ver = 'jclDynamic-0.2';

	var vars = {
		me:        null,
		opts:      null,
		start:     0,     // カルーセルのstart位置
		nextStart: 0,     // 次のstart位置
		page_prev: 1,     // ページング件数
		page_next: 1,     // ページング件数
		direction: "",    // prevかnextか、どちら?
		loading: false
	};


	$.fn.jcl_dynamic = function(options) {
		return this.each(function() {
			vars.me = this;
			
			options = options || {};
			vars.opts = $.extend({}, $.fn.jcl_dynamic.defaults, options || {});
			
			// カルーセルのliの長さをカウント
			vars.nextStart = $(vars.me).find('ul li').length - vars.opts.visible;
			
			// pageに指示があるならそれに従う
			if (vars.opts.page) {
				vars.page_prev = vars.opts.page;
				vars.page_next = vars.opts.page;
			}
			
			// 最初のカルーセル
			setCarousel();
		});
	}

	function loadCarouselUl(url) {
		if (vars.loading == true) return;
		
		vars.loading = true;
		
		$.ajax({
			type: 'get',
			url: url,
			dataType: 'json',
			error : function() {
				vars.loading = false;
			},
			success: function(json){
				if (json == '') { return; }
				
				if (vars.direction == 'next')
					vars.page_next = vars.nextPage_next;
				else
					vars.page_prev = vars.nextPage_prev;
				
				// make list
				var li = '';
				for (var i = 0 ; i < json.length ; i++) {
					li += '<li><img src="'+ json[i]['image'] +'" alt="'+ json[i]['alt'] +'" width="'+ json[i]['width'] +'" height="'+ json[i]['height']+'" /></li>' + "\n";
				}
				// jsonが表示件数に満たないなら、空のliを追加する
				if (json.length < vars.opts.visible) {
					for (var i = 0 ; i < (vars.opts.visible - json.length) ; i++) {
						li += '<li>&nbsp;</li>'+ "\n";
					}
				}
				if (vars.direction == 'next')
					$(vars.me).find('ul').append(li);
				else
					$(vars.me).find('ul').prepend(li);
				
				vars.start = vars.nextStart;
				// カルーセルのliの長さをカウント
				vars.nextStart = $(vars.me).find('ul li').length - vars.opts.visible;
				vars.loading = false;
				
				if (vars.direction == 'prev')
					vars.start = vars.nextStart - vars.start; // 左の位置は、追加liの件数分だけズラす
				
				var dfd = $.Deferred();
				dfd.then(function(){
					// カルーセルを設定
					setCarousel();
	//				console.log("D1:setCarousel fin");
				}).then(function(){
					// 1つ送る
					if (vars.direction == 'next')
						$(vars.opts.btnNext).trigger("click.next.jcarousellite");
					else
						$(vars.opts.btnPrev).trigger("click.prev.jcarousellite");
	//				console.log("D2:trigger click next!");
				});
				dfd.resolve();
			}
		});
	}
	function setCarousel() {
//		$(vars.opts.btnNext).click({});
//		$(vars.opts.btnPrev).click({});
		
		$(vars.me).jCarouselLite({
			visible:  vars.opts.visible,
			scroll:   vars.opts.scroll,
			circular: vars.opts.circular,
			start:    vars.start,
			btnNext:  vars.opts.btnNext,
			btnPrev:  vars.opts.btnPrev,
			scrollFirst: prevCarousel,
			scrollLast: nextCarousel
		});
	}
	function nextCarousel() {
		vars.direction = 'next';
		vars.nextPage_next = vars.page_next + 1;
		if (vars.nextPage_next > vars.opts.max_page) {
			vars.nextPage_next = 1; // 最大まで行ってたら1ページ目に戻す
		}
		var url = vars.opts.apiURL;
		url = url.replace(/{PAGE}/, vars.nextPage_next);
		loadCarouselUl(url);
	}
	function prevCarousel() {
		vars.direction = 'prev';
		vars.nextPage_prev = vars.page_prev - 1;
		if (vars.nextPage_prev == 0) {
			vars.nextPage_prev = vars.opts.max_page; // 0まで行ってたら最大ページ目に戻す
		}
		var url = vars.opts.apiURL;
		url = url.replace(/{PAGE}/, vars.nextPage_prev);
		loadCarouselUl(url);
	}

	$.fn.jcl_dynamic.defaults = {
		visible :  2,
		scroll  :  1,
		circular: false,
		btnNext : ".next",
		btnPrev : ".prev",
		apiURL  : "data{PAGE}_json.php",
		page    : 1,
		max_page: 10
	};

	$.fn.jcl_dynamic.ver = function() {
		return ver;
	};

})(jQuery);
