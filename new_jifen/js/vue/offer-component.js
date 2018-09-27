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
