/**
 * class=“saimg”的图片的src根据在线/离线自动适应
 * @module saImg
 */
var saImg = $("img .saimg"), saImgSrc;
for(var i = 0; i < saImg.length; i++){
	// 在线时
	if (isOnline){
		saImgSrc = saImg.eq(i).attr("data-online");
	}
	// 离线时
	else {
		saImgSrc = saImg.eq(i).attr("data-offline");
	}

	saImg.eq(i).attr({
		"src": saImgSrc,
		"onclick": "location.href='" + saImgSrc + "'",
		"alt": "图片显示失败",
		"title": "点击查看原图"
	});
}


/**
 * 大标题及更新日期的动画效果
 * @module titleAnime
 */
var bigTitle = $("#big_title_div"), lastUp = $("#last_update"), lastBtPos = 0, topBoxScroll;
// 移动端阈值
if(isMobile) topBoxScroll = 75;
// PC端阈值
else topBoxScroll = 120;
$(window).on("scroll", function () {
	// 页面滚动超过阈值
	if ($(window).scrollTop() > topBoxScroll && lastBtPos <= topBoxScroll) {
		lastBtPos = $(window).scrollTop();
		bigTitle.css({
			"animation": "fade_out 0.01s forwards",
			"-webkit-animation": "fade_out 0.01s forwards"
		});
		lastUp.css({
			"animation": "fade_out 0.01s forwards",
			"-webkit-animation": "fade_out 0.01s forwards"
		});
		bigTitle.bind("animationend webkitAnimationEnd", function () {
			bigTitle.unbind();
			if (isMobile) bigTitle.css({
				"position": "fixed",
				"top": "12px",
				"left": "40px",
				"font-size": "20px"
			});
			else bigTitle.css({
				"position": "fixed",
				"top": "15px",
				"left": "60px",
				"font-size": "24px"
			});
			bigTitle.css({
				"animation": "fade_in 0.2s linear",
				"-webkit-animation": "fade_in 0.2s linear"
			});
		});
	}
	// 页面滚动低于阈值
	else if ($(window).scrollTop() <= topBoxScroll && lastBtPos > topBoxScroll) {
		lastBtPos = $(window).scrollTop();
		bigTitle.css({
			"animation": "fade_out 0.01s forwards",
			"-webkit-animation": "fade_out 0.01s forwards"
		});
		bigTitle.bind("animationend webkitAnimationEnd", function () {
			bigTitle.unbind();
			if (isMobile) {
				bigTitle.css({
					"position": "absolute",
					"top": "90px",
					"left": "40px",
					"font-size": "30px"
				});
			}
			else {
				bigTitle.css({
					"position": "absolute",
					"top": "160px",
					"left": "22.5%",
					"font-size": "50px"
				});
			}
			bigTitle.css({
				"animation": "fade_in 0.2s linear",
				"-webkit-animation": "fade_in 0.2s linear"
			});
			lastUp.css({
				"animation": "fade_in 0.3s linear",
				"-webkit-animation": "fade_in 0.3s linear"
			});
		});
	}
});


/**
 * 导航&菜单
 */

// 写入导航内容
$("#nav").html(
	"<img id='nav_logo' src='image/nav_logo.png' onclick='navHide()' />" +
	"<div><div class='parent'>第一章 SMT相关</div>" +
	"<div id='nav_children_1' class='children'><a class='child' href='rules.html'>SMT组规</a>" +
	"<a class='child' href='history.html'>SMT历史</a>" +
	"<a class='child' href='members.html'>SMT组员</a></div></div>" +

	"<div><div class='parent'>第二章 资源下载</div>" +
	"<div id='nav_children_2' class='children'><a class='child' id='offline_ver_down' href='nav_update.html'>导航版本更新&amp;离线</a>" +
	"<a class='child' href='resources.html'>资源下载整合</a>" +
	"<a class='child' href='logo.html'>SMT logo</a></div></div>" +

	"<div><div class='parent'>第三章 主要教程</div>" +
	"<div id='nav_children_3' class='children'><a class='child' href='content_folder_tutorial.html'>Content解析</a>" +
	"<a class='child' href='windows_tutorial.html'>Windows基础教程</a>" +
	"<a class='child' href='android_tutorial.html'>Android基础教程</a>" +
	"<a class='child' href='ios_tutorial.html'>IOS基础教程</a>" +
	"<a class='child' href='xml_tutorial.html'>XML基础知识</a>" +
	"<a class='child' href='crafting_recipes_tutorial.html'>CraftingRecipes解析</a>" +
	"<a class='child' href='clothes_tutorial.html'>Clothes解析</a>" +
	"<a class='child' href='blocksdata_tutorial.html'>Blocksdata教程</a>" +
	"<a class='child' href='database_tutorial.html'>Database解析</a>" +
	"<a class='child' href='game_dll_tutorial.html'>Survivalcraft.dll教程</a></div></div>" +

	"<div><div class='parent'>第四章 其他教程</div>" +
	"<div id='nav_children_4' class='children'><a class='child' href='regex_tutorial.html'>正则表达式教程</a></div></div>" +
	"<br />");

