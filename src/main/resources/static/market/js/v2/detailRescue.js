$(function() {
	// productRecommends_init($("#branch_pc").val());
	$(".menu li").click(function() {
		$("li").removeAttr("class");
		$(this).addClass("cur");
	});
	swiperContent();
	listMenu();
});

function swiperContent() {
	if ($('.tabs-container').html()) {
		var tabs = new Swiper('.tabs-container', {
			onlyExternal : true,
			speed : 500,
			useCSS3Transforms : false
		})
		$(".tabs a").on('touchstart mousedown', function(e) {
			e.preventDefault();
			$(".tabs .active").removeClass('active');
			$(this).addClass('active');
			tabs.swipeTo($(this).index());
		})
		$(".tabs a").click(function(e) {
			e.preventDefault()
		});
	}
}

var listMenu = function() {
	var count = 1;
	var index = 0;
	$('.submenu' + count).find('.submenu_title').addClass('current').children(
			'input').val(-1);
	$('.submenu' + count).find('.submenu_cont').addClass('current');
	$('.submenu' + count).find('.submenu_cont').children().eq(index).addClass(
			'current');

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

function iAdvice() {
 var url = zixunURL || "/cpic/o2o/customer/";
  /*if(s_gi){
  	var s=s_gi(s_account);
    s.linkTrackVars='eVar53,events';
    s.linkTrackEvents='event59';
    s.events='event59';
    s.eVar53='太保优歩:产品详情:我要咨询';
    s.tl(this,'o','太保优歩');
  }*/
  layer.open({
	type:2,
	title:false,
	shadeClose :true,
	//scrollbar :false,
  content:[url,"no"],
	area:['980px','590px']
  });
	// 贷款
	/*if ($(window.frames["contractiframe"].document).find(".pop").length > 0) {
		$(window.frames["contractiframe"].document).find("#pop1").show();
	}
	var productCode = $("#productCode_pc").val();
	var productName = $("#name1").text();
	openwindow(productCode, productName);*/

}

function openwindow(productCode, productName) {
	/*
	 * var resourse = "http://www.ecpic.com.cn/mall/sale/pc?productCode=" +
	 * productCode + "&amp;productName=" + encodeURI(productName) + "&oppType=";
	 * $("#contractiframe").attr("src", resourse);
	 */

	var width = document.body.clientWidth;
	$("#zhezhao").css("width", width);
	$("#contactus").show();
	$("#contractiframe").show();
	$("#contractiframe").find(".search-list").css("width", "260px;");
	$(".reveal-modal-bg").show();
}

function panduan() {
	$("#contractiframe").attr("src", $("#contractiframe").attr("src"));
	$("#contactus").hide();
	$(parent.document).find(".reveal-modal-bg").hide();
	$('.reveal-modal-bg').css({
		"display" : "none"
	});
}

function closeClick() {
	$(parent.document).find('#contractiframe').hide();
	$(parent.document).find(".reveal-modal-bg").hide();
	$('.layer').addClass('hide');
	$('.pop').hide();
	$("#pop1").hide();
	$("#pop2").hide();

}

function changeTab(tabId) {
	$("#tabId").val(tabId);
	// autoPHeightTab(tabId);
	// $("#tabContent"+tabId)
	// $("#tab"+tabId+"Link").addClass("active").siblings().removeClass("active");
	closeShowInfoTabChange(tabId);

}

function closeShowInfoTabChange(tab) {
	$("#tabContent" + tab).addClass("swiper-slide-active").siblings()
			.removeClass("swiper-slide-active");
	$("#tabContent" + tab).addClass("swiper-slide-visible").siblings()
			.removeClass("swiper-slide-visible");
}

function jsoncallback(data) {
	if (data.resCode == "0000000") {
		dialog("添加收藏夹成功！");
	}
	if (data.resCode == "-9999999") {
		$.cookie('the_cookie', 'the_value', {
			expires : 7
		});
		dialog("添加收藏夹成功！");
	} else {
		dialog(data.resMsg);
	}

}

/*
function addScj() {
	var productList = getCookie("productList");
	var pids = new Array();
	var productIds = new Array();
	if (productList != null && productList != "" && productList != "null") {
		console.log(productList);
		// productList =
		// '[{"pId":"","className":"111","sellPrice":"0","imgUrl":"../xbxcs/img/10000002/10000302/10000346\\9a2a20c9f1624d28853b47ea2b5ebabd.jpg","buyNowLink":"http://www.ecpic.com.cn/mall/sale/shortterm/estimate?productCode=2101750000000000&&productSerialNo=2101750000000000_planA&discussNum=483&buyNum=11860"},{"pId":"","className":"aaa","sellPrice":"0","imgUrl":"../xbxcs/img/10000002/10000302/10000351\\eca0121e41e94279b7f1cebed0d10d99.jpg","buyNowLink":"http://www.ecpic.com.cn/mall/sale/shortterm/estimate?productCode=2101750000000000&&productSerialNo=2101750000000000_planA&discussNum=483&buyNum=11860"}]';
		// productList =
		// '[{"pId":"","className":"aaa","sellPrice":"0","imgUrl":"../xbxcs/img/10000002/10000302/10000351\\eca0121e41e94279b7f1cebed0d10d99.jpg","buyNowLink":"http://www.ecpic.com.cn/mall/sale/shortterm/estimate?productCode=2101750000000000&&productSerialNo=2101750000000000_planA&discussNum=483&buyNum=11860"}]';
		var productListString = eval("(" + '[' + productList + ']' + ")");
		for (var i = 0; i < productListString.length; i++) {
			var product = productListString[i];
			var pId = product.pId;
			var className = product.className;
			var sellPrice = product.sellPrice;
			var imgUrl = product.imgUrl;
			pids.push(JSON.stringify(productListString[i]));
			productIds.push(className);
		}
	}

	var sellPrice = "";
	var resourse = "";
	var goldLink="";
	var buynowLink="";
	var productCode = $("#productCode_pc").val();
	var branch_pc=$("#branch_pc").val();
	if ($("#adviceBtn").is(":hidden")) {
		sellPrice = $("#saleprice").text();
		buynowLink=$("#buyNowLink").attr("href");
	}else if(branch_pc=="01"&&sellPrice == "") {
		resourse=$("#contractiframe").attr("src");
		goldLink="http://www.cpic.com.cn/grsxdg";
	}else{
		resourse=$("#contractiframe").attr("src");
	}
	
	
	var product = {
		"pId" : $("#productId_pc").val(),
		"branch_pc":branch_pc,
		"className" : $("#name1").text(),
		"sellPrice" : sellPrice,
		"imgUrl" : $("#productImgL_pc").val(),
		"resourse":resourse,
		"goldLink":goldLink,
		"buyNowLink" : buynowLink,
      "detailUrl" : $("#product_url").val().indexOf("http")!==-1?$("#product_url").val():"http://www.cpic.com.cn"+$("#product_url").val(),	//"detailUrl" : 'http://www.cpic.com.cn/xbxcs/publish/online/'+ $("#branch_pc").val() + '/' + $("#productId_pc").val()+ '/PC/detail1.html'
	};
	if (productIds.indexOf($("#name1").text()) > -1) {
		dialog("该产品已收藏！");
	} else {
		pids.push(JSON.stringify(product));
		delCookie("productList");

		var arr = document.cookie.split("; ");
		setCookie("productList", pids, 3650)
		dialog("添加收藏夹成功！");

	}
}
*/

// 设置cookie
// name是cookie中的名，value是对应的值，iTime是多久过期（单位为天）
function setCookie(name, value, iTime) {

	var oDate = new Date();
	// 设置cookie过期时间
	oDate.setDate(oDate.getDate() + iTime);
	document.cookie = name + '@@' + value + ';expires=' + oDate.toGMTString()
			+ ";path=/;domain=www.cpic.com.cn"; //

}
// 获取cookie
function getCookie(name) {
	// cookie中的数据都是以分号加空格区分开
	var arr = document.cookie.split("; ");
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].split("@@")[0] == name) {
			return arr[i].split("@@")[1];
		}
	}
	// 未找到对应的cookie则返回空字符串
	return '';
}

