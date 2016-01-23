/*	作用于所有页面
	在</body>前加载	
	更新日期 2015年8月3日*/

/**
 * class=“saimg”的图片的src根据在线/离线自动适应
 * @module saImg
 */
var saImg = $("img.saimg");
for(var i = 0; i < saImg.length; i++){
	if(isOnline) var saImgSrc = saImg.eq(i).attr("online"); 
	else var saImgSrc = saImg.eq(i).attr("offline");
	saImg.eq(i).attr({"src":saImgSrc, "onclick":"location.href='" + saImgSrc + "'", "alt":"图片显示失败", "title":"点击查看原图"});
}


/**
 * 大标题及更新日期的动画效果
 * @module titleAnime
 */
var bigTitle = $("#big_title_div"), lastUp = $("#last_update"), lastBtPos = 0;
// 移动端阈值
if(isMobile) var topBoxScroll = 75;
// PC端阈值
else var topBoxScroll = 120;
window.onscroll = function (){
	// 页面滚动超过阈值
	if((window.scrollY > topBoxScroll || window.pageYOffset > topBoxScroll) && lastBtPos <= topBoxScroll){
		lastBtPos = window.scrollY || window.pageYOffset;
		bigTitle.css({"animation":"fade_out 0.01s forwards", "-webkit-animation":"fade_out 0.01s forwards"});
		lastUp.css({"animation":"fade_out 0.01s forwards", "-webkit-animation":"fade_out 0.01s forwards"});
		bigTitle.bind("animationend webkitAnimationEnd", function(){
			bigTitle.unbind();
			if(isMobile) bigTitle.css({"position":"fixed", "top":"12px", "left":"40px", "font-size":"20px"});
			else bigTitle.css({"position":"fixed", "top":"15px", "left":"60px", "font-size":"24px"});
			bigTitle.css({"animation":"fade_in 0.2s linear", "-webkit-animation":"fade_in 0.2s linear"});
		});
	}
	// 页面滚动低于阈值
	else if((window.scrollY <= topBoxScroll || window.pageYOffset <= topBoxScroll) && lastBtPos > topBoxScroll){
		lastBtPos = window.scrollY || window.pageYOffset;
		bigTitle.css({"animation":"fade_out 0.01s forwards", "-webkit-animation":"fade_out 0.01s forwards"});
		bigTitle.bind("animationend webkitAnimationEnd", function(){
			bigTitle.unbind();
			if(isMobile) bigTitle.css({"position":"absolute", "top":"90px", "left":"40px", "font-size":"30px"});
			else bigTitle.css({"position":"absolute", "top":"160px", "left":"22.5%", "font-size":"50px"});
			bigTitle.css({"animation":"fade_in 0.2s linear", "-webkit-animation":"fade_in 0.2s linear"});
			lastUp.css({"animation":"fade_in 0.3s linear", "-webkit-animation":"fade_in 0.3s linear"});
		});
	}
}


/**
 * 导航&菜单
 */

// 写入导航内容
$("#nav").html(
	"<img id='nav_logo' src='image/nav_logo.png' onclick='navHide()' />" +
	"<div><div class='parent'>第一章 SMT相关</div>" +
	"<div class='children'><a class='child' href='rules.html'>SMT组规</a>" +
	"<a class='child' href='history.html'>SMT历史</a>" +
	"<a class='child' href='members.html'>SMT组员</a></div></div>" +
	"<div><div class='parent'>第二章 资源下载</div>" +
	"<div class='children'><a class='child' id='offline_ver_down' href='nav_update.html'>导航版本更新&amp;离线</a>" +
	"<a class='child' href='resources.html'>资源下载整合</a>" +
	"<a class='child' href='logo.html'>SMT logo</a></div></div>" +
	"<div><div class='parent'>第三章 主要教程</div>" +
	"<div class='children'><a class='child' href='content_folder_tutorial.html'>Content解析</a>" +
	"<a class='child' href='windows_tutorial.html'>Windows基础教程</a>" +
	"<a class='child' href='android_tutorial.html'>Android基础教程</a>" +
	"<a class='child' href='ios_tutorial.html'>IOS基础教程</a>" +
	"<a class='child' href='crafting_recipes_tutorial.html'>CraftingRecipes解析</a>" +
	"<a class='child' href='clothes_tutorial.html'>Clothes解析</a>" +
	"<a class='child' href='blocksdata_tutorial.html'>Blocksdata教程</a>" +
	"<a class='child' href='database_tutorial.html'>Database解析</a>" +
	"<a class='child' href='game_dll_tutorial.html'>Survivalcraft.dll教程</a></div></div>" +
	"<div><div class='parent'>第四章 其他教程</div>" +
	"<div class='children'><a class='child' href='regex_tutorial.html'>正则表达式教程</a></div></div>" +
	"<br />");

/**
 * 折叠导航项
 */
for (var i = 0; i < $("#nav .children").length; i++){
	//$("#nav .children").eq(i).css("height", $("#nav .children").eq(i).css("height"));
}
$("#nav div .parent").click(function(e){
	var child_div = $(e.target).next(".children");
	if (child_div.css("height") == "0px"){
		child_div.css("height", child_div.children().length * child_div.children().css("height").substr(0, child_div.children().css("height").length - 2) + "px");
	}
	else child_div.css("height", "0px");
});

/**
 * 导航开关
 */
function navDisp(){
	$("body").css("overflow", "hidden");
	$("#nav").removeClass("nav_hide");
	$("#nav").addClass("nav_show");
	/*if (isMobile) $("#nav_overlay").css("visibility", "visible");
	else*/ $("#nav_overlay").css({"animation":"nav_overlay_show 0.4s linear forwards", "-webkit-animation":"nav_overlay_show 0.4s linear forwards"});
}

function navHide(){
	$("body").css("overflow", "auto");
	$("#nav").removeClass("nav_show");
	$("#nav").addClass("nav_hide");
	/*if (isMobile) $("#nav_overlay").css("visibility", "hidden");
	else*/ $("#nav_overlay").css({"animation":"nav_overlay_hide 0.4s linear forwards", "-webkit-animation":"nav_overlay_hide 0.4s linear forwards"});
}
// 单击页面隐藏导航栏
$("#nav_overlay").click(function(){
	navHide();
});

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