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

window.WXalert = function(t, callback){
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

window.WXconfirm = function(t, callback){
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


//每日签到组件
var weddingSignComponent = {
  props: ['data'],
  template: '\
    <section class="WX_V3_daily_sign">\
      <div v-bind:style="{\'background-image\':\'url(\'+data.banner+\')\'}">\
        <i class="i_close" v-on:click.prevent="data.isShow=false"></i>\
        <header>签到成功</header>\
        <div class="day">{{data.plus[data.day-1]}}</div>\
        <div class="tips">一<br>连续签到3天有惊喜哦！</div>\
        <div class="points"><i class="i_data"></i>我的{{data.pointsName}}:{{data.points}}</div>\
        <div class="progress">\
          <table>\
            <td v-bind:class="{active:data.day==1}">+{{data.plus[0]}}<i></i><small>第一天</small></td>\
            <td v-bind:class="{active:data.day==2}">+{{data.plus[1]}}<i></i><small>第二天</small></td>\
            <td v-bind:class="{active:data.day==3}">+{{data.plus[2]}}<i class="i_vip"></i><small>第三天</small></td>\
          </table>\
        </div>\
        <footer>\
          <a v-bind:href="data.btnUrl">{{data.btnTitle}}</a>\
          <small>前往任务中心、活动中心可以赚取更多{{data.pointsName}}哟</small>\
        </footer>\
      </div>\
    </section>'
};






//选择角色组件
var selectRolesComponent = {
  props: ['data'],
  template: '\
    <section v-bind:class="{popup:data.isPopup}" class="WX_V3_select_roles_form">\
      <form>\
        <i v-if="data.isPopup" class="i_close" v-on:click.prevent="data.isShow=false"></i>\
        <div>\
          <header>您的角色</header>\
          <table>\
            <td><input v-model="data.sex" type="radio" value="women" id="women"><label for="women"><img v-bind:src="data.women[1]">{{data.women[0]}}</label></td>\
            <td>或</td>\
            <td><input v-model="data.sex" type="radio" value="men" id="men"><label for="men"><img v-bind:src="data.men[1]">{{data.men[0]}}</label></td>\
          </table>\
        </div>\
        <div>\
          <input v-model="data.name" type="text" placeholder="请输入您的称呼">\
          <input v-model="data.mobile" type="tel" placeholder="请输入您的手机">\
        </div>\
        <div v-if="data.tips!=\'\'" class="tips"><i class="i_horn"></i><a>{{data.tips}}</a></div>\
        <button v-on:click.prevent="submitFn">确定</button>\
      </form>\
    </section>',
  methods: {
    submitFn: function() {
      this.$emit('roles',this.data);

    }
  }
};


//客户认证组件
var customerAuthComponent = {
  props: ['data'],
  template: '\
    <section class="WX_V3_customer_auth WX_V3_appointment_form">\
      <div>\
        <i class="i_close" v-on:click.prevent="data.isShow=false"></i>\
        <table>\
          <tr><td>姓名</td><td><input v-model="data.name" type="text" placeholder="请输入您的称呼"></td></tr>\
          <tr><td>手机</td><td><input v-model="data.mobile" type="tel" placeholder="请输入您的手机"></td></tr>\
          <tr><td>签约时间</td><td><input v-model="data.date" type="date" placeholder="请输入您的签约时间"></td></tr>\
        </table>\
        <button v-on:click.prevent="submitFn">确定</button>\
      </div>\
    </section>',
  methods: {
    submitFn: function() {
      this.$emit('customer',this.data);

    }
  }
};










//快速报价组件
var offerComponent = {
  props: ['data'],
  template: '\
    <section class="WX_V3_offer">\
      <figure>\
        <img v-bind:src="data.banner">\
      </figure>\
      <div class="wrap">\
        <table>\
          <tr v-for="item in data.offerData">\
            <th v-bind:class="item.name[0]"><i v-bind:class="item.name[1]"></i><small>{{item.name[3]}}</small>{{item.name[2]}}</th>\
            <td><label v-for="(label,index) in item.items" v-bind:class="{active:label[1]}" v-on:click="labelFn(item.items,index,item.type)">{{label[0]}}</label></td>\
          </tr>\
          <tr v-for="item in data.offerInput">\
            <th v-bind:class="item.name[0]"><i v-bind:class="item.name[1]"></i><small>{{item.name[3]}}</small>{{item.name[2]}}</th>\
            <td><input v-model="item.value" type="text" v-bind:placeholder="item.name[2]"></td>\
          </tr>\
        </table>\
      </div>\
      <button v-on:click="submitFn" type="button">{{data.btnTitle}}</button>\
    </section>',
  methods: {
    labelFn: function(v,i,t) { //报价选择
      if (t == 0) {
        v.map(function(v) {
          return v[1] = false;
        });
      }
      this.$set(v[i], 1, v[i][1] = !v[i][1]);
    },
    submitFn: function() { //报价提交
      var arr = [];
      this.data.offerData.map(function(v) {
        var b = [];
        v.items.map(function(e, i) {
          if (e[1] == true) {
            b.push(e[0]);
          }
        });
        arr.push(b)
      });

      if (this.data.offerInput) {
        this.data.offerInput.map(function(v) {
          if (v.value) {
            arr.push(v.value);
          }
        });
      };
      
      this.$emit('offer',arr);
    }
  }
};


//修改婚期组件
var weddingDateComponent = {
  props: ['data'],
  template: '\
      <section class="WX_V3_wedding_date">\
        <div data-echo-background="img/wedding_date_bg.png">\
          <i class="i_close" v-on:click="weddingFn"></i>\
          <header>请选择您的婚礼日期</header>\
          <div class="loading" v-show="data.loading">Loading...</div>\
          <div class="date_wrap"></div>\
          <footer>\
            <button v-on:click="setDay">确定</button>\
          </footer>\
        </div>\
      </section>',
  methods: {
    weddingFn: function(e) {
      this.data.isShow = !this.data.isShow;
      if(this.dateObj){
        return;
      }
      this.dateObj = true;
      var self = this;

      var now = new Date();
      var nowYear = now.getFullYear();
      var nowMonth = now.getMonth() + 1;
      var nowDate = now.getDate();

      function formatYear(nowYear) {
        var arr = [];
        for (var i = nowYear; i <= nowYear + 5; i++) {
          arr.push({
            id: i + '',
            value: i + '年'
          });
        }
        return arr;
      }

      function formatMonth(nowMonth) {
        var arr = [];
        for (var i = nowMonth; i <= 12; i++) {
          arr.push({
            id: i + '',
            value: i + '月'
          });
        }
        return arr;
      }

      function formatDate(count) {
        var arr = [];
        for (var i = 1; i <= count; i++) {
          arr.push({
            id: i + '',
            value: i + '日'
          });
        }
        return arr;
      }
      var yearData = function(callback) {
        setTimeout(function() {
          callback(formatYear(nowYear))
        }, 300)
      }
      var monthData = function(year, callback) {
        setTimeout(function() {
          if (year == nowYear) {
            callback(formatMonth(nowMonth))
          } else {
            callback(formatMonth(1))
          }

        }, 300);
      };
      var dateData = function(year, month, callback) {
        setTimeout(function() {
          if (/^1|3|5|7|8|10|12$/.test(month)) {
            callback(formatDate(31));
          } else if (/^4|6|9|11$/.test(month)) {
            callback(formatDate(30));
          } else if (/^2$/.test(month)) {
            if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
              callback(formatDate(29));
            } else {
              callback(formatDate(28));
            }
          } else {
            throw new Error('month is illegal');
          }
        }, 300);
      };

      requirejs.config({
          baseUrl: 'http://h5.yingtaoyun.com/yingtao/wx/v3/js'
      });

      require(['iscroll'], function(IScroll) {
        window.IScroll = IScroll;
        require(['ios-select'], function(IosSelect) {
          self.data.loading = false;

          self.data.iosSelect = new IosSelect(3, [yearData, monthData, dateData], {
            container: '.date_wrap',
            itemHeight: 1.706667,
            cssUnit: 'rem',
            relation: [1, 1],
            oneLevelId: nowYear,
            twoLevelId: nowMonth,
            threeLevelId: nowDate,
            itemShowCount: 3
          });
        });
      });
    },
    setDay: function(){
      var self = this;

      function getDate(sDate) {
        var sdate = sDate.replace(/[-年月日]/g, '/').replace(/\/$/g, ''),
        date = new Date(),
        now,
        day;
        sdate = sdate.split('/');
        sdate = new Date(parseInt(sdate[0]), parseInt(sdate[1]) - 1, parseInt(sdate[2]));
        now = new Date(parseInt(date.getFullYear()), parseInt(date.getMonth()), parseInt(date.getDate()));
        day = parseInt((Number(now) - Number(sdate)) / (1000 * 60 * 60 * 24));
        return day;
      };

      v3.countUp(-getDate(this.data.iosSelect.selectOneObj.value + this.data.iosSelect.selectTwoObj.value + this.data.iosSelect.selectThreeObj.value),function(num){
        self.data.countDown = num;
      });

      this.$emit('wedding',(this.data.iosSelect.selectOneObj.value + this.data.iosSelect.selectTwoObj.value + this.data.iosSelect.selectThreeObj.value).replace(/[-年月日]/g, '-').replace(/\-$/g, ''));
      this.data.isShow = false;
    }
  }
};





//收货地址组件
var addressComponent = {
  props: ['data'],
  template: '\
    <section class="WX_V3_address">\
      <header>\
        <a v-on:click="data.isShow=false"><i class="i_arrow_right"></i> 返回</a>\
        我的收货地址\
        <a v-on:click="data.isManage=!data.isManage">\
          <template v-if="data.isManage"><i class="i_ok_o"></i> 完成</template>\
          <template v-else><i class="i_set"></i> 管理</template>\
        </a>\
      </header>\
      <section class="WX_V3_tables">\
        <section>\
          <div v-for="(item,index) in data.address" v-on:click="data.isManage?itemEdit(item,index):itemCur(item,index)" v-bind:class="{\'active\':data.current==index}" class="WX_V3_tables_item">\
            <header><a>{{item.address}}</a><span v-show="data.isManage"><a v-on:click.stop="itemEdit(item,index)">编辑</a> | <a v-on:click.stop="itemDel(item,index)">删除</a></span></header>\
            <div>{{item.name}}<span>{{item.sex}}</span>{{item.mobile}}</div>\
          </div>\
        </section>\
        <a v-on:click="newAddress" v-show="!data.isManage" class="table_add_btn modal_blur"><i class="i_add"></i> 新增收货地址</a>\
      </section>\
      <section v-show="data.addressForm.isShow" class="WX_V3_day_flow_modal WX_V3_day_flow_item_modal modal_blur">\
        <div>\
          <i v-on:click="data.addressForm.isShow=false" class="i_close"></i>\
          <header>{{data.addressForm.isNew?"新增收货地址":"编辑收货地址"}}</header>\
          <table>\
            <tr><th>姓名</th><td><input v-model="data.addressForm.name" type="text" placeholder=""></td></tr>\
            <tr class="WX_V3_select_roles_form">\
              <th>性别</th>\
              <td>\
                <input v-model="data.addressForm.sex" type="radio" value="女士" id="women"><label for="women"><img src="http://h5.yingtaoyun.com/yingtao/wx/v3/img/women.png">女士</label>\
                <input v-model="data.addressForm.sex" type="radio" value="先生" id="men"><label for="men"><img src="http://h5.yingtaoyun.com/yingtao/wx/v3/img/men.png">先生</label>\
              </td>\
            </tr>\
            <tr><th>电话</th><td><input v-model="data.addressForm.mobile" type="phone" placeholder=""></td></tr>\
            <tr><th>地址</th><td><input v-model="data.addressForm.address" type="text" placeholder=""></td></tr>\
          </table>\
          <button v-if="" v-on:click="itemSave"><i class="i_ok_o"></i> 保存</button>\
        </div>\
      </section>\
    </section>',
  methods: {
    itemCur: function(e,i){
      this.data.current = i;
      this.data.addressForm.id = e.id;
      this.data.addressForm.isSelect = true;
      this.data.isShow = false;
      this.submitFn();
    },
    itemEdit: function(e,i){
      this.data.addressForm.isShow = true;
      this.data.addressForm.isNew = false;
      this.data.addressForm.del = false;
      this.data.addressForm.isSelect = false;
      this.data.addressForm.active = e;
      this.data.addressForm.index = i;
      this.data.addressForm.id = e.id;
      this.data.addressForm.name = e.name;
      this.data.addressForm.sex = e.sex;
      this.data.addressForm.mobile = e.mobile;
      this.data.addressForm.address = e.address;
    },
    itemDel: function(e,i){
      var self = this;
      this.data.addressForm.id = e.id;
      WXconfirm('确定要删除该地址吗？',function(){
        if(self.data.isError){ 
          return false;
        };
        self.data.address.splice(i,1);
        self.data.addressForm.del = true;
        self.submitFn();
      })
    },
    itemSave: function(){
      if(this.data.isError){ 
        return false;
      };

      if(this.data.addressForm.isNew){
        this.data.address.push({
          "name": this.data.addressForm.name,
          "sex": this.data.addressForm.sex,
          "mobile": this.data.addressForm.mobile,
          "address": this.data.addressForm.address,
          "isShow": true
        });
      }else{
        this.data.addressForm.active.name = this.data.addressForm.name;
        this.data.addressForm.active.sex = this.data.addressForm.sex;
        this.data.addressForm.active.mobile = this.data.addressForm.mobile;
        this.data.addressForm.active.address = this.data.addressForm.address;
      }

      this.data.addressForm.isShow = false;
      this.data.addressForm.del = false;
      this.data.addressForm.isSelect = false;

      this.submitFn({
        "name": this.data.addressForm.name,
        "sex": this.data.addressForm.sex,
        "mobile": this.data.addressForm.mobile,
        "address": this.data.addressForm.address,
        "isNew": this.data.addressForm.isNew
      });

    },
    newAddress: function(){
      this.data.addressForm.isShow = true;
      this.data.addressForm.isNew = true;
      this.data.addressForm.name = '';
      this.data.addressForm.sex = '女士';
      this.data.addressForm.mobile = '';
      this.data.addressForm.address = '';
    },
    submitFn: function() {
      this.$emit('address',this.data);
    }
  }
};






//分页组件
var pagesComponent = {
  props: ['data'],
  template: '\
    <ul class="pagination">\
      <li v-show="data.current != 1" @click="data.current-- && goto(data.current--)"><a>上一页</a></li>\
      <li v-for="index in pages" @click="goto(index)" :class="{\'active\':data.current == index}" :key="index">\
        <a>{{index}}</a>\
      </li>\
      <li v-show="data.allpage != data.current && data.allpage != 0 " @click="data.current++ && goto(data.current++)"><a>下一页</a></li>\
    </ul>',
  computed: {
    pages: function() {
      var pag = [];
      if (this.data.current < this.data.showItem) { //如果当前的激活的项 小于要显示的条数
        //总页数和要显示的条数那个大就显示多少条
        var i = Math.min(this.data.showItem, this.data.allpage);
        while (i) {
          pag.unshift(i--);
        }
      } else { //当前页数大于显示页数了
        var middle = this.data.current - Math.floor(this.data.showItem / 2), //从哪里开始
          i = this.data.showItem;
        if (middle > (this.data.allpage - this.data.showItem)) {
          middle = (this.data.allpage - this.data.showItem) + 1
        }
        while (i--) {
          pag.push(middle++);
        }
      }
      return pag
    }
  },
  methods: {
    goto: function(index) {
      if (index == this.data.current) return;
      this.data.current = index;
      WX_V3.pagesFn(this.data);
    }
  }
};




//玩赚积分组件
var earnPointsComponent = {
  props: ['data'],
  template: '\
    <section class="WX_V3_earn_points">\
      <div>\
        <i class="i_close" v-on:click.prevent="data.isShow=false"></i>\
        <blockquote v-html="data.content"></blockquote>\
      </div>\
    </section>'
};


//标尺组件
var rulerComponent = {
  props: ['data'],
  template: '\
    <div class="vue-ruler-wrapper">\
      <div v-on:scroll="scrollFn($event)" ref="scrollObj" class="vue-iscroll-wrapper">\
        <div class="vue-iscroll-inner">\
          <ul :style="data.verticle?\'height:\'+(this.data.max - this.data.min)*data.unit*10+\'px\':\'width:\'+(this.data.max - this.data.min)*data.unit*10+\'px\'"><li v-for="item in scale" :class="{high:item.high}" :style="data.verticle?\'height:\'+data.unit+\'px\':\'width:\'+data.unit+\'px\'"><span v-if="item.high">{{item.val}}</span></li></ul>\
        </div>\
      </div>\
    </section>',
  computed: {
    scale: function() {
      var arr = [];
      for (var i = this.data.max; i >= this.data.min; i-=this.data.step){
        i = i.toFixed(1);
        if(i % (this.data.step * 10) == 0){
          arr.push({
            val: Number(i).toFixed(0),
            high: true
          });
        }else{
          arr.push({
            val: i,
            high: false
          });
        }
      }
      return arr;
    }
  },
  mounted: function() {
    var obj = this.data.verticle ? 'scrollTop' : 'scrollLeft';
    this.$refs.scrollObj[obj] = (this.data.max * this.data.unit * 10) - (this.data.num * this.data.unit * 10);
  },
  methods: {
    scrollFn: function(event) {
      var self = this;
      var val;
      var e = event.target;
      var obj = self.data.verticle ? 'scrollTop' : 'scrollLeft';

      val = self.data.verticle ? e.scrollTop / 10 : e.scrollLeft / 10;

      clearTimeout(self.timer);
      self.timer = setTimeout(refresh, 150);


      function scrollTo(element, to, duration) {
        var start = self.data.verticle ? element.scrollTop : element.scrollLeft,
          change = to - start,
          currentTime = 0,
          increment = 10;

        var animateScroll = function() {
          currentTime += increment;
          var val = Math.easeInOutQuad(currentTime, start, change, duration);
          self.data.verticle ? element.scrollTop : element.scrollLeft = val;
          if (currentTime < duration) {
            setTimeout(animateScroll, increment);
          }
        };
        animateScroll();
      };


      Math.easeInOutQuad = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      function refresh() {
        self.$emit('ruler', {
          num: (self.data.max - Math.abs((val / 10))).toFixed(1)
        });

        val = e[obj];
        if (val == 0) {
          return
        }
        var n = Math.floor(val.toFixed(0) / self.data.unit) * self.data.unit;
        var m = val < n + self.data.unit / 2;
        Math.abs(n) > (self.data.max - self.data.min)  * self.data.unit * 10? (scrollTo(e, (self.data.max - self.data.min)  * self.data.unit * 10, 200), self.data.num = self.data.min) : scrollTo(e, m ? n : n + self.data.unit, 200);
      }

    }
  }

};



function V3(){

 echo.init({
    offset: 100,
    throttle: 100,
    unload: false,
    callback: function (element, op) {
      
    }
  })

};










V3.prototype.countUp = function(count,callback){
  var self = this,
    speed = 1,
    run_count = 0,
    int = setInterval(function() {
    callback(speed * run_count);
    run_count++;
    if (run_count > count) {
      clearInterval(int);
    }
  }, 1e3 / count);
};


V3.prototype.Moved = function(tapArea){
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




if (typeof module != 'undefined' && module.exports) {
  module.exports = V3;
} else if (typeof define == 'function' && define.amd) {
  define(function() {
    return V3;
  });
} else {
  window.V3 = V3;
}