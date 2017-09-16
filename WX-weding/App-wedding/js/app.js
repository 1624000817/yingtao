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

window.Galert = function(t, callback){
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

window.Gconfirm = function(t, callback){
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


(function($, undefined) {
  $.fn.inputChange = function(selector, handler) {
    var isComposing,
        oldVal;

    if (handler === undefined) {
      handler = selector;
      selector = null;
    }

    return this.on('focus', selector, function(e) {
      oldVal = $(e.target).val();
    })
    .on('compositionstart', selector, function(e) {
      isComposing = true;
    })
    .on('compositionend', selector, function(e) {
      isComposing = false;
    })
    .on('input', selector, function(e) {
      if (!isComposing) {
        var $el = $(e.target),
            val = $el.val();
        if (val !== oldVal) {
          handler.call($el, e);
          oldVal = val;
        }
      }
    });
  };
}(Zepto));


function G(){
  this.tabs();
  this.share();
  this.wechatPay();
  var $body = $('body');

  var cssText = '<style>\
  .G_content .tips span{\
    -webkit-transform:translate3d(16rem,0,0);\
    -webkit-animation:marquee '+ $('.tips span').width() / 20 +'s linear infinite;\
    }\
  @-webkit-keyframes marquee{\
    to{\
      -webkit-transform:translate3d(-100%,0,0);\
    }\
  }\
  </style>';
  $body.addClass('active');
  $body.append(cssText);


 echo.init({
    offset: 100,
    throttle: 100,
    unload: false,
    callback: function (element, op) {
      
    }
  })
 echo.init({
  domElement: 'thumbnail',
  offset: 0,
  throttle: 0,
  unload: false
})


};


function YT_M(){

  $('.nav_btn').on('touchend',function(){
    $('.nav_btn,.M1_nav').toggleClass('open')
  })

  $('.M1_nav').on('touchmove',function(e){
    e.preventDefault();
  })



//鐐硅禐
$('.i_heart').on('touchend',function(e){
  e.preventDefault();
  var f = $(this).parent();
  f.toggleClass('active');
  var $num = f.find('small'),
  num = parseInt($num.text());
  if(f.is('.active')){
    YT_Malert('+1');
    num++
  }else{
    YT_Malert('-1');
    num--
  }
  $num.text(num);
});



  echo.init({
    offset: 100,
    throttle: 100,
    unload: false,
    callback: function (element, op) {
      
    }
  })

  !(function(){
    var $index = $('.M2_tab_sample .cur');
    if($index[0]){
      $('.M2_tab_sample')[0].scrollLeft = $index.position().left;
    }
  })()




  window.YT_Malert = function(t, callback){
    var callback = callback ||
    function() {}
    $.confirm({
      title: "銆€",
      text: t,
      confirm: function(button){
        callback();
      },
      confirmButton: "纭畾",
      cancelButton: false
    });
  };

  window.YT_Mconfirm = function(t, callback){
    $.confirm({
      title: "",
      text: t,
      confirm: function(button){
        callback();
      },
      cancel: function(button){
      },
      confirmButton: "纭畾",
      cancelButton: "鍙栨秷"
    });
  };

  //鍒嗕韩
  $('.i_share').on('touchend',function(e){
    e.preventDefault();
    var url = $(this).attr('data-url');
    var title = $(this).attr('data-title');
    window.open('http://www.jiathis.com/share?url='+ url +'&title='+ encodeURIComponent(title));
  });


};
YT_M.prototype.Offer = function(){
  $('.offer label').on('touchend',function(e){
    var td = $(this).parent();
    var i = $(this).index();
    $(this).addClass('active').siblings('label').removeClass('active');
    td.find('input').val(i)
  });
};


G.prototype.Moved = function(tapArea){
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


G.prototype.tabs = function(){
  var self = this;
  self.Moved('.G_tabs td');

  $('.G_tabs td').on('touchend',function(e){
    e.preventDefault();
    if(self.isMoved){
      return
    }
    var i = $(this).index();
    $('.G_tabs td').removeClass('active').eq(i).addClass('active');
    $('.G_tabs_pane').hide().eq(i).show();
  });




};

G.prototype.share = function(){
  var self = this;
  self.Moved('.G_share_open_btn,.G_btn_bottom a:last-child');

  $('.G_share_open_btn,.G_btn_bottom a:last-child').on('touchend',function(e){
    e.preventDefault();
    if(self.isMoved){
      return
    }

    if(!$(this).is('.G_friend_open_btn')){
      $('.G_tabs td').removeClass('active').eq(2).addClass('active');
      $('.G_tabs_pane').hide().eq(2).show();
      document.body.scrollTop = $('.G_tabs').offset().top;
      $('body').addClass('scroll');
      setTimeout(function(){
        $('body').removeClass('scroll');
      },1e3)
    }else{
      document.body.scrollTop = $('.G_friends').offset().top;
    }

  });


  // $('.G_share_close_btn').on('touchend',function(e){
  //   e.preventDefault();
  //   $('.G_share').hide();
  // })
};


G.prototype.wechatPay = function(callback){
  var self = this;
  var $payObj = $('.G_pay');
  var $payObjBody = $('.G_pay_body');

  $('.G_pay_btn').on('touchend',function(e){
    e.preventDefault();
    var name = $('.G_pay_info .name').val(),
    mobile = $('.G_pay_info .mobile').val(),
    date = $('.G_pay_info .select').val(),
    agree = $('.G_pay_info .agree'),
    error = '';

    if(name.replace(/\s+/g,'').length == 0){
      error += '姓名不能为空\n';
    }
    if(!/^(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])\d{8}$/.test(mobile)){
      error += '手机号错误或为空\n'
    }
    if(date == '拍摄时间'){
      error += '请选择拍摄日期\n';
    }
    if(error == ''){
      callback({
        name: name,
        mobile: mobile,
        date: date
      });
    }else{
      Galert(error);
    }
  });

  self.Moved('.G_pay_open_btn');

  $('.G_pay_open_btn').on('touchend',function(e){
    e.preventDefault();
    if(self.isMoved){
      return
    }
    $payObj.show();
    $payObjBody.addClass('in')
  });

  $('.G_pay .i_close').on('touchend',function(e){
    e.preventDefault();
    $payObj.hide();
  });

};




G.prototype.agreement = function(text){
  var self = this;
  self.Moved('.modal_agreement');
  $('.YY_pay_info tfoot td a').on('touchend',function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.modal_agreement').remove();
    $('article').append('<div class="modal_agreement"><i class="i i_close"></i><p><strong><span>一元夺宝活动平台协议</span></strong></p><p><span>欢迎访问一元夺宝，为明确您（以下简称为“支持者”）的权利义务，保护支持者的合法权益，特制定本协议。请支持者仔细阅读以下全部内容。如支持者不同意本服务条款任意内容，请勿注册或使用平台服务。如支持者在注册过程中点击<span>“</span>同意以下条款提交注册信息<span>”</span>按钮即表示您完全接受本协议中的全部条款，随后按照页面给予的提示完成全部的注册步骤。</span></p><p><span></span><span>一元夺宝将可能不定期的修改本服务协议的有关条款，并保留在必要时对此协议中的所有条款进行随时修改的权利，一旦协议内容有所修改，一元夺宝将会在微信重要页面第一时间给予通知，如果您继续使用一元夺宝的服务则视为您受协议的改动内容，如果不同意本站对协议内容所做的修改，一元夺宝会及时取消您的服务使用权限。</span></p><p><span></span><span>本站保留随时修改或中断服务而不需告知用户的权利，本站行使修改或中断服务的权利，不需对用户或第三方负责。</span></p><p><span></span><span>一、用户注册</span></p><p><span>1</span><span>、用户注册是指用户登录一元夺宝，按要求填写相关信息并确认同意本服务协议的过程。</span></p><p><span>2</span><span>、一元夺宝用户必须是具有完全民事行为能力的自然人，或者是具有合法经营资格的实体组织。无民事行为能力人、限制民事行为能力人以及无经营或特定经营资格的组织不得注册为一元夺宝用户或超过其民事权利或行为能力范围与一元夺宝进行交易，如与一元夺宝进行交易的，则服务协议自始无效，一元夺宝有权立即停止与该用户的交易、注销该用户账户，并有权要求其承担相应法律责任。</span></p><p><span>&nbsp; &nbsp;&nbsp;</span><span>二、一元夺宝原则</span></p><p><span>1</span><span>、释义</span></p><p><span>&nbsp; &nbsp;</span><span>幸运号码：指一元夺宝活动的用户成功参与夺宝之后获得的随机分配编码。</span></p><p><span>2</span><span>、一元夺宝承诺遵循以下的原则运营活动，确保所有用户在一元夺宝中享受同等的权利与义务。</span></p><p><span></span><span>平等原则：用户和一元夺宝在交易过程中具有同等的法律地位。</span></p><p><span></span><span>自由原则：用户享有自愿向一元夺宝参与购买商品的权利，任何人不得非法干预。</span></p><p><span></span><span>公平原则：用户和一元夺宝行使权利、履行义务应当遵循公平原则。</span></p><p><span></span><span>诚实信用原则：用户和一元夺宝行使权利、履行义务应当遵循诚实信用原则。</span></p><p><span></span><span>履行义务原则：用户向一元夺宝参与商品分享购买时，用户和一元夺宝皆有有义务根据本服务协议的约定完成该等交易（法律或本协议禁止的交易除外）</span></p><p><span>3</span><span>、用户知悉，除本协议另有约定外，用户无论是否获得商品，参与夺宝的资金均用于帮助他人，不能退回；用户完全了解参与一元夺宝存在的风险，一元夺宝网无法保证用户参与夺宝一定会获得商品。</span></p><p><span></span><span>四、用户的权利和义务</span></p><p><span>1</span><span>、用户有权拥有其在一元夺宝的姓名和联系方式，并用该姓名和参与商品购买。用户不得以任何形式转让或授权他人使用自己的一元夺宝姓名、联系方式和幸运号码。</span></p><p><span>2</span><span>、用户有权根据本协议的规定以及一元夺宝上浏览商品信息、活动规则、邀请好友助力、以及享受一元夺宝提供的其它信息服务。</span></p><p><span>3</span><span>、用户有义务在注册时提供自己的真实资料，并保证诸如电子邮件地址、联系电话、联系地址、邮政编码等内容的有效性及真实性，保证一元夺宝可以通过上述联系方式与用户本人进行联系。</span></p><p><span>4</span><span>、用户应当保证在一元夺宝参与商品分享购买时遵守诚实信用原则，不扰乱网上交易的正常秩序。</span></p><p><span><span>&nbsp;</span>&nbsp;</span><span>五、一元夺宝的权利和义务</span></p><p><span>1</span><span>、一元夺宝有义务在现有技术上维护整个网上交易平台的正常运行，并努力提升和改进技术，使用户网上交易活动得以顺利进行；</span></p><p><span>2</span><span>、对用户在注册和使用一元夺宝网上交易平台中所遇到的与交易或注册有关的问题及反映的情况，一元夺宝应及时作出回复；</span></p><p><span>3</span><span>、对于用户在一元夺宝网站上作出下列行为的，一元夺宝有权作出删除相关信息、终止提供服务等处理，而无须征得用户的同意：</span></p><p><span>1)</span><span>一元夺宝有权对用户的注册信息及购买行为进行查阅，发现注册信息或购买行为中存在任何问题的，有权向用户发出询问及要求改正的通知或者作出删除等处理；</span></p><p><span>2)</span><span>用户违反本协议规定或有违反法律法规和地方规章的行为的，一元夺宝有权停止传输并删除其信息，禁止用户发言，注销用户账户并按照相关法律规定向相关主管部门进行披露。</span></p><p><span>3)</span><span>对于用户在一元夺宝进行的下列行为，一元夺宝有权对用户采取删除其信息、禁止用户发言、注销用户账户等限制性措施：包括发布或以电子邮件或以其他方式传送存在恶意、虚假和侵犯他人人身财产权利内容的信息，进行与分享购物无关或不是以分享购物为目的的活动，恶意注册、签到、评论等方式试图扰乱正常购物秩序，将有关干扰、破坏或限制任何计算机软件、硬件或通讯设备功能的软件病毒或其他计算机代码、档案和程序之资料，加以上载、发布、发送电子邮件或以其他方式传送，干扰或破坏一元夺宝网站和服务或与一元夺宝网站和服务相连的服务器和网络，或发布其他违反公共利益或可能严重损害一元云购和其它用户合法利益的信息。</span></p><p><span>4</span><span>、用户在此免费授予一元夺宝永久性的独家使用权<span>(</span>并有权对该权利进行再授权<span>)</span>，使一元夺宝有权在全球范围内<span>(</span>全部或部分地<span>)</span>使用、复制、修订、改写、发布、翻译和展示用户公示于一元夺宝网站的各类信息，或制作其派生作品，和或以现在已知或日后开发的任何形式、媒体或技术，将上述信息纳入其它作品内。</span></p><p><span>5</span><span>、对于一元夺宝网络平台已上架商品，一元夺宝有权根据市场变动修改商品价格，而无需提前通知客户。</span></p><p><span>6</span><span>、一元夺宝分享购物模式，秉着双方自愿原则，分享购物存在风险，一元夺宝不对抽取的<span>“</span>幸运编号<span>”</span>结果承担责任，望所有用户谨慎参与。</span></p><p><span></span><span>六、配送及费用</span></p><p><span></span><span>因婚纱套系为特殊产品，故最终用户的夺宝产品，影楼将与用户协商后，具体确认领取方式。</span></p><p><span></span><span>七、责任限制</span></p><p><span>1</span><span>、用户理解并同意，在使用一元夺宝网服务的过程中，可能会遇到不可抗力等风险因素使一元夺宝网服务发生中断。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，一元云购网将努力在第一时间与相关单位配合，及时进行修复，但是由此给用户造成的损失，一元夺宝网将在法律允许的范围内免责。</span></p><p><span>2</span><span>、用户理解并同意，一元夺宝网不能随时预见和防范法律、技术以及其他不可控的风险，对以下情形之一导致的服务中断或受阻，一元夺宝网不承担责任：</span></p><p><span></span><span>（<span>1</span>）大规模病毒、木马或其他恶意程序、黑客攻击的破坏；</span></p><p><span></span><span>（<span>2</span>）用户或一元夺宝网的电脑软件、系统、硬件和通信线路出现故障；</span></p><p><span></span><span>（<span>3</span>）用户操作不当；</span></p><p><span></span><span>（<span>4</span>）用户通过非一元夺宝网授权的方式使用服务；</span></p><p><span></span><span>（<span>5</span>）政府管制等原因可能导致的服务中断、数据丢失以及其他的损失和风险。</span></p><p><span></span><span>（<span>6</span>）其他一元夺宝网无法控制或合理预见的情形。</span></p><p><span></span><span>八、网络服务内容的所有权</span></p><p><span></span><span>本站定义的网络服务内容包括：文字、软件、声音、图片、录象、图表、广告中的全部内容；电子邮件的全部内容；本站为用户提供的其他信息。所有这些内容受版权、商标、标签和其它财产所有权法律的保护。所以，用户只能在本站和广告商授权下才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。本站所有的文章版权归原文作者和本站共同所有，任何人需要转载本站的文章，必须征得原文作者或本站授权。</span></p><p><span></span><span>九、用户隐私制度</span></p><p><span></span><span>我们不会向任何第三方提供，出售，出租，分享和交易用户的个人信息。当在以下情况下，用户的个人信息将部分或全部被善意披露：</span></p><p><span>1</span><span>、经用户同意，向第三方披露；</span></p><p><span>2</span><span>、如用户是合资格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；</span></p><p><span>3</span><span>、根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；</span></p><p><span>4</span><span>、如果用户出现违反中国有关法律或者网站政策的情况，需要向第三方披露；</span></p><p><span>5</span><span>、为提供你所要求的产品和服务，而必须和第三方分享用户的个人信息；</span></p><p><span>6</span><span>、其它本站根据法律或者网站政策认为合适的披露。</span></p><p><span></span><span>十、法律管辖和适用</span></p><p><span>1</span><span>、本协议的订立、执行和解释及争议的解决均应适用中国法律。</span></p><p><span>2</span><span>、如发生本站服务条款与中国法律相抵触时，则这些条款将完全按法律规定重新解释，而其它合法条款则依旧保持对用户产生法律效力和影响。</span></p><p><span>3</span><span>、本协议的规定是可分割的，如本协议任何规定被裁定为无效或不可执行，该规定可被删除而其余条款应予以执行。</span></p><p><span>4</span><span>、如双方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向本站所在地的人民法院提起诉讼。</span></p><p><br></p></div>');
    $('.modal_agreement').on('touchend',function(e){
      e.preventDefault();
      if(self.isMoved){
        return
      }

      $(this).hide()
    })
  });
};




//调用微信JS api 支付

function jsApiCall(order_id, call_url, bid,post_url,succUrl)
{
  if(!order_id) {
    YYalert('发起微信支付失败！！');
  } else {
    
    $.post(post_url, {order_id:order_id, call_url:call_url}, function(data) {
      if(data['status'] == true) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          $.parseJSON(data['params']['jsApiParameters']),
          function(res){
            WeixinJSBridge.log(res.err_msg);
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              window.location.href = succUrl;
            } else {
              YYalert('发起微信支付失败！');
            }
           // obj.removeClass('wxpayed');
          }
        );
      } else {
        YYalert(data['message']);
      }
    }, 'json');
  }

}

function callPay(order_id,call_url, bid,post_url,succUrl)
{
  if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){  
      document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
    }else if (document.attachEvent){  
      document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
      document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
    }
  }else{
    jsApiCall(order_id,call_url,bid,post_url,succUrl);
  }
}