/**
 * 折叠导航项
 */
function openNavItem(e){
	var childrenDiv = $(e.target).next(".children");

	$("#nav .parent").css("background", ""); // 取消全部高亮
	$(e.target).css("background", "#ddd"); // 高亮选择的项

	// 展开/折叠
	if (childrenDiv.css("height") == "0px"){ // 如果选中的项未展开
		$("#nav .children").height(0); // 收起全部项
		childrenDiv.height(childrenDiv.children().length * childrenDiv.children().eq(0).height()); // 展开选中的项
	}
	else { // 如果选中的项已展开
		$("#nav .parent").css("background", ""); // 取消高亮
		childrenDiv.height(0); // 收起选中的项
	}
}

$("#nav .parent").click(function(e){
	openNavItem(e);
});

/**
 * 突出导航栏中当前所在页
 */
// 展开当前所在的项
function openCurNavItem(navItemId){
	var childrenDiv = $("#nav_children_" + navItemId);
	childrenDiv.height(childrenDiv.children().length * childrenDiv.children().eq(0).height()); // 展开该项
	childrenDiv.prev().css("background", "#ddd"); // 高亮所在的章节
}
openCurNavItem($("#nav").attr("data-open"));

// 高亮当前页
function highlightCurNavItem(){
	var page = document.location.toString(),
		tmp = page.split("/");
	page = tmp[tmp.length - 1]; // 获取当前页面名称
	$("[href='" + page + "']").css({"background":$("#top_box").css("background-color"), "color":"#fff"}); //href=当前页名称的元素高亮
}
highlightCurNavItem();


/**
 * 导航开关
 */
var isNavOpen = false;

function navDisp(){
	var nav = $("#nav");
	//$("body").css("overflow", "hidden");
	nav.removeClass("nav_hide");
	nav.addClass("nav_show");
	$("#nav_overlay").css({
		"animation":"nav_overlay_show 0.4s linear forwards",
		"-webkit-animation":"nav_overlay_show 0.4s linear forwards"
	});
	isNavOpen = true;
}

function navHide(){
	var nav = $("#nav");
	//$("body").css("overflow", "auto");
	nav.removeClass("nav_show");
	nav.addClass("nav_hide");
	$("body").removeClass("lock_position");
	$("#nav_overlay").css({
		"animation":"nav_overlay_hide 0.4s linear forwards",
		"-webkit-animation":"nav_overlay_hide 0.4s linear forwards"
	});
	isNavOpen = false;
}

/**
 * 鼠标/触摸操作处理函数
 */
