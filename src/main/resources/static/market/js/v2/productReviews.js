//本地环境

// 生产环境
var rootName = '/cpic/mall';

var rows = 8;
var tagCodeList='';
var productCode_pc='';

$(document).ready(function() {
	productCode_pc = $('#productCode_pc').val();
	execMethodStar();
	execMethod(1, rows,0);
});

//查询评分
function commentScore(result) {
	renderResultStar(result);
	getCommentQuantity();
	getCommentAmount();
}

function execMethodStar() {
	$.ajax({
		dataType : 'jsonp',
		jsonp : 'jsoncallback',
		url : rootName + '/comment/getCommentScore?parentSubjectId=' + productCode_pc,
		beforeSend: function () {
	    	jqLoading();
	    },	
	    complete: function () {
	    	jqLoading("destroy");
	    },
		success : function(result) {
			
		}
	});
	
}

function renderResultStar(result) {
	var avg = '';
	if (result.avg != null) {
		avg = result.avg;
		$('#avg').html(avg);
	} else {
		$('#avg1').html("暂无评分！");
	}

	var product = '';
	var service = '';
	var course = '';
	var rcStr1 = '';
	var rcStr2 = '';
	var rcStr3 = '';
	var rcStr_1 = '_star.png" width="80" height="16"></span><span style="margin-right:5px;">';
	var rcStr_2 = '_star.png" width="80" height="16"></span><span style="margin-right:5px;">';
	var rcStr_3 = '_star.png" width="80" height="16"></span><span style="margin-right:5px;">';
	if (result.product != null) {
		product = result.product;
		if (product > 0 && product <= 1) {
			rcStr1 += '<span>产品：</span><span><img src="/cpic/market/images/v2/common/1'	+ rcStr_1 + '（' + product + '分）</span>';
		} else if (product > 1 && product <= 2) {
			rcStr1 += '<span>产品：</span><span><img src="/cpic/market/images/v2/common/2'	+ rcStr_1 + '（' + product + '分）</span>';
		} else if (product > 2 && product <= 3) {
			rcStr1 += '<span>产品：</span><span><img src="/cpic/market/images/v2/common/3'	+ rcStr_1 + '（' + product + '分）</span>';
		} else if (product > 3 && product <= 4) {
			rcStr1 += '<span>产品：</span><span><img src="/cpic/market/images/v2/common/4'	+ rcStr_1 + '（' + product + '分）</span>';
		} else {
			rcStr1 += '<span>产品：</span><span><img src="/cpic/market/images/v2/common/5'	+ rcStr_1 + '（' + product + '分）</span>';
		}
	}
	if (result.service != null) {
		service = result.service;
		if (service > 0 && service <= 1) {
			rcStr2 += '<span>服务：</span><span><img src="/cpic/market/images/v2/common/1'	+ rcStr_2 + '（' + service + '分）</span>';
		} else if (service > 1 && service <= 2) {
			rcStr2 += '<span>服务：</span><span><img src="/cpic/market/images/v2/common/2'	+ rcStr_2 + '（' + service + '分）</span>';
		} else if (service > 2 && service <= 3) {
			rcStr2 += '<span>服务：</span><span><img src="/cpic/market/images/v2/common/3'	+ rcStr_2 + '（' + service + '分）</span>';
		} else if (service > 3 && service <= 4) {
			rcStr2 += '<span>服务：</span><span><img src="/cpic/market/images/v2/common/4'	+ rcStr_2 + '（' + service + '分）</span>';
		} else {
			rcStr2 += '<span>服务：</span><span><img src="/cpic/market/images/v2/common/5' + rcStr_2 + '（' + service + '分）</span>';
		}
	}
	if (result.course != null) {
		course = result.course;
		if (course > 0 && course <= 1) {
			rcStr3 += '<span>过程：</span><span><img src="/cpic/market/images/v2/common/1'	+ rcStr_3 + '（' + course + '分）</span>';
		} else if (course > 1 && course <= 2) {
			rcStr3 += '<span>过程：</span><span><img src="/cpic/market/images/v2/common/2' + rcStr_3 + '（' + course + '分）</span>';
		} else if (course > 2 && course <= 3) {
			rcStr3 += '<span>过程：</span><span><img src="/cpic/market/images/v2/common/3' + rcStr_3 + '（' + course + '分）</span>';
		} else if (course > 3 && course <= 4) {
			rcStr3 += '<span>过程：</span><span><img src="/cpic/market/images/v2/common/4' + rcStr_3 + '（' + course + '分）</span>';
		} else {
			rcStr3 += '<span>过程：</span><span><img src="/cpic/market/images/v2/common/5'	+ rcStr_3 + '（' + course + '分）</span>';
		}
	}
	$("#product").html(rcStr1);
	$("#service").html(rcStr2);
	$("#course").html(rcStr3);
}

