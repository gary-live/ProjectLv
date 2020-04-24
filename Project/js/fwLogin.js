//依赖jqyery

var isTimeDown = false;
var phone = "";
var userId = "";
var areaCode = $(".area-code").text();
var countryCode = $(".select-country-box .flag").data("country");
var countryFlat = $(".select-country-box .flag").data("flag");
//注册时使用到的
var requestId = "";
var isSkip = true;
//用于识别手机号获取框现在的流程是在登录还是在找回密码
var loginType = "login";

var input_phone = $(".btn-get-code").parents('.login-body').find('.input-phone');

var appid = getQueryString("appid");
var thirdType = getQueryString("type");
var nickname = getQueryString("nickname");
var headImg = getQueryString("img");

$(document).on('focus', '.input-box input', function (event) {//验证码登录
	if ($(this).hasClass('input-identity') || $(this).attr('type') === 'radio') return !1;
	$(this).parents('.input-box').removeClass('status-ok status-error status-empty').addClass('status-success');
	if ($(this).parents('.input-box').find('.areacode-select-box').length > 0) {
		$(this).parents('.input-box').find('.areacode-select-box').hide();
	};
});
$(document).on('click', '.animate-holder', function (event) {//验证码登录
	$(this).parents('.input-box').find('input').trigger('focus');
});
$(document).on('blur', '.input-box input', function (event) {//验证码登录
	if ($(this).hasClass('input-identity') || $(this).attr('type') === 'radio') return !1;
	if ($(this).hasClass('input-phone')) {
		if (checkMobile($(this).val())) {
			$(this).parents('.input-box').removeClass('status-success status-error status-empty').addClass('status-ok');
		} else if (!$(this).val()) {
			$(this).parents('.input-box').removeClass('status-success status-error status-ok').addClass('status-empty');
		} else {
			$(this).parents('.input-box').removeClass('status-success status-ok status-empty').addClass('status-error');
		}
	} else {
		if ($(this).val()) {
			$(this).parents('.input-box').removeClass('status-success status-error status-empty').addClass('status-ok');
		} else {
			$(this).parents('.input-box').removeClass('status-success status-error status-ok').addClass('status-empty');
		}
	}
});

//居中
(function ($) {
	$.fn.setmiddle = function () {
		var dl = $(document).scrollLeft(),
			dt = 0,
			ww = $(window).width(),
			wh = $(window).height(),
			ow = $(this).width(),
			oh = $(this).height(),
			left = (ww - ow) / 2 + dl,
			top = (oh < 4 * wh / 7 ? wh * 0.452 - oh / 2 : (wh - oh) / 2) + dt;
		$(this).css({
			left: Math.max(left, dl) + 'px',
			top: Math.max(top, dt) + 'px',
		});
		return this;
	};
	$.fn.setmiddle2 = function () {
		var dl = $(document).scrollLeft(),
			dt = 0,
			ww = $(window).width(),
			ow = $(this).width(),
			left = (ww - ow) / 2 + dl,
			top = document.getElementById("ActualBox").getBoundingClientRect().top + 62;
		$(this).css({
			left: Math.max(left, dl) + 'px',
			top: top + 'px',
		});
		return this;
	};
	$.fn.setmiddle3 = function () {
		var dl = $(document).scrollLeft(),
			dt = 0,
			ww = $(window).width(),
			ow = $(this).width(),
			left = (ww - ow) / 2 + dl,
			top = document.getElementById("resetMode").getBoundingClientRect().top + 62;
		$(this).css({
			left: Math.max(left, dl) + 'px',
			top: top + 'px',
		});
		return this;
	};
	//添加微信地址
	$(".btn-wx").attr("href", "//u." + getFrom() + ".com/" + get_cc_lan() + "/third/wxauthorize?returnurl=" + encodeURI(window.location.href));
	$(".btn-q").attr("href", "//u." + getFrom() + ".com/" + get_cc_lan() + "/third/qqauthorize?returnurl=" + encodeURI(window.location.href));
	$(".btn-t").attr("href", "//u." + getFrom() + ".com/" + get_cc_lan() + "/third/ftlogin?type=tw&returnurl=" + encodeURI(window.location.href));

	if (getFrom() == "fxeye") {
		$(".btn-f").remove();
	} else {
		$(".btn-f").attr("href", "//u." + getFrom() + ".com/" + get_cc_lan() + "/third/ftlogin?type=fb&returnurl=" + encodeURI(window.location.href));
	}

	//获取地址检查是不是第三方绑定
	if (appid && thirdType && nickname) {
		loginMobile("third");
	}

})(jQuery);

