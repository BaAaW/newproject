//根据条件筛选产品显示
var contPath = "/cpic/search/";
// 以下必须为全局变量
var dataValue = 0;// ajax传参;
var innerCode = $(".current-catalog-code").val();
var productType = 0; // 产品分类
var siteID = 136;// bxcs站点ID
var ageType = 0; // 被承包人年龄
var serviceType = 0;// 产品特色
var timeType = 0;// 保障时间
var pageNum = 1; // 第几页，默认第一页
var sortType = 0; // 排序1-销量、2-人气
var siteUrl = "/cpic/market/";
var ResStickie=0;

// 条件按钮点击样式
$('.details a').on("click", function() {
	$(this).addClass('current');
	$(this).siblings('a').removeClass('current');	
	pageNum = 1;
	match();
});
//排序点击事件
$('.sort span').on("click",function(){
    $(this).addClass('current');
	$(this).siblings('span').removeClass('current');
	pageNum = 1;
	match();
});


$('.clear').on('click',function() {
	$('.details a').removeClass('current');
	$(".dest a:first,.age a:first,.feat a:first,.time a:first").addClass('current');
  	$(".sort span").removeClass('current');
    $(".sort span:first").addClass('current');
	pageNum = 1;
	match();
});

$('.dest .input-dest').on('blur',function (){
	pageNum = 1;
	match();
});

// 判断是否匹配
function match() {
	productType = $('.dest').children('a.current').attr("data-value");
	ageType = $('.age').children('a.current').attr("data-value");
	serviceType = $('.feat').children('a.current').attr("data-value");
	timeType = $('.time').children('a.current').attr("data-value");
	destination = $('.dest .input-dest').val();
	sortType = $('.sort span.current').attr("data-value");
	dataValue = regroup(dataValue);
	sendTo(dataValue);
}

// 初始化
$(function(){
  	 var Param = window.location.href.split('#')[1];
		var aq=0;
		if(Param){
		 aq = Param.length; 
		}		
		if (aq <= 0) {
			match();
            return;
		} else {
			var bx = Param;
			var Uids = new Array();		
			var count = bx.length;
			for(var i = 0;i < count;i++){
				if(bx.charAt(i) == "a") {
					Uids.push("10");
					continue;
				}
				if(bx.charAt(i) == "b") {
					Uids.push("11");
					continue;
				}
				if(bx.charAt(i) == "c") {
					Uids.push("12");
					continue;
				}
				Uids.push(bx.charAt(i));
			}
		}	
		
		for (var i = 0;i <= count-1;i++){
			var Uid = Uids[i];
			var pclass = $(".details").children("p").eq(i).attr("class");
			var n = $("."+pclass).children("a").eq(Uid).length;
			if(n == 0){
				$("."+pclass).children("a").eq(0).addClass("current").siblings().removeClass("current");
	
			}
				
				$("."+pclass).children("a").eq(Uid).addClass("current").siblings().removeClass("current");
						
		}
			match();	
}); 

// 当页面滚动到一定距离时显示侧边栏
var side = document.getElementById("sidebar"); // 查询并定义div元素
side.style.display = "none";// 页面打开时默认不显示侧边栏
window.onscroll = function() { // 绑定scroll事件
	var t = document.documentElement.scrollTop || document.body.scrollTop; // 获取滚动距离
	if (t >= 300) { // 判断
		side.style.display = "block";
	} else {
		side.style.display = "none";
	}
}


var regroup = function(data) {
	//拼装sv参数
	var sv = "";
	if(productType!=0){
		productType = encodeURI(decodeURI(productType));
		sv += "METAVALUE_CONTENT_LIST0.0"+productType+"0.0S";
	}
	
	if(serviceType != 0){
		serviceType =  encodeURI(decodeURI(serviceType));
		if(sv){
			sv += ",";
		}
		sv += "METAVALUE_SPECIAL_LIST0.0"+serviceType +"0.0S";
	}
	if(timeType != 0){
		timeType =  encodeURI(decodeURI(timeType ));
		if(sv){
			sv += ",";
		}
		sv += "METAVALUE_TIME_LIST0.0"+timeType+"0.0S";;
	}
	if(ageType != 0){
		ageType =  encodeURI(decodeURI(ageType));
		if(sv){
			sv += ",";
		}
		sv += "METAVALUE_AGE_LIST0.0"+ageType +"0.0S";
	}
	if(sortType==0){
		sortType=2;
	}
	data = {
		'innerCode':innerCode,
		'callBack' : 'callbackSearch',
		'SiteID' : siteID,
		'sv' : sv,
		'destination' : destination,
		'pageIdx' : pageNum,
    'sortType' : sortType,
	};

	return data;
}

var sendTo = function(dataValue) {
	$.ajax({
		url : contPath+'market/publicSearch',
		type : "get",
		data : dataValue,
		dataType : "jsonp",
		jsonp : 'jsoncallback',
		async : true,
		success : function(data) {},
		error : function(xhr) {
			return;
		}
	});
}

