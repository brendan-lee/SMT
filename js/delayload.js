﻿/********************
 *       导航
 ********************/

// 导航内容
var navContent = [
    {
        section: "第一章 SMT相关",
        tutors: [
            {name: "SMT组规", uri: "rules.html"},
            {name: "SMT历史", uri: "history.html"},
            {name: "SMT组员", uri: "members.html"}
        ]
    },
    {
        section: "第二章 资源下载",
        tutors: [
            {name: "导航版本更新&离线", uri: "nav_update.html", id: "offline_ver_down"},
            {name: "资源下载整合", uri: "resources.html"},
            {name: "SMT logo", uri: "logo.html"}
        ]
    },
    {
        section: "第三章 主要教程",
        tutors: [
            {name: "Content解析", uri: "content_folder_tutorial.html"},
            {name: "Windows基础教程", uri: "windows_tutorial.html"},
            {name: "Android基础教程", uri: "android_tutorial.html"},
            {name: "IOS基础教程", uri: "ios_tutorial.html"},
            {name: "XML基础教程", uri: "xml_tutorial.html"},
            {name: "CraftingRecipes解析", uri: "crafting_recipes_tutorial.html"},
            {name: "Clothes解析", uri: "clothes_tutorial.html"},
            {name: "Blocksdata解析", uri: "blocksdata_tutorial.html"},
            {name: "Database解析", uri: "database_tutorial.html"},
            {name: "“源代码”教程", uri: "source_code_tutorial.html"}
        ]
    },
    {
        section: "第四章 其他教程",
        tutors: [
            {name: "正则表达式教程", uri: "regex_tutorial.html"},
			{name: "发布范例", uri: "publication_example.html"}
        ]
    }
];

// 写入导航栏
function generateNav(navData) {
    var html = "<img id='nav_logo' src='image/nav_logo.png' />\n";
	
    for (var i = 0; i < navData.length; ++i) {
        var section = navData[i].section;
        var tutors = navData[i].tutors;
		
		html += "<div class='parent'> " + section + " </div>\n";
		html += "<div id='nav_children_" + (i + 1) + "' class='children'>\n";
		
        for (var j = 0; j < tutors.length; ++j) {
			var name = tutors[j].name;
			var uri = tutors[j].uri;
			var id = tutors[j].id;
			
            var tag = "<a class='child' href='" +  uri + "' ";
			if (!!id) { tag += "id='" + id + "' " }; // 如果存在id，则写入
			tag += "> " + name + " </a>";
			
			html += tag + "\n";
        }
		html += "</div>\n"; // children
    }
    
	html += "<br />\n";
	return html;
}
$("#nav").html(generateNav(navContent));
$("#nav_logo").bind("click touchstart touchmove touchend", function(){
	click(navHide);
})





/**
 * 点击折叠章节
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
 * 突出当前所在页
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

// 点击导航栏外，关闭导航栏
$("#nav_overlay").bind("click touchstart touchmove touchend", function(){
	click(navHide);
})

// 导航按钮 点击事件
$("#nav_btn").bind("click touchstart touchmove touchend", function(){
	click(navDisp);
})





/**
 * 禁止页面滚动
 */

// 导航栏外
$("#nav_overlay").bind("mousewheel DOMMouseScroll touchmove", function(e){
	e = e || window.event;
	e.preventDefault();
	e.returnValue = false;
})

// PC 导航栏内
$("#nav").bind("mousewheel DOMMouseScroll", function(e){
	e = e || window.event
		nav = $("#nav");
		
	// 没有滚动条
	if (nav.prop("scrollHeight") == $(window).height()){
		e.returnValue = false;
		e.preventDefault();
	}
	
	// 有滚动条,位于顶端
	else if (nav.scrollTop() == 0){
		if (e.wheelDelta){
			if (e.wheelDelta > 0){
				e.returnValue = false;
				e.preventDefault();
			}
		}
		else {
			if (e.detail < 0){
				e.returnValue = false;
				e.preventDefault();
			}
		}
	}

	// 有滚动条,位于底端
	else if (nav.prop("scrollHeight") - $(window).height() - nav.scrollTop() == 0){
		if (e.wheelDelta){
			if (e.wheelDelta < 0){
				e.returnValue = false;
				e.preventDefault();
			}
		}
		else {
			if (e.detail > 0){
				e.returnValue = false;
				e.preventDefault();
			}
		}
	}
})

