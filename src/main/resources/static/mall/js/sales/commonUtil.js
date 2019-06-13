/**
 * 在本页面直接跳转到登陆页面
 * @param url 登录后要跳转的页面url路径
 */
function redirectToLogin(a2loginUrl,url){
	/**
	 * 如果有#mdf，退出登录会报错
	 */
	if(url.indexOf('#mdf')>0){
		url = url.replace('#mdf1','').replace('#mdf2','');
	}
	var linkUrl = a2loginUrl+"?redirect=";
	location.href = linkUrl + encodeURIComponent(url);
}
/**
 * 
 * 数据加载弹出层设置
 * 
 */
function popLoadingCfg(){//alert("pop");
	//弹层配置	
	var pagewidth=$(window).width();
	var boxwidth=$(".loading_box").width();
	var boxl=(pagewidth - boxwidth)/2;
	var pageheight=$(window).height();
	var boxheight=$(".loading_box").height();
	var boxt=(pageheight - boxheight)/2;
	var scrollt=$(document).scrollTop();
	var cunnentt=boxt+scrollt;
	$('.loading_box').css({"left":boxl+"px","top":boxt+"px"});
	$('#overlay').css({"height":$(document).height()+"px"});
	
}
/**
 * 
 * 弹出提示消息窗口
 * 
 * @param width   窗口宽
 * @param height  窗口高
 * @param type    提示类型: m_error 错误消息,m_correct 对勾消息
 * @param msg     提示内容
 * 
 */
function popupMessage(width, height, type, msg){
	$.XYTipsWindow({
		___title    : "信息提示",
		___content  : "text:<div class='message_text'><span class='" + type + "'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
		___width    : width,
		___height   : "100",
		___drag     : "___boxTitle",
		___showbg   : true,
		___button   : ["确 定"],
	    ___callback:function(){			
		}
	});
}
/**
 * 
 * 显示数据加载弹出层
 * 
 */
function showLoading(){ 
	popLoadingCfg();
	if (($.browser.msie) && ($.browser.version == "6.0")){
		pagewidth=$(window).width();
		boxwidth=$(".loading_box").width();
		boxl=(pagewidth - boxwidth)/2;
		pageheight=$(window).height();
		boxheight=$(".loading_box").height();
		boxt=(pageheight - boxheight)/2;
		scrollt=$(document).scrollTop();
		cunnentt=boxt+scrollt;
		$('.loading_box').css({"left":boxl+"px","top":cunnentt+"px"});
		$('#overlay').css({"height":$(document).height()+"px"});
	}
	$('#overlay').fadeIn('fast');$('.loading_box').css({"background":"url(../../images/lifesales/common/overlay.png) no-repeat"});
	$('#loading_box').show();
}

/**
 * 
 * 隐藏数据加载弹出层
 * 
 */
