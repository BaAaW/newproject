var isOpen = 0;
var maxHeight = 0;

$(function() {
	$(".menu li").click(function () {
		$("li").removeAttr("class");
		$(this).addClass("cur"); 
	});
	
	//公用tab页切换js
	swiperContent();
	listMenu();
});

function swiperContent(){
	if ($('.tabs-container').html()) {
		var tabs = new Swiper('.tabs-container', {
			onlyExternal: true,
			speed: 500,
			useCSS3Transforms: false
		});
		$(".tabs a").on('touchstart mousedown', function(e) {
			e.preventDefault();
			$(".tabs .active").removeClass('active');
			$(this).addClass('active');
			tabs.swipeTo($(this).index());
		});
		$(".tabs a").click(function(e) {
			e.preventDefault()
		});
	}
}

var jqLoading = function(option, tagName) {
	if (!tagName) {
		tagName = "layerTag";
	}
	var defaultVal = {
		backgroudColor: "#ECECEC", //背景色
		text: "正在全力为您加载中...", //文字 
		width: 240, //宽度
		height: 115, //高度
		type: 0 //0全部遮，1局部遮
	};
	var opt = $.extend({}, defaultVal, option);
	if (opt.type == 0) {
		//全屏遮
		openLayer();
	} else {
		//局部遮(当前对象应为需要被遮挡的对象)
		openPartialLayer(this);
	}
	//销毁对象
	if (option === "destroy") {
		closeLayer();
	}
	
	//全部遮罩
	function openLayer() {
		//背景遮罩层
		var layer = $("<div class='layer'></div>");
		layer.css({
			width: width() + "px",
			height: height() + "px"
		});
		//图片及文字层
		var content = $("<div class='layer-content'></div>");
		content.css({
			width: opt.width + "px",
			height: opt.height + "px",
			padding: opt.height / 5 + "px",
			background: opt.backgroudColor
		});
		content.append("<img style='margin:" + (opt.height / 4) + "px;' src='/cpic/market/images/v2/loading.gif' /><p>" + opt.text + "</p>");
		$(top.document.body).append(layer).append(content);
		objPosition($(top.document.body).find(content));
		return this;
	}

	//局部遮罩
	function openPartialLayer(obj) {
		var ewidth = obj.width();
		var eheight = obj.height();
		var top = $(obj).offset().top; // 元素在文档中位置 滚动条不影响
		var left = $(obj).offset().left;
		var layer = $("<div class='layer-partial " + tagName + "'></div>");
		layer.css({
			width: ewidth + 'px',
			height: eheight + 'px',
			left: left,
			top: top
		});
		layer.append("<img style='position:absolute;left:" + ((ewidth - 32) / 2) + "px; top:" + ((eheight - 32) / 2) + "px;' src='https://a2cdn3.8686c.com/market/images/v2/loading.gif' />");
		
      $("#innerBody").append(layer);
      
      
		return this;
	}
	
	//销毁对象
	function closeLayer() {
		$(top.document.body).find(".layer,.layer-content, ." + tagName + "").remove();
		return this;
	}
};

//设置背景层高
function height() {
	var scrollHeight, offsetHeight;
	// handle IE 6
	if ($.support.boxModel && $.support.leadingWhitespace) {
		scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
		offsetHeight = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
		if (scrollHeight < offsetHeight) {
			return $(window).height();
		} else {
			return scrollHeight;
		}
		// handle "good" browsers
	} else if ($.support.objectAll) {
		return $(document).height() - 4;
	} else {
		return $(document).height();
	}
};

//设置背景层宽
function width() {
	var scrollWidth, offsetWidth;
	// handle IE
	if ($.support.boxModel) {
		scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
		offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
		if (scrollWidth < offsetWidth) {
			return $(window).width();
		} else {
			return scrollWidth;
		}
		// handle "good" browsers
	} else {
		return $(document).width();
	}
};

