　　
define(function() {　　　　
	var fn = function() {
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

		function getDate(sDate) {　　
			var sdate = new Date(sDate.replace(/[-年月日]/g, '/').replace(/\/$/g, ''));　　
			var now = new Date();　　
			var days = now.getTime() - sdate.getTime();　　
			var day = parseInt(days / (1000 * 60 * 60 * 24));　　
			return day;
		};

		var APP = new Vue({
			el: '#WX_V3_assistant',
			data: {
				message: '26',
				ok: false,
				iosSelect: ''
			},
			components: {
				'wedding-date-component': {
					template: '\
				<section class="WX_V3_wedding_date">\
					<div data-echo-background="img/wedding_date_bg.png">\
						<i class="i_close" v-on:click="APP.fn()"></i>\
						<header>请选择您的婚礼日期</header>\
						<div class="date_wrap"></div>\
						<footer>\
							<button v-on:click="APP.setDay()">确定</button>\
						</footer>\
					</div>\
				</section>'
				}
			},
			methods: {
				fn: function(e) {
					this.ok = !this.ok;
					if ($(this).data('date') == true) {
						return;
					}
					$(this).data('date', 'true');
					var self = this;


					require(['js/iscroll'], function(IScroll) {
						window.IScroll = IScroll;
						require(['js/ios-select'], function(IosSelect) {
							self.iosSelect = new IosSelect(3, [yearData, monthData, dateData], {
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
				setDay: function(e) {
					this.message = -getDate(this.iosSelect.selectOneObj.value + this.iosSelect.selectTwoObj.value + this.iosSelect.selectThreeObj.value);
				}
			}
		});



		return APP;
	};　　　　
	return {　　　　　　
		fn: fn
	};　　
});