// 水波纹效果
var ScRipple = new Object;
ScRipple.Fuc = function () {
	return {
		// 样式string拼凑
		forStyle: function (position) {
			var cssStr = '';
			for (var key in position) {
				if (position.hasOwnProperty(key)) cssStr += key + ':' + position[key] + ';';
			};
			return cssStr;
		},
		// 获取鼠标点击位置
		forRect: function (target) {
			var position = {
					top: 0,
					left: 0
				},
				ele = document.documentElement;
			'undefined' != typeof target.getBoundingClientRect && (position = target.getBoundingClientRect());
			return {
				top: position.top + window.pageYOffset - ele.clientTop,
				left: position.left + window.pageXOffset - ele.clientLeft
			}
		},
		waterShow: function (e,n,s) {
			var pDiv = e.target,
				cDiv = document.createElement('span');
			pDiv.appendChild(cDiv);
			var rectObj = ScRipple.Fuc.forRect(pDiv),
				_height = e.pageY - rectObj.top,
				_left = e.pageX - rectObj.left,
				_scale = 'scale(' + pDiv.clientWidth / 100 * 10 + ')';
			var position = {
				top: _height + 'px',
				left: _left + 'px'
			};
			cDiv.className = cDiv.className + n,
				cDiv.setAttribute("style", ScRipple.Fuc.forStyle(position)),
				position["-webkit-transform"] = _scale,
				position["-moz-transform"] = _scale,
				position["-ms-transform"] = _scale,
				position["-o-transform"] = _scale,
				position.transform = _scale,
				position.opacity = "1",
				position["-webkit-transition-duration"] = s + "ms",
				position["-moz-transition-duration"] = s + "ms",
				position["-o-transition-duration"] = s + "ms",
				position["transition-duration"] = s + "ms",
				position["-webkit-transition-timing-function"] =
				"cubic-bezier(0.250, 0.460, 0.450, 0.940)",
				position["-moz-transition-timing-function"] =
				"cubic-bezier(0.250, 0.460, 0.450, 0.940)",
				position["-o-transition-timing-function"] =
				"cubic-bezier(0.250, 0.460, 0.450, 0.940)",
				position["transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
				cDiv.setAttribute("style", ScRipple.Fuc.forStyle(position));
			var finishStyle = {
				opacity: 0,
				"-webkit-transition-duration": s + "ms",
				"-moz-transition-duration": s + "ms",
				"-o-transition-duration": s + "ms",
				"transition-duration": s + "ms",
				"-webkit-transform": _scale,
				"-moz-transform": _scale,
				"-ms-transform": _scale,
				"-o-transform": _scale,
				top: _height + "px",
				left: _left + "px",
			};
			setTimeout(function () {
				cDiv.setAttribute("style", ScRipple.Fuc.forStyle(finishStyle));
				setTimeout(function () {
					pDiv.removeChild(cDiv);
				}, s);
			}, 100)
		},
	}
}();
$(document).on('click', '.btn-login , .j-btn-nr , .lose-scale , .third-Li', function (e) {//按钮水波纹
	ScRipple.Fuc.waterShow(e, "waves-animation",1000);
});

// 第三方登录hover
$(".third-party-ul li").hover(function(){
	$(this).stop().animate({width: '220px'},450);
},function(){
	$(this).stop().animate({width:'50px'},450);
})
/*********************************************登录框使用开始********************************************************/
var pop_nice_parms = { //弹框通用滚动条美化参数
	cursorcolor: "#dbdbdb",
	touchbehavior: false,
	cursorwidth: "5px",
	cursorborder: "0",
	background: "#f5f5f5",
	cursorborderradius: "5px",
	autohidemode: false,
	nativeparentscrolling: false
};

//关闭弹框
$(document).on('click', '.g-login-box .login-close-btn', function (event) {
	$(".area-code-nav").find('dd').eq(0).trigger('click');
	if (appid && thirdType && nickname && headImg) {
		window.location.href = funcUrlDel(["appid", "type", "nickname", "img"]);
	}
	$(this).parents('.g-login-box').hide();
	$(this).parents('.pop-login-bg').hide();
	resetBox();
});

function resetBox() {
	//重置倒计时
	isTimeDown = false;
	$(".btn-get-code").html($(".btn-get-code").data("yzm"));
	$('input').val("");

	$(".error-tips").each(function () {
		if (!$(this).hasClass("tip-acount")) {
			$(this).html("");
		} else {
			$(this).hide();
		}
	});
	$('.input-box').removeClass('status-success status-empty status-ok status-error');
	try {
		//grecaptcha.reset();
		nc.reload();
		nc.hide();
	} catch (e) {
		console.log("");
	}

	$(".j-btn-nr").show();
	$(".j-btn-loading").hide();
	//隐藏跳过
	$(".btn-skip").hide();
	$(".verifical-login").removeClass("btn-jump");

	//重置闭眼
	$(".btn-eye").removeClass("btn-eye");


	$(".areacode-select-box").hide();

	$(".btn-login").removeClass("btn-login");

}


function codeScroll() {//区号与字母随动

	$(".areacode-select-box .area-code-nav dd").click(function () {
		var parent = $(this).parents('.areacode-select-box');
		var parentTop = parent.find(".area-code-body").offset().top;
		$(this).addClass("on").siblings().removeClass("on");
		item_top = parent.find('.area-code-body dl').eq($(this).index()).offset().top - parentTop + parseInt(parent.find(".area-code-body").scrollTop());
		parent.find(".area-code-body").scrollTop(item_top);
	});
	$(".areacode-select-box .area-code-body").scroll(function () {
		var parent = $(this).parents('.areacode-select-box');
		var parentTop = parent.find(".area-code-body").offset().top;
		parent.find('.area-code-body dl').each(function () {
			var selfTop = parent.find('.area-code-body dl').eq($(this).index()).offset().top - parentTop;
			var selfH = parent.find('.area-code-body dl').eq($(this).index()).height();
			if (selfTop + selfH - 20 > 0) {
				parent.find('.area-code-nav dd').removeClass('on');
				parent.find('.area-code-nav dd').eq($(this).index() < 0 ? 0 : $(this).index()).addClass('on');
				return false;
			}
		});

	});

}

function checkMobile(num) {
	var regMobile = /^(\d{7,100})$/;
	return regMobile.test(num);
}
function checkMail(val) {
	var regMail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
	return regMail.test(val);
}


/*************************验证码登录*******************************************/


var getcodeState = true;
$(document).on('click', '.btn-get-code', function (event) {//获取验证码
	if (!isTimeDown) {
		$(".btn-skip").hide();
		$(".tip-huakuai").hide();
		$(".verifical-login").removeClass("btn-jump");
		phone = $.trim(input_phone.val());
		if (((areaCode != "0086" && $.trim(input_phone.val()).length > 6 && $.trim(input_phone.val()).length < 100) || (areaCode == "0086" && (/^1[3456789]\d{9}$/.test($.trim(input_phone.val())))))) {
			input_phone.parent('.input-box').removeClass('status-success status-error status-empty').addClass('status-ok');
			input_phone.parents('.login-body').find('.tip-phone').html('').hide();
			if (!getcodeState) {
				$(".tip-huakuai").html($(".tip-huakuai").data("tip")).show();
				return false;
			}
			//grecaptcha.execute();
			//$(this).html($(this).data("tip"));
			getcodeState = false;
			nc.show();

		} else {
			input_phone.parent('.input-box').removeClass('status-success status-empty status-ok').addClass('status-error');
			input_phone.parents('.login-body').find('.tip-phone').html($(this).data("cw")).show();
		}
	}
});

//获取验证码
function getcode(token, sessionId, sign) {
	$(".verifical-login .login-body ul li:last-child").hide();
	if ($(".input-code").val().trim().length == 0) {
		$(".verifical-login .login-body ul li:last-child").prev().removeClass('status-success status-ok status-empty status-error');
	}
	var from = getFrom();
	var lang = get_cc_lan().split("_")[1];
	var getUrl = "//u.wikifx.com/api/sendsms";
	if (loginType == "resetPwd") {
		getUrl = "//u.wikifx.com/api/sendneedsms";
	}
	TimeDown(60);
	$.ajax({
		type: "get",
		url: getUrl,
		data: {
			key: token,
			areaCode: areaCode,
			mobile: phone,
			lang: lang,
			from: from,
			sessionId: sessionId,
			sign: sign
		},
		success: function (ret) {
			sessionId = "";
			token = "";
			sign = "";
			if (ret.success) {
				userId = ret.result;
			} else {

				$(".verifical-login .login-body ul li:last-child").html(ret.message).show();
				$(".verifical-login .login-body ul li:last-child").prev().removeClass('status-success status-ok status-empty').addClass('status-error');
				//grecaptcha.reset();
			}
			//console.log("123");
		}
	});
}


//验证码登录
$(document).on('input', '.verifical-login .input-code', function (event) {
	var val = $(this).val();
	var btn = $(this).parents('.login-body').find('.forbid-btn');
	if ($.trim(val)) {
		btn.addClass('btn-login');
	} else {
		btn.removeClass('btn-login');
	}
});

select_areaCode();

function select_areaCode() {
	// 选择区号弹框
	// $(document).on('click', '.select-country-box', function (event) {//打开区号选择
	// 	if ($(this).find('.areacode-select-box').is(':visible')) {
	// 		$(this).find('.areacode-select-box').hide();
	// 	} else {
	// 		$(this).find('.areacode-select-box').show();
	// 		$('.areacode-select-box .area-code-body').niceScroll(pop_nice_parms);
	// 		codeScroll();
	// 	}
	// });
	// $(document).on('click', '.areacode-select-box', function (event) {//
	// 	event.stopPropagation();
	// });
	// 选择区号
	// $(document).on('click', '.areacode-select-box .area-code-body dd', function (event) {
	// 	event.stopPropagation();
	// 	$(this).addClass('on').siblings('dd').removeClass('on');
	// 	areaCode = $(this).find("span").text();
	// 	var selected_flag = $(this).find("img").attr("src");
	// 	countryCode = $(this).find("img").data("country");
	// 	countryFlat = $(this).find("img").data("flag");
	// 	$(this).parents('.select-country-box').find("img.flag").attr("src", selected_flag);
	// 	$(this).parents('.select-country-box').find("img.flag").data("country", countryCode);
	// 	$(this).parents('.select-country-box').find("img.flag").data("flag", countryFlat);
	// 	$(this).parents('.select-country-box').find("span.area-code").html(areaCode);
	// 	$(this).parents(".areacode-select-box").hide();

	// 	$(".btn-skip").hide();
	// 	$(".verifical-login").removeClass("btn-jump");
	// });

	$(document).on('focus', '.Search-areaCode .area-ipt', function (event) {
		$(this).siblings(".areaSearch-tip").hide();
	})
	$(document).on('blur', '.Search-areaCode .area-ipt', function (event) {
		if($(this).val() == "")
			$(this).siblings(".areaSearch-tip").show();
	})
	$(document).on('click', '.Search-areaCode .areaSearch-tip', function (event) {
		$(this).hide();
		$(this).siblings(".area-ipt").focus();
	});
	$(".Select-Area").click(function (event) {
        event.stopPropagation();
		$('.areacode-select-box').show();
		if(!$(this).hasClass("active")){
			$(this).addClass("active");
		}else{
			$(this).removeClass("active");
			$('.areacode-select-box').hide();
		}
        if ($(this).parent().hasClass("Cellphone-rate1")) {
			$('.areacode-select-box').setmiddle2();
			$(window).resize(function (event) {
				$('.areacode-select-box').setmiddle2();
			});
		}
		if($(this).parent().hasClass("resetWord-Phone")){
			$('.areacode-select-box').setmiddle3();
			$(window).resize(function (event) {
				$('.areacode-select-box').setmiddle3();
			});
		}
        $(".areacode-select-box .area-code-body").getNiceScroll().resize().show();
        $(".areacode-select-box .area-code-body").niceScroll(pop_nice_parms);
        $(".areacode-select-box .area-code-body").scrollTop(0);
        $(".areacode-select-box .area-code-body dd").removeClass("on");
        $(".areacode-select-box .area-code-nav dd").removeClass("on");
	});
	// 选择区号
	$(".areacode-select-box .area-code-body dd").click(function (event) {
        event.stopPropagation();
        $(this).addClass('on').siblings('dd').removeClass('on');
        var selected_code = $(this).find("span").text();
        var selected_flag = $(this).find("img").attr("src");
        var selected_flagu = $(this).find("img").data("flag");
        // var selected_twcode = $(this).find("img").data("twcode");
        // var selected_name = $(this).find("em").html();
        var pitch_on = $(this).parents(".pop-login-bg");
        if (pitch_on.children(".verifical-login").css('display') === "block") {
            pitch_on.children().find("img.phoneFlag").attr("src", selected_flag);
            pitch_on.children().find("span.phoneCode").html(selected_code);
        } else if (pitch_on.children(".reset-password-login").css('display') === "block") {
			pitch_on.children().find("img.resetFlag").attr("src", selected_flag);
            pitch_on.children().find("span.resetCode").html(selected_code);
        }
		$(this).parents(".areacode-select-box").hide();
		$(".Select-Area").removeClass("active");
    });
	// 点击其他区域
	$(document).click(function (e) {
		if (!$(".areacode-Info").is(e.target) && $(".areacode-Info").has(e.target).length === 0) {
			$(".areacode-select-box").hide();
			$(".Select-Area").removeClass("active");
		}
	});
}

//防止连续点击
var loginState = false;
//验证码登录
function smsLogin() {
	if (!$(".j-yzmdl").hasClass("btn-login")) {
		return false;
	}
	$(".tip-phone").hide();

	phone = $.trim(input_phone.val());
	if (!((areaCode != "0086" && checkMobile($.trim(input_phone.val()))) || (areaCode == "0086" && (/^1[3456789]\d{9}$/.test($.trim(input_phone.val())))))) {
		input_phone.parent('.input-box').removeClass('status-success status-empty status-ok').addClass('status-error');
		input_phone.parents('.login-body').find('.tip-phone').html($(".btn-get-code").data("cw")).show();
		return false;
	}


	if (loginState) {
		return false;
	}
	loginState = true;

	$(".j-yzmdl .j-btn-nr").hide();
	$(".j-yzmdl .j-btn-loading").show();

	if (loginType === "resetPwd") {
		$.ajax({
			type: "get",
			url: "//u.wikifx.com/api/validatecode",
			data: {
				Smscode: $(".input-code").val(),
				AreaCode: areaCode,
				PhoneNumber: phone,
				lang: get_cc_lan().split("_")[1],
				from: getFrom()
			},
			success: function (ret) {
				loginState = false;
				if (ret.success && ret.result) {
					requestId = ret.result;
					resetPwd();
				} else {
					$(".j-yzmdl .j-btn-nr").show();
					$(".j-yzmdl .j-btn-loading").hide();
					$(".tip-code").html(ret.message).show();

				}
			}
		});
	} else if (loginType === "third") {
		$.ajax({
			type: "get",
			url: "//u.wikifx.com/api/getthiredstate",
			data: {
				SmsCode: $(".input-code").val(),
				AreaCode: areaCode,
				PhoneNumber: phone,
				Account: appid,
				AccountType: thirdType,
				AccountNick: nickname,
				AccountHead: headImg,
				LanguageCode: get_cc_lan().split("_")[1],
				from: getFrom(),
				CountryCode: countryCode
			},
			success: function (ret) {

				if (ret.success && ret.result) {
					var cookurl = "?value=" + ret.result.Value + "&token=" + ret.result.Token;
					addcook(cookurl);
				} else if (ret.success) {
					requestId = ret.message;
					isSkip = false;
					register();
					loginState = false;
				} else {
					$(".tip-code").html(ret.message).show();
					loginState = false;
					$(".j-yzmdl .j-btn-nr").show();
					$(".j-yzmdl .j-btn-loading").hide();
				}
			}
		});

	}
	else {
		$.ajax({
			type: "get",
			url: "//u.wikifx.com/api/smslogin",
			data: {
				code: $(".input-code").val(),
				areaCode: areaCode,
				phone: phone,
				lang: get_cc_lan().split("_")[1],
				country: countryCode
			},
			success: function (ret) {

				if (ret.success && ret.result) {
					var cookurl = "?value=" + ret.result.Value + "&token=" + ret.result.Token;
					addcook(cookurl);
				} else if (ret.success) {
					requestId = ret.message;
					isSkip = false;
					register();
					loginState = false;
				} else {
					$(".tip-code").html(ret.message).show();
					loginState = false;
					$(".j-yzmdl .j-btn-nr").show();
					$(".j-yzmdl .j-btn-loading").hide();
				}
			}
		});
	}



}

/*************************验证码登录结束*******************************************/
/*************************密码登录开始*******************************************/


//防止连续点击
var normalState = true;

$(document).on('input', '.j-password-login .input-account', function (event) {

	var val = $.trim($(this).val());
	if (checkMobile(val) || checkMail(val)) {
		$(this).parent().removeClass('status-error').addClass('status-success');
		$(this).parents('.login-body').find('.tip-acount').hide();

	} else {
		$(this).parent().removeClass('status-success').addClass('status-error');
		//$(this).parents('.login-body').find('.tip-acount').show();
	}
	if ($.trim($('.password-login .input-password').val()) && $.trim($(this).val())) {
		$('.j-password-login .forbid-btn').addClass('btn-login');
	} else {
		$('.j-password-login .forbid-btn').removeClass('btn-login');
	}
});

$(document).on('input', '.j-password-login .input-password', function (event) {
	if ($(this).val().trim().length > 0 && $(".j-password-login .input-password").val().trim().length > 0) {
		if ($(".j-password-login .input-password").val().trim().length > 5) {
			$(".j-password-login .input-password").parent().removeClass('status-success status-error status-empty').addClass("status-ok");

		} else {
			$(".j-password-login .input-password").parent().removeClass('status-success status-error status-empty').addClass("status-error");
		}

	}

	if ($.trim($(this).val()) && $.trim($('.j-password-login .input-account').val())) {
		$('.j-password-login .forbid-btn').addClass('btn-login');
		normalState = false;
	} else {
		$('.j-password-login .forbid-btn').removeClass('btn-login');
		normalState = true;
	}

});
$(document).on('click', '.btn-biyan', function (event) {
	//var self = $(this);
	//if (self.hasClass('btn-eye')) {
	//	self.removeClass('btn-eye');
	//	self.parent().find('input').attr('type', 'password');
	//} else {
	//	self.addClass('btn-eye');
	//	self.parent().find('input').attr('type', 'text');
	//}
	//var type = $(this).siblings(".input-password").attr('type');
	//if (type === "text" && $(this).hasClass('btn-eye')) {
	//    $(this).removeClass('btn-eye');
	//    $(this).siblings(".input-password")[0].type = "password";
	//} else {
	//    $(this).addClass('btn-eye');
	//    $(this).siblings(".input-password")[0].type = "text";
	//}
	var type = $(this).siblings("input").attr('type');
	if (type === "text" && $(this).hasClass('btn-eye')) {
		$(this).removeClass('btn-eye');
		$(this).siblings("input")[0].type = "password";
	} else {
		$(this).addClass('btn-eye');
		$(this).siblings("input")[0].type = "text";
	}
});


//登录
function normal() {

	if (!$(".j-zhmm").hasClass("btn-login")) {
		return false;
	}

	$(".j-password-login .input-password").parent().next().hide();
	if (normalState) {
		return false;
	}
	normalState = true;
	var account = $(".j-password-login .input-account").val();

	var pwd = $(".j-password-login .input-password").val();
	$(".j-zhmm .j-btn-nr").hide();
	$(".j-zhmm .j-btn-loading").show();
	$.ajax({
		type: "post",
		url: "//u.wikifx.com/api/postaccountlogin",
		data: {
			Account: account,
			Password: pwd,
			CountryCode: countryCode,
			LanguageCode: get_cc_lan().split("_")[1],
			from: getFrom()
		},
		success: function (ret) {
			normalState = false;
			if (ret.success && ret.result) {
				var cookurl = "?value=" + ret.result.Value + "&token=" + ret.result.Token;
				addcook(cookurl);
			} else if (!ret.success && ret.message == "no") {
				$(".j-password-login .input-account").parents('.login-body').find('.tip-acount').show();
				$(".j-zhmm .j-btn-nr").show();
				$(".j-zhmm .j-btn-loading").hide();
			} else {
				$(".j-password-login .input-password").parent().next().html(ret.message).show();
				$(".j-zhmm .j-btn-nr").show();
				$(".j-zhmm .j-btn-loading").hide();
			}
		}
	});
}

/*************************密码登录结束*******************************************/

/*************************重置密码开始*******************************************/

var setPwdState = true;

$(document).on('input', '.reset-password-login input', function (event) {
	if ($.trim($('.reset-password-login .input-password').val()) && $.trim($('.reset-password-login .input-repassword').val())) {
		$('.reset-password-login').find('.forbid-btn').addClass('btn-login');
		setPwdState = false;
	} else {
		$('.reset-password-login').find('.forbid-btn').removeClass('btn-login');
	}
});

$(".reset-password-login .input-password").blur(function () {
	//密码验证
	var pwd = $(".reset-password-login .input-password").val();
	var pwdthis = $(".reset-password-login .input-password");
	if (pwd.trim().length < 6 || pwd.trim().length > 20) {
		pwdthis.parent().removeClass('status-success').addClass('status-error');
		pwdthis.parent().next().show().html(pwdthis.data("tip"));
		return false;
	} else {
		pwdthis.parent().addClass('status-success').removeClass('status-error');
		pwdthis.parent().next().hide();
	}
});




function setPwd() {

	if (!$(".j-czmm").hasClass("btn-login")) {
		return false;
	}

	$(".reset-password-login .tip-password2").hide();
	if (setPwdState) {
		return false;
	}
	setPwdState = false;

	var sex = $('input[name="sex"]:checked').val();

	//密码验证
	var pwd = $(".reset-password-login .input-password").val();
	var pwdthis = $(".reset-password-login .input-password");
	if (pwd.trim().length < 6 || pwd.trim().length > 20) {
		pwdthis.parent().removeClass('status-success').addClass('status-error');
		pwdthis.parent().next().show().html(pwdthis.data("tip"));
		return false;
	} else {
		pwdthis.parent().addClass('status-success').removeClass('status-error');
		pwdthis.parent().next().hide();
	}

	//密码验证
	var cpwd = $(".reset-password-login .input-repassword").val();
	var cpwdthis = $(".reset-password-login .input-repassword");
	if (cpwd.trim().length < 6 || cpwd.trim().length > 20) {
		cpwdthis.parent().removeClass('status-success').addClass('status-error');
		cpwdthis.parent().next().show().html(pwdthis.data("tip"));
		return false;
	} else {
		cpwdthis.parent().addClass('status-success').removeClass('status-error');
		cpwdthis.parent().next().hide();
	}

	if (cpwd != pwd) {
		cpwdthis.parent().removeClass('status-success').addClass('status-error');
		$(".tip-password2").show().html(cpwdthis.data("bt"));
		return false;
	}



	setPwdState = true;


	$(".j-czmm .j-btn-nr").hide();
	$(".j-czmm .j-btn-loading").show();

	$.ajax({
		type: "post",
		url: "//u.wikifx.com/api/postmodifypwd",
		data: {
			AreaCode: areaCode,
			PhoneNumber: phone,
			Password: pwd,
			ComfirmPassword: cpwd,
			RequestId: requestId,
			LanguageCode: get_cc_lan().split("_")[1],
			from: getFrom()
		},
		success: function (ret) {
			setPwdState = false;
			if (ret.success) {
				resetBox();
				accPwd();
			} else {
				$(".reset-password-login .tip-password2").show().html(ret.message);
				$(".j-czmm .j-btn-nr").show();
				$(".j-czmm .j-btn-loading").hide();

			}
		}
	});
}
/*************************重置密码结束*******************************************/


/*************************完善开始开始*******************************************/

//防止连续点击
var registerState = true;

$(document).on('click', '.perfect-information .input-identity', function (event) {
	var self = $(this);
	if ($(this).parent().find('.identity-select-list-box').is(':visible')) {
		var val = $.trim($(this).val());
		$(this).parent().find('.identity-select-list-box').hide();
		if (val) {
			$(this).parents('.input-box').removeClass('status-ok status-error status-empty').addClass('status-success');
		} else {
			$(this).parents('.input-box').removeClass('status-ok status-error status-success').addClass('status-empty');
		}
	} else {
		$(this).parents('.input-box').removeClass('status-ok status-error status-empty').addClass('status-success');
		$(this).parent().find('.identity-select-list-box').show();
		$(this).parent().find('.identity-select-list-box .select-list').niceScroll(pop_nice_parms);
	}
});
$(document).on('click', '.perfect-information .select-list dd', function (event) {
	var self = $(this);
	self.parents('.identity-select-list-box').hide();
	self.parents('.li-identity').find('input').val($.trim(self.html()));
	$(this).parents('.input-box').removeClass('status-success status-error status-empty').addClass('status-ok');

	if ((self.parents('.li-identity').find('input').val()).length > 0) {
		$('.perfect-information').find('.forbid-btn').addClass('btn-login');
		setPwdState = false;
	} else {
		$('.perfect-information').find('.forbid-btn').removeClass('btn-login');
	}


	registerState = false;
});
$(document).on('click', '.sex-box .radio-box', function (event) {
	$(this).addClass('selected').siblings('.radio-box').removeClass('selected');
});


//验证邮箱
$(".perfect-information .j-email").blur(function () {
	//邮箱验证
	var email = $(".j-email").val();
	if (!checkMail(email)) {
		$(".j-email").parent().removeClass('status-success').addClass('status-error');
		$(".j-email").parent().next().show().html($(".j-email").data("tip"));
	} else {
		$(".j-email").parent().addClass('status-success').removeClass('status-error');
		$(".j-email").parent().next().hide();
	}
});

//验证姓氏
$(".perfect-information .j-surname").blur(function () {
	// 昵称验证
	var surname = $(".j-surname").val();
	if (surname.trim().length < 1) {
		$(".j-surname").parent().removeClass('status-success').addClass('status-error');
		$(".j-surname").parent().next().show().html($(".j-surname").data("tip"));
	} else {
		$(".j-surname").parent().addClass('status-success').removeClass('status-error');
		$(".j-surname").parent().next().hide();

	}
});

//验证密码
$(".perfect-information .input-password").blur(function () {
	//密码验证
	var pwd = $(".perfect-information .input-password").val();
	var pwdthis = $(".perfect-information .input-password");
	if (pwd.trim().length < 6 || pwd.trim().length > 20) {
		pwdthis.parent().removeClass('status-success').addClass('status-error');
		pwdthis.parent().next().show().html(pwdthis.data("tip"));
	} else {
		pwdthis.parent().addClass('status-success').removeClass('status-error');
		pwdthis.parent().next().hide();
	}
});


function zhuce() {
	$('.g-login-box .login-close-btn').click();
	loginMobile();
}

//注册
function registerLogin() {
	if (!$(".j-zczh").hasClass("btn-login")) {
		return false;
	}

	$(".j-registerError").hide();
	if (registerState) {
		return false;
	}
	registerState = true;
	var sex = $('.perfect-information .selected').data("value");

	//昵称验证
	var surname = $(".j-surname").val().trim();
	if (surname.length < 1) {
		$(".j-surname").parent().removeClass('status-success').addClass('status-error');
		$(".j-surname").parent().next().show().html($(".j-surname").data("tip"));
		registerState = false;
		return false;
	} else {
		$(".j-surname").parent().addClass('status-success').removeClass('status-error');
		$(".j-surname").parent().next().hide();

	}

	//邮箱验证
	var email = $(".j-email").val().trim();
	if (!checkMail(email)) {
		$(".j-email").parent().removeClass('status-success').addClass('status-error');
		$(".j-email").parent().next().show().html($(".j-email").data("tip"));
		registerState = false;
		return false;
	} else {
		$(".email").parent().addClass('status-success').removeClass('status-error');
		$(".email").parent().next().hide();
	}
	//密码验证
	var pwd = $(".perfect-information .input-password").val();
	var pwdthis = $(".perfect-information .input-password");
	if (pwd.trim().length < 6 || pwd.trim().length > 20) {
		pwdthis.parent().removeClass('status-success').addClass('status-error');
		pwdthis.parent().next().show().html(pwdthis.data("tip"));
		registerState = false;
		return false;
	} else {
		pwdthis.parent().addClass('status-success').removeClass('status-error');
		pwdthis.parent().next().hide();
	}

	var identityType = $(".input-identity").data("type");

	$(".j-zczh .j-btn-nr").hide();
	$(".j-zczh .j-btn-loading").show();


	if (loginType === "third") {
		$.ajax({
			type: "post",
			url: "//u.wikifx.com/api/postthirdregister",
			data: {
				Account: appid,
				AccountType: thirdType,
				AccountNick: nickname,
				AccountHead: headImg,
				AreaCode: areaCode,
				AreaFlag: countryFlat,
				PhoneNumber: phone,
				Salutation: surname,
				EMail: email,
				IdentityType: identityType,
				Password: pwd,
				Sex: sex,
				IsSkip: isSkip,
				RequestId: requestId,
				DeviceInformation: navigator.userAgent,
				CountryCode: countryCode,
				LanguageCode: get_cc_lan().split("_")[1],
				from: getFrom()
			},
			success: function (ret) {
				if (ret.success) {
					var cookurl = "?value=" + ret.result.Value + "&token=" + ret.result.Token;
					addcook(cookurl);
				} else {
					$(".j-registerError").show().html(ret.message);
					registerState = false;
					$(".j-zczh .j-btn-nr").show();
					$(".j-zczh .j-btn-loading").hide();
				}
			}
		});
	} else {
		$.ajax({
			type: "post",
			url: "//u.wikifx.com/api/postregister",
			data: {
				AreaCode: areaCode,
				AreaFlag: countryFlat,
				PhoneNumber: phone,
				Salutation: surname,
				EMail: email,
				IdentityType: identityType,
				Password: pwd,
				Sex: sex,
				IsSkip: isSkip,
				RequestId: requestId,
				DeviceInformation: navigator.userAgent,
				CountryCode: countryCode,
				LanguageCode: get_cc_lan().split("_")[1],
				from: getFrom()
			},
			success: function (ret) {
				if (ret.success) {
					var cookurl = "?value=" + ret.result.Value + "&token=" + ret.result.Token;
					addcook(cookurl);
				} else {
					$(".j-registerError").show().html(ret.message);
					registerState = false;
					$(".j-zczh .j-btn-nr").show();
					$(".j-zczh .j-btn-loading").hide();
				}
			}
		});
	}




}



/*************************完善资料结束*******************************************/



//点击登录出现选择登录方式框
function selLoginType() {
	$('.g-login-box').hide();
	$('.third-party-login').show();
	$('.pop-login-bg').show();
}

//手机号登录
function loginMobile(type) {

	//隐藏所有
	$('.g-login-box').hide();
	$(".verifical-login .login-footer").show();
	if (type === "zhmm") {
		loginType = "resetPwd";//重置密码流程
	} else if (type === "third") {
		type = "dl";
		loginType = "third";
		$(".verifical-login .login-footer").hide();
	}
	else {
		type = "dl";
		loginType = "login";
	}
	//重置内容
	resetBox();
	requestId = "";
	phone = "";
	$('.verifical-login .input-box').removeClass("status-error").removeClass("status-success");
	$('.verifical-login .error-tips').hide();
	$('.verifical-login .login-title').html($('.verifical-login .login-title').data(type));
	$('.verifical-login .login-body .forbid-btn .j-btn-nr').html($('.verifical-login .login-body .forbid-btn').data(type));
	$('.pop-login-bg').show();
	$('.verifical-login').show();
	$(".g-login-box").setmiddle();//弹框居中


	$(".j-country-flag").each(function () {
		$(this).attr("src", $(this).data("flag"));
	});


	//$(".input-phone").focus();
}

//账号密码登录
function accPwd() {
	resetBox();
	//隐藏所有
	$('.g-login-box').hide();
	$('.pop-login-bg').show();
	$('.j-password-login').show();
	//$(".input-account").focus();
}


//忘记密码
function resetPwd() {
	//隐藏所有
	$('.g-login-box').hide();

	$('.pop-login-bg').show();
	$('.reset-password-login').show();
	//$(".input-password").focus();
}

//补全资料(注册)
function register() {

	//注册的时候requestId为空的时候重新获取(点击跳过的时候会走这里)
	if (!requestId) {
		$.ajax({
			teyp: "get",
			url: "//u.wikifx.com/api/getrequestid",
			data: { areaCode: areaCode, phone: phone, lang: get_cc_lan().split("_")[1] },
			success: function (ret) {
				if (ret.success) {
					requestId = ret.result;
				}
			}
		});
	}

	//隐藏所有
	$('.g-login-box').hide();

	$('.pop-login-bg').show();
	$('.perfect-information').show();
}


/********************************************* 登录框使用结束 ****************************************************/



/********************特效开始**************/
//手机号离开
//$(".input-phone").blur(function () {
//	phone = $.trim(input_phone.val());
//	if (checkMobile($.trim(input_phone.val()))) {
//		input_phone.parent('.input-box').removeClass('status-success status-error status-empty').addClass('status-ok');
//		//input_phone.parents('.login-body').find('.tip-phone').html('').hide();
//	} else if (phone.length < 1) {
//		input_phone.parent('.input-box').removeClass('status-success status-empty status-ok').addClass('status-empty');
//		//input_phone.parents('.login-body').find('.tip-phone').html($(this).data("tip")).show();
//	} else {
//		input_phone.parent('.input-box').removeClass('status-success status-empty status-ok status-error').addClass('status-error');
//	}
//});

//$(".input-code").blur(function () {
//	if ($(this).val().trim().length < 1) {
//		$(this).parent('.input-box').removeClass('status-success status-error status-ok').addClass('status-empty');
//		//	$(".tip-code").html($(this).data("tip")).hide();
//	} else {
//		$(this).parent('.input-box').removeClass('status-success status-error status-empty').addClass('status-ok');
//		//	$(".tip-code").hide();
//	}
//});




/***************************特效结束******************************/

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]); return null;
}