function mouseHandler(e){
	var nav = $("#nav");

	if (e.target.id == "nav_overlay"){
		switch (e.type){
			// 点击nav_overlay时关闭导航栏
			case "click":
				navHide();
				break;

			// 展开导航栏时禁止在nav_overlay上滚动页面
			case "mousewheel":
				e.returnValue = false;
				e.preventDefault();
				break;
			case "touchmove":
				e.returnValue = false;
				e.preventDefault();
				break;
			case "DOMMouseScroll":
				e.returnValue = false;
				e.preventDefault();
				break;
		}
	}

	// PC禁止在导航栏内滚动正文页面
	else if (isNavOpen && (e.type == "mousewheel" || e.type == "DOMMouseScroll")){
		// 导航栏中没有滚动条时，禁止滚动
		if (nav.prop("scrollHeight") == $(window).height()){
			e.returnValue = false;
			e.preventDefault();
		}

		// 有滚动条且位于导航栏顶端时，禁止向上滚动
		else if ($("#nav").scrollTop() == 0){
			// 鼠标滚轮
			if (e.wheelDelta){ // 其他浏览器
				if (e.wheelDelta > 0){ // 向上滚动
					e.returnValue = false;
					e.preventDefault();
				}
			}
			else { // FF
				if (e.detail < 0){ // 向上滚动
					e.returnValue = false;
					e.preventDefault();
				}
			}
		}

		// 有滚动条且位于导航栏底端时，禁止向下滚动
		else if (nav.prop("scrollHeight") - $(window).height() - nav.scrollTop() == 0){
			// 鼠标滚轮
			if (e.wheelDelta){ // 其他浏览器
				if (e.wheelDelta < 0){ // 向下滚动
					e.returnValue = false;
					e.preventDefault();
				}
			}
			else { // FF
				if (e.detail > 0){ // 向下滚动
					e.returnValue = false;
					e.preventDefault();
				}
			}
		}
	}

	// 移动端禁止在导航栏内滚动正文页面
	else if (isNavOpen ) {
		if (e.type == "touchstart"){ // 触摸开始
			// 单点触摸时
			if (e.targetTouches.length == 1) {
				var touch = e.targetTouches[0];
				startY = touch.pageY;
			}
		}
		if (e.type == "touchmove"){ // 移动开始
			// 单点触摸时
			if (e.targetTouches.length == 1) {
				var touch = e.targetTouches[0];
				spanY = touch.pageY - startY;

				// 无滚动条时禁止滚动
				if (nav.prop("scrollHeight") == $(window).height()){
				 	e.preventDefault();
				}

				// 向上滑动时
				else if (spanY > 0) {
					// 有滚动条且位于导航栏顶端时，禁止向上滚动
					if ($("#nav").scrollTop() == 0){
						e.preventDefault();
					}
				}

				// 向下滑动时
				else if (spanY < 0) {
					// 有滚动条且位于导航栏底端时，禁止向下滚动
					if (nav.prop("scrollHeight") - $(window).height() - nav.scrollTop() == 0){
						e.preventDefault();
					}
				}
			}

			// 在导航栏内滑动时锁定body的滚动（在navHide方法中解锁）
			$("body").addClass("lock_position");
		}
	}
}
// PC鼠标事件绑定
document.addEventListener("click", mouseHandler);
document.addEventListener("mousewheel", mouseHandler);
document.addEventListener("DOMMouseScroll", mouseHandler);
// 移动端触摸事件绑定
document.addEventListener("touchstart", mouseHandler);
document.addEventListener("touchend", mouseHandler);
document.addEventListener("touchmove", mouseHandler);

/**
 * 菜单开关
 */
var isMenuShow = false;
function menuToggle(){
	if (isMenuShow){
		$("#menu").css({"animation":"menu_hide 0.3s forwards", "-webkit-animation":"menu_hide 0.3s forwards"});
		isMenuShow = false;
		return;
	}else {
		$("#menu").css({"animation":"menu_show 0.3s forwards", "-webkit-animation":"menu_show 0.3s forwards"});
		isMenuShow = true;
		return;
	}
}

/**
 * 单击页面其他位置隐藏菜单
 */
var isMouseOverMenu;
$(document).click(function(){
	// Windows Phone跳出
	if (ua.indexOf("windows phone") != -1) return;
	// 鼠标覆盖菜单
	$("#menu").hover(function(){
		isMouseOverMenu = true;
	}, function(){
		isMouseOverMenu = false;
	});
	// 鼠标覆盖菜单按钮
	$("#menu_btn").hover(function(){
		isMouseOverMenu = true;
	}, function(){
		isMouseOverMenu = false;
	});
	// 未覆盖则隐藏
	if (isMouseOverMenu == false && isMenuShow){
		menuToggle();
	}
});

/**
 * 菜单跳转功能
 */
function menuTo(target){
	menuToggle();
	if (isMobile){
		$("html, body").animate({scrollTop:document.getElementById(target).offsetTop - 45},250);
	} else {
		$("html, body").animate({scrollTop:document.getElementById(target).offsetTop - 60},250);
	}
}