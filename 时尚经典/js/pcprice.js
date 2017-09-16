
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
    modal.find(".confirm").on('click',
    function(e) {
      e.preventDefault();
      modal.remove();
      settings.confirm(settings.button);
      $('body').removeClass('ReactModal__Body--open');
    });
    modal.find(".cancel").on('click',
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
})(jQuery);



(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.echo = factory(root);
  }
})(this, function (root) {

  'use strict';

  var echo = {};

  var callback = function () {};

  var offset, poll, delay, useDebounce, unload;

  var inView = function (element, view) {
    var box = element.getBoundingClientRect();
    return (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b);
  };

  var debounceOrThrottle = function () {
    if(!useDebounce && !!poll) {
      return;
    }
    clearTimeout(poll);
    poll = setTimeout(function(){
      echo.render();
      poll = null;
    }, delay);
  };

  echo.init = function (opts) {
    opts = opts || {};
    var domElement = document.getElementById(opts.domElement) || root;
    var offsetAll = opts.offset || 0;
    var offsetVertical = opts.offsetVertical || offsetAll;
    var offsetHorizontal = opts.offsetHorizontal || offsetAll;
    var optionToInt = function (opt, fallback) {
      return parseInt(opt || fallback, 10);
    };
    offset = {
      t: optionToInt(opts.offsetTop, offsetVertical),
      b: optionToInt(opts.offsetBottom, offsetVertical),
      l: optionToInt(opts.offsetLeft, offsetHorizontal),
      r: optionToInt(opts.offsetRight, offsetHorizontal)
    };
    delay = optionToInt(opts.throttle, 250);
    useDebounce = opts.debounce !== false;
    unload = !!opts.unload;
    callback = opts.callback || callback;
    echo.render();
    if (document.addEventListener) {
      domElement.addEventListener('scroll', debounceOrThrottle, false);
      domElement.addEventListener('load', debounceOrThrottle, false);
    } else {
      domElement.attachEvent('onscroll', debounceOrThrottle);
      domElement.attachEvent('onload', debounceOrThrottle);
    }
  };

  echo.render = function () {
    var nodes = document.querySelectorAll('img[data-echo], [data-echo-background]');
    var length = nodes.length;
    var src, elem;
    var view = {
      l: 0 - offset.l,
      t: 0 - offset.t,
      b: (root.innerHeight || document.documentElement.clientHeight) + offset.b,
      r: (root.innerWidth || document.documentElement.clientWidth) + offset.r
    };
    for (var i = 0; i < length; i++) {
      elem = nodes[i];
      if (inView(elem, view)) {

        if (unload) {
          elem.setAttribute('data-echo-placeholder', elem.src);
        }

        if (elem.getAttribute('data-echo-background') !== null) {
          elem.style.backgroundImage = "url(" + elem.getAttribute('data-echo-background') + ")";
        }
        else {
          elem.src = elem.getAttribute('data-echo');
        }

        if (!unload) {
          elem.removeAttribute('data-echo');
        }

        callback(elem, 'load');
      }
      else if (unload && !!(src = elem.getAttribute('data-echo-placeholder'))) {

        if (elem.getAttribute('data-echo-background') !== null) {
          elem.style.backgroundImage = "url(" + src + ")";
        }
        else {
          elem.src = src;
        }

        elem.removeAttribute('data-echo-placeholder');
        callback(elem, 'unload');
      }
    }
    if (!length) {
      echo.detach();
    }
  };

  echo.detach = function () {
    if (document.removeEventListener) {
      root.removeEventListener('scroll', debounceOrThrottle);
    } else {
      root.detachEvent('onscroll', debounceOrThrottle);
    }
    clearTimeout(poll);
  };

  return echo;

});





function JFR(){


  echo.init({
    offset: 100,
    throttle: 100,
    unload: false,
    callback: function (element, op) {
      
    }
  })



  window.JFRalert = function(t, callback){
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

};


JFR.prototype.Reserve = function(){
  var $reserve = $('.JFR_reserve');

  function scroll(obj){
    obj.each(function(){
        if(this.scrollHeight > $(this).height()){
          $(this).parent().addClass('scroll');
        }
    })
  }

  scroll($('.JFR_reserve > div > div'));

  $reserve.on('click','label',function(e){
    $(this).addClass('active').siblings('label').removeClass('active');
  });

  $reserve.on('click','form button',function(e){
    e.preventDefault();
    var name = $reserve.find('input[type="text"]').val(),
    mobile =  $reserve.find('input[type="tel"]').val(),
    error = '';

    if(name.replace(/\s+/g,'').length == 0){
      error += '姓名不能为空\n';
    }

    if(!/^(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])\d{8}$/.test(mobile)){
      error += '手机号错误或为空\n'
    }
    if(error == ''){
      var arr = [];
      $reserve.find('label.active').each(function(){
        arr.push($(this).text());
      })
      var url = 'http://www.vvc.cn/plus/baoming.php?action=save';
      $.post(url,{name:name, tel:mobile , msg:arr},function(data){
        if(data) {
          JFRalert('预约成功');
        }else {
          JFRalert('您已预约过');
        }
      });
     
    }else{
      JFRalert(error);
    }


  });

};




var base_url = "http://www.vvc.cn"
$(function(){
var jfr = new JFR();
jfr.Reserve();
})