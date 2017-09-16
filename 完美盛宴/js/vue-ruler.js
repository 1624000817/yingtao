$.fn.scrollEnd = function(callback, timeout) {          
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};

function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 10;
        
    var animateScroll = function(){        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
};


Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

! function(e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.VueRuler = t() : e.VueRuler = t()
}(this, function() {
	return function(e) {
		function t(r) {
			if (n[r]) return n[r].exports;
			var i = n[r] = {
				exports: {},
				id: r,
				loaded: !1
			};
			return e[r].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
		}
		var n = {};
		return t.m = e, t.c = n, t.p = "", t(0)
	}([function(e, t, n) {
		"use strict";

		function r(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}

		function i(e, t) {
			s.default.mixins = s.default.mixins || [], t = t || {}, s.default.mixins.push({
				props: {
					max: {
						type: Number,
						default: t.max || 1e3
					},
					step: {
						type: Number,
						default: t.step || 10
					},
					unit: {
						type: Number,
						default: t.unit || 10
					}
				}
			}), e.component("vue-ruler", s.default)
		}
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.install = i;
		var o = n(4),
			s = r(o)
	}, function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		}), t.default = {
			props: {
				max: {
					type: Number,
					default: 1e3
				},
				verticle: {
					type: Boolean,
					default: true
				},
				num: {
					type: Number,
					default: 0
				},
				step: {
					type: Number,
					default: 10
				},
				unit: {
					type: Number,
					default: 10
				}
			},
			data: function() {
				return {
					num: 0
				}
			},
			mounted: function() {
				var e = $(".vue-iscroll-wrapper"),
					t = this,
					n = $(".vue-iscroll-inner ul"),
					obj = t.verticle?'scrollTop':'scrollLeft',
					timer;
				n.empty(), this.verticle?n.height((this.max + 1) * this.unit):n.width((this.max + 1) * this.unit);
				for (var i = 0; i <= this.max; i++) i % this.step == 0 ? n.append($('<li class="high" style="'+(this.verticle?'height':'width')+':' + this.unit + 'px"><span>' + i + "</span></li>")) : n.append($('<li style="'+(this.verticle?'height':'width')+':' + this.unit + 'px"></li>'));



				e[0][obj] = t.num * t.unit;



				e.on("scroll", function() {
					this.x = t.verticle?this.scrollTop:this.scrollLeft;
					t.$data.num = Math.abs(Math.floor(this.x.toFixed(0) / t.unit)), t.$emit("vue-ruler-changed", {
						num: t.$data.num
					})

					clearTimeout(timer);
        			timer = setTimeout( refresh , 150 );
					function refresh(){
						this.x = e[0][obj];
						if(this.x == 0){
							return
						}
						var n = Math.floor(this.x.toFixed(0) / t.unit) * t.unit;
						var m = this.x < n + t.unit/2;
						Math.abs(n) > t.max * t.unit ? (scrollTo(e[0],t.max * t.unit,200), t.$data.num = t.max, t.$emit("vue-ruler-changed", {
							num: t.$data.num
						})) :scrollTo(e[0],m?n:n+t.unit,200);
					}

				})
			}
		}
	}, function(e, t, n) {
		t = e.exports = n(3)(), t.push()
	}, function(e, t) {
		e.exports = function() {
			var e = [];
			return e.toString = function() {
				for (var e = [], t = 0; t < this.length; t++) {
					var n = this[t];
					n[2] ? e.push("@media " + n[2] + "{" + n[1] + "}") : e.push(n[1])
				}
				return e.join("")
			}, e.i = function(t, n) {
				"string" == typeof t && (t = [
					[null, t, ""]
				]);
				for (var r = {}, i = 0; i < this.length; i++) {
					var o = this[i][0];
					"number" == typeof o && (r[o] = !0)
				}
				for (i = 0; i < t.length; i++) {
					var s = t[i];
					"number" == typeof s[0] && r[s[0]] || (n && !s[2] ? s[2] = n : n && (s[2] = "(" + s[2] + ") and (" + n + ")"), e.push(s))
				}
			}, e
		}
	}, function(e, t, n) {
		var r, i;
		n(7), r = n(1);
		var o = n(5);
		i = r = r || {}, "object" != typeof r.default && "function" != typeof r.default || (i = r = r.default), "function" == typeof i && (i = i.options), i.render = o.render, i.staticRenderFns = o.staticRenderFns, e.exports = r
	}, function(e, t) {
		e.exports = {
			render: function() {
				var e = this,
					t = e.$createElement;
				e._self._c || t;
				return e._m(0)
			},
			staticRenderFns: [function() {
				var e = this,
					t = e.$createElement,
					n = e._self._c || t;
				return n("div", {
					staticClass: "vue-ruler-wrapper"
				}, [n("div", {
					staticClass: "vue-iscroll-wrapper"
				}, [n("div", {
					staticClass: "vue-iscroll-inner"
				}, [n("ul", [n("li"), e._v(" "), n("li"), e._v(" "), n("li"), e._v(" "), n("li"), e._v(" "), n("li"), e._v(" "), n("li", {
					staticClass: "high"
				}, [n("span", [e._v("5")])])])])])])
			}]
		}
	}, function(e, t, n) {
		function r(e, t) {
			for (var n = 0; n < e.length; n++) {
				var r = e[n],
					i = p[r.id];
				if (i) {
					i.refs++;
					for (var o = 0; o < i.parts.length; o++) i.parts[o](r.parts[o]);
					for (; o < r.parts.length; o++) i.parts.push(l(r.parts[o], t))
				} else {
					for (var s = [], o = 0; o < r.parts.length; o++) s.push(l(r.parts[o], t));
					p[r.id] = {
						id: r.id,
						refs: 1,
						parts: s
					}
				}
			}
		}

		function i(e) {
			for (var t = [], n = {}, r = 0; r < e.length; r++) {
				var i = e[r],
					o = i[0],
					s = i[1],
					u = i[2],
					l = i[3],
					a = {
						css: s,
						media: u,
						sourceMap: l
					};
				n[o] ? n[o].parts.push(a) : t.push(n[o] = {
					id: o,
					parts: [a]
				})
			}
			return t
		}

		function o(e, t) {
			var n = h(),
				r = x[x.length - 1];
			if ("top" === e.insertAt) r ? r.nextSibling ? n.insertBefore(t, r.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), x.push(t);
			else {
				if ("bottom" !== e.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
				n.appendChild(t)
			}
		}

		function s(e) {
			e.parentNode.removeChild(e);
			var t = x.indexOf(e);
			t >= 0 && x.splice(t, 1)
		}

		function u(e) {
			var t = document.createElement("style");
			return t.type = "text/css", o(e, t), t
		}

		function l(e, t) {
			var n, r, i;
			if (t.singleton) {
				var o = m++;
				n = v || (v = u(t)), r = a.bind(null, n, o, !1), i = a.bind(null, n, o, !0)
			} else n = u(t), r = f.bind(null, n), i = function() {
				s(n)
			};
			return r(e),
				function(t) {
					if (t) {
						if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
						r(e = t)
					} else i()
				}
		}

		function a(e, t, n, r) {
			var i = n ? "" : r.css;
			if (e.styleSheet) e.styleSheet.cssText = g(t, i);
			else {
				var o = document.createTextNode(i),
					s = e.childNodes;
				s[t] && e.removeChild(s[t]), s.length ? e.insertBefore(o, s[t]) : e.appendChild(o)
			}
		}

		function f(e, t) {
			var n = t.css,
				r = t.media,
				i = t.sourceMap;
			if (r && e.setAttribute("media", r), i && (n += "\n/*# sourceURL=" + i.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */"), e.styleSheet) e.styleSheet.cssText = n;
			else {
				for (; e.firstChild;) e.removeChild(e.firstChild);
				e.appendChild(document.createTextNode(n))
			}
		}
		var p = {},
			d = function(e) {
				var t;
				return function() {
					return "undefined" == typeof t && (t = e.apply(this, arguments)), t
				}
			},
			c = d(function() {
				return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())
			}),
			h = d(function() {
				return document.head || document.getElementsByTagName("head")[0]
			}),
			v = null,
			m = 0,
			x = [];
		e.exports = function(e, t) {
			t = t || {}, "undefined" == typeof t.singleton && (t.singleton = c()), "undefined" == typeof t.insertAt && (t.insertAt = "bottom");
			var n = i(e);
			return r(n, t),
				function(e) {
					for (var o = [], s = 0; s < n.length; s++) {
						var u = n[s],
							l = p[u.id];
						l.refs--, o.push(l)
					}
					if (e) {
						var a = i(e);
						r(a, t)
					}
					for (var s = 0; s < o.length; s++) {
						var l = o[s];
						if (0 === l.refs) {
							for (var f = 0; f < l.parts.length; f++) l.parts[f]();
							delete p[l.id]
						}
					}
				}
		};
		var g = function() {
			var e = [];
			return function(t, n) {
				return e[t] = n, e.filter(Boolean).join("\n")
			}
		}()
	}, function(e, t, n) {
		var r = n(2);
		"string" == typeof r && (r = [
			[e.id, r, ""]
		]);
		n(6)(r, {});
		r.locals && (e.exports = r.locals)
	}])
});