//查询评论
function execMethod(pageNo, rows, type) {
	// 当前查询页
	$.ajax({
		dataType : 'jsonp',
		url : rootName + '/comment/getCommentList?parentSubjectId=' + productCode_pc + '&pageIndex=' + pageNo+ '&pageSize=' + rows  + '&evaluationCode=' + type,
		contentType : "application/json; charset=utf-8",
		beforeSend: function () {
	    	jqLoading();
	    },	
	    complete: function () {
	    	jqLoading("destroy");
	    },
		success : function(result) {
			if (result.flag == "0") {
				message = result.message;
				topicHtml = '<li>' + message + '</li>';
				$("#page").hide();
			} else {
				var comments = result.comments;
				var topicHtml = "";
				for (var i = 0; i < comments.length; i++) {
					var topic = comments[i];
					var replyUserName = topic.replyUserName;
					var replyDate = topic.replyDate;
					var description = topic.description;
					var score = topic.score;
					var replys = topic.replys;
					var replyRemark = "";
					topicHtml += "<li>";
					topicHtml += "<i class='o2oIcon'></i>";
					topicHtml += "<div class='o2oCenter'>";
					topicHtml += "<span>" + replyUserName + "评价：</span>";
					topicHtml += "<label>" + description + "</label>"
					topicHtml += "</div>";
					topicHtml += "<div class='o2oRight'>";
					for (var j = 0; j < score; j++) {
						topicHtml += "<i class='o2oRightI01'></i>";
					}
					topicHtml += "<font>" + score + "分</font>";
					topicHtml += "<div class='clear'></div>";
					topicHtml += "<span>" + replyDate + "</span>";
					topicHtml += "</div>";
					topicHtml += "<div class='clear'></div>";
					topicHtml += "</li>";
				}
				// 处理输出网页内容
				if(type==0){
					$('.total').addClass('bgcolor');
					$('.total').siblings().removeClass('bgcolor');
					pageProcess(result.pageIndex, rows,getPageTotal(result.totalCount, rows), 'topicPageBtn', 'page',execMethod);
				}else if(type==1){
					$('.good').addClass('bgcolor');
					$('.good').siblings().removeClass('bgcolor');
					pageProcess(result.pageIndex, rows,getPageTotal(result.totalCount, rows), 'topicPageBtn', 'page',execMethod);
				}else if(type==2){
					$('.middle').addClass('bgcolor');
					$('.middle').siblings().removeClass('bgcolor');
					pageProcess(result.pageIndex, rows,getPageTotal(result.totalCount, rows), 'topicPageBtn', 'page',execMethod);
				}else if(type==3){
					$('.bad').addClass('bgcolor');
					$('.bad').siblings().removeClass('bgcolor');
					pageProcess(result.pageIndex, rows,getPageTotal(result.totalCount, rows), 'topicPageBtn', 'page',execMethod);
				}
			}
			$('#topic').empty().html(topicHtml);
		},
		error: function(data) {
			jqLoading("destroy");
			ajaxErrorHandle(data);
		}
	});
}

/**
 * 计算列表总数对应的总页数
 */
function getPageTotal(totalCount, quertRows) {
	var count = 0;
	if (totalCount > 0) {
		count = parseInt(totalCount / quertRows);
		if (totalCount % quertRows > 0) {
			count = count + 1;
		}
	}
	return count;
}