// 移动端 导航栏内
$("#nav").bind("touchstart", function(e){
	window.startY = e.originalEvent.touches[0].pageY;
})

$("#nav").bind("touchmove", function(e){
	var spanY = e.originalEvent.touches[0].pageY - startY,
		nav = $("#nav");

	// 无滚动条时禁止滚动
	if (nav.prop("scrollHeight") == $(window).height()){
	 	e.preventDefault();
	 	e.returnValue = false;
	}
	// 向上滑动
	else if (spanY > 0) {
		if (nav.scrollTop() == 0){
			e.preventDefault();
			e.returnValue = false;
		}
	}
	// 向下滑动
	else if (spanY < 0) {
		if (nav.prop("scrollHeight") - $(window).height() - nav.scrollTop() == 0){
			e.preventDefault();
			e.returnValue = false;
		}
	}

	// 滑动时锁定body（在navHide方法中解锁）
	$("body").addClass("lock_position");
})









/********************
 *        菜单
 ********************/

/**
 * 菜单开关
 */

var isMenuShow = false;
function menuToggle(){
	if (isMenuShow){
		$("#menu").css({"animation":"menu_hide 0.3s forwards", "-webkit-animation":"menu_hide 0.3s forwards"});
		$("#menu").bind("animationend webkitAnimationEnd", function(){
			$("#menu").unbind();
			isMenuShow = false;
		})
	} else {
		$("#menu").css({"animation":"menu_show 0.3s forwards", "-webkit-animation":"menu_show 0.3s forwards"});
		setTimeout(function(){
			isMenuShow = true;
		}, 1);
		$("#menu").bind("animationend webkitAnimationEnd", function(){
			$("#menu").unbind();
			
		})
	}
}

// 菜单按钮 点击事件
$("#menu_btn").bind("click touchstart touchmove touchend", function(){
	click(menuToggle);
})

// 点击菜单外关闭菜单
$(document).bind("click touchstart touchmove touchend", function(e){
	e = e || window.event;
	if ($(e.target).parents("#menu").length == 0 && e.target.id != "menu" && isMenuShow){
		click(menuToggle);
	}
})





/**
 * 菜单跳转功能
 */
function menuTo(id){
	if (isMobile){
		$("html, body").animate({scrollTop:document.getElementById(id).offsetTop - 45}, 250);
	}
	else {
		$("html, body").animate({scrollTop:document.getElementById(id).offsetTop - 60}, 250);
	}

    location.hash = id;

	// 关闭菜单
	menuToggle();
}

// 菜单项点击事件
var menuItems = $("#menu [data-menuto]");
menuItems.bind("click touchstart touchmove touchend", function(e){
	click(function(){
		menuTo($(e.target).attr("data-menuto"))
	})
})





/**
 * 文章倒序功能
 */
