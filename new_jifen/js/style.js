(function($) {
  $.fn.confirm = function(options) {
    if (typeof options === 'undefined') {
      options = {};
    }
    this.on('touchend',
    function(e) {
      e.preventDefault();
      var newOptions = $.extend({
        button: $(this)
      },
      options);

      $.confirm(newOptions, e);
    });

    return this;
  };

  $.confirm = function(options, e) {
    if ($('.ReactModalPortal').length > 0) {
      return
    }

    var dataOptions = {};
    if (options.button) {
      var dataOptionsMapping = {
        'title': 'title',
        'text': 'text',
        'confirm-button': 'confirmButton',
        'cancel-button': 'cancelButton',
        'confirm-button-class': 'confirmButtonClass',
        'cancel-button-class': 'cancelButtonClass'
      };
      $.each(dataOptionsMapping,
      function(attributeName, optionName) {
        var value = options.button.data(attributeName);
        if (value) {
          dataOptions[optionName] = value;
        }
      });
    }

    var settings = $.extend({},
    $.confirm.options, {
      confirm: function() {
        var url = e && (('string' === typeof e && e) || (e.currentTarget && e.currentTarget.attributes['href'].value));
        if (url) {
          if (options.post) {
            var form = $('<form method="post" class="hide" action="' + url + '"></form>');
            $("body").append(form);
            form.submit();
          } else {
            window.location = url;
          }
        }
      },
      cancel: function(o) {},
      button: null
    },
    dataOptions, options);

    var cancelButton = '';
    if (settings.cancelButton) {
      cancelButton = '<button class="cancel">' + settings.cancelButton + '</button>';
    }
    var modalHTML = '<div class="ReactModalPortal ReactModalConfirm">\
         <div data-reactroot="" class="ReactModal__Overlay ReactModal__Overlay--after">\
          <div class="ReactModal__Content ReactModal__Content--after" tabindex="-1">\
           <div class="Dialog-confirmContent">' + settings.text + '</div>\
           <div class="Dialog-confirmActions">\
            ' + cancelButton + '<button class="Dialog-okButton confirm">' + settings.confirmButton + '</button>\
           </div>\
          </div>\
         </div>\
        </div>';

    var modal = $(modalHTML);
    modal.find(".confirm").on('touchend',
    function(e) {
      e.preventDefault();
      modal.remove();
      settings.confirm(settings.button);
      $('body').removeClass('ReactModal__Body--open');
    });
    modal.find(".cancel").on('touchend',
    function(e) {
      e.preventDefault();
      modal.remove();
      settings.cancel(settings.button);
      $('body').removeClass('ReactModal__Body--open');
    });

    $('body').append(modal).addClass('ReactModal__Body--open');

  };

  $.confirm.options = {
    text: "Are you sure?",
    title: "",
    confirmButton: "Yes",
    cancelButton: "Cancel",
    post: false
  }
})(Zepto);



function YT_WX(){


  $('.YT_WX_tab_gallery .tab_nav a').on('touchend',function(e){
    var i = $(this).index();
    $(this).addClass('active').siblings('a').removeClass('active');
    $('.tab_content .tab_pane').removeClass('active').eq(i).addClass('active');
  });


  $('.YT_WX_preview_gallery').on('touchend','a',function(e){
    e.preventDefault();
    $('.YT_WX_preview_gallery').hide();
  })










  echo.init({
    offset: 100,
    throttle: 100,
    unload: false,
    callback: function (element, op) {
      
    }
  })

 

  window.YT_WXalert = function(t, callback){
    var callback = callback ||
    function() {}
    $.confirm({
      title: "　",
      text: t,
      confirm: function(button){
        callback();
      },
      confirmButton: "确定",
      cancelButton: false
    });
  };

  window.YT_WXconfirm = function(t, callback){
    $.confirm({
      title: "",
      text: t,
      confirm: function(button){
        callback();
      },
      cancel: function(button){
      },
      confirmButton: "确定",
      cancelButton: "取消"
    });
  };

};