function get_cc_lan() {
	var url = window.location.href;
	var cc_lan_in_url = "cn_zh-cn";
	var cc_lan_pat = /([a-zA-z]{1,2})(_)([a-zA-z\-]{2,})/;
	var cc_lan_match = url.match(cc_lan_pat);
	if (cc_lan_match && cc_lan_match.length > 0) {
		cc_lan_in_url = cc_lan_match[0];
	}
	return cc_lan_in_url;
}

function getFrom() {

	var host = window.location.host;
	if (host.indexOf(".fxeye.com") > -1) {
		return "fxeye";
	} else {
		return "wikifx";
	}
}


// 删除url中某个参数
function funcUrlDel(nameArr) {
	var loca = window.location;
	var baseUrl = loca.origin + loca.pathname;
	var query = loca.search.substr(1);

	var obj = {};
	var arr = query.split("&");
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].split("=");
		obj[arr[i][0]] = arr[i][1];
	}

	for (var j = 0; j < nameArr.length; j++) {
		var name = nameArr[j];
		if (query.indexOf(name) > -1) {
			delete obj[name];
		}
	}
	var lastPath = JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
	var url = baseUrl + (lastPath ? "?" : "") + lastPath;
	return url;

}



var cookieurl = "//authorize.";

function addcook(cookurl) {
	var arr = [];
	arr.push(cookieurl + "fxeye.com/AddCook/FxeyeCookie" + cookurl);
	arr.push(cookieurl + "wikifx.hk/AddCook/MarketCookie" + cookurl);
	arr.push(cookieurl + "wikifx.com/AddCook/GJCookie" + cookurl);
	loadImg(arr);
}