function reverseChapter(scroll, addScrollDis) {
	var chapt = $(".chapter"),
		menu = $("#menu .parent"),
		scrollTop = $(document).scrollTop();
		tmp = [];

	// 倒序读入正文
	for (var i = chapt.length - 1, j = 0; i >= 0; i--, j++) {
		tmp[i] = chapt.eq(j).prop("outerHTML");
	}
	// 顺序写出正文
	for (var i = 0; i < chapt.length; i++) {
		chapt.eq(i).prop("outerHTML", tmp[i]);
	}

	// 倒序读入菜单
	for (var i = menu.length - 1, j = 0; i >= 0; i--, j++){
		tmp[i] = menu.eq(j).prop("outerHTML");
	}
	// 顺序写出菜单
	for (var i =0; i < menu.length; i++){
		menu.eq(i).prop("outerHTML", tmp[i]);
	}

	// 更新数组
	chapt = $(".chapter"),
	menu = $("#menu .parent");

	// 如果第一个chapter没有锚标记，则更新锚标记（history.html）
	if (typeof(chapt.eq(0).attr("id")) == "undefined"){
		var subscript = [];

		// 记录所有锚标记的角标
		for (var i = 0, j = 0; i < chapt.length; i++){
			if (typeof(chapt.eq(i).attr("id")) != "undefined"){
				subscript[j] = i;
				j++;
			}
		}
		// 把第一个锚标记提前到第一个chapter
		chapt.eq(0).attr("id", chapt.eq(subscript[0]).attr("id"));
		chapt.eq(subscript[0]).removeAttr("id");

		// 提前剩余锚标记
		for (var i = 1; i < subscript.length; i++){
			chapt.eq(subscript[i - 1] + 1).attr("id", chapt.eq(subscript[i]).attr("id"));
			chapt.eq(subscript[i]).removeAttr("id");
		}
	}

	if (scroll){
		// 移到倒序前的阅读位置（目标滚动距离 = content_box高度 + margin(20px) + 2 * top_box_top高度 - 滚动距离 - 可视高度 - top_box高度）
		var targetScroll = $("#content_box").prop("scrollHeight") + 20 + 2 * $("#top_box_top").height() -
			$(document).scrollTop() - $(window).height() - $("#top_box").height() + addScrollDis;
		$("html, body").animate({scrollTop: targetScroll}, 250);
	}

	// 关闭菜单
	menuToggle();
}










/********************
 *       正文
 *******************/

/**
 * 表格折叠
 */

function tableFold(target){
	var table = $(target).parents('table'),
		content = table.find('tr:not(:first)'),
		img = table.find('tr:first').find('td:last').children('img');
	
	if (table.hasClass('folded')){
		table.removeClass('folded');
		content.css('display', 'table-row');
		img.attr('src', 'image/fold.svg');
	}
	else {
		table.addClass('folded');
		content.css('display', 'none');
		img.attr('src', 'image/unfold.svg');
	}
}

function findFoldableTables(){
	var tables = $('table');
	if (isMobile){
		var threshold = 400;
	}
	else {
		var threshold = 600;
	}
	
	for (var i = 0; i < tables.length; i++){
		if (tables.eq(i).height() > threshold){
			var td = tables.eq(i).find('tr:first').find('td:last');
			
			td.css({'position':'relative', 'padding-right':'26px'});
			td.append('<img class="fold_btn" style="position:absolute; right:3px; cursor:pointer;" />');
			tableFold(tables.eq(i).children().eq(0));
		}
	}
	
	$('.fold_btn').bind("click touchstart touchmove touchend", function(e){
		e = e || window.event;
		click(function(){tableFold(e.target)});
	})
}









/********************
 *       图片
 ********************/

/**
 * saimg自适应在线/离线src
 */

var saImg = $(".saimg"), saImgSrc;
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
		"alt": "图片显示失败"
	});
}





/**
 * 缩放图片
 */

var magImgDiv = $(".magnifiable");
magImgDiv.attr("title", "点击放大查看");
magImgDiv.bind("click touchstart touchmove touchend", function(){
	var src = this.src;
	click(function(){magnifyImg(src)});
})