function hiddenLoading(){
	setTimeout(function(){ $('#loading_box').hide();$('#overlay').fadeOut('fast');}, 0);
}
$(function(){
	//浮动功能块
	$("#float_box").float({
		delay : 500,//延迟
		position:"rrm" //位置
	});
	$(".float_box").hover(function(){
	$(".float_list dt").stop().animate({width:"108px"});
	},function(){
	$(".float_list dt").stop().animate({width:"32px"});	
	$(".float_list dd").eq(0).slideUp("fast");
	});	
	$(".float_list dt").eq(0).click(function(){
	$(this).next("dd").slideToggle("fast");
	});	
	$(".slideup a").click(function(){
	$(".float_list dd").eq(0).slideUp("fast");
	});		
	$("#back-to-top").click(function(){$('body,html').animate({scrollTop:0},500);return false;});
	//问号提示
	$(".q_link").hover(function(){
	$(this).find(".tips_msg").fadeIn(200);
	},function(){
	$(this).find(".tips_msg").fadeOut(200);
	});	
	/*输入框focus提示效果*/
	$(".common_input,.d_input,.l_input").focus(function(){
	$(this).addClass("input_current");
	$(this).next(".tips_box").show();
	});	
	$(".common_input,.d_input,.l_input").blur(function(){
	$(this).removeClass("input_current");
	$(this).next(".tips_box").hide();
	});
	
	
	//文字移入提示
	$(".move_link").hover(function(){
		var move_top=$(this).offset().top+2;
		var move_left=$(this).offset().left+$(this).width()+10;
		$("#move_tips").show().css({left:move_left,top:move_top});
	},function(){
		$("#move_tips").hide();
	});	
	$("#move_tips").hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	});	
	
	//en提示
	$(".rel_en .en_ico").wrapInner("<span style='display:none'></span>");
	$(".rel_en .en_ico").one("mouseover",function(){$(this).append("<div class='move_tips'><em class='move_tips_ico'></em>"+$(this).text()+"</div>");});
	$(".rel_en .en_ico").hover(function(){
	$(this).parent(".rel_en").find(".move_tips").fadeIn(50);
	},function(){
	$(this).parent(".rel_en").find(".move_tips").fadeOut(50);
	});
	
	
	//列选中
	/*$(".common_table2 th input").live("click",
		function(){
			var p_class=$(this).parents("th").attr('class');
		$(this).parents(".common_table2").find("."+p_class).siblings().removeClass("w_col_current").parents(".common_table2").find("."+p_class).addClass("w_col_current");
	});	*/
	//暂存
	$('#temporary').click(function(){
		temporary();
	});

	/*折叠展开*/
	$(".common_nav a.under_link").click(function(){
	    if($(this).html() == "收起") {
			$(this).html("展开").removeClass("up_link");
			$(this).parent("h3.common_nav").siblings(".content_box").hide();
		}else {
			$(this).html("收起").addClass("up_link");
			$(this).parent("h3.common_nav").siblings(".content_box").show();
		}
	});
	
	//必填输入校验
	jQuery.validator.addMethod("required", function(value, element) {
		var flag = true;
		var productCode = $("#productCode").val(); 

		if(jQuery.trim(value)==''){
			
			if(element.name=='insu_fullName'||element.name=='insured_fullName'){
				$.validator.messages['required']="您好！请填写被保险人姓名";						
			}else if(element.name=='insu_idNumber'||element.name=='beneficiary_idNumber'||element.name=='idType'||element.name=='insured_idNumber'
				||element.name=='idNumber' || element.name=='servicerNo'){
				$.validator.messages['required']="您好！请填写证件号码";				
			}else if(element.name=='appl_first_occupation'||element.name=='appl_second_occupation'||element.name=='appl_occupationClass'
				||element.name=='insu_first_occupation'||element.name=='insu_second_occupation'||element.name=='insu_occupationClass'){
				$.validator.messages['required']="您好！请选择职业";				
			}else if(element.name=='appl_province'||element.name=='appl_city'){
				$.validator.messages['required']="请选择投保地区";	
			}else if(element.name=='appl_fullName'){
				$.validator.messages['required']="您好！请填写投保人姓名";	
			}else if(element.name=='appl_idNumber'){
				$.validator.messages['required']="您好！请填写证件号码";	
			}else if(element.name=='appl_address'||element.name=='insu_address'){
				$.validator.messages['required']="通讯地址不得少于6个字";				
			}else if(element.name=='appl_postcode'||element.name=='insu_postcode'){
				$.validator.messages['required']="您好！邮政编码格式有误，请重新输入";				
			}else if(element.name=='appl_phoneNumber'||element.name=='insu_phoneNumber'){
				$.validator.messages['required']="您好！请填写手机号码";				
			}else if(element.name=='appl_email'||element.name=='insu_email'||element.name=='email'||element.name=='insured_email'){
				$.validator.messages['required']="您好！请填写电子邮箱";				
			}else if(element.name=='beneficiary_fullName'){
				$.validator.messages['required']="请填写受益人姓名";				
			}else if(element.name=='beneficiary_birthDate'){
				$.validator.messages['required']="请填写受益人出生日期";				
			}else if(element.name=='beneficiary_beneficiaryRelatedToInsuredval' || element.name=='a2RelatedToInsured'){
				if(productCode == '13841100'){
					$.validator.messages['required']="请填写受益人类型";	
				}else{
					$.validator.messages['required']="请选择与被保人的关系";	
				}
			}else if(element.name=='cityName'||element.name=='insured_cityName'){
				$.validator.messages['required']="您好！请选择所在区域";
			}else if(element.name=='housekeeper_cityName'){
				$.validator.messages['required']="您好！请选择户籍所在地";
			}else if(element.name=='province'){
				$.validator.messages['required']="请选择所在省份";				
			}else if(element.name=='city'){
				$.validator.messages['required']="请选择所在市";				
			}else if(element.name=='flightNumber'){
				$.validator.messages['required']="您好！请填写航班号";				
			}else if(element.name=='tuangouma'){
				$.validator.messages['required']="请填写团购码";				
			}else if(element.name=='fullName'){
				$.validator.messages['required']="您好！请填写投保人姓名";				
			}else if(element.name=='birthDate'||element.name=='insured_birthDate'){
				$.validator.messages['required']="您好！请填写出生日期";				
			}else if(element.name=='phoneNumber'||element.name=='insured_phoneNumber'||element.name=='emergencyConTel'){
				$.validator.messages['required']="您好！请填写联系电话";				
			}else if(element.name=='address'||element.name=='insured_address'||element.name=='insured_address_asset'){
				if(productCode=='2311990000000000'||productCode=='2310990000000000'||productCode=='JWLXBX_JY'||productCode=='JWLXBX_ZG'){
					$("#addressMsg").hide();
				}
				if(productCode=='ZRX_AJZH_C'){
					$.validator.messages['required']="请填写地址信息";	
				}else{
					$.validator.messages['required']="您好！请填写联系地址";	
				}
				if(productCode == 'JTFW_JZJY_DQ' || productCode == 'JTFW_JZJY_YN'){
					$.validator.messages['required']="请填写单位名称";
				}
							
			}else if(element.name=='destination'){
				$.validator.messages['required']="您好！请选择旅游目的地";				
			}else if(element.name=='flightDate'){
				$.validator.messages['required']="请填写航班日期";				
			}else if(element.name=='beneficiary_benefitPercent'){
				$.validator.messages['required']="请填写受益比例";				
			}else if(element.name=='unitCount'){
				$.validator.messages['required']="请填写购买份数";
			}else if(element.name=='insured_nameSpell'){
				$.validator.messages['required']="您好！请填写被保人姓名拼音";
			}else if(element.name=='insured_emergencyPhoneNumber'){
				$.validator.messages['required']="您好！请填写紧急联络电话";

			}else if(element.name=='postcode' ||element.name=='insured_postcode'||element.name=='insured_postcode_asset'){

				$.validator.messages['required']="您好！请填写邮政编码";
			}else if(element.name=='servicerAddress'){
				$.validator.messages['required']="您好！请填写家政服务家庭地址";
			}else if(element.name=='petName'){
				$.validator.messages['required']="请填写宠物犬名称";
			}else if(element.name=='petType'){
				$("#petTypeMsg").hide();
				$.validator.messages['required']="请填写宠物犬种类";
			}else if(element.name=='petCheckNum'){
				$.validator.messages['required']="请填写养犬登记证号";
			}else if(element.name=='petImmuno'){
				$.validator.messages['required']="请填写动物健康免疫证号";
			}else if(element.name=='destinationName'){	
				if(productCode=='2101740000000000'||productCode=='2101750000000000' ||productCode=='GDYH_LYYW_JN'){
					$("#destinationNameMsg").hide();
				}				
				$.validator.messages['required']="您好！请填写旅游目的地";
			}else if(element.name=='invoice_name'){
				$.validator.messages['required']="您好！请填写姓名";
			}else if(element.name=='invoice_postcode'){
				$.validator.messages['required']="您好！请填写邮编";
			}else if(element.name=='invoice_address'){
				$.validator.messages['required']="您好！请填写地址";
			}else if(element.name=='beneficiary_sequence'){
				$.validator.messages['required']="请选择受益顺序";
			}else if(element.name=='feeAccNoInit'){
				$.validator.messages['required']="请填写银行账号";
			}else if(element.name=='feeAccNo'){
				$.validator.messages['required']="请再次填写银行账号";
			}else if(element.name=='emergencyConPerson'){
				$.validator.messages['required']="请填写紧急联络人姓名"; 
			}else if(element.name=='emergencyConAction'){
				$.validator.messages['required']="请选择紧急联络人与投保人的关系";
			}else if(element.name=='bankAccounts'){
				$.validator.messages['required']="请填写收款账号";
			}else if(element.name=='bankProvence'){
				$.validator.messages['required']="请选择收款账户省份";
			}else if(element.name=='bankCity'){
				$.validator.messages['required']="请选择收款账户城市";
			}else if(element.name=='openingBank'){
				$.validator.messages['required']="请选择开户行";
			}else if(element.name=='bankName'){
				$.validator.messages['required']="请选择银行名称";
			}else if(element.name=='insured_estateAddress'){
				$.validator.messages['required']="您好！请填写保险财产地址";
			}else if(element.name=='expressPerson'){
				$.validator.messages['required']="请填写快递联系人";
			}else if(element.name=='expressPhone'){
				$.validator.messages['required']="请填写快递联系人电话";
			}else if(element.name=='expressAddress'){
				$.validator.messages['required']="请填写快递联系地址";
				if(productCode == 'JTFW_JZJY_DQ' || productCode == 'JTFW_JZJY_YN'){
					$.validator.messages['required']="请填写发票快递地址";
				}
			}else if(element.name=='travelSigningClub'){
				$.validator.messages['required']="请填写签约旅行社";
			}else if(element.name=='groupIssueDate'){
				$.validator.messages['required']="请填写出团日期";
			}if(productCode=='13081500'){
				$.validator.messages['required']="必填字段";			
			}else{				
				$.validator.messages['required']="您好！标示红色*的为必填字段，请输入相应内容";
			}				
			flag = false ;			
		}else{			
			if((productCode=='2311990000000000'||productCode=='2310990000000000'||productCode=='JWLXBX_JY'||productCode=='JWLXBX_ZG')&&element.name=='address'){
				if(addressLength(value)){
					$("#addressMsg").show();
				}else{
					$("#addressMsg").hide();
				}
			}
			if((productCode=='2101740000000000'||productCode=='2101750000000000' ||productCode=='GDYH_LYYW_JN')&&element.name=='destinationName'){
				$("#destinationNameMsg").show();
			}			
		}
		return flag;
	});
	
	//验证地址位数
	jQuery.validator.addMethod("addressLength",function(value,element){
		var productCode = $("#productCode").val(); 
		if(productCode=='2311990000000000'||productCode=='2310990000000000'||productCode=='JWLXBX_JY'||productCode=='JWLXBX_ZG'){
			if(addressLength(value)){
				$("#addressMsg").show();
			}else{
				$("#addressMsg").hide();
			}
		}
		return this.optional(element) || addressLength(value);
	},"您好！联系地址格式填写有误，请重新输入");	
	//验证财产地址位数
	jQuery.validator.addMethod("estateAddressLength",function(value,element){
		return this.optional(element) || addressLength(value);
	},"您好！财产地址不得少于6位,且不能包含超过2个以上连续的空格，请重新输入");	
	
	//保险财产地址位数校验
	jQuery.validator.addMethod("insurancePropertyAddr",function(value,element){
		return this.optional(element) || addressLength(value);
	},"您好！地址信息不得少于6位,且不能包含超过2个以上连续的空格，请重新输入");	
	
	//对邮箱进行校验
	jQuery.validator.addMethod("email",function(value,element){
		return this.optional(element) || checkEmail(value);
	},"您好！电子邮箱格式有误，请重新输入");

	jQuery.validator.addMethod("destinationNameCn",function(value,element){
		var pattern = /^([a-zA-Z\u4e00-\u9fa5\s]+)$/g;
		var flag = pattern.test(value);
			return flag&&getByteLength(value)<=30;
	},"旅游目的地只能含汉字、字母、空格，最多为30个字符");
	
	jQuery.validator.addMethod("startDate",function(value,element){
		var inceptionDate = $("#inceptionDate").val();
		var plannedEndDate = $("#plannedEndDate").val();
		var flag=true;
		if(inceptionDate > plannedEndDate){
			flag= false}
		return flag;
	},"保险起期必须早于保险止期");
	
	//获取输入框字节数
	function getByteLength(value){
		var len = 0;
		var ary = value.split('');
		for(var i = 0;i<ary.length;i++){
			if(ary[i].match(/[^\x00-\xff]/ig)!=null)
				len+=2;
			else
				len+=1;
		}
		return len;
	}
	// 产险（家政责任）姓名校验
	jQuery.validator.addMethod("travelAppNameCheck",function(value,element){
		var handleValue = value.replace("(","").replace(")","").replace("（","").replace("）","");
		var pattern = /^([a-zA-Z\u4e00-\u9fa5\s]+)$/g;
		var flag = pattern.test(handleValue);
			return flag&&getByteLength(handleValue)<=100;
	},"旅行社名称只能含汉字、字母、空格，最多为100个字符");
	//验证邮编
	jQuery.validator.addMethod("postalCode",function(value,element){
		return this.optional(element) || isPostalCode(value);
	},"您好！邮政编码格式有误，请重新输入");
	//银行账号
	jQuery.validator.addMethod("bankAccounts",function(value,element){
		return this.optional(element) || isBankAccount(value);
	},"银行账号格式有误,应为16~25位数字");
	//对姓名进行校验
	//调用公用的姓名校验方法
	jQuery.validator.addMethod("correctName",function(value,element){
		var valueName = "";
		if(element.name=="insu_fullName"){			
			valueName = "被保险人";
		}else if(element.name=="beneficiary_fullName"){			
			valueName = "受益人";
		}
		var msg = checkCorrectName(value);
		var flag = msg?false:true;
		if(msg){
			$.validator.messages['correctName']=valueName + msg;
		}
		return this.optional(element) || flag;
	},null);
	//保险财产地区
	jQuery.validator.addMethod("insured_cityName_asset",function(value,element){
		var flag = true;
		if(!$("#insured_province_asset").val()){
			flag = false;
		}
		return flag;
	},"您好！地区有误，请核对后重新输入");

	//省市二级联动
	$('.findCity').change(function(){
		var province = $(this).find('option:selected').attr('codedetailid');
		var twolinkage = $(this).attr('twolinkage');
	    var options = "<option value=''>请选择</option>";
	    if($(this).val() == ''){
	    	$('#'+twolinkage).empty();
	    	$('#'+twolinkage).append(options);
	    }else{
	    	if(province != ''){
				$.ajax({
		    		url : '../code/findCity',
		    		type : 'post',
		    		data : {province : province},
		    		dataType : 'json',
		    		success : function(data){
		    			if(data != null){
		    				if(theCity != ""){
		    					for(var i=0;i<data.length;i++){
		    						if(data[i].kind == theCity){
		    							options += "<option value="+data[i].kind+" selected>"+data[i].name+"</option>";
		    						}else{
		    							options += "<option value="+data[i].kind+">"+data[i].name+"</option>";
		    						}				    				
				    			}
		    				}else{
		    					for(var i=0;i<data.length;i++){
				    				options += "<option value="+data[i].kind+">"+data[i].name+"</option>";
				    			}
		    				}
		    			}
		    			$('#'+twolinkage).html(options);
		    		}
		    	});
			}else{
				$('#'+twolinkage).html(options);
			}
	    }

	});
		
});

