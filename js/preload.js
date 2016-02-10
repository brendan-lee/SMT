// 版本号
/*	主版本号(大修).内容子版本号.框架子版本号.修正版本号	*/
var version = "v2.7.7.12"

// 判断是否在线
var href = window.location.href;
if (window.location.protocol.match(/http/ig) && !href.match(/localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3}/ig)){
	var isOnline = true;
}
else {
	var isOnline = false;
}

/**
 * 统计代码
 */

if (isOnline){
	// 百度统计
	var _hmt = _hmt || [];
	(function() {
		var hm = document.createElement("script");
		hm.src = "//hm.baidu.com/hm.js?af71c0d27742f679093d9e185eee17fb";
		var s = document.getElementsByTagName("script")[0]; 
		s.parentNode.insertBefore(hm, s);
	})();
	
	// 腾讯统计
	document.write("<script type='text/javascript' src='http://tajs.qq.com/stats?sId=40571723' charset='UTF-8'></script>")
}


// 自适应 电脑/手机 css
	var isMobile = false,
		ua = navigator.userAgent;
	if (ua.match(/(windows phone|symbianos|android|mobile|playbook|ipad|iphone|ipod)/i)) {
		isMobile = true;
		document.getElementById("css_main").setAttribute("href", "css/mobi_main.css?" + ver);
		document.getElementById("css_article").setAttribute("href", "css/mobi_article.css?" + ver);
	}

// 返回顶部
function goTop(){
	fadeLock = true;
	$("html, body").animate({scrollTop:0}, 250, function(){
		fadeLock = false;
		chapFade();
	});
}