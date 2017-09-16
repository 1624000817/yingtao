$().ready(function(){
    //导航距离屏幕顶部距离
    var _defautlTop = $("#flnav_lvpai").offset().top;
    //导航距离屏幕左侧距离
    var _defautlLeft = $("#flnav_lvpai").offset().left;
	
    //导航默认样式记录，还原初始样式时候需要
    var _position = $("#flnav_lvpai").css('position');
    var _top = $("#flnav_lvpai").css('top');
    var _left = $("#flnav_lvpai").css('left');
    var _zIndex = $("#flnav_lvpai").css('z-index');
    //鼠标滚动事件
    $(window).scroll(function(){
        if($(this).scrollTop() > _defautlTop){
            //IE6不认识position:fixed，单独用position:absolute模拟
            if($.browser.msie && $.browser.version=="6.0"){
                $("#top").css({'position':'absolute','top':eval(document.documentElement.scrollTop),'left':_defautlLeft,'z-index':98});
                //防止出现抖动
                $("html,body").css({'background-image':'url(about:blank)','background-attachment':'fixed'});
            }else{
                $("#flnav_lvpai").css({'position':'fixed','top':0,'left':_defautlLeft,'z-index':98});
            }
        }
		else{
            $("#flnav_lvpai").css({'position':_position,'top':_top,'left':_left,'z-index':_zIndex});
        }
    });
});		