function getcookie(strcookie, matchcookie) {
	var getMatchCookie;
	var arrCookie = strcookie.split(";");
	for (var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (matchcookie === arr[0].replace(/(^\s*)|(\s*$)/g, "")) {
			getMatchCookie = arr[1];
			break;
		}
	}
	return getMatchCookie;
}

// 设置cookie   
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ";expires = " + exdate.toGMTString() + ";path = /";
}

var url = getcookie(document.cookie, "ReturnUrl");
function loadImg(imgurlarr) {
	var successnum = 0;
	for (var i = 0; i < imgurlarr.length; i++) {
		var img = new Image();
		img.onload = function () {
			successnum += 1;
			if (imgurlarr.length === successnum) {
				if (loginType === "third") {
					window.location.href = funcUrlDel(["appid", "type", "nickname", "img"]);
				}
				else if (url && (window.location.host == "u.wikifx.com" || window.location.host == "u.fxeye.com") && url.length > 0) {
					setCookie("ReturnUrl", "", -1);
					location.href = url;
				}
				else {
					location.reload(true);
				}

			}
		};
		img.onerror = function (err) {

			console.log(err);
			console.log(img);
			//location.reload();
		};
		img.src = imgurlarr[i];
	}
}

/*
时间倒计时插件
TimeDown.js
*/

