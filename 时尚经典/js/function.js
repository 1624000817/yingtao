
$(function() {

//返回顶部
$(".backTop").click(function(){
	$('html,body').animate({scrollTop:0},700); 
})

//猜你喜欢
$(".subMayLike li").hover( 
	mouseEnter,
	mouseOut
)
/*首页导航效果切换*/
$(".header .header_nav ul li").hover(function (){
		$(this).addClass("now");
	},function(){
		$(this).removeClass("now");
	});



/*首页轮播鼠标移过，左右按钮显示*/
		$(".focusBox").hover(function() {
		    $(this).find(".prev,.next").stop(true, true).fadeTo("show", 0.2)
		},
		function() {
		    $(this).find(".prev,.next").fadeOut()
		});
		/*首页轮播SuperSlide图片切换*/
		$(".focusBox").slide({
		    mainCell: ".pic",
		    effect: "fold",
		    autoPlay: true,
		    delayTime: 600,
		    trigger: "click"
		});



});


/*hover动画*/
function mouseEnter(){
	$(this).find(".bgSmall").stop().animate({"opacity":"0"}),
	$(this).find(".bg").stop().animate({"opacity":"1"});
	}
function mouseOut(){
	$(this).find(".bgSmall").stop().animate({"opacity":"1"}),
	$(this).find(".bg").stop().animate({"opacity":"0"});
}