var checkCode = function(data, dataCode, errClass, codeType, selectType) {
	//去两边空格的正则，得到正确的值再进行校验
	// var dataValue = dataCode.replace(/(^\s*)|(\s*$)/g, "");
	var dataValue = dataCode;
	if (codeType == 0) {
		//selectType，获取选中的select值
		var type = $(selectType).val();
		//各类证件号正则校验
		if (type == "1") {
			//isIdCard:身份证
			//身份证正则，分为15位、18位
			var idNo = dataValue;
			if (idNo.length != 18 && idNo.length != 15) {
				$(data).addClass(errClass);
				$(data).next().text("请输入正确的证件号！");
				return false
			} else {
				//验证身份证号码
				var Y, JYM, reg;
				/*身份号码位数及格式检验*/
				switch (idNo.length) {
					case 15:
						if ((parseInt(idNo.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idNo.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idNo.substr(6, 2)) + 1900) % 4 == 0)) {
							reg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
						} else {
							reg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
						}
						if (reg.test(idNo)) {
							//15位验证通过
							$(data).removeClass(errClass);
							$(data).next().text("");
							//校验成功时，返回证件号
							return dataValue;
						} else {
							//校验失败时，给出错误提示
							$(data).addClass(errClass);
							$(data).next().text("请输入正确的证件号！");
							return false;
						}
						break;
					case 18:
						//18位身份号码检测
						//出生日期的合法性检查
						//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
						//平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
						reg = /^[1-9][0-7]\d{4}((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229))\d{3}(\d|X|x)?$/;
						if (reg.test(idNo)) { //测试出生日期的合法性
							//计算校验位
							var S = (parseInt(idNo.charAt(0)) + parseInt(idNo.charAt(10))) * 7 +
								(parseInt(idNo.charAt(1)) + parseInt(idNo.charAt(11))) * 9 +
								(parseInt(idNo.charAt(2)) + parseInt(idNo.charAt(12))) * 10 +
								(parseInt(idNo.charAt(3)) + parseInt(idNo.charAt(13))) * 5 +
								(parseInt(idNo.charAt(4)) + parseInt(idNo.charAt(14))) * 8 +
								(parseInt(idNo.charAt(5)) + parseInt(idNo.charAt(15))) * 4 +
								(parseInt(idNo.charAt(6)) + parseInt(idNo.charAt(16))) * 2 +
								parseInt(idNo.charAt(7)) * 1 + parseInt(idNo.charAt(8)) * 6 +
								parseInt(idNo.charAt(9)) * 3;
							Y = S % 11;
							var M = "F";
							JYM = "10X98765432";
							M = JYM.substr(Y, 1);
							/*判断校验位*/
							if (M == idNo.charAt(17).toUpperCase()) {
								//15位验证通过
								$(data).removeClass(errClass);
								$(data).next().text("");
								//校验成功时，返回证件号
								return dataValue;
								/*检测ID的校验位false;*/
							} else {
								//校验失败时，给出错误提示
								$(data).addClass(errClass);
								$(data).next().text("请输入正确的证件号！");
								return false;
							}
						} else {
							//校验失败时，给出错误提示
							$(data).addClass(errClass);
							$(data).next().text("请输入正确的证件号！");
							return false;
						}
						break;
					default:
						//校验失败时，给出错误提示
						$(data).addClass(errClass);
						$(data).next().text("请输入正确的证件号！");
						return false;
				}
			}
		} else if (type == "2") {
			//isPassport:护照
			//var reg = new RegExp(/^1([4|5])[0-9]{7}G[0-9]{8}|P[0-9]{7}|S{0-9}{7,8}|D[0-9]+$/);
			//if ( dataValue.length == 0 || !reg.test(dataValue)) {
			if (dataValue.length < 7) {
				$(data).addClass(errClass);
				$(data).next().text("请输入正确的证件号！");
				return false;
			} else {
				$(data).removeClass(errClass);
				$(data).next().text("");
				return dataValue;
			}
		} else if (type == "3") {
			//isMilitary:军人证
			//var reg = new RegExp(/^([南|北|沈|兰|成|济|广|海|空|参|政|后|装])字第(\d{8})号$/);
			//if (dataValue.length == 0 || !reg.test(dataValue)) {
			if (dataValue.length == 0) {
				$(data).addClass(errClass);
				$(data).next().text("请输入正确的证件号！");
				return false;
			} else {
				$(data).removeClass(errClass);
				$(data).next().text("");
				return dataValue;
			}
		} else if (type == "4") {
			//isDriver:驾驶证
			//var regOne = new RegExp(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/);
			//var regTwo = new RegExp(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/);
			//if (dataValue.length == 0 || !regOne.test(dataValue) || !regTwo.test(dataValue)) {
			if (dataValue.length == 0) {
				$(data).addClass(errClass);
				$(data).next().text("请输入正确的证件号！");
				return false;
			} else {
				$(data).removeClass(errClass);
				$(data).next().text("");
				return dataValue;
			}
		} else if (type == "5") {
			//isHKMacao:港澳居民通行证
			//var reg = new RegExp(/^([H|M|h|m]){1}([0-9]{10}|[0-9]{8})$/);
			//if (dataValue.length == 0 || !reg.test(dataValue)) {
			if (dataValue.length < 7) {
				$(data).addClass(errClass);
				$(data).next().text("请输入正确的证件号！");
				return false;
			} else {
				$(data).removeClass(errClass);
				$(data).next().text("");
				return dataValue;
			}
		} else if (type == "6") {
			//isTaiwan:台湾居民通行证
			//var reg = new RegExp(/^[0-9]{8,10}$/);
			//if (dataValue.length == 0 || !reg.test(dataValue)) {
			if (dataValue.length < 7) {
				$(data).addClass(errClass);
				$(data).next().text("请输入正确的证件号！");
				return false;
			} else {
				$(data).removeClass(errClass);
				$(data).next().text("");
				return dataValue;
			}
		} else if (type == "7") {
			//is组织机构代码
			//var reg = new RegExp(/^[0-9]{8,10}$/);
			//if (dataValue.length == 0 || !reg.test(dataValue)) {
			if (dataValue.length < 1) {
				$(data).addClass(errClass);
				$(data).next().text("请输入正确的证件号！");
				return false;
			} else {
				$(data).removeClass(errClass);
				$(data).next().text("");
				return dataValue;
			}
		} else if (type == "99") {
			//只要长度大于0，即可
			if (dataValue.length < 1) {
				$(data).addClass(errClass);
				$(data).next().text("请输入正确的证件号！");
				return false;
			} else {
				$(data).removeClass(errClass);
				$(data).next().text("");
				return dataValue;
			}
		}
	} else if (codeType == 1) {
		var reg = new RegExp(/^1([3|5|7|8])[0-9]{9}$/);
		if (dataValue.length == 0 || !reg.test(dataValue)) {
			$(data).addClass(errClass);
			$(data).next().text("请输入正确的手机号！");
			return false;
		} else {
			$(data).removeClass(errClass);
			$(data).next().text("");
			return dataValue;
		}
	} else if (codeType == 2) {
		var reg = new RegExp(/^[0-9]{6}$/);
		if (dataValue.length == 0 || !reg.test(dataValue)) {
			//验证码的class添加在其父节点上
			$(data).parent().addClass(errClass);
			$(data).next().text("请输入正确的手机验证码！");
			return false;
		} else {
			$(data).parent().removeClass(errClass);
			$(data).next().text("");
			return dataValue;
		}
	} else if (codeType == 3) {
		//		var reg = new RegExp(/^[a-zA-Z0-9]{15,18,20,25,26}$/);
		//		if(!reg.test(dataValue)){
		//			$(data).addClass(errClass);
		//			$(data).next().text("请输入正确的保单号！");
		//			return false;
		//		}else{
		//			$(data).removeClass(errClass);
		//			$(data).next().text("");
		//		}
		if (dataValue.length == 15 || dataValue.length == 16 || dataValue.length == 18 || dataValue.length == 20 || dataValue.length == 25 || dataValue.length == 26) {
			$(data).removeClass(errClass);
			$(data).next().text("");
			return dataValue;
		} else {
			$(data).addClass(errClass);
			$(data).next().text("请输入正确的保单号！");
			return false;
		}
	} else if (codeType == 4) {
		//寿险报案号：案号15位，前三位为字母，后12为数字
		var regLife = new RegExp(/^[a-zA-Z]{3}[0-9]{12}$/);
		//健康险报案号：赔案号15位，VSHH+生成赔案号日期+随机顺序，例V：VSHH15102916712
		var regHealthy = new RegExp(/^VSHH[0-9]{11}$/);
		//产险-车险报案号：报案号18位，字母C开头，8-10为【VEH】，如：C310100VEH13437148
		var regCar = new RegExp(/^C[0-9]{6}VEH[a-zA-Z0-9]{8}$/);
		//产险非车报案号：共18位，首位为D、共14位，首位为C、共17位，首位为E
		var regNoCar = new RegExp(/^(D[a-zA-Z0-9]{17}|C[a-zA-Z0-9]{13}|E[a-zA-Z0-9]{16})$/);
		if (regLife.test(dataValue) || regHealthy.test(dataValue) || regCar.test(dataValue) || regNoCar.test(dataValue)) {
			$(data).removeClass(errClass);
			$(data).next().text("");
			return dataValue;
		} else {
			$(data).addClass(errClass);
			$(data).next().text("请输入正确的赔案号/报案号！");
			return false;
		}
	} else if (codeType == 5) {
		//var regEmail = new RegExp(/^\w([-\w.+]){2,29}@([A-Za-z0-9][-A-Za-z0-9]+\.)+([A-Za-z0-9]){2,14}$/);
		var regEmail = new RegExp(/^\w+([-\.]\w+)*@\w+([\.-]\w+)*\.\w{2,4}$/);
		if (!regEmail.test(dataValue)) {
			$(data).addClass(errClass);
			$(data).next().text("请输入正确的电子邮箱地址！");
			return false;
		} else {
			if (dataValue.length > 30) {
				$(data).addClass(errClass);
				$(data).next().text("请输入正确的电子邮箱地址！");
				return false;
			} else {
				$(data).removeClass(errClass);
				$(data).next().text("");
				return dataValue;
			}

		}
	} else if (codeType == 6) {
		var regName = new RegExp(/^(([\u4E00-\u9FA5]){2,20}|([A-Za-z]){1}([A-Za-z\·\s]){0,48}([A-Za-z]){1})$/);
		if (!regName.test(dataValue)) {
			$(data).addClass(errClass);
			$(data).next().text("请输入正确的姓名！");
			return false;
		} else {
			$(data).removeClass(errClass);
			$(data).next().text("");
			return dataValue;
		}
	} else if (codeType == 7) {
		if (dataValue.length < 7 || dataValue.length > 15) {
			$(data).addClass(errClass);
			$(data).next().text("请输入正确的车牌号！");
			return false;
		} else {
			$(data).removeClass(errClass);
			$(data).next().text("");
			return dataValue;
		}
	} else if (codeType == 8) {
		if (dataValue.length < 1) {
			$(data).addClass(errClass);
			$(data).next().text("请输入内容！");
			return false;
		} else if (dataValue.length > 1000) {
			$(data).addClass(errClass);
			$(data).next().text("超过1000个字！");
			return false;
		} else {
			$(data).removeClass(errClass);
			$(data).next().text("");
			return dataValue;
		}
	} else if (codeType == 9) {
		var regName = new RegExp(/^0\d{2,3}-\d{7,8}$/);
		if (!regName.test(dataValue)) {
			$(data).addClass(errClass);
			$(data).next().text("请输入正确的联系电话！");
			return false;
		} else {
			$(data).removeClass(errClass);
			$(data).next().text("");
			return dataValue;
		}
	} else if (codeType == 10) {
		var regName = new RegExp(/^([1-9])\d{5}(?!\d)$/);
		if (!regName.test(dataValue)) {
			$(data).addClass(errClass);
			$(data).next().text("请输入正确的邮编号码！");
			return false;
		} else {
			$(data).removeClass(errClass);
			$(data).next().text("");
			return dataValue;
		}
	} else if (codeType == 11) {
		if (dataValue.length > 50) {
			$(data).addClass(errClass);
			$(data).next().text("联系地址不能超过50个字！");
			return false;
		} else {
			$(data).removeClass(errClass);
			$(data).next().text("");
			return dataValue;
		}
	}
}
var listMenu = function() {
	var count = 1;
	var index = 0;
	$('.submenu' + count).find('.submenu_title').addClass('current').children('input').val(-1);
	$('.submenu' + count).find('.submenu_cont').addClass('current');
	$('.submenu' + count).find('.submenu_cont').children().eq(index).addClass('current');

	$(".submenu_title").hover(function() {
		$(this).addClass('current');
	}, function() {
		var i = $(this).children('input').val();
		if (i == 1) {
			$(this).removeClass('current');
		}
	})
	$(".submenu_title").click(function() {
		var i = $(this).children('input').val();
		i = -i;
		$(".submenu_title").removeClass('current').children('input').val(1);
		$(this).addClass('current').children('input').val(i);
		$('.submenu_cont:visible').slideUp();
		$(this).next(".submenu_cont").stop().slideToggle();
	});
	$('.submenu_cont li').hover(function() {
		$(this).css('color', '#06569D');
	}, function() {
		if (!$(this).hasClass('current')) {
			$(this).css('color', '#575757');
		}
	});
	$('.submenu_cont li').click(function() {
		$('.submenu_cont li').removeClass('current').css('color', '#575757');
		$(this).addClass('current').css('color', '#06569D');
	})
};
//下拉框 传参：值，选项
function selectShow(obj, sub, data, value) {
	var obj = $(obj);
	var sub = $(sub);
	var data = $(data);
	var value = $(value);
	obj.click(function() {
		if($(sub).css("display")=="block"){
			$(sub).slideUp();
		}else{
			$(sub).slideDown().stop().slideToggle();
		}
	});
	obj.parents().siblings().click(function() {
		$(sub).stop().slideUp();
	});
	obj.parents().children().click(function() {
		$(sub).stop().slideUp();
	});
	sub.children().click(function() {
		data.text($(this).text());
		value.val($(this).attr("data"));
		value.attr("code",$(this).attr("code"));
		$(sub).slideUp();
	});
}
//倒计时 传参：标签名，时间
function sendTime(tagName, setTime) {
	var obj = $(tagName);
	var t = setTime;
	var str = '秒后重新获取';
	var time;
	deadline();

	function deadline() {
		obj.off();
		obj.text(t + str).addClass("dx-font-setTime");
		time = setTimeout(autoplay, 1000);
	}

	function autoplay() {
		t--;
		obj.text('发送验证码').removeClass("dx-font-setTime");
		if (t < 0) {
			clearTimeout(time);
			t = setTime;
			obj.on('click', deadline);
		} else {
			obj.text(t + str).addClass("dx-font-setTime");
			time = setTimeout(autoplay, 1000);
		}
	}
}