function TimeDown(time) {
	isTimeDown = true;
	//输出到页面
	$(".btn-get-code").text(time + $(".btn-get-code").data("second"));
	time -= 1;
	//延迟一秒执行自己
	if (time <= -1) {
		isTimeDown = false;
		nc.reload();
		$(".btn-get-code").text($(".btn-get-code").data("tip"));
		if (areaCode != "0086" && !userId && loginType !== "resetPwd") {
			$(".btn-skip").show();
			$(".verifical-login").addClass("btn-jump");
		}

	} else {
		setTimeout(function () {
			if (isTimeDown) {
				TimeDown(time);
			}
		}, 1000);
	}
}

//监听回车
function selectKey(type) {
	document.onkeyup = function (event) {
		if (event == undefined) {
			event = window.event;
		}
		var keyCode = event.keyCode || event.which || event.charCode;
		if (keyCode === 13) {
			if (type == "yzm") {
				smsLogin();
			} else if (type == "mmdl") {
				normal();
			} else if (type == "czmm") {
				setPwd();
			}
		}
	};
}

//调整窗口大小的时候重新计算
$(window).resize(function (event) {
	$(".g-login-box").setmiddle();//弹框居中
});

//阿里验证相关
var nc_token = ["FFFF0N00000000008D46", (new Date()).getTime(), Math.random()].join(':');
var NC_Opt =
{
	//声明滑动验证需要渲染的目标元素ID。
	renderTo: "#huakuai",
	//应用类型标识。它和使用场景标识（scene字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在人机验证控制台的配置管理页签找到对应的appkey字段值，请务必正确填写。
	appkey: "FFFF0N00000000008D46",
	//使用场景标识。它和应用类型标识（appkey字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在人机验证控制台的配置管理页签找到对应的scene值，请务必正确填写。
	scene: "nc_message",
	//滑动验证码的主键，请勿将该字段定义为固定值。确保每个用户每次打开页面时，其token值都是不同的。系统默认的格式为：”您的appkey”+”时间戳”+”随机数”。
	token: nc_token,
	//滑动条的宽度。
	customWidth: 360,
	//业务键字段，可为空。为便于线上问题的排查，建议您按照线上问题定位文档中推荐的方法配置该字段值。
	trans: { "key1": "code0" },
	//语言。PC端Web页面场景默认支持18国语言，详细配置方法请参见自定义文案与多语言文档。
	language: getLang($("#huakuai").data("lang")),
	//是否启用。一般情况，保持默认值（true）即可。
	isEnabled: true,
	//内部网络请求的超时时间。一般情况建议保持默认值（3000ms）。
	timeout: 3000,
	//允许服务器超时重复次数，默认5次。超过重复次数后将触发报错。
	times: 5,
	//前端滑动验证通过时会触发该回调参数。您可以在该回调参数中将请求标识（token）、会话ID（sessionid）、签名串（sig）字段记录下来，随业务请求一同发送至您的服务端调用验签。
	callback: function (data) {
		$(".tip-huakuai").hide();
		getcodeState = true;
		getcode(nc_token, data.csessionid, data.sig);
		setTimeout(function () {
			nc.hide();
		}, 2000);

	}
};
var nc = new noCaptcha(NC_Opt);
nc.hide();
//用于自定义文案。详细配置方法请参见自定义文案与多语言文档。
nc.upLang('cn', {
	_startTEXT: "拖动滑块，发送验证码",
	_yesTEXT: "发送成功",
	_error300:  "哎呀，出错了，<a href=\"javascript:__nc.reset()\">点击刷新</a>再来一次",
	_errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>"
});