YT_WX.prototype.Moved = function(tapArea){
  var body = $('body'),
  startX = 0,
  startY = 0,
  self = this;

  self.isMoved = false;
  body.on('touchstart',tapArea,function(e){
      self.isMoved = false;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
  });

  body.on('touchmove',tapArea,function(e){
      if (Math.abs(e.touches[0].clientX - startX) > 10 || Math.abs(e.touches[0].clientY - startY) > 10){
        self.isMoved = true;
      }
  });

  body.on('touchcancel',tapArea,function(e){
    self.isMoved = false;
    startX = 0;
    startY = 0;
  });
};



function getOrientation(file, callback) {
  var reader = new FileReader();

  reader.onload = function(event) {
    var view = new DataView(event.target.result);

    if (view.getUint16(0, false) != 0xFFD8) return callback(-2);

    var length = view.byteLength,
        offset = 2;

    while (offset < length) {
      var marker = view.getUint16(offset, false);
      offset += 2;

      if (marker == 0xFFE1) {
        if (view.getUint32(offset += 2, false) != 0x45786966) {
          return callback(-1);
        }
        var little = view.getUint16(offset += 6, false) == 0x4949;
        offset += view.getUint32(offset + 4, little);
        var tags = view.getUint16(offset, little);
        offset += 2;

        for (var i = 0; i < tags; i++)
          if (view.getUint16(offset + (i * 12), little) == 0x0112)
            return callback(view.getUint16(offset + (i * 12) + 8, little));
      }
      else if ((marker & 0xFF00) != 0xFF00) break;
      else offset += view.getUint16(offset, false);
    }
    return callback(-1);
  };

  reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
};

function resetOrientation(srcBase64, srcOrientation, callback) {
  var img = new Image();    

  img.onload = function() {
    var width = img.width,
        height = img.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");


    if ([5,6,7,8].indexOf(srcOrientation) > -1) {
      canvas.width = height;
      canvas.height = width;
    } else {
      canvas.width = width;
      canvas.height = height;
    }

    switch (srcOrientation) {
      case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
      case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
      case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
      case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
      case 7: ctx.transform(0, -1, -1, 0, height , width); break;
      case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
      default: ctx.transform(1, 0, 0, 1, 0, 0);
    }

    ctx.drawImage(img, 0, 0);
    callback(canvas.toDataURL('image/jpeg')) 
  };

  img.src = srcBase64;
};

YT_WX.prototype.ImageEditor = function(){
  var self,img,w,h;
  self = this;
  self.editor = {};
  self.Moved('.template_images figure');

  $('.template_images').on('touchend','.edit_btn',function(e){
    e.preventDefault();
    var i = $(this).closest('figure').index();
    var that = $(this).parent()[0];
    if(self.isMoved){
      return
    }

    var $input = $('<input type="file">');
    $input.trigger('click');

    $input.on('change',function(){
      var file = this.files[0];
      var url = webkitURL.createObjectURL(file);

      getOrientation(file, function(orientation) {
        if ([5,6,7,8].indexOf(orientation) > -1) {
          resetOrientation(url, orientation, function(url){
            init(url);
          })
        }else{
          init(url);
        }
      });

      function init(url){
        img = $(that).find('img');
        w = img.width() / .5;
        h = img.height() / .5;
        if(!$(that).is('.active')){
          $(that).addClass('active');
          $(that).find('.edit_btn').hide();

          var $div = $('<div>');
          $(that).append($div);
          self.editor[i] = $div.ImageEditor({
            imageUrls: [
              url
            ],
            removeIcon: '',
            width: w,
            height: h,
            onInitCompleted: function() {
              self.editor[i].selectImage(0);
            }
          });

          $(that).append('<a class="save_btn"><i class="fa fa-check"></i> 保存</a>');
        }
      }

    })

  });
};