//弹出框
//openDiv:需要打开的层，closeDiv:关闭按钮
function showInfo(openDiv, closeDiv,divId) {
	//背景遮罩层
	var contentBg = $("<div class='showInfo'></div>");
	contentBg.css({
		width: width() + "px",
		height: height() + "px"
	});
	//弹出内容
	var contentDiv = $(openDiv);
	contentDiv.css({
		visibility: 'visible'
	});
	if(divId != undefined && divId != null){
		$(divId).append(contentBg).append(contentDiv);
	}else{
		if(!$("#innerBody div").hasClass('showInfo')){
			$("#innerBody").append(contentBg).append(contentDiv);
		}
	}
	if(openDiv==".tabTypeEdit"){
		objPosition(contentDiv,600);
	}else{
		objPosition(contentDiv);
	}
	function closeInfo() {
		$(contentBg).remove();
		contentDiv.css({
			visibility: 'hidden',
			top: '0',
			left: '0'
		});
		return this;
	}
	$(closeDiv).click(function() {
		closeInfo();
	});
	return this;
}

function dialog(message, btnFun,e) {
	var msgBg = $("<div class='showInfo'></div>");
	msgBg.css({
		width: $(top.document.body).width() + "px",
		height: $(top.document.body).height() + "px"
	});
	var msgContent = "<div class=\"open_block showInfo-content alertMsg\"><h4 class=\"open_tit\"><a class=\"open_close closeMsg\"></a>消息提示</h4><p class=\"msgTxt\">" + message + "</p><div class=\"txt-c\"><input type=\"button\" class=\"btn_blue btn_blue_b btnMsg\" value=\"确定\"></div><div class=\"height2\"></div></div>";
	$(top.document.body).append(msgBg).append(msgContent);
	objPosition($(top.document.body).find(".alertMsg"));
	function closeInfo() {
		$(top.document.body).find(msgBg).remove();
		$(top.document.body).find(".alertMsg").css({
			visibility: 'hidden',
			top: '0',
			left: '0'
		});
		$(top.document.body).find(".alertMsg").remove();
		return this;
	}
	$(top.document.body).find(".closeMsg").click(function() {
		closeInfo();
	});
	$(top.document.body).find(".btnMsg").click(function() {
		if (btnFun != undefined && btnFun != null && btnFun != "" && btnFun != 'undefined' && btnFun instanceof Function) {
			btnFun(e);
			closeInfo();
		} else {
			closeInfo();
		}
	});
	return this;
}