nc.upLang('tw', {
	_startTEXT: "拖動滑塊，發送驗證碼",
	_yesTEXT: "發送成功",
	_error300: "哎呀，出錯了，<a href=\"javascript:__nc.reset()\">點擊刷新</a>再來一次",
	_errorNetwork: "網絡不給力，請<a href=\"javascript:__nc.reset()\">點擊刷新</a>"
});


nc.upLang('en', {
	_startTEXT: "Slide the piece to get the code",
	_yesTEXT: "Send successfully",
	_error300: "Error. Click <a href=\"javascript:__nc.reset()\">Refresh</a> for retry.",
	_errorNetwork: "The network doesn't work, please <a href=\"javascript:__nc.reset()\">Click to refresh</a>"
});

nc.upLang('ko_KR', {
	_startTEXT: "슬라이드를 밀어 인증번호를 발송합니다. ",
	_yesTEXT: "발송성공",
	_error300: "틀리셨습니다. <a href=\"javascript:__nc.reset()\">새로 고침</a>를 클릭해 다시 시도해 주세요.",
	_errorNetwork: "네트워크가 불안정합니다. <a href=\"javascript:__nc.reset()\">새로고침을 누릅니다.</a> 해주십시오."
});


nc.upLang('ja_JP', {
	_startTEXT: "ドラッグして確認コードを送信します",
	_yesTEXT: "送信成功",
	_error300: "エラーが発生しました、もう一度<a href=\"javascript:__nc.reset()\">リフレッシュ</a>をクリックしてください ",
	_errorNetwork: "ネットワークが弱い、<a href=\"javascript:__nc.reset()\">[今すぐ更新]をクリック</a>をお願いします"
});

