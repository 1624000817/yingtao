$(function(){
	/*轮播*/
	$(".style-left .showtype li").on("mouseover",function(){
		var index_hover=$(this).index();
		$(this).addClass("active").siblings("li").removeClass("active")
		$(".style-left .showbanar ul li").eq(index_hover).show().siblings("li").hide()
	});
	var index_number=0;
	function carousel(){
		if(index_number==2){
			$(".style-left .showbanar ul li").eq(index_number).hide();
			index_number=0;
			$(".style-left .showbanar ul li").eq(index_number).show();
		}else{
			$(".style-left .showbanar ul li").eq(index_number).hide();
			$(".style-left .showbanar ul li").eq(index_number+1).show();
			index_number++;
		}
		$(".style-left .showtype li").eq(index_number).addClass("active").siblings("li").removeClass()
	}
	setInterval(carousel,2000);
	
	/*返回顶部*/
	$(".TaroFlower_gotop,#index_6s a,tabse_top").click(function(){
		$("body,html").stop().animate({"scrollTop":0})
	});
	$(".Taro_flower_gotop").slideUp();
	$(window).scroll(function(){
		var a=$(this).scrollTop();
		if(a>200){
			$(".Taro_flower_gotop").slideDown();
		}else{
			$(".Taro_flower_gotop").slideUp();
		}
		$(".Taro_flower_gotop").click(function(){
			$("body,html").stop().animate({"scrollTop":0})
		});
	});

	/*首页banner箭头*/
	$(".taro_swiper").on("mouseenter",function(){
		$(".swiper-button-prev").animate({"left":"150px"})
		$(".swiper-button-next").animate({"right":"150px"})
	}).on("mouseleave",function(){
		$(".swiper-button-prev").animate({"left":"-30px"})
		$(".swiper-button-next").animate({"right":"-30px"})
	})
	/*客照分类*/
	$(window).scroll(
      function(){
        var top = $(window).scrollTop();
        var $rH = $('.scene-right').height() -230;
        if (top>160&&top<=$rH){
        	$(".scene-left").addClass('show_fixed').removeClass('show_absolute'); 
        }else if(top>$rH){
        	$(".scene-left").removeClass('show_fixed').addClass('show_absolute');
        }else{
        	$(".scene-left").removeClass('show_fixed')
        }
     });
    var $allW = $(window).width();
   	var $rightW = ($allW -1100)/2;
    var $W2 = $('.scene-right').outerWidth();
    $('.fixed-bg').width($W2 + $rightW + 'px');
    var $allH = $('.scene-content').height();
    $('.fixed-bg').height( $allH + 'px');
    
    /*客照分类左边固定*/
    $(window).scroll(function(){
		var a=$(this).scrollTop();
		if(a>=200){
			$(".new-list-wjh .contents .left").css({"position":"fixed","top":"30px"});
		}else{
			$(".new-list-wjh .contents .left").css({"position":"relative","top":"0"});
		}
		
	});
	
	/*首页底部轮播*/
	var footer_film;
	function footercarousel(){
		$(".picboxs").animate({"margin-left":"-1092px"},function(){
			$(".picboxs").append($(".picbox ul").eq(0));
			$(".picboxs").css("margin-left","0px");
		})
	}
	footer_film=setInterval(footercarousel,3000);
	
	$(".og_prev,.og_next").hover(function(){
		clearInterval(footer_film);
	},
	function(){
		footer_film=setInterval(footercarousel,3000);
	})
	$(".og_next").on("click",function(){
		$(".picboxs").animate({"margin-left":"-1092px"},function(){
			$(".picboxs").append($(".picbox ul").eq(0));
			$(".picboxs").css("margin-left","0px");
		})
	})
	$(".og_prev").on("click",function(){
		$(".picboxs").prepend($(".picbox ul:last"));
		$(".picboxs").css("margin-left","-1092px");
		$(".picboxs").animate({"margin-left":"0px"},function(){	
		})
	})
	/*团队*/
	$(".team-photo").eq(2).show()
	$(".team-tab li").on("click",function(){
		var index=$(this).index();
		$(this).addClass("cur").siblings("li").removeClass("cur");
		$(".team-photo").eq(index).show().siblings(".team-photo").hide()
	})
	
	/*MV简介*/
	var store_id_top = [];
    var num_all = 0,num = 0;
    $(window).scroll(function(){
      store_id_top = [];
      num_all = 0,num = 0;
      for(var i=0;i<6;i++){
        num = $('#store_'+(i+1)+'').offset().top;
        store_id_top.push(num);
        
      }
      console.log($("#store_list1").offset().top);
      store_id_top.push($(".foot").offset().top)
      var body_top = $(window).scrollTop();
      if(body_top >= $("#store_list1").offset().top && body_top < $(".foot").offset().top-800){
        $("#store_list").addClass("fixbox");
        $("#store_list").css("display","block");
        for(var i=0;i<store_id_top.length;i++){
          if(body_top>store_id_top[i]-100  &&  body_top<store_id_top[i+1]-100){
            $("#store_list ul li").removeClass("active");
            $("#store_list ul li:eq("+i+")").addClass("active");
            
          }
        }
      }else{
        $("#store_list").css("display","none");
      }
    })
   

/*三亚tab*/
$(".swtab li").hover(function () {
var index = $(this).index();
i = index;
w =$(window).width();
$(".banrs .banrimg").stop().animate({ left: -index * w }, 700);
});

function move() {
	w =$(window).width();
if (i == size) {
    $(".banrs .banrimg").css({ left: 0 });
    i = 1;
}
if (i == -1) {
    $(".banrs .banrimg").css({ left: -(size - 1) * 700 });
    i = size - 2;
}
$(".banrs .banrimg").stop().animate({ left: -i * w }, 700);
$('.swtab li').eq(i%4).addClass("active").siblings().removeClass("active");

}
$('.swtab li').hover(function(){
	i = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
});

/*三亚轮播*/
if($("#mr_frUl2 .mr_frUl").length > 0){
$("#mr_frUl2 .mr_frUl").MCarousel({
	btnNext: "#mr_frUl2 .next",
	btnPrev: "#mr_frUl2 .prev",
	mouseWheel: true,
	animation: 'slow',
	visible: 4,
	auto: 2000,
	scroll: 1,
	easing: "easeOutBack",
	vertical: false,
	onMouse: true,
	speed: 800
});
}


})