/*
 * 内容的显示隐藏效果
 * tag:点击展现切换效果的标签
 * content:切换的内容
 * toggleTag:切换样式的标签
 * toggleClass:切换样式的效果
 */
function showContent(tag, content, toggleTag, toggleClass) {
	//在IE8下初始无法获得高度，故声明该变量
	var contentHeight;
	$(tag).click(function() {
		contentHeight = $(this).next(content).height();
		$(this).find(toggleTag).toggleClass(toggleClass);
		$(this).next(content).stop().slideToggle();
	});
}

/**
 * 字符处理:null值处理成"--"
 * @param strParam
 * @returns
 */
function dealStringPro(strParam) {
	//去两边空格的正则，得到正确的值再进行校验
	var dataValue = $.trim(strParam);
	if (dataValue == null || dataValue == "null" || dataValue == "" || dataValue == "undefind" || dataValue==undefined) {
		return "--";
	}
	return dataValue;
}

/**
 * 字符处理:null值处理成""
 * @param param
 * @returns
 */
function dealNullStr(strParam) {
	//去两边空格的正则，得到正确的值再进行校验
	var dataValue = $.trim(strParam);
	if (dataValue == null || dataValue == "null" || dataValue == "" || dataValue == "undefind"|| dataValue==undefined) {
		return "";
	}
	return dataValue;
}