function magnifyImg(src){
	// 插入放大图片div
/*	$("body").append("<div id='mag_img_wrapper'><img id='mag_img' src='" + $(this).attr("src") + "' /></div>");
	var magImg = $("#mag_img");

	magImg.on("load", function(){
		magWidth = magImg.width();
		magHeight = magImg.height();
		magTop = parseInt(magImg.css("top").split("px")[0]);
		magLeft = parseInt(magImg.css("left").split("px")[0]);
		magMarginTop = parseInt(magImg.css("margin-top").split("px")[0]);
		magMarginLeft = parseInt(magImg.css("margin-left").split("px")[0]);

		// 设置图片水平垂直居中
		magMarginTop -= parseInt(magImg.height() / 2);
		magMarginLeft -= parseInt(magImg.width() / 2);
		magImg.css({"margin-top":magMarginTop + "px", "margin-left":magMarginLeft + "px"});

		// 明确img宽度，以在首次滚轮缩放时产生transition动画
		magImg.width(magImg.width());
	})
	
	// 点击关闭图片
	$("#mag_img_wrapper").bind("click touchstart touchmove touchend", function(){
		click(closeImg);
	})
*/

	// 暂定
	window.open(src);
	//console.debug(this.src)
}





/**
 * 关闭图片
 */

function closeImg(){
	var imgDiv = $("#mag_img_wrapper");
	imgDiv.css({"animation":"fade_out 0.3s ease-out", "-webkit-animation":"fade_out 0.3s ease-out"});
	imgDiv.bind("animationend webkitAnimationEnd", function () {
		imgDiv.remove();
	});
	setTimeout(function(){imgDiv.remove()}, 350); // 若animationend久未生效，则强制移除
}













/********************
 *      大标题
 ********************/

var bigTitle = $("#big_title_div"), lastUp = $("#last_update"), lastBtPos = 0, topBoxScroll;
// 移动端阈值
if(isMobile) topBoxScroll = 75;
// PC端阈值
else topBoxScroll = 120;

