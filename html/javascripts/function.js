// Image Rollover
function initRollOverImages() {
	var image_cache = new Object();
	$(".rollover").each(function(i) {
		var imgsrc = this.src;
		var dot = this.src.lastIndexOf('.');
		var imgsrc_over = this.src.substr(0, dot) + '_over' + this.src.substr(dot, 4);
		image_cache[this.src] = new Image();
		image_cache[this.src].src = imgsrc_over;
		$(this).hover(
			function() { this.src = imgsrc_over; },
			function() { this.src = imgsrc; });
	});
}


// Smooth Scroll Setting
jQuery.easing.quart = function (x, t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
};  

// Smooth Scroll
function smoothScroll() {
	$('a[href*=#]').click(function () {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		    $(this).blur();
		    var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
				var targetOffset = $target.offset().top - 50;
				$('html,body').animate({scrollTop: targetOffset}, 600, 'quart');
				return false;
			}
		}
	});
}

function slideVisual(){

	$.featureList(
		$("#tabs li a"),
		$("#output li"), {
			start_item: 0
		}
	);
}

// ページコンテンツを読み込む関数
function loadPage(pageName) {
	// fetch APIを使ってページの内容を取得
	fetch(pageName)
		.then(response => response.text())
		.then(html => {
			// 取得したHTMLをmain-areaに直接挿入
			$("#main-area").html(html);
			
			// お問い合わせページまたはプライバシーポリシーページの場合、特定の要素を非表示にする
			if (pageName === 'contact.html' || pageName === 'pp.html') {
				$("#sub-area, #visual, #navigation").hide();
			} else {
				// それ以外のページでは表示する
				$("#sub-area, #visual, #navigation").show();
			}
			
			// ページの一番上にスクロールする
			window.scrollTo(0, 0);
		})
		.catch(error => {
			console.error('コンテンツの読み込み中にエラーが発生しました:', error);
		});
}

//////////////////////////////////////////////////////

$(document).ready(function() {

	smoothScroll();
	initRollOverImages();
	slideVisual();

});