/**
 * json对象，null值处理成"--"
 * @param jsonData
 * @returns
 */
function replaceNullValue(jsonData) {
	var jsonStr = JSON.stringify(jsonData).replace(/null/gi, '"--"');
	return $.parseJSON(jsonStr);
}

//弹出层位置计算
function objPosition(obj,custTop) {
	//obj这个参数是弹出框的整个对象  
	var screenWidth = $(top.document.body).width(),screenHeigth = $(top.document.body).height();
	var availHeight = window.screen.availHeight;
	//获取屏幕宽高  
	var scollTop = $(top.document).scrollTop();
	//当前窗口距离页面顶部的距离  
	var objLeft = (screenWidth - obj.width()) / 2;
	//弹出框距离左侧距离  
	var objTop = "";
	if(custTop!=undefined){
		var objTop = custTop;
	}else{
		var objTop = (availHeight - obj.height()) / 2 + scollTop;
	}
	//弹出框距离顶部的距离  
	obj.css({
		left: objLeft + "px",
		top: objTop + "px",
		visibility: 'visible'
	});
	obj.fadeIn(500);
	//弹出框淡入  
	isOpen = 1;
	//弹出框打开后这个变量置1 说明弹出框是打开装填  
	//当窗口大小发生改变时  
	$(window).resize(function() {
		//只有isOpen状态下才执行  
		var visible = obj.css("visibility");
		if (visible == "visible") {
			//重新获取数据  
			screenWidth = $(top.document.body).width();
			screenHeigth = $(top.document.body).height();
			availHeight = window.screen.availHeight;
			var scollTop = $(top.document).scrollTop();
			objLeft = (screenWidth - obj.width()) / 2;
			objTop = (availHeight - obj.height()) / 2 + scollTop;
			obj.css({
				left: objLeft + "px",
				top: objTop + "px"
			});
			obj.fadeIn(500);
		}
	});
}