function changeBT(){
	// 滚动超过阈值
	if ($(document).scrollTop() > topBoxScroll && lastBtPos <= topBoxScroll) {
		lastBtPos = $(document).scrollTop();
		bigTitle.css({
			"animation": "fade_out 0.01s forwards",
			"-webkit-animation": "fade_out 0.01s forwards"
		});
		lastUp.css({
			"animation": "fade_out 0.01s forwards",
			"-webkit-animation": "fade_out 0.01s forwards"
		});
		bigTitle.bind("animationend webkitAnimationEnd", function () {
			bigTitle.unbind("animationend webkitAnimationEnd");
			// 移动端
			if (isMobile) bigTitle.css({
				"position": "fixed",
				"top": "12px",
				"left": "40px",
				"font-size": "20px"
			});
			// 电脑
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
	
	// 滚动低于阈值
	else if ($(document).scrollTop() <= topBoxScroll && lastBtPos > topBoxScroll) {
		lastBtPos = $(document).scrollTop();
		bigTitle.css({
			"animation": "fade_out 0.01s forwards",
			"-webkit-animation": "fade_out 0.01s forwards"
		});
		bigTitle.bind("animationend webkitAnimationEnd", function () {
			bigTitle.unbind("animationend webkitAnimationEnd");
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
}




/**
 * 点击返回顶部
 */
$(document.getElementById("big_title_div")).bind("click touchstart touchmove touchend", function(){
	click(goTop)
})











/********************
 *       其他
 ********************/

/** 
 * 避免click的300ms延迟
 */

function click(func){
	var e = window.event || arguments.callee.caller.arguments[0];
	
	switch (e.type){
		case "touchstart":
			startX = e.touches[0].pageX;
			startY = e.touches[0].pageY;
			spanX = 0;
			spanY = 0;
			break;
			
		case "touchmove":
			spanX = e.touches[0].pageX - startX;
			spanY = e.touches[0].pageY - startY;
			break;
		
		case "touchend":
			if (Math.abs(spanX) < 3 && Math.abs(spanY) < 3){
				func();
			}
			break;
			
		case "click":
			if (!isMobile){
				func();
			}
			break;
	}
}





/**
 * ban各种sb浏览器
 */

if ((ua.match(/msie/i) && ua.match(/Windows NT/i)) // PC IE
	|| ua.match(/\MQQBrowser.*\QQ\//i)) // 手Q X5
{
	$("#cont_wrapper").css("display", "none");
	$("#error").css("display", "block");
}










/********************
 *      公用事件
 ********************/

/*
 * 页面滚动
 */
document.onscroll = function (){
	changeBT(); // 大标题缩放
}

/**
 * DOM加载完成
 */
document.ready = function(){
	changeBT(); // 大标题缩放
	findFoldableTables(); // 折叠表格
	$('#reverse_chapter').bind("click touchstart touchmove touchend", function(){
		click(function(){reverseChapter(false, 0)});
	})
}










/*
	// 放大图片相关操作
	if (e.target.id == "mag_img_wrapper" || e.target.id == "mag_img") {
		var img = $("#mag_img");

		// 鼠标移动图片
		if (e.type == "mousedown" && e.target.id == "mag_img"){
			e.preventDefault(); // 阻止拖拽img时浏览器弹出禁止标志
			var startLeft = e.clientX - parseInt(img.css("left")),
				startTop = e.clientY - parseInt(img.css("top")),
				isDragging = true;

			$(this).bind("mouseup mouseleave", function(){
				img.unbind();
				isDragging = false; // 松开鼠标 & 鼠标离开时 停止拖拽
			});
			$(this).bind("mousemove", function(e){
				if (isDragging){
					img.css("left", e.clientX - startLeft + "px");
					img.css("top", e.clientY - startTop + "px");
				}
			});
		}

		// 滚轮缩放
		if ((e.type == "mousewheel" || e.type == "DOMMouseScroll") && (e.target.id == "mag_img" || e.target.id == "mag_img_wrapper")){
			if (e.target.id == "mag_img") {
				// 禁止滚动页面
				e.preventDefault();
				e.returnValue = false;

				// 放大
				function magnify() {
					magWidth += 100;
					magMarginTop -= 50;
					magMarginLeft -= 50;
					img.width(magWidth);
					img.css("margin-top", magMarginTop);
					img.css("margin-left", magMarginLeft);
				}
				// 缩小
				function minify() {
					magWidth -= 100;
					magMarginTop += 50;
					magMarginLeft += 50;
					img.width(magWidth)
					img.css("margin-top", magMarginTop);
					img.css("margin-left", magMarginLeft);
				}

				if (e.wheelDelta) {
					if (e.wheelDelta > 0) { // 放大
						magnify();
					}
					else { // 缩小
						minify();
					}
				}
				else { // FF
					if (e.detail < 0) { // 放大
						magnify();
					}
					else { // 缩小
						minify();
					}
				}
			}
			// 在图片外滚轮禁止滚动页面
			else {
				e.preventDefault();
				e.returnValue = false;
			}
		}

		// 移动端移动图片
		if (e.type == "touchstart" && e.target.id == "mag_img"){
			// 禁止滑动页面
			e.preventDefault();
			// 单指触发
			if (e.touches.length == 1){
				var touch = e.touches[0];
				startX = touch.pageX;
				startY = touch.pageY;
			}
		}
		if (e.type == "touchmove" && e.target.id == "mag_img"){
			if (e.touches.length == 1){
				var touch = e.touches[0];
				var spanX = touch.pageX - startX,
					spanY = touch.pageY - startY;
				img.css({"top":magTop + spanY + "px", "left":magLeft + spanX + "px"});
			}
		}
		if (e.type == "touchend" && e.target.id == "mag_img"){
			// 结束滑动后记录图片的top和left，防止下次滑动时 图片又回到正中央
			magTop = parseInt(img.css("top").split("px")[0]);
			magLeft = parseInt(img.css("left").split("px")[0]);
		}
	}

	// 禁止在图片外滚动页面
	if (e.type == "touchmove" && e.target.id == "mag_img_wrapper"){
		e.preventDefault();
		e.returnValue = false;
	}
	
*/
