/**
 * class=“saimg”的图片的src根据在线/离线自动适应
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
 * 单击图片放大
 * 对图片的操作在mouseHandler函数里
 */
var magImgDiv = $(".magnifiable");
magImgDiv.attr("title", "点击放大查看");
magImgDiv.on("click", magnifyImg);

function magnifyImg(){
	// 插入放大图片div
	$("body").append("<div id='mag_img_wrapper'><img id='mag_img' src='" + $(this).attr("src") + "' /></div>");
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

}

function closeImg(){
	var imgDiv = $("#mag_img_wrapper");
	imgDiv.css({"animation":"fade_out 0.3s ease-out", "-webkit-animation":"fade_out 0.3s ease-out"});
	imgDiv.bind("animationend webkitAnimationEnd", function () {
		imgDiv.remove();
	});
	setTimeout(function(){imgDiv.remove()}, 350); // 若animationend久未生效，则强制移除
}

/**
 * 大标题及更新日期的动画效果
 */
var bigTitle = $("#big_title_div"), lastUp = $("#last_update"), lastBtPos = 0, topBoxScroll;
// 移动端阈值
if(isMobile) topBoxScroll = 75;
// PC端阈值
else topBoxScroll = 120;
$(document).on("scroll ready", function () {
	// 页面滚动超过阈值
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
	else if ($(document).scrollTop() <= topBoxScroll && lastBtPos > topBoxScroll) {
		lastBtPos = $(document).scrollTop();
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
            {name: "正则表达式教程", uri: "regex_tutorial.html"}
        ]
    }
];
function generateNav(navData) {
    var html = "<img id='nav_logo' src='image/nav_logo.png' onclick='navHide()' />\n";
	html += "<div>\n";
	
    for (var i=0; i<navData.length; ++i) {
        var section = navData[i].section;
        var tutors = navData[i].tutors;
		
		html += "<div class='parent'> " + section + " </div>\n";
		html += "<div id='nav_children_" + i.toString() + "' class='children'>\n";
		
        for (var j=0; j<tutors.length; ++j) {
			var name = tutors[j].name;
			var uri = tutors[j].uri;
			var id = tutors[j].id;
			
            var tag = "<a class='child' href='" +  uri + "' ";
			if (id != null) { tag += "id='" + id + "' " };
			tag += "> " + name + " </a>";
			
			html += tag + "\n";
        }
		html += "</div>\n"; // parent
		html += "</div>\n"; // children
    }
	html += "</div>\n";
	html += "<br />\n"
	return html;
}
$("#nav").html(generateNav(navContent));

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
		// 点击导航栏外 隐藏导航栏
		if (e.type == "click"){
			navHide();
		}
		// 导航栏外禁止滚轮
		else if (e.type == "mousewheel" || e.type == "touchmove" || e.type == "DOMMouseScroll"){
			e.returnValue = false;
			e.preventDefault();
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
			// 单指触发
			if (e.touches.length == 1) {
				var touch = e.touches[0];
				startY = touch.pageY;

			}
		}
		if (e.type == "touchmove"){ // 移动开始
			// 单指触发
			if (e.touches.length == 1) {
				var touch = e.touches[0];
				var spanY = touch.pageY - startY;

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

	// 点击页面关闭菜单
	if (e.type == "click" && e.target.id != "menu" && e.target.id != "menu_btn" && $(e.target).parents("#menu").length == 0 && isMenuShow){
		console.debug()
		menuToggle();
	}

	// 放大图片相关操作
	if (e.target.id == "mag_img_wrapper" || e.target.id == "mag_img") {
		var img = $("#mag_img");

		// 点击图片或图片外区域 关闭图片
		switch (e.type) {
			case "mousedown":
				startX = finalX = e.pageX;
				startY = finalY = e.pageY;
				break;

			case "touchstart":
				if (e.touches.length == 1) {
					var touch = e.touches[0];
					startX = finalX = touch.pageX;
					startY = finalY = touch.pageY;
				}
				break;

			case "touchmove":
				if (e.touches.length == 1) {
					var touch = e.touches[0];
					finalX = touch.pageX;
					finalY = touch.pageY;
				}
				break;

			case "touchend":
				if (Math.abs(finalX - startX) < 3 && Math.abs(finalY - startY) < 3) { // 防止屏幕误差导致无法关闭
					$(this).unbind();
					closeImg();
				}
				break;

			case "mouseup":
				if (e.pageX == startX && e.pageY == startY) {
					$(this).unbind();
					closeImg();
				}
				break;
		}

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
}
// PC鼠标事件绑定
document.addEventListener("click", mouseHandler);
document.addEventListener("mousedown", mouseHandler);
document.addEventListener("mouseup", mouseHandler);
document.addEventListener("mousemove", mouseHandler);
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
 * 菜单跳转功能
 */
function menuTo(target){
	if (isMobile){
		$("html, body").animate({scrollTop:document.getElementById(target).offsetTop - 45},250);
	} else {
		$("html, body").animate({scrollTop:document.getElementById(target).offsetTop - 60},250);
	}

    location.hash = target;

	// 关闭菜单
	menuToggle();
}

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
