
/* 红包弹窗代码 */
$(document).ready(function() {
	var popLayers = {
		alert: function(msg, event) {
			var layerid = layer.open({
				type: 1,
				content: $.trim(msg),
				time: 2000,
				shade: false,
				shadeClose: true,
				success: function(n) {
					$(n).one("click", function() {
						layer.close(layerid);
					});
				},
				end: function() {
					event && event();
				}
			});
			layer.style(layerid, {
				color: '#fff',
				'background-color': "rgba(0,0,0,0.8)",
				'border': 0,
				'text-align': 'center'
			});
		},
		regTest: function(content, type) {
			var exp, areaNums = ["130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "145", "147", "150", "151", "152", "153", "155", "156", "157", "158", "159", "170", "176", "177", "178", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189"];
			switch (type) {
				case "handPhone":
					exp = "^(" + areaNums.join("|") + ")\\d{8}$";
					break;
				case "phone":
					exp = "^(" + areaNums.join("|") + ")\\d{8}$|^[0-9]{2,4}-[2-9][0-9]{6,7}(-[0-9]{1,6})?$";
					break;
				case "telPhone":
					exp = /^[0-9]{2,4}-[2-9][0-9]{6,7}(-[0-9]{1,6})?$/;
					break;
				default:
					return false;
			}

			return new RegExp(exp).test(content);
		}
	};

	var opened = false;
	var envLayerId, takeLayerId, fid = parseInt($("#fid").val());
	var onOpenedHandler = function() {
		$("#hongbaoS1").on("click", ".btn", function() {
			layer.close(envLayerId);

			takeLayerId = layer.open({
				type: 1,
				shadeClose: true,
				content: $("#hongbaoS2wp").html().replace("{$money}", 688),
				success: function(layero, layerid) {
					$(layero).one("click", function() {
						//layer.close(layerid);
					});
				}
			});

			layer.style(takeLayerId, {
				'background-color': "transparent",
				'box-shadow': 'none',
				"width": "auto"
			});

			$("#hongbaoS2").on("click", ".btn", function() {
				var m = $("#name").val();
				var n = $("#tel").val();
				if(m.length < 2){
					layer.msg("请填写您的姓名", {
						time: 1000
					});
					return false;
				}
				if (popLayers.regTest(n, "phone")) {
					var UserTel = $("input[name='tel']").val();
					var RedBoxId = $("input[name='redbox_id']").val();
					var RedBoxMoney = $("input[name='red_box_money']").val();
					var UserShowId = $("input[name='user_show_id']").val();
				} else {
					layer.msg("手机号填写错误", {
						time: 1000
					});
					return false;
				}
			});
		});
	};

	// 点击红包出弹窗
	$(".envelop,.btn,.page_bag").on("click", function() {
		envLayerId = layer.open({
			type: 1,
			shadeClose: true,
			content: $("#hongbaoS1wp").html(),
			success: function(layero, layerid) {
				if (!opened) onOpenedHandler();
				$(layero).one("click", function() {
					//layer.close(layerid);
				});
			}
		});
		layer.style(envLayerId, {
			'background-color': "transparent",
			'box-shadow': 'none',
			"width": "auto"
		});
	});

});