/**
 * 设置菜单
 * @param a
 * @param b
 */
function setMenuSeleted(a, b) {
	$('.outbox .current').removeClass('current');
	$('.outbox .submenu' + a + ' .submenu_title').addClass('current');
	$('.outbox .submenu' + a + ' ul').show();
	$('.outbox .submenu' + a + ' ul li').eq(b).addClass('current');
};

function checkAll(obj, boxName) {
	var checkboxs = $("input[name=" + boxName + "]");
	for (var i = 0; i < checkboxs.length; i += 1) {
		checkboxs[i].checked = obj.checked;
	}
}

function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串 
	var pictureId = '';
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			pictureId = unescape(strs[i].split("=")[1]);
		}
	}
	return pictureId;
}

//根据ID获取URL参数
//index 0，1，2
function GetRequestById(index) {
	var url = location.search; //获取url中"?"符后的字串 
	var pictureId = '';
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		pictureId = unescape(strs[index].split("=")[1]);
	}
	return pictureId;
}

function getConfigByCode() {
	var url = location.search; //获取url中"?"符后的字串 
	var pictureId = '';
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			pictureId = unescape(strs[i].split("=")[1]);
		}
	}
	return pictureId;
}

function pageJump(html,id){
	window.location.href=html+"?prodeuctId="+id;
}

