/*	作用于所有页面
	在<body>前加载	
	更新日期 2015年8月17日*/

//版本号
/*	主版本号(大修).内容子版本号.框架子版本号.修正版本号	*/
var version = "v2.6.6.11"


//判断是否在线
if (window.location.protocol.match(/http/i)) var isOnline = true;
else var isOnline = false;

// IE在页首显示警示
var ua = navigator.userAgent.toLowerCase();
if ((ua.match(/msie/i)) && (ua.match(/windows nt/i))){
	document.write("<div style='position:fixed; z-index:999; top:20px; left:200px;'><span style='color:red; font-weight:bold; font-size:16px;'>IE糟糕的兼容性会导致页面显示错误，请换用其他浏览器访问！</span></div>");
}

// 自适应 电脑/手机 css
	var isMobile = false;
	if (ua.match(/(windows phone|symbianos|android|mobile|playbook|ipad|iphone|ipod)/i)) {
		isMobile = true;
		document.getElementById("css_main").setAttribute("href", "css/mobi_main.css?" + ver);
		document.getElementById("css_article").setAttribute("href", "css/mobi_article.css?" + ver);
	}

// 返回顶部
function goTop(){
	$("html, body").animate({scrollTop:0}, 250);
}