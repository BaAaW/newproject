var siteID = 136;
var siteUrl = "/cpic/market/";
favoriteTotal();
function favoriteTotal(){
   //$('#favoriteTotal').text(eval("(" + '['+scjgetCookie("productList")+']'+")").length);
        $('#favoriteTotal').text(eval("(" + '['+scjgetCookie("productList")+']'+")").length);
}


function addScj(id,name,price,code,no,url,img,buylink){
	var productList = scjgetCookie("productList");
	var productNum=eval("(" + '['+scjgetCookie("productList")+']'+")").length;
		var pids = new Array();
		var productIds = new Array();
		if (productList != null && productList != "" && productList != "null") {
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
	
	var goldLink = "";
	if(!price){
		goldLink="/cpic/grsxdg/";
	}
	var buyNowLink = "/cpic/mall/sale/shortterm/estimate?productCode="+code+"&&productSerialNo="+no;
	if(buylink){
		buyNowLink = buylink;
	}	
  var resourse = "/cpic/mall/sale/shortterm/estimate?productCode="+code+"&productName="+name+"&oppType=";
	var product = {
			"pId" : id,
			"branch_pc":siteID,
			"className" : unescape(name),
			"sellPrice" : price,
			"imgUrl" : (siteUrl+img).replace("//market",""),
			"resourse":resourse,
			"goldLink":goldLink,
			"buyNowLink" : buyNowLink,
			"detailUrl" : url,
      "classCode" :code
		};
	
	if (productIds.indexOf(unescape(name)) > -1) {
		dialog("该产品已收藏！");
	} else {
		if(productNum>=6){
		dialog("您的收藏夹已满，最多可为您收藏6款产品");
	}else{
		pids.push(JSON.stringify(product));
		scjdelCookie("productList");
		var arr = document.cookie.split("; ");
		scjsetCookie("productList", pids, 3650);
		dialog("添加收藏夹成功！");
		favoriteTotal();
	}
}
}

/*
function addScj(id,name,price,code,no,url,img,buylink){
	
	
	var productList = getCookie("productList");
	var pids = new Array();
	var productIds = new Array();
	if (productList != null && productList != "" && productList != "null") {
		console.log(productList);
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
	
	var goldLink = "";
	if(!price){
		goldLink="http://www.cpic.com.cn/grsxdg";
	}
	var buyNowLink = "http://www.cpic.com.cn/mall/sale/shortterm/estimate?productCode="+code+"&&productSerialNo="+no;
	if(buylink){
		buyNowLink = buylink;
	}	
  var resourse = "http://www.cpic.com.cn/mall/sale/pc?productCode="+code+"&productName="+name+"&oppType=";
	var product = {
			"pId" : id,
			"branch_pc":siteID,
			"className" : unescape(name),
			"sellPrice" : price,
			"imgUrl" : (siteUrl+img).replace("//market",""),
			"resourse":resourse,
			"goldLink":goldLink,
			"buyNowLink" : buyNowLink,
			"detailUrl" : url,
            "classCode" :code
		};
	
	if (productIds.indexOf(unescape(name)) > -1) {
		dialog("该产品已收藏！");
	} else {
		pids.push(JSON.stringify(product));
		delCookie("productList");

		var arr = document.cookie.split("; ");
		setCookie("productList", pids, 3650);
		dialog("添加收藏夹成功！");
		favoriteTotal();
	}
}
*/

// 设置cookie
// name是cookie中的名，value是对应的值，iTime是多久过期（单位为天）
function scjsetCookie(name, value, iTime) {
	var oDate = new Date();
	// 设置cookie过期时间
	oDate.setDate(oDate.getDate() + iTime);
	document.cookie = name + '@@' + value + ';expires=' + oDate.toGMTString()
			+ ";path=/;domain=www.cpic.com.cn"; //

}
// 获取cookie
function scjgetCookie(name) {
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
function scjdelCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = scjgetCookie(name);
	if (cval != null) {
		document.cookie = name + "@@" + cval + ";expires=" + exp.toGMTString()
				+ ";path=/;domain=www.cpic.com.cn";//
	}

}

function dialog(message, btnFun,e) {
	var msgBg = $("<div class=\"showInfo\"></div>");
	msgBg.css({
		width: $("body").width() + "px",
		height: $("body").height() + "px"
	});
	var msgContent = "<div class=\"open_block showInfo-content alertMsg\"><h4 class=\"open_tit\"><a class=\"open_close closeMsg\"></a>消息提示</h4><p class=\"msgTxt\">" + message + "</p><div class=\"txt-c\"><input type=\"button\" class=\"btn_blue btn_blue_b btnMsg\" value=\"确定\"></div><div class=\"height2\"></div></div>";
	$("body").append(msgBg).append($(msgContent));
	objPosition($("body").find(".alertMsg"));
	function closeInfo() {
		$("body").find(msgBg).remove();
		$("body").find(".alertMsg").css({
			visibility: 'hidden',
			top: '0',
			left: '0'
		});
		$("body").find(".alertMsg").remove();
		return this;
	}
	$("body").find(".closeMsg").click(function() {
		closeInfo();
	});
	$("body").find(".btnMsg").click(function() {
		if (btnFun != undefined && btnFun != null && btnFun != "" && btnFun != 'undefined' && btnFun instanceof Function) {
			btnFun(e);
			closeInfo();
		} else {
			closeInfo();
		}
	});
	return this;
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