var temporary = function(){
	
	var productCode = $("#productCode").val();
	var formV = $('#premiums_form').serialize();
	var url = "temporary";
	if("E_LYRSYWSHX_AXY"==productCode||"JTSC_DQJTRYX"==productCode ||"JTSC_JAXJRYX"==productCode){
		url = "jtsctemporary";		
		if($("#premiums_form").validate().form()){
			
			if($("#bbr_list").find("tr").length < 2 && "JTSC_JAXJRYX"!=productCode){
				$.XYTipsWindow({
					___title:"信息提示",
					___content:"text:<div class='message_text'><span class='m_tips'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>您好！请添加被保险人信息</td></tr></table></div>",
					___width:"360",
					___height:"100",
					___drag:"___boxTitle",
					___showbg:true,
					___button:["确 定"]
				});
				
				// 如果表单校验不合格，返回锚点
				location.hash = "mdf2";
				return;
				
			}			
		}else{
			// 如果表单校验不合格，返回锚点
			location.hash = "mdf2";	
			return false;
		}
	}
	showLoading();
	$.ajax({
		url : url,
		type : "post",
		data : formV,
		dataType : 'json',
		success : function(data){
			hiddenLoading();

			if(data.resultCode == 1){
				$('#orderId').val(data.orderId);
				popupMessage(360, 100, "m_correct", "暂存成功!");
			}else if(data.resultCode == -1){
				//var tempUrl = documentUrl;
				//popupMessage(360, 100, "m_error", "请<a href='javascript:redirectToLogin(a2loginUrl,documentUrl)'><font color='red'>登录</font></a>后再试!");
				$.XYTipsWindow({
					___showTitle :false,
					___width:"400",//弹层宽
					___height:"450",//弹层高
					___content:"id:dlzc_pop",//弹层id
					___showbg:true
				});
				quickLoginInit();
			}else{
				popupMessage(360, 100, "m_error", "暂存失败!");
			}
		},
		error : function(){alert(data);
			hiddenLoading();
		}
	});
	//添加页面监控代码
	var productCode = $("#productCode").val(); 
	var productTypeId = $('#productTypeId').val();
	if(productTypeId == 2){
		productCode = productCode+"_"+$("#productSerialNo").val();
	}
	
	var s=s_gi(s_account); 
	s.linkTrackVars="events,products,eVar25"; 
	s.linkTrackEvents="event9"; 
	s.products=";"+productCode; 
	s.eVar25="暂存|"+$('#pageStepName').val();
	s.events='event9'; 
	s.tl(this,'o','save');
}