var callbackSearch = function(data) {
	var list = data.list;
	$(".count .red").text(data.total);
	var totalPages = data.totalPages;
	$(".page").remove();
	if(list && list.length && totalPages){
		
		$(".prod-all").show();
		$(".warnno").hide();
		creatTurnPage(totalPages);
		var obj = data.productList;
		// 产品渲染
		showProducts(list);
	}else{
		
		$(".prod-all").hide();
		$(".warnno").show();
		return;
	}
}

// 创建分页的函数
var creatTurnPage = function(totalPage) {
	$('.products').append('<div class="page"></div>');
	$(".page").createPage({
		pageCount : totalPage, // 总页数
		current : pageNum, // 当前页
		backFn : function(p) { // p是当前页码
			pageNum = p;
			dataValue = regroup(dataValue);
			sendTo(dataValue);
		}
	});
}

// 产品渲染函数
var showProducts = function(obj) {
	$('.prod-all').empty();
	var len = obj.length;
	for (i = 0; i < len; i++) {
		var marketProduct = "<div class='prod-tab'>";
		
		var image = "";
		if(obj[i].METAVALUE_LISTPIC){
			image = obj[i].METAVALUE_LISTPIC;
		}else{
			image = obj[i].LOGOFILE;
		}
		
      	if(!image){
          continue;
        }
      	
		//详情Url
		var url = "";
		if(obj[i].METAVALUE_URL){
          if(obj[i].METAVALUE_URL.indexOf('?')>0){
            url = obj[i].METAVALUE_URL + '&SCsite=accidentLb';
          }else{
            url = obj[i].METAVALUE_URL + '?SCsite=accidentLb';
          }
			
		}else{
          if(obj[i].URL.indexOf('?')>0){
            url = obj[i].URL + '&SCsite=accidentLb';
          }else{
            url = obj[i].URL + '?SCsite=accidentLb';
          }
		}
		
		// 图片
		var img = "<div class='prod-img'><img src='"+siteUrl + image + "' alt='"+obj[i].TITLE+"'>";
		//if(i==0){
        if(obj[i].METAVALUE_RESSTICKIE==1){
			img += "<div class='bktj'>爆款推荐</div>";
		}
		img +="</div>";
		
		var detail = "<div class='prod-detail'>";
		// 标题
		
		var collect = "addScj('"+obj[i].ID+"','"+escape(obj[i].TITLE)+"','"+obj[i].METAVALUE_PREFERENTIALPRICE+"','"+obj[i].METAVALUE_PRODUCTCODE+"','"+obj[i].METAVALUE_PRODUCTSERIALNO+"','"+url+"','"+obj[i].LOGOFILE+"')";
		
		var title = "<div class='prod-tit'><a href="+url+" target='_blank'><span class='tab_name'>"+obj[i].TITLE
					+"</span></a><span class='collect' onclick="+collect+"><i class='star'></i>收藏</span></div>";
		// 特色
		var feature = "<div class='feature'>";
		if(obj[i].METAVALUE_SPECIAL_LIST){
			var features = obj[i].METAVALUE_SPECIAL_LIST.split(",");
			for(var j=0;j<features.length;j++){
				var temp = "<span><i>√&nbsp;</i>"+features[j]+"&nbsp;</span>";
				feature += temp;
			}
		}
		feature +="</div>";
		
		// 承保年龄
		var age = "<div class='age mt18'>";
		if(obj[i].METAVALUE_INSUREDAGE){
			age += "<span class='black'>承保年龄</span><span class='tab_age'>"+obj[i].METAVALUE_INSUREDAGE+"</span>";
		}
		age +="</div>";
		// 保障期限
		var time = "<div class='date mt10'>";
		if(obj[i].METAVALUE_INSURANCEPERIOD){
			time += "<span class='black'>保障期限</span><span class='tab_date'>"+obj[i].METAVALUE_INSURANCEPERIOD+"</span>";
		}
		time += "</div>";
		
		//主要保障
		var safe = "<div class='safe mt10'>";
		if(obj[i].METAVALUE_EXTENDBLOCK1){
			safe += "<span class='black'>主要保障</span><div class='tab_safe'>"+obj[i].METAVALUE_EXTENDBLOCK1+"</div>";
		}
		safe += "</div>";
		
		detail += title + feature+age + time + safe +"</div>";
		
		//价格
		var price = "<div class='price'>";
		if(obj[i].METAVALUE_PREFERENTIALPRICE){
		price += "<div><span>"+obj[i].METAVALUE_PREFERENTIALPRICE+"元</span>起</div>";
		}else{
			price += "<div class='more-btn cesuan-btn'><a href="+url+"	target='_blank'>保费测算</a></div>";
      //price += "<a href="+url+" class='more-btn cesuan-btn' target='_blank'>保费测算</a></div>";
		}
	  price += "<a href="+url+" class='more-btn' target='_blank'>查看详情</a></div>";
		
		marketProduct += img + detail + price + "<div class='clearfix'></div></div>";	
		
		$('.prod-all').append(marketProduct);
	}	
}