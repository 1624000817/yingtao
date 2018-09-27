var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

if(isiOS == true){
	// document.body.addEventListener('touchmove', function (e) {
	//   if(e._isScroller) return;
	//   e.preventDefault(); 
	// }, {passive: false});
}


function scrollFn(){
  $.each($(".yt_LV_product_small .remove"), function(i,val) {
      $(".yt_LV_product_small .remove").eq(i).css("transform","translate(0,"+i*4.352+"rem"+")")
    });
    $(".yt_LV_product_small").on("click","li", function(){
      $(this).addClass("active").removeClass("remove").siblings().removeClass("active").addClass("remove")
      $.each($(".yt_LV_product_small .remove"), function(i,val) {
        $(".yt_LV_product_small .remove").eq(i).css("transform","translate(0,"+i*4.352+"rem"+")")
      });
    })
}




// 微电影效果
function ss(){
	$('#yt_LV_film_swiper .swiper-slide').each(function(){
	  if($(this).hasClass('swiper-slide-active')){
	    $('.swiper-slide').removeClass('swiper-slide-on');
	    $(this).addClass('swiper-slide-on');
	  }
	}) 
}
setInterval("ss()",100);


// 样照分页滚动
function topFn(){
  var scT= document.querySelector('.yt_LV_content .yt_LV_product_top_scroll').scrollTop;
  var top = document.querySelector('.yt_LV_product_top_scroll .active').offsetTop;
  setTimeout(function(){
    document.querySelector('.yt_LV_product_small').style.top=top-scT+"px";
    setTimeout(function(){
      document.querySelector('.yt_LV_product_small').style.top=null;
    },990)
  })
}

 


function trunFn(){
  //首页翻页效果
  $("#yt_LV_home_swiper").turn({
      display: 'single',
      gradients: true,
      acceleration: true,
      autoCenter: true,
      elevation:200,
      duration:1500,
      when: {
        turning: function(e, page, view) {
          $('.yt_LV_home_circle span').siblings('span').removeClass('active').eq(page-1).addClass('active');
        }
      }
    })
  $('.yt_LV_home_circle span').eq(0).addClass("active");
  $('.yt_LV_home_circle span').each(function () {  
      $(".yt_LV_home_circle").on("click","span",function(){
          var WX_I=$(this).index();
         $(this).addClass("active").siblings("span").removeClass("active");
         $("#yt_LV_home_swiper").turn("page", WX_I+1);
      })
    })

  $("#yt_LV_home_swiper").on("touchstart", function(e) {
  // 　　e.preventDefault();
  　　startX = e.originalEvent.changedTouches[0].pageX,
  　　startY = e.originalEvent.changedTouches[0].pageY;
  });
  $("#yt_LV_home_swiper").on("touchend", function(e) {
  // 　e.preventDefault();
  　moveEndX = e.originalEvent.changedTouches[0].pageX,
  　moveEndY = e.originalEvent.changedTouches[0].pageY,
  　X = moveEndX - startX,
  　Y = moveEndY - startY;
  　if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
    $("#yt_LV_home_swiper").turn("previous");
  　}
  　else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
      $("#yt_LV_home_swiper").turn("next");
    }
  });
}

// 禁止下拉
// document.body.ontouchmove = function (e) {
//       e.preventDefault();
//   }; 
//   var startX = 0, startY = 0;
//    function touchSatrtFunc(evt) {
//         try
//         {
           
//             var touch = evt.touches[0]; //获取第一个触点
//             var x = Number(touch.pageX); //页面触点X坐标
//             var y = Number(touch.pageY); //页面触点Y坐标
//             //记录触点初始位置
//             startX = x;
//             startY = y;

//         } catch (e) {
//             console.log('touchSatrtFunc：' + e.message);
//         }
//     }
//   document.addEventListener('touchstart', touchSatrtFunc, false);
//   setTimeout(function(){
//     for(var i=0;i<document.querySelectorAll('.scroll').length;i++){
//       overscroll(document.querySelectorAll('.scroll')[i]);
//     }
//   })
  
//   function overscroll(_ss){
//       _ss.ontouchmove = function (ev) {
//           var _point = ev.touches[0],
//               _top = _ss.scrollTop;
//           // 什么时候到底部
//           var _bottomFaVal = _ss.scrollHeight - _ss.offsetHeight;
//           // 到达顶端
//           if (_top === 0) {
//               // 阻止向下滑动
//               if (_point.clientY > startY) {
//                   ev.preventDefault();
//               } else {
//                   // 阻止冒泡
//                   // 正常执行
//                   ev.stopPropagation();
//               }
//           } else if (_top === _bottomFaVal) {
//               // 到达底部
//               // 阻止向上滑动
//               if (_point.clientY < startY) {
//                   ev.preventDefault();
//               } else {
//                   // 阻止冒泡
//                   // 正常执行
//                   ev.stopPropagation();
//               }
//           } else if (_top > 0 && _top < _bottomFaVal) {
//               ev.stopPropagation();
//           } else {
//               ev.preventDefault();
//           }
//       };
//     }