nc.upLang('ru_RU', {
	_startTEXT: "Отправьте код проведя пальцем",
	_yesTEXT: "Отправлено",
	_error300: "Вышла ошибка, нажмите <a href=\"javascript:__nc.reset()\">Обновить</a> и попробуйте ещё раз",
	_errorNetwork: "Слабое интернет соединение, пожалуйста <a href=\"javascript:__nc.reset()\">Нажмите чтобы обновить</a>"
});


nc.upLang('fr_FR', {
	_startTEXT: "Faites glisser la pièce pour obtenir le code",
	_yesTEXT: "Envoyer avec succès",
	_error300: "Erreur. Cliquez sur <a href=\"javascript:__nc.reset()\">Rafraîchir</a> pour réessayer.",
	_errorNetwork: "Le réseau ne fonctionne pas, veuillez <a href=\"javascript:__nc.reset()\">Cliquez pour rafraîchir</a>"
});


nc.upLang('de_DE', {
	_startTEXT: "Schieben und erhalten Sie den Code",
	_yesTEXT: "Senden Sie erfolgreich",
	_error300: "Error. Klicken Sie auf <a href=\"javascript:__nc.reset()\">Aktualisieren</a>, um es erneut zu versuchen.",
	_errorNetwork: "Das Netzwerk funktioniert nicht, bitte  <a href=\"javascript:__nc.reset()\">Klicken Sie zum Aktualisieren</a>"
});