// 删除cookies
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) {
		document.cookie = name + "@@" + cval + ";expires=" + exp.toGMTString()
				+ ";path=/;domain=www.cpic.com.cn";//
	}

}

function html_encode(str) {
	var s = "";
	if (str.length == 0)
		return "";
	s = str.replace(/&/g, "&gt;");
	s = s.replace(/</g, "&lt;");
	s = s.replace(/>/g, "&gt;");
	s = s.replace(/ /g, "&nbsp;");
	s = s.replace(/\'/g, "&#39;");
	s = s.replace(/\"/g, "&quot;");
	s = s.replace(/\n/g, "<br>");
	return s;
}

function html_decode(str) {
	var s = "";
	if (str.length == 0)
		return "";
	s = str.replace(/&gt;/g, "&");
	s = s.replace(/&lt;/g, "<");
	s = s.replace(/&gt;/g, ">");
	s = s.replace(/&nbsp;/g, " ");
	s = s.replace(/&#39;/g, "\'");
	s = s.replace(/&quot;/g, "\"");
	s = s.replace(/<br>/g, "\n");
	return s;
}

function saleArea_click() {
	if ($("#saleArea").hasClass("saleArea")) {
		$("#saleArea").removeClass("saleArea");
	} else {
		$("#saleArea").addClass("saleArea");
	}
}

function productRecommends_init(companyCode) {
	$
			.ajax({
				// async: false,
				// cache: false,
				type : 'POST',
				dataType : "json",
				data : {
					companyCode : companyCode
				},
				url : "../recommend/getProductRecommends", // 请求的action路径
				error : function(data) {
					// 请求失败处理函数
					// alert('请求失败');
					ajaxErrorHandle(data);
				},
				success : function(data) {
					// 请求成功后处理函数。
					if (data.resCode == "0000000") {
						var html = "";
						if (data.recommendList != undefined
								&& data.recommendList.length > 0) {
							for (var i = 0; i < data.recommendList.length; i++) {
								html += "<a href='"
										+ data.recommendList[i].productUrl
										+ "' target='_blank'> ";
								html += "<div class = 'ProductRecommendationCon' >";
								html += "<img src = '.."
										+ data.recommendList[i].fielPath
										+ "' >";
								html += "<font class = 'ProductName' >"
										+ data.recommendList[i].productName
										+ "</font>";

								html += "</div></a><h2 class = 'ProductRecommendationTit'></h2>";

							}
						}
						$("#ProductRecommendationCon").html(html);
						//autoPHeight(120);
					} else {
						alert(data.resMsg);
					}
				}
			});
}