function pageProcess(pageNo, pageRows, pageTotal, pageClassIndex, divId,execMethod) {
	if (pageTotal <= 0) {
		return false;
	}
	var pageNo = parseInt(pageNo);
	// 拼写分页段
	var switchRange = 2; // 必须被2整除
	// 始页
	var beginPage = pageNo - switchRange;
	if (beginPage < 1) {
		beginPage = 1;
	}
	// 止页
	var endPage = beginPage + switchRange + 2;
	if (endPage > pageTotal) {
		endPage = pageTotal;
	}
	// 拼装分页的HTML代码
	var pagerHtml = '';
	if (pageNo != 1) {
		pagerHtml += getPageOperateBtn(Number(pageNo - 1), '<<上一页', 'prev',pageClassIndex);
	} else {
		pagerHtml += '<a class="prev disable"><<上一页</a>';
	}
	if (beginPage != 1) {
		pagerHtml += getPageBtn(1, '1', false, pageClassIndex);
	}
	if (beginPage > 2) {
		pagerHtml += '<a style="color:#000;">...</a>';
	}
	for (var pageI = beginPage; pageI <= endPage; pageI++) {
		pagerHtml += getPageBtn(pageI, pageI.toString(), (pageI == pageNo),pageClassIndex);
	}
	if (endPage < (pageTotal - 1)) {
		pagerHtml += '<a style="color:#000;">...</a>';
	}
	if (endPage < pageTotal) {
		pagerHtml += getPageBtn(pageTotal, pageTotal, false, pageClassIndex);
	}
	if (pageNo < pageTotal) {
		pagerHtml += getPageOperateBtn(Number(1 + pageNo), '下一页>>', 'next',pageClassIndex);
	} else {
		pagerHtml += '<a class="next disable">下一页>></a>';
	}
	pagerHtml += '到第<input type="text" class="page_input" id="page_input" style="width:25px;">页<input type="button" onclick="tiaozhuan(' + pageTotal + ',' + pageRows 
	if($('.total').hasClass('bgcolor')){
		pagerHtml+=','+0;
	}else if($('.good').hasClass('bgcolor')){
		pagerHtml+=','+1;
	}else if($('.middle').hasClass('bgcolor')){
		pagerHtml+=','+2;
	}else if($('.bad').hasClass('bgcolor')){
		pagerHtml+=','+3;
	}
	pagerHtml+=')" class="chaxuntu" value="确认">';
	$('#' + divId).empty().html(pagerHtml);
	var clickName = 'a[name="' + pageClassIndex + '"]';
	$(clickName).bind('click', function() {
		var pageIndex = Number($(this).attr('page'));
		if($('.total').hasClass('bgcolor')){
			execMethod(pageIndex, pageRows,0);
		}else if($('.good').hasClass('bgcolor')){
			execMethod(pageIndex, pageRows,1);
		}else if($('.middle').hasClass('bgcolor')){
			execMethod(pageIndex, pageRows,2);
		}else if($('.bad').hasClass('bgcolor')){
			execMethod(pageIndex, pageRows,3);
		}
		return false;
	});
}

function getPageBtn(pageNo, name, selected, pageClassIndex) {
	if (selected == true) {
		return '<a page="' + pageNo + '" name="' + pageClassIndex + '" href="#" style="border: 0px currentColor;" class="' + 'current' + '">' + name + '</a> ';
	} else {
		return '<a page="' + pageNo + '" name="' + pageClassIndex + '" href="#"  class="' + '' + '">' + name + '</a> ';
	}
}

function getPageOperateBtn(pageNo, name, className, pageClassIndex) {
	return '<a page="' + pageNo + '" name="' + pageClassIndex + '" href="#" class="' + className + '">' + name + '</a> ';
}

function tiaozhuan(pageTotal, pageRows,type_) {
	var input_value = document.getElementById("page_input").value;
	if ((input_value <= 0) || (input_value > pageTotal) || isNaN(input_value)) {
		alert("请输入合理的页数");
		return false;
	} else {
		execMethod(input_value, pageRows,type_);
	}
}

//客户印象
function getCommentQuantity(){
	$.ajax({
		url:rootName+'/comment/getCommentQuantity?subjectId='+productCode_pc,
		type: 'post',
		dataType: 'jsonp',
		contentType : "application/json; charset=utf-8",
		/*beforeSend: function () {
	    	jqLoading();
	    },	
	    complete: function () {
	    	jqLoading("destroy");
	    },*/
		success : function(data) {
			var tagHtml='<h3>客户印象</h3><ul class=khyx>';
			if(data!=null&&data.length>0){
				for (var i = 0; i < data.length; i++) {
					tagHtml+='<li code="'+data[i].code+'">'+data[i].name+'('+data[i].tagCount+')</li>'
				}
			}else{
				tagHtml+='<li>暂无客户印象！</li>'
			}
			tagHtml+='</ul>';
			$('.opinionCMS').html(tagHtml);
		},
		error: function(data) {
			jqLoading("destroy");
		}
	});
}

//好中差数量
function getCommentAmount(){
		$.ajax({
			url:rootName+'/comment/getCommentAmount?parentSubjectId='+productCode_pc,
			type: 'post',
			dataType: 'jsonp',
			contentType : "application/json; charset=utf-8",
			/*beforeSend: function () {
		    	jqLoading();
		    },	
		    complete: function () {
		    	jqLoading("destroy");
		    },*/
			success : function(data) {
				var commTypeHtml='<h3>评价分类</h3><ul id="commType">';
				var total=data.total;
				var good=data.good;
				var middle=data.middle;
				var bad=data.bad;
				commTypeHtml+='<li class="total"  onclick="execMethod(1,rows,0)">全部('+total+')</li>';
				commTypeHtml+='<li class="good"  onclick="execMethod(1,rows,1)">好评('+good+')</li>';
				commTypeHtml+='<li class="middle"  onclick="execMethod(1,rows,2)">中评('+middle+')</li>';
				commTypeHtml+='<li class="bad"  onclick="execMethod(1,rows,3)">差评('+bad+')</li></ul>';
				$('.commType').html(commTypeHtml);
				$('.total').addClass('bgcolor');
			},
			error: function(data) {
				jqLoading("destroy");
			}
		});
}