nc.upLang('th_TH', {
	_startTEXT: "เลื่อนแถบเพื่อส่งรหัสยืนยัน",
	_yesTEXT: "ส่งสำเร็จแล้ว",
	_error300: "โอ๊ะ เกิดข้อผิดพลาดให้คลิก <a href=\"javascript:__nc.reset()\">รีเฟรช</a> อีกครั้ง",
	_errorNetwork: "เครือข่ายมีปัญหาโปรด <a href=\"javascript:__nc.reset()\">คลิกรีเฟรช</a>"
});


nc.upLang('vi_VN', {
	_startTEXT: "Kéo thanh trượt, gửi mã xác nhận",
	_yesTEXT: "Đã gửi",
	_error300: "Rất tiếc, đã xảy ra lỗi, nhấn <a href=\"javascript:__nc.reset()\">Làm mới</a> để thử lại lần nữa nhé",
	_errorNetwork: "Kết nối mạng không ổn định, vui lòng  <a href=\"javascript:__nc.reset()\">Nhấn để làm mới</a>"
});

nc.upLang('in_ID', {
	_startTEXT: "Geser untuk mengirim kode verifikasi",
	_yesTEXT: "Telah terkirim",
	_error300: "Terjadi kesalahan, harap klik lagi <a href=\"javascript:__nc.reset()\">Muat semula</a>",
	_errorNetwork: "Jaringan lemah, silakan <a href=\"javascript:__nc.reset()\">Klik untuk refresh</a>"
});

nc.upLang('es_ES', {
	_startTEXT: "Deslice la pieza para obtener el código",
	_yesTEXT: "Enviar con éxito",
	_error300: "Error. Haga clic en <a href=\"javascript:__nc.reset()\">Actualizar</a> para volver a intentarlo.",
	_errorNetwork: "La red no funciona,  <a href=\"javascript:__nc.reset()\">Haga clic para actualizar</a>"
});

nc.upLang('pt_BR', {
	_startTEXT: "Deslize a peça para obter o código",
	_yesTEXT: "Envie com sucesso",
	_error300: "Erro. Clique em <a href=\"javascript:__nc.reset()\">Atualizar</a> para tentar novamente.",
	_errorNetwork: "A rede não funciona, por favor <a href=\"javascript:__nc.reset()\">Clique para atualizar</a>"
});



function getLang(lang) {
	var lan = "en";
	if (lang == "zh-cn") {
		lan = "cn";
	} else if (lang == "zh-tw" || lang == "zh-hk") {
		lan = "tw";
	} else if (lang == "ko") {
		lan = "ko_KR";
	} else if (lang == "de") {
		lan = "de_DE";
	} else if (lang == "es") {
		lan = "es_ES";
	} else if (lang == "fr") {
		lan = "fr_FR";
	} else if (lang == "id") {
		lan = "in_ID";
	} else if (lang == "ja") {
		lan = "ja_JP";
	} else if (lang == "pt") {
		lan = "pt_BR";
	} else if (lang == "ru") {
		lan = "ru_RU";
	} else if (lang == "th") {
		lan = "th_TH";
	} else if (lang == "th") {
		lan = "th_TH";
	} else if (lang == "vi") {
		lan = "vi_VN";
	}
	return lan;
}