YT_WX.prototype.music = function(obj){
    var audio = new Audio(),
    play = 0,
    obj = $(obj),
    btn = obj.find('span');

    audio.src = whb_static_prefix+obj.find('select').val();

    obj.find('select').on('change',function(){
      audio.src = whb_static_prefix+$(this).val();
      music();
    })

    audio.onended = function(){
      btn.find('i').attr('class','iconfont icon-bofang');
    }

    btn.on('touchend', 'i',function(e){
        e.stopPropagation();
        music();
    })

    function music(){
        if(audio.paused){
            audio.play();
            btn.find('i').attr('class','iconfont icon-zanting');
        }else{
            audio.pause();
            btn.find('i').attr('class','iconfont icon-bofang');
        }
    }
};




YT_WX.prototype.wizard = function(obj,callback){
  var self = this;
  var $obj = $(obj);
  var $nav = $obj.find('.steps a');
  var $step_pane = $obj.find('.step-pane');
  var $prev_btn = $obj.find('.prev_btn');
  var $next_btn = $obj.find('.next_btn');
  var steps = $nav.length;
  var step = 0;

  $prev_btn.on('touchend',function(){
    step --;
    callback();
    fun();
  });

  $next_btn.on('touchend',function(){
    callback();
    if(!$nav.siblings('.active').is('.ok')){
      YT_WXalert('该步骤尚未完成');
      return
    }
    step ++;
    fun();
  });

  function fun(){
    step = step % steps;
    if(step > 0){
      $prev_btn.removeAttr('disabled');
    }else{
      $prev_btn.attr('disabled','true');
    }

    if(step == steps-1){
      $next_btn.attr('disabled','true');
    }else{
      $next_btn.removeAttr('disabled');
    }

    $nav.removeClass('active').eq(step).addClass('active');
    $step_pane.removeClass('active').eq(step).addClass('active');
  }


};




YT_WX.prototype.poi = function(obj){
  var $btn = $('.poi_btn');
  var coord = '';
  var $input = $('.poi input[type=hidden]');
  $btn.on('touchend',function(){

    if($(this).data('show') == undefined){
      $(this).data('show','0');
      $('article').append('<div class="YT_WX_poi_gallery"><div id="poi"><iframe id="mapPage" width="100%" height="100%" frameborder=0></iframe> </div><i class="i i-error"></i></div>');
    }


    if($input.val() != ''){
      coord = 'coord=' + $input.val() + '&';
    }

    $('#mapPage').attr('src','https://apis.map.qq.com/tools/locpicker?'+coord+'search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp');

    $('.YT_WX_poi_gallery').show();

  })


  $('article').on('touchend','.YT_WX_poi_gallery .i-error',function(){
    $('.YT_WX_poi_gallery').hide();
  })


  window.addEventListener('message', function(event){
      var loc = event.data;
      if (loc && loc.module == 'locationPicker'){
        $input.val(loc.latlng.lat+','+loc.latlng.lng);
        $('.poi input[type=text]').val(loc.poiname);
        YT_WXalert('拾取成功');
        $('.YT_WX_poi_gallery').hide();
      }                                
  }, false);

};


YT_WX.prototype.cover = function(obj){
  var _self    = $(obj);
  var obj_name = $(obj).attr('data-name');
  _self.on('touchend',function(){
    wx.chooseImage({
      count: 1, 
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var localIds = res.localIds;
        var localId = localIds.pop();
        uploadImage(localId)
      }
    });
  })

  

  function uploadImage(localId)
  {
    wx.uploadImage({
      localId: localId,
      isShowProgressTips: 1,
      success: function (res2) {
        var serverId = res2.serverId; // 返回图片的服务器端ID

        //其他对serverId做处理的代码
        _self.parent().find('img').remove();
        $.post('/'+domain+'/ts/tools/weixinJsUpload.html', {media_id:serverId, image_type:'syspic/pageimg', save_type:'whb_cover'}, function(data) {
          if(data['status'] == true) {
            var tpl = '<img src="'+data['data']['url']+'!w320"/>'
            _self.before(tpl);
            var saveImageUrl = data['data']['url'].substr(data['data']['url'].indexOf('/Uploads/')+9);
            _self.parent().find('input[name='+obj_name+']').val(saveImageUrl);
          } else {
            YT_WXalert(data['message']);
          }
        },'json');
      }
    });
  }
  
};