var theCity = "";
/*
 * 验证地址位数
 */
function addressLength(address){
	if(jQuery.trim(address).length >= 6){
		var reg = /(^\s{2,})|(\s{2,}$)|(\s{2,})/g;
		return !reg.test(address);
	}else{
		return false;
	}	
}
/**
 * 校验email
 * 
 * @param email
 * @return true or false
*/
function checkEmail(email){ 
	 var s = email; 
	 var pattern = /^([a-zA-Z0-9_\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	 if(!pattern.exec(s)){
	     return false;
	 }else{
		 return true;
	 }     
}
/**
* 校验国内邮编
* 
* @param zipCode
* @return true or false
*/
function isPostalCode(zipCode){
	 var s = zipCode; 
	 var pattern = /^[0-9]{6}$/;
	 if(!pattern.test(s)){
	     return false;
	 }else{
		 return true;
	 }
}
/**
* 校验银行账号
* 
* @param bankAccount
* @return true or false
*/
function isBankAccount(bankAccount){
	 var s = bankAccount; 
	 var pattern = /^[0-9]{16,25}$/;
	 if(!pattern.test(s)){
	     return false;
	 }else{
		 return true;
	 }
}
/**
 * 通过身份证判断是男是女
 * 
 * @param idCard
 *            15/18位身份证号码
 * @return ‘FEMALE’- 女、’MALE’-男
*/  
function maleOrFemalByIdCard(idCard) {   
	idCard = $.trim(idCard.replace(/ /g, ""));// 对身份证号码做处理。包括字符间有空格。   
	if (idCard.length == 15) {
		if (idCard.substring(14, 15) % 2 == 0) {
			return 'FEMALE';
		} else {
			return 'MALE';
		}
	} else if (idCard.length == 18) {
		if (idCard.substring(14, 17) % 2 == 0) {
			return 'FEMALE'; 
		} else {
			return 'MALE';
		}
	} else {
		return null;
	}
}

/**
 * 验证组织机构代码
 * @param {Object} code
 */
function checkGroupCard(code){
	var ws = [3, 7, 9, 10, 5, 8, 4, 2];
	var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	//系统包括：车险承保、人意险、CIBS和ECIF,调整组织机构代码证号码的校验规则，允许不带"-"
	//var reg = /^([0-9A-Z]){8}-[0-9|X]$/;
	var reg = /^([0-9A-Z]){8}[-]{0,1}[0-9|X]$/;

	if(code==null||code==""){
		return false;
	}
	//例外代码 对应XXXXXXXX-X不做校验 XXXXXXXXX
	if(code=="XXXXXXXX-X" || code =="XXXXXXXXX"){
		return true;
	}
	if (!reg.test(code)) {
		return false;
	}
	var sum = 0;
	for (var i = 0; i < 8; i++) {
	   sum += str.indexOf(code.charAt(i)) * ws[i];
	}
	var c9 = 11 - (sum % 11);
	if (11 == c9) {   
		c9 = "0";   
	} else if (10 == c9) {   
		c9 = "X";   
	}

	if(code.length == 10){
		return c9 == code.charAt(9);
	}else if(code.length == 9){
		return c9 == code.charAt(8);
	}
}
/**
 * 校验身份证
 * 
 * @param idCard
 *            15/18位身份证号码
 * @return true：正确
 */ 
function checkIdCard(idcard){
	var Y, JYM;
	var S, M;
	var idcard_array = new Array();
	idcard_array = idcard.split("");
	
	/*身份号码位数及格式检验*/
	switch (idcard.length) {
		//15位身份号码检测
		/*case 15:
			if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
			} else {
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
			}
			if (ereg.test(idcard)) {
				return true; //15位验证通过
			} else {
				return false;
			}
			break;*/
		case 18:
			//18位身份号码检测
			//出生日期的合法性检查
			//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
			//平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
			ereg = /^[1-9][0-7]\d{4}((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229))\d{3}(\d|X|x)?$/;
			if (ereg.test(idcard)) {//测试出生日期的合法性
				//计算校验位
				var S = (parseInt(idcard.charAt(0)) + parseInt(idcard.charAt(10))) * 7 +
				(parseInt(idcard.charAt(1)) + parseInt(idcard.charAt(11))) * 9 +
				(parseInt(idcard.charAt(2)) + parseInt(idcard.charAt(12))) * 10 +
				(parseInt(idcard.charAt(3)) + parseInt(idcard.charAt(13))) * 5 +
				(parseInt(idcard.charAt(4)) + parseInt(idcard.charAt(14))) * 8 +
				(parseInt(idcard.charAt(5)) + parseInt(idcard.charAt(15))) * 4 +
				(parseInt(idcard.charAt(6)) + parseInt(idcard.charAt(16))) * 2 +
				parseInt(idcard.charAt(7)) * 1 +
				parseInt(idcard.charAt(8)) * 6 +
				parseInt(idcard.charAt(9)) * 3;
				Y = S % 11;
				M = "F";
				JYM = "10X98765432";
				M = JYM.substr(Y, 1);
				/*判断校验位*/
				if (M == idcard.charAt(17).toUpperCase()) {
					return true;
				/*检测ID的校验位false;*/
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		default:
			return false;	
	}
}
/**
 * 确认投保页面修改弹出提示信息
 */

function alertMessConfirmModify(mess,action){
	$.XYTipsWindow({
		___title:"信息提示",
		___content:"text:<div class='message_text'><span class='m_tips'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>"+mess+"</td></tr></table></div>",
		___width:"360",
		___height:"100",
		___drag:"___boxTitle",
		___showbg:true,
		___button:["确 定","取 消"],
	    ___callback:function(val){
	    	if(val=='确 定'){
		        $('#premiums_form').attr("action",action);	
				$('#premiums_form').submit();
		    	return true;	    			    		
	    	}else{
	    		return false;
	    	}

		}		
	});
}

/**
 * 弹错错误信息
 */

function alertErroMsg(msg){
	$.XYTipsWindow({
		___title:"信息提示",
		___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
		___width:"360",
		___height:"100",
		___drag:"___boxTitle",
		___showbg:true,
		___button:["确 定"],
	    ___callback:function(){
	    	return;
		}
	});	
}


/**
 * 弹出提示信息
 */
function alertMess(mess){
	$.XYTipsWindow({
		___title:"信息提示",
		___content:"text:<div class='message_text'><span class='m_tips'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>"+mess+"</td></tr></table></div>",
		___width:"360",
		___height:"100",
		___drag:"___boxTitle",
		___showbg:true,
		___button:["确 定"]
	});
}

/**
 * 
 * 增加日期
 * 
 * @param type
 * @param number
 * @param date
 * @returns
 * 
 */
function dateAdd(type, number, startDate){
    var result = "";
    startDate = startDate.replace(/-/g, "/");
    var theDate = new Date(Date.parse(startDate));
    switch(type){
	  case 'y' :
		theDate.setFullYear(theDate.getFullYear() + number);
		break;
	  case 'm' :
		theDate.setMonth(theDate.getMonth() + number);
		break;
	  case 'd' :
		theDate.setDate(theDate.getDate() + number);
		break;
	  default : break;
	}
	
	theDate.setDate(theDate.getDate() - 1);
	var theYear = theDate.getFullYear();
	var theMonth = theDate.getMonth() + 1;
	var theDay = theDate.getDate();
	
	if(theMonth < 10) theMonth = "0" + theMonth;
	if(theDay < 10) theDay = "0" + theDay;
	
	result = theYear + "-" + theMonth + "-" + theDay;
	return result;
}

function fntrimspace(str)//去除首尾空格函数
{
   while(str.substring(0,1)==" ")
   {
    str=str.substring(1);
   }
   while(str.substring(str.length-1)==" ")
   {
    str=str.substring(0,str.length-1);
   }
   return str;
}
/**
 * 系统错误的omniture方法
 * @param errorCode
 */
function monitorError(errorCode){
	var s=s_gi(s_account);  
	s.linkTrackVars="prop1,prop2,events,eVar28";  
	s.linkTrackEvents='event41';  
	s.eVar28= errorCode;    //记录 error code的编号 
	s.prop1="流程错误";          //记录大类名称 
	s.prop2="流程错误:非车";     //记录大类下的板块错误名称 
	s.events="event41"; 
	s.tl(this,'o','process_error');
}