/* 弹出层多级联动 start */
//是否在数组内
function in_array(needle, haystack) {
	if (typeof needle == 'string' || typeof needle == 'number') {
		for (var i in haystack) {
			if (haystack[i] == needle) {
				return true;
			}
		}
	}
	return false;
}

// 全屏遮罩层
function boxAlpha (){
	if (isOpen == 0){
		maskLayer();
		isOpen = 1;
	}
	else{
		$('#maskLayer').hide();
		isOpen = 0;
	}
}

//弹出层--遮罩
function maskLayer(){
	var FW=document.body.scrollWidth;
	var FH=document.body.scrollHeight;
	var SH=window.screen.height;
	FH=FH<SH?SH:FH;
	$("#alphadiv").height(FH).width(FW);
	$('#maskLayer').show();
	$('#maskLayer_iframe').css({position:"absolute",left:"0px",top:"0px"}).height(FH).width(FW);
}

//弹出层--内容
function draglayer(){
	objPosition($("#drag"));
}
/* 弹出层多级联动 end */

encodeHTML = function(param){
	return String(param).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}; 

goToUrl = function(url,params){
	var myForm = document.createElement("form");
	myForm.method="post";
	myForm.action=url;
	if(params !='undefined' && params!=null){
		var items = params.split("&");
		var item = null;
		for(var i=0;i<items.length;i++){
			item = items[i].split("=");
			var input = document.createElement("input");
			input.type = "hidden";
			input.name = item[0];
			if("_target" == item[0]){
				myForm.target = item[1];
			}
			input.value = encodeHTML(item[1]);
			myForm.appendChild(input);
		}
	}
	document.body.appendChild(myForm);
	myForm.submit();
	document.body.removeChild(myForm);
};

//20160601 
//id,type:类型(1)
function getConfig(id,type,dfSelect){
	var html="";
	if(dfSelect==undefined){
		html="<a data='' code=''>请选择</a>";
	}
	$.ajax({
		async: false,
		cache: false,
		type: 'POST',
		dataType: "json",
		data: {
			"typeArr": type
		},
		url: "../common/getConfigItems", 
		error: function() {
			alert('请求失败');
		},
		success: function(data) {
			if (data.resCode == "1") {
				var item = data.itemsMap[type];
				if(item!=null){
					for(var i = 0; i < item.length; i++){
						html+="<a data="+item[i].id+" code="+item[i].code+">"+item[i].name+"</a>";
					}
					if(type==7){
						html+="<a  style='color:#005BAC;'>收起</a>";
					}
					$('.'+id).html(html);
				}
			} else {
				alert(data.resMsg);
			}
		}
	});
}

function closeShowInfoTabChange(tab){
	$("#tabContent"+tab).addClass("swiper-slide-active").siblings().removeClass("swiper-slide-active");
	$("#tabContent"+tab).addClass("swiper-slide-visible").siblings().removeClass("swiper-slide-visible");
}
//ajax异常统一处理
function ajaxErrorHandle(data){
	
	if(data !=null && data.status=="405" ){
		if((data.respnseJson!=undefined &&data.responseJSON.resCode=="9000006")||(data.responseText!=undefined&&JSON.parse(data.responseText).resCode=="9000006")){
			dialog("您没有权限执行该操作，请联系系统管理员。");
		}else if((data.respnseJson!=undefined &&data.responseJSON.resCode=="9000002")||(data.responseText!=undefined&&JSON.parse(data.responseText).resCode=="9000002")){
			top.window.location.href="../login/login.html";
		}else if((data.respnseJson!=undefined &&data.responseJSON.resCode=="9000007")||(data.responseText!=undefined&&JSON.parse(data.responseText).resCode=="9000007")){
			dialog("您的请求参数中存在非法的关键字符,被拒绝,请检查您的输入的值！");
		}else{
			dialog("请求异常");
		}
	}else{
		dialog("请求异常");
	}
}