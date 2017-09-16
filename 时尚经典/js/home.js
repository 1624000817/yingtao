$(function(){
	Fashion.header_fix()/*随屏滚动*/
	Fashion.slider_line_tags()
	/*1000宽度*/
	w_width_ai()
	function w_width_ai(){
		var windowWidth=$(window).width();
		if(windowWidth>=1280){
			$("body").removeClass("bodySmallWidth");
		}else if(windowWidth<1280){
			$("body").addClass("bodySmallWidth");
		}
	}
	$(window).resize(w_width_ai);


	$(window).scroll(function(){
		   var wScrollTop=$(window).scrollTop();
			var bodyHeight=document.body.scrollHeight;
			var scrollTop=$(document).scrollTop();
			var bodyHeight02=$(window).height();
			var bottomScroll=bodyHeight-scrollTop-bodyHeight02;

		    if(wScrollTop>608){
				$(".slider").addClass("slider-visibility");
		   }else  if(wScrollTop<608){
				$(".slider").removeClass("slider-visibility");
		   };
		   if(bottomScroll<1000){
				$(".slider").removeClass("slider-visibility");
		    }else if(bottomScroll>1000&&wScrollTop>608){$(".slider").addClass("slider-visibility")};
	})

	
	$(".bannerwrap").slide({ mainCell:".banner ul",effect:"fold",autoPlay:true,delayTime:1500,interTime:4000,mouseOverStop:false });
	new WOW().init();
	$('.firstbxbot li').hover(function(){
		$(this).children().children('.info').animate({'bottom':0});
	},function(){
		$(this).children().children('.info').animate({'bottom':'-56px'});
	});
	
	//数字滚动
	$('.counterDX').countUp();
	$(".exclusivebase").slide({ mainCell:".bd ul", effect:"fold", autoPlay:false, delayTime:300, triggerTime:50});
	
	$(".prevnextbx").slide({titCell:".hd ul",autoPage:true,autoPlay:true, mainCell:".bd ul",effect:"left",scroll:1,vis:3});
	$(".prevnextbx2").slide({titCell:".hd ul",autoPage:true,autoPlay:true, mainCell:".bd ul",effect:"left",scroll:1,vis:4});

	$(document).ready(function () {
	$(".chinacon a img").hover(function () {
		$(".chinacon a img").not($(this)).stop().animate({ opacity: 0.5 }, 500);
	}, function () {
		$(".chinacon a img").not($(this)).stop().animate({ opacity: 1 }, 500);
	});
	});


	
	$('.guest').hover(function(){
		$(this).children().children('.info').animate({'bottom':0});
	},function(){
		$(this).children().children('.info').animate({'bottom':'-56px'});
	});



})


var Fashion={
	header_fix:function(){
		function fn_header(){
			var scroll_window=$(window).scrollTop();
			var header_height=$(".head .header").height();
			if(scroll_window>=header_height){	
				$(".head").addClass("head_fix").attr({"style":"position:fixed;left:0;top:0;z-index:10001;box-shadow:1px 0 3px #555;"})	
			}else{
				$(".head").removeClass("head_fix").attr({"style":""})	
			}
		}
		fn_header()
		$(window).scroll(fn_header);
	},
	slider_line_tags:function(){
		$(".slider-line-tags li").hover(
			function(){$(this).find(".bg").eq(0).stop().animate({"marginTop":"-57px"},300)},
			function(){$(this).find(".bg").eq(0).stop().animate({"marginTop":"0px"},200)}
		);	
		$(".slider-line-tags .weixin").hover(
			function(){$(".slider-line-tags .erwei-img").stop().fadeIn(300)},
			function(){$(".slider-line-tags .erwei-img").stop().fadeOut(300)}
		);
		$(".slider-line-tags .taobao").hover(
			function(){$(".slider-line-tags .ertmall-img").stop().fadeIn(300)},
			function(){$(".slider-line-tags .ertmall-img").stop().fadeOut(300)}
		);
		$(".slider-line-tags .sina").hover(
			function(){$(".slider-line-tags .sina-img").stop().fadeIn(300)},
			function(){$(".slider-line-tags .sina-img").stop().fadeOut(300)}
		);	
	}
}