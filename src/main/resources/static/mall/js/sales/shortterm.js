$(function(){
	/***************************************************************************
	 * * JQuery缺省错误提示信息汉化 * *
	 **************************************************************************/
	var cnmsg = {
	    required: "您好！标示红色*的为必填字段，请输入相应内容"
	};
	// 启用中文错误信息
	jQuery.extend(jQuery.validator.messages, cnmsg);
	
	/***************************************************************************
	 * * 下一步按钮点击事件定义 * *
	 **************************************************************************/
	// 先加载一次保险基本信息表单校验
	$("#premiums_form").validate();	
	$("#addInsured_form").validate();


	// 下一步提交表单
	$("#nextButton").bind("click",function(){
		if($("#premiums_form").validate().form()){
			// 车辆行驶城市 填充中文名
			if($("#auto_city").val != '')$('#auto_cityName').val($('#auto_city option:selected').text());
			// 车险保单号输错则不允许提交
			if($("#productCode").val() == 'LJRS_JAX' || $("#productCode").val() == 'LJRS_JAJ' || $("#productCode").val() == 'LJRS_JSY'){
				if($("#AutoOrderNo").val() != '' && $("#drivingCostomType").val()=='0' ){
					location.hash = "mdf1";
				}else{
					showLoading();
					$("#premiums_form").submit();
				}
			}else if($("#productCode").val()=='GDYH_JZGY'||$("#productCode").val()=='11075700'){
				var IdCard = $("#servicerNo").val(); 
			    var birthDate =ageByIdCard(IdCard); ;
			    var Age=getAgeByBirthDate(birthDate);
			  
			    if(parseInt(Age)>65 || parseInt(Age)<18){
					alertErroMsg("您好！家政人员年龄：18（含）—65（含）周岁，请核对后重新输入");					
								return false;
//			    	flag = false;
//					$.validator.messages['insuredCount']="家政人员年龄：18（含）—65（含）周岁";
			}
			     
			    showLoading();
				$("#premiums_form").submit();
		}
			
			else if($("#productCode").val() == 'GRYWX' ){
				if($("#s_occupationalType").val()==''){
					location.hash = "mdf1";	
					alertErroMsg("您好！该职业暂不支持投保，请致电热线10108888-2咨询");
				}else{
					showLoading();
					$("#premiums_form").submit();
				}				
			}else if($("#productCode").val() == 'YIYUAN' ){
				// 超值旅游 旅游目的地境内 境外
				if(fntrimspace($("#Insured_destination1").val())=='' &&fntrimspace($("#Insured_destination0").val())==''){
					$("#Insured_destination1").val("");
					$("#Insured_destination0").val("");
					location.hash = "mdf1";	
					alertErroMsg("您好！请填写旅游目的地");
				}else if(fntrimspace($("#Insured_destination1").val())!='' &&fntrimspace($("#Insured_destination0").val())!=''){
					location.hash = "mdf1";	
					alertErroMsg("您好！旅游目的地只能填一项");										
				}else{
					$("#destinationName").val($("#Insured_destination1").val()+"#"+$("#Insured_destination0").val());
					showLoading();
					$("#premiums_form").submit();
				}				
			}else if($("#productCode").val() == 'CYTX_LYYWX'  ){
				
				if(!checkDays()){
					return;
				}else{
					if(fntrimspace($("#Insured_destination1").val())=='' &&fntrimspace($("#Insured_destination0").val())==''){
						$("#Insured_destination1").val("");
						$("#Insured_destination0").val("");
						location.hash = "mdf1";	
						alertErroMsg("您好！请填写旅游目的地");
					}else{
						$("#destinationName").val($("#Insured_destination1").val()+"|"+$("#Insured_destination0").val());
						showLoading();
						$("#premiums_form").submit();
					}
				}
				
			}else if($("#productCode").val() == 'CYTX_LYYWX_TD' ){
				if(!checkDays()){
					return;
				}else{
					showLoading();
					$("#premiums_form").submit();
				}
				
			}else if($("#productCode").val() == 'LM_LYAQRYX'){
				var inceptionDate = $("#inceptionDate").val();
				var plannedEndDate = $("#plannedEndDate").val();
				if(inceptionDate > plannedEndDate){
					alertErroMsg("保险起期必须早于保险止期！");
					return;
				}
				if(fntrimspace($("#Insured_destination1").val())=='' &&fntrimspace($("#Insured_destination0").val())==''){
					$("#Insured_destination1").val("");
					$("#Insured_destination0").val("");
					location.hash = "mdf1";	
					alertErroMsg("您好！请填写旅游目的地");
				}else{
					if($("#Insured_destination0").val() && $("#Insured_destination1").val()){
						$("#destinationName").val($("#Insured_destination1").val()+"|"+$("#Insured_destination0").val());
					}else if($("#Insured_destination0").val()){
						$("#destinationName").val($("#Insured_destination0").val());
					}else if($("#Insured_destination1").val()){
						$("#destinationName").val($("#Insured_destination1").val());
					}
					$("#tourSchedule").val("上海-"+$("#destinationName").val());
					showLoading();
					$("#premiums_form").submit();
				}
			//易游天下境外方案
			}else if($("#productCode").val() == 'JWFA' || $("#productCode").val() == 'JWFA_TD'){
				var inceptionDate = $("#inceptionDate").val();
				var plannedEndDate = $("#plannedEndDate").val();
				if(inceptionDate > plannedEndDate){
					alertErroMsg("保险起期必须早于保险止期！");
					return;
				}
				//判断"方案四,五,六"保险期限只能在 1天到14天之间
				if($("#productSerialNo").val() == 'JWFA_planD' || $("#productSerialNo").val() == 'JWFA_planE' || $("#productSerialNo").val() == 'JWFA_planF'|| $("#productSerialNo").val() == 'JWFA_TD_planD'|| $("#productSerialNo").val() == 'JWFA_TD_planE'|| $("#productSerialNo").val() == 'JWFA_TD_planF'){
					var dateAdd7D= dateAdd('d',14,inceptionDate);
					if(plannedEndDate>dateAdd7D){
						alertErroMsg("选择方案四,方案五及方案六时保险期限不能大于14天！");
						return;
					}
				}
				if(fntrimspace($("#destinationName").val())==''){
					alertErroMsg("您好！请填写旅游目的地");
					return;
				}
				$("#tourSchedule").val("北京-"+$("#destinationName").val());
				showLoading();
				$("#premiums_form").submit();
				
			}else if($("#productCode").val() == 'GAMYYWSHX'){
				//母婴产品预产期加七天
				var plannedEndDate = $("#plannedEndDate").val();
				var GAMYYWSHX_newDate =  dateAdd('d',7,plannedEndDate);
				$("#GAMYYWSHX_newDate").val(GAMYYWSHX_newDate);
				showLoading();
				$("#premiums_form").submit();
				
			}else if($("#productCode").val() == 'LM_QZYLBX'){
				var inceptionDate = $("#inceptionDate").val();
				var plannedEndDate = $("#plannedEndDate").val();
				if(inceptionDate > plannedEndDate){
					alertErroMsg("保险起期必须早于保险止期！");
					return;
				}
				//判断保险期限只能在 7天到21天之间，或者刚好等于一年。
				var dateAdd7D= dateAdd('d',7,inceptionDate);
				if(plannedEndDate<dateAdd7D){
					alertErroMsg("保险期限最低不能少于7天！");
					return;
				}
				var dateAddYear = dateAdd('y',1,inceptionDate);
				var dateAdd21D= dateAdd('d',21,inceptionDate);
				if(fntrimspace($("#destinationName").val())==''){
					alertErroMsg("您好！请填写旅游目的地");
					return;
				}
				if(plannedEndDate>dateAdd21D&&plannedEndDate!=dateAddYear){
					alertErroMsg("保险期限只能在7到21天或一年整之间。");
					return;
				}
				$("#tourSchedule").val("上海-"+$("#destinationName").val());
				showLoading();
				$("#premiums_form").submit();
			}else if($("#productCode").val() == 'JNFA' || $("#productCode").val() == 'JNFA_TD'){
				// 易游天下 旅游目的地境内
				if(fntrimspace($("#destinationName").val())==''){
					$("#destinationName").val("");
					alertErroMsg("您好！请填写旅游目的地");
					return;
				}else{
					showLoading();
					$("#premiums_form").submit();
				}				
			}else if($("#subOtherSource").val()!=null&&$("#subOtherSource").val()!=''&&$("#subOtherSource").val().indexOf('CXWX')>-1){
		    	$("#productSerialNo").val('2305990000000022_planB');
		    	showLoading();
				$("#premiums_form").submit();
		    } 
			
			else{
				showLoading();
				$("#premiums_form").submit();
			}

		}else{
			// 如果表单校验不合格，返回锚点
			location.hash = "mdf2";
			if($("#productCode").val() == 'JWLXBX_ZG'){
				buma("'乐游人生'境外旅行救援保险(尊贵版)","保费测算","错误消息_您好！请填写旅游目的地");
			}
			
		}
		
		//神策埋点
		if($("#productCode").val() != 'LM_LYAQRYX') {
		   optionPlan();
		}
		
		return;
	});
	
	// 神策埋点
	function optionPlan(){
		var name = getProductName();
        var classification = getInsuranceClassification($("#productCode").val());
        var processType = getProcessType($("#productCode").val());
		sa.track('option_plan', {
			pageChannel:'保险超市',
		    pageChannel2:'非车',
		    InsuranceClassification:classification,
		    process_type: processType,
		    branch_name:'财产险公司',
		    productName:name,
		    productID:$("#productCode").val()
		});
	}

	//得到页面流程类别
	function getProcessType(productCode) {
       if (productCode == 'LM_QZYLBX' || productCode == 'JTFW_JZJY_YN' || productCode == 'JYBD_LYYWSHX' || 
	       productCode == 'JYBD_LYYWSHX_TD' || productCode == 'LM_LYAQRYX') {
	       return '团购产品';
	   }  else {
	       return '常规产品';
	   }
	}
	
	//得到保障分类
	function getInsuranceClassification(productCode) {
       if (productCode == 'QNWS_JYFZX' || productCode == 'QNWS_ZKX' || productCode == 'QNWS_FDX' || 
	       productCode == 'QNWS_FZXJT' || productCode == 'QNWS_JBAJDQ' || productCode == 'CWX_N' ||
	       productCode == 'THZ_ZFBX_ZK' || productCode == 'THZ_ZFBX_FD' || productCode == 'GRWYDQ' ||
           productCode == 'CWX_GRZHZJSS_DQ' || productCode == 'CWX_GRZHZJSS_YN') {
	       return '家财险';
	   } else if(productCode == '11075700' || productCode == 'JTFW_JZJY_YN') {
	       return '责任保险';
	   } else if(productCode == 'LM_QZYLBX') {
	       return '健康险';
	   }  else {
	       return '意外保险';
	   }
	}
	
	 $("#wtqr").change(function(){
			if($(this).attr("checked")){
			$(".o_btn_l").removeClass("dis_btn").attr("disabled",false);
			$(".o_btn_l").bind("click",function(){
		if($("#premiums_form").validate().form()){
			// 检查地区是否非法输入
			var pcityName=$('#cityName').val();
			var pcity=$('#city').val();
			var checkflag=checkRegion(pcityName,pcity);
			if(!checkflag){
				$.XYTipsWindow({
					___title:"信息提示",
					___content:"text:<div class='message_text'><span class='m_tips'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>您好！请正确填写所在地区</td></tr></table></div>",
					___width:"360",
					___height:"100",
					___drag:"___boxTitle",
					___showbg:true,
					___button:["确 定"]
				});
				location.hash = "mdf2";
				return;
			}
			// 非驾意人生的产品验证
			if($("#productCode").val() != 'LJRS_JAJ' && $("#productCode").val() != 'LJRS_JAX' && $("#productCode").val() != 'JTSC_JAXJRYX' && $("#productCode").val() != 'ZYX_JSYSCYWX'){
				if($("#bbr_list").find("tr").length < 2){
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
			}
					
					// 驾意人生 校验本人被保人小于70岁
					var productCode = $("#productCode").val(); 
					if(productCode=='2308990000000000'){
						if(!checkApplAge()){					
							alertErroMsg("被保人年龄有误，须小于70周岁");					
							return false;
						}				
					}
					
					if(productCode=='GRYWX'){
						if(!checkApplAgeGRYW()){					
							alertErroMsg("您好！投保人年龄有误，大于16小于65，请核对后重新输入");					
							return false;
						}				
					}
					
					if(productCode.indexOf('AFJT')>=0){
						if(!validateAge(3,70)){
							alertErroMsg("被保人年龄有误，须在3到70周岁之间");
							return false;
						}
					}
					if(productCode == 'GDYH_JZGY' || productCode == 'JTSC_JAXJRYX' || productCode == 'ZYX_JSYSCYWX'){
						if($("#applicantRelatedToMainInsured").val() == '1'){
							$("#mainInsured_fullName").val($("#fullName").val());
							$("#mainInsured_birthDate").val($("#birthDate").val());
							$("#mainInsured_idType").val($("#idType").val());
							$("#mainInsured_idNumber").val($("#idNumber").val());
							if(!checkSelfAge()){
								alertErroMsg("被保人年龄有误，须在1至70周岁之间");
								return false;
							}
						}
					}
					if(productCode == 'GDYH_LYYW_JN' ||  productCode == 'GDYH_LYYW_JW'){
						var mainInsuredAmount = $("#mainInsuredAmount").val();
						if(mainInsuredAmount=='10万'){
							if(!validateAge(1,75)){
								alertErroMsg("被保人年龄有误，须在1到75周岁之间");
								return false;
								
							}						
						}else{
							if(!validateAge(18,70)){
								alertErroMsg("被保人年龄有误，须在18到70周岁之间");	
								return false;
							}						
						}
					}
					if(productCode == 'GDYH_LYYW_JN' || productCode == 'GDYH_LYYW_JW' ){
						var mainInsuredAmount = $("#mainInsuredAmount").val();
						if(mainInsuredAmount=='10万'){
							if(!validateAge(1,75)){
								alertErroMsg("被保人年龄有误，须在1到75周岁之间");
								return false;
								
							}						
						}else{
							if(!validateAge(18,70)){
								alertErroMsg("被保人年龄有误，须在18到70周岁之间");	
								return false;
							}						
						}
					}
					
					if(productCode == 'GDYH_JAX' ){
						var productSerialNo = $("#productSerialNo").val(); 
						if(productSerialNo!='GDYH_JAX_planA'){
							if(!validateAge(18,65)){
								alertErroMsg("被保人年龄有误，须在18到65周岁之间");	
								return false;
							}
						}else{
							if(!validateAge(18,75)){
								alertErroMsg("被保人年龄有误，须在18到75周岁之间");	
								return false;
							}
						}
					}
					
					if(productCode == 'CYTX_LYYWX' ){
						var productSerialNo = $("#productSerialNo").val(); 
						if(productSerialNo=='CYTX_LYYWX_planA'||productSerialNo=='CYTX_LYYWX_planE'
						 ||productSerialNo=='CYTX_LYYWX_planK'){
							if(!validateAge(1,75)){
								alertErroMsg("被保人年龄有误，须在1到75周岁之间");	
								return false;
							}
						}else{
							if(!validateAge(18,75)){
								alertErroMsg("被保人年龄有误，须在18到75周岁之间");	
								return false;
							}
						}
					}
					
					if(productCode == 'CYTX_LYYWX_TD' ){
						var productSerialNo = $("#productSerialNo").val(); 
						if(productSerialNo=='CYTX_LVYWX_TD_planA'||productSerialNo=='CYTX_LVYWX_TD_planE'
						 ||productSerialNo=='CYTX_LVYWX_TD_planK'){
							if(!validateAge(1,75)){
								alertErroMsg("被保人年龄有误，须在1到75周岁之间");	
								return false;
							}
						}else{
							if(!validateAge(18,75)){
								alertErroMsg("被保人年龄有误，须在18到75周岁之间");	
								return false;
							}
						}
					}
					
					
					
					if(productCode.indexOf('QNWS')>=0 ){
						if(!validateAge(0,100)){
							alertErroMsg("被保人年龄有误，须在0到100周岁之间");	
							return false;
						}
					}
					
					// 一元旅游年龄
					if(productCode == 'YIYUAN' ){
						if(!validateAge(16,70)){
							alertErroMsg("您好！被保人年龄有误，须在16到70周岁之间，请核对后重新输入");	
							return false;
						}
						
						// 根据本人被保人年龄 限制份数 未成年人为1份
						var appBirthDate = $("#birthDate").val();  
						var applAge = getAgeByBirthDate(appBirthDate);
						var count = $("#app_count").val();
						
						if(parseInt(applAge)<18 && parseInt(count)>1){	
							alertErroMsg("您好！被保人为未成年人时，本产品最大购买份数为1份，请核对后重新输入");							
				    		return false;				
						}						
					}
					// validateAge
					var formV = $('#premiums_form').serialize();
					if($("#productTypeId").val() == 1){
						changeMyNextButton("none","");
					}
					// 投保人与被保人证件号是否重复
					showLoading();
					$.ajax({
						url : "compareInsuranceAndInsured",
						type : "post",
						data : formV,
						dataType : "json",
						success : function(data){
							if(data.result == 0){
								if($("#productTypeId").val() == 1){
									$.ajax({
										url : ctx+"/sale/estate/checkOrderBySelf",
										type : "post",
										dataType : "json",
										data : formV,
										success : function(data){
											if(data.result == 0){
													$("#premiums_form").submit();
											}else{
												hiddenLoading();
												$.XYTipsWindow({
													___title:"信息提示",
													___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + data.info + "</td></tr></table></div>",
													___width:"360",
													___height:"150",
													___drag:"___boxTitle",
													___showbg:true,
													___button:["确 定"],
													___callback:function(){
														changeMyNextButton("", "none");
												    	return;
													}
												});
												return ;
											}
										},
									error : function(){
										hiddenLoading();
										changeMyNextButton("","none");
										monitorError("NONCAR0010");
									}
									});
									
								}else{
									$("#premiums_form").submit();
								}
							}else{
								hiddenLoading();
								if($("#productTypeId").val() == 1){
									changeMyNextButton("","none");
								}
								alertErroMsg("您好！您的保单信息需进一步确认，请致电热线10108888-2咨询");		
								return false;
							}
						},
						error : function(){
							hiddenLoading();
							monitorError("NONCAR0010");
							if($("#productTypeId").val() == 1){
								changeMyNextButton("","none");
							}
						}
					});
				
				
		}else{
			// 如果表单校验不合格，返回锚点
			location.hash = "mdf1";
		}
		return;
	});
			}else{
            $(".o_btn_l").addClass("dis_btn").attr("disabled",true);
	        $(".o_btn_l").unbind("click"); 
			}
			});

	// 投保信息页下一步提交表单
	$("#nextButtonInfo").bind("click",function(){
		if($("#premiums_form").validate().form()){
			// 检查地区是否非法输入
			var pcityName=$('#cityName').val();
			var pcity=$('#city').val();
			var checkflag=checkRegion(pcityName,pcity);
			if(!checkflag){
				$.XYTipsWindow({
					___title:"信息提示",
					___content:"text:<div class='message_text'><span class='m_tips'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>您好！请正确填写所在地区</td></tr></table></div>",
					___width:"360",
					___height:"100",
					___drag:"___boxTitle",
					___showbg:true,
					___button:["确 定"]
				});
				location.hash = "mdf2";
				return;
			}
			// 非驾意人生的产品验证
			if($("#productCode").val() != 'LJRS_JAJ' && $("#productCode").val() != 'LJRS_JAX' && $("#productCode").val() != 'JTSC_JAXJRYX' && $("#productCode").val() != 'ZXSC_ECYB' && $("#productCode").val() != 'ZYX_JSYSCYWX'){
				if($("#bbr_list").find("tr").length < 2){
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
			}
					
					// 驾意人生 校验本人被保人小于70岁
					var productCode = $("#productCode").val(); 
					if(productCode=='2308990000000000'){
						if(!checkApplAge()){					
							alertErroMsg("被保人年龄有误，须小于70周岁");					
							return false;
						}				
					}
					if(productCode.indexOf('AFJT')>=0){
						if(!validateAge(3,70)){
							alertErroMsg("被保人年龄有误，须在3到70周岁之间");
							return false;
						}
					}
					if(productCode == 'LJRS_JAX' || productCode == 'LJRS_JAJ' ||productCode == 'GDYH_JZGY' || productCode == 'JTSC_JAXJRYX' || productCode == 'ZYX_JSYSCYWX'){
						if($("#applicantRelatedToMainInsured").val() == '1'){
							$("#mainInsured_fullName").val($("#fullName").val());
							$("#mainInsured_birthDate").val($("#birthDate").val());
							$("#mainInsured_idType").val($("#idType").val());
							$("#mainInsured_idNumber").val($("#idNumber").val());
							if(productCode!='LJRS_JAX'&& productCode != 'LJRS_JAJ'){
								if(!checkSelfAge()){
									alertErroMsg("被保人年龄有误，须在1至70周岁之间");
									return false;
								}
							}
							
						}
					}
					if(productCode == 'GDYH_LYYW_JN' ||  productCode == 'GDYH_LYYW_JW'){
						var mainInsuredAmount = $("#mainInsuredAmount").val();
						if(mainInsuredAmount=='10万'){
							if(!validateAge(1,75)){
								alertErroMsg("被保人年龄有误，须在1到75周岁之间");
								return false;
								
							}						
						}else{
							if(!validateAge(18,70)){
								alertErroMsg("被保人年龄有误，须在18到70周岁之间");	
								return false;
							}						
						}
					}
					if(productCode == 'GDYH_LYYW_JN' || productCode == 'GDYH_LYYW_JW' ){
						var mainInsuredAmount = $("#mainInsuredAmount").val();
						if(mainInsuredAmount=='10万'){
							if(!validateAge(1,75)){
								alertErroMsg("被保人年龄有误，须在1到75周岁之间");
								return false;
								
							}						
						}else{
							if(!validateAge(18,70)){
								alertErroMsg("被保人年龄有误，须在18到70周岁之间");	
								return false;
							}						
						}
					}
					
					if(productCode == 'GDYH_JAX' ){
						var productSerialNo = $("#productSerialNo").val(); 
						if(productSerialNo!='GDYH_JAX_planA'){
							if(!validateAge(18,65)){
								alertErroMsg("被保人年龄有误，须在18到65周岁之间");	
								return false;
							}
						}else{
							if(!validateAge(18,75)){
								alertErroMsg("被保人年龄有误，须在18到75周岁之间");	
								return false;
							}
						}
					}
					
					if(productCode == 'CYTX_LYYWX' ){
						var productSerialNo = $("#productSerialNo").val(); 
						if(productSerialNo=='CYTX_LYYWX_planA'||productSerialNo=='CYTX_LYYWX_planE'
						 ||productSerialNo=='CYTX_LYYWX_planK'){
							if(!validateAge(1,75)){
								alertErroMsg("被保人年龄有误，须在1到75周岁之间");	
								return false;
							}
						}else{
							if(!validateAge(18,75)){
								alertErroMsg("被保人年龄有误，须在18到75周岁之间");	
								return false;
							}
						}
					}
					
					if(productCode == 'CYTX_LYYWX_TD' ){
						var productSerialNo = $("#productSerialNo").val(); 
						if(productSerialNo=='CYTX_LVYWX_TD_planA'||productSerialNo=='CYTX_LVYWX_TD_planE'
						 ||productSerialNo=='CYTX_LVYWX_TD_planK'){
							if(!validateAge(1,75)){
								alertErroMsg("被保人年龄有误，须在1到75周岁之间");	
								return false;
							}
						}else{
							if(!validateAge(18,75)){
								alertErroMsg("被保人年龄有误，须在18到75周岁之间");	
								return false;
							}
						}
					}
					
						
					
					/*if(productCode.indexOf('QNWS')>=0 ){
						if(!validateAge(1,80)){
							alertErroMsg("被保人年龄有误，须在1到80周岁之间");	
							return false;
						}
					}
					*/
					// 一元旅游年龄
					if(productCode == 'YIYUAN' ){
						if(!validateAge(16,70)){
							alertErroMsg("您好！被保人年龄有误，须在16到70周岁之间，请核对后重新输入");	
							return false;
						}
						
						// 根据本人被保人年龄 限制份数 未成年人为1份
						var appBirthDate = $("#birthDate").val();  
						var applAge = getAgeByBirthDate(appBirthDate);
						var count = $("#app_count").val();
						if(parseInt(applAge)<18 && parseInt(count)>1){	
							alertErroMsg("您好！被保人为未成年人时，本产品最大购买份数为1份，请核对后重新输入");							
				    		return false;				
						}						
					}
					// 一元旅游年龄
					if(productCode == 'QZBXFA' ){
						
						if(parseInt($("#insured_count").val())!=1){	
							alertErroMsg("您好！本产品只能购买1份，请核对后重新输入");							
				    		return false;				
						}						
					}
					//易游天下团单被保人数至少为5人
					if(productCode == 'JNFA_TD' || productCode == 'JWFA_TD' ){
						var array = $("table[id='bbr_list']").find("tr");
						if(array.length < 6){
							alertErroMsg("被保人数至少为5人！");							
				    		return false;
						}
					}
					if(productCode=='LYX_LYFS_TD'){
						var array = $("table[id='bbr_list']").find("tr");
						if(array.length >6){
							alertErroMsg("您好！被保人数最多为5人，请核对后重新输入");							
				    		return false;
						}
					}
					//蹭网险年龄限制
					if(productCode == 'CWX_N'){
						if(!validateAge(16,100)){
							alertErroMsg("您好！被保人年龄有误，须在16到100周岁之间，请核对后重新输入");	
							return false;
						}
					}
					
					// validateAge
					var formV = $('#premiums_form').serialize();
					if($("#productTypeId").val() == 1){
						changeNextButton("none","");
					}
					// 投保人与被保人证件号是否重复
					showLoading();
					$.ajax({
						url : "compareInsuranceAndInsured",
						type : "post",
						data : formV,
						dataType : "json",
						success : function(data){
							if(data.result == 0){
								if($("#productTypeId").val() == 1){
									$.ajax({
										url : ctx+"/sale/estate/checkOrderBySelf",
										type : "post",
										dataType : "json",
										data : formV,
										success : function(data){
											if(data.result == 0){
													$("#premiums_form").submit();
											}else{
												hiddenLoading();
												$.XYTipsWindow({
													___title:"信息提示",
													___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + data.info + "</td></tr></table></div>",
													___width:"360",
													___height:"150",
													___drag:"___boxTitle",
													___showbg:true,
													___button:["确 定"],
													___callback:function(){
												    	changeNextButton("", "none");
												    	return;
													}
												});
												return ;
											}
										},
									error : function(){
										hiddenLoading();
										changeNextButton("","none");
										monitorError("NONCAR0010");
									}
									});
									
								}else{
									$("#premiums_form").submit();
								}
							}else{
								hiddenLoading();
								if($("#productTypeId").val() == 1){
									changeNextButton("","none");
								}
								alertErroMsg("您好！您的保单信息需进一步确认，请致电热线10108888-2咨询");		
								return false;
							}
						},
						error : function(){
							hiddenLoading();
							monitorError("NONCAR0010");
							if($("#productTypeId").val() == 1){
								changeNextButton("","none");
							}
						}
					});
				
				
		}else{
			// 如果表单校验不合格，返回锚点
			location.hash = "mdf1";
			if($("#productCode").val() == 'JWLXBX_ZG'){
				buma("'乐游人生'境外旅行救援保险(尊贵版)","填写投保信息","错误消息_请填写投保人姓名|请填写证件号码|请填写出生日期|请选择所在区域|请填写联系电话|请填写电子邮箱|请填写联系地址");
			}
		}
		
		// 神策埋点
		if($("#productCode").val() != 'LM_LYAQRYX') {
			fillInfo();
		}

		return;
	});
	
	// 神策埋点
	function fillInfo(){
		var name = getProductName();
		var classification = getInsuranceClassification($("#productCode").val());
		var processType = getProcessType($("#productCode").val());
		sa.track('fill_info', {
			pageChannel:'保险超市',
		    pageChannel2:'非车',
		    InsuranceClassification:classification,
		    process_type: processType,
		    branch_name:'财产险公司',
		    productName:name,
		    productID:$("#productCode").val()
		});
	}	
	
	// 交易地区是否非法输入
	function checkRegion(pcityName,pcity){
		
		var flag=true;
		$.ajax({
    		url : '../code/findExitCity',
    		type : 'post',
    		async:false,

    		data : {cityName : pcityName,city:pcity},
    		dataType : 'json',
    		success : function(data){  			
    				flag=Boolean(data);
    			
    		},
    		error : function(){
    			monitorError("NONCAR0007");
    		}
    	});
		return flag;
	}
	
	/***************************************************************************
	 * * 填写保险基本信息单校验 * *
	 **************************************************************************/
	// 保险止期根据保险起期自动生成一年后日期，并且禁止修改
    $("#plannedEndDate").focus(function(){
        // $(this).blur();
        $(this).attr("readonly", true);
    });
        
    // 保险起期不得大于当前日期
	jQuery.validator.addMethod("inceptionDate",function(value,element){
		return this.optional(element)|| compareDate(value);
	},"保险起期不能早于当前日期");

    jQuery.validator.addMethod("notHaveChinese",function(value,element){
        return (!/.*[\u4e00-\u9fa5]+.*$/.test(value))
    },"证件号码不能含有汉字");

    jQuery.validator.addMethod("junguanzheng",function(value,element){
        var reg = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,27}(号?))$/;
        return reg.test(value)
    },"军官证有误，请重新填写");

	/***************************************************************************
	 * * 填写投保信息页表单域事件处理 * *
	 **************************************************************************/
	
	
// /////////////提取的投保人和被保人的公共方法
	function initCardAndSexAndDateGroup(idCardType,sexId, cardNo, birthDay){
	// 性别默认选中男
	$("#"+sexId+" option[value='MALE']").attr("selected", "selected");
	// 清空证件号码和出生日期
	$("#" + cardNo).val("");
	if(idCardType=='1'){
		$("#" + birthDay).val("");
		$("#"+sexId).attr("disabled", "disabled");
	}else{
		$("#"+sexId).attr("disabled", "");		
	}
	
}

// 产险证件类型校验
function checkEstateIdCard(idCardType, value, flag){
	if(idCardType == "1"){
		var theCheckIdCard = checkIdCard(value);
		return flag || theCheckIdCard;
	}else{
		return true;
	}
}

//新增外国人永久居留证校验（15位，数字和字母）
function checkCivilianPostCard(value){
	var reg=/^[0-9a-zA-Z]{15}$/g;
	var re = new RegExp(reg);
	if(re.test(value)){
		return true;
	}else{
		return false;
	}
}

// ***************************************************************
		// TODO 证件类型是通过配置实现的，将来会有变化，下述代码为身份证处理代码，如配置有变化，修改此处
		// ***************************************************************

function initSexAndDateVal(idCardType, value, birthDate, gender, flag){
	if(idCardType == "1"){
        	var theCheckIdCard  = checkIdCard(value);
        	
        	// 如果是身份证，则出生日期自动获取，且禁止编辑
        	$("#" + birthDate).bind("focus", function(){
        		// $(this).blur(); //IE7下不可使用
        		$(this).attr("readonly", true);
        	});
        	
    		if(theCheckIdCard == true){
    			ageByIdCard(value);
    			
    			// 获取性别
    			var theGender = maleOrFemalByIdCard(value);
    			// 如果性别为男
    			var productCode=$("#productCode").val();
    			if(theGender == "MALE"){
    				if(productCode!='WWB_ZYYL'){
    					$("#"+ gender +" option[value='1']").attr("selected", "selected");
    					$("#"+gender).attr("disabled", "disabled");
    				}else{
    					$("#insured_genderT option[value='1']").attr("selected", "selected");
    					$("#insured_genderv").val(1);
    				}
    				$("#"+gender+"_value").val(1);
    			}else if(theGender == "FEMALE"){
    				if(productCode!='WWB_ZYYL'){
    					$("#"+ gender +" option[value='2']").attr("selected", "selected");
    					$("#"+gender).attr("disabled", "disabled");
    				}else{
    					$("#insured_genderT option[value='2']").attr("selected", "selected");
    					$("#insured_genderv").val(2);
    				}
    				$("#"+gender+"_value").val(2);
    			}else{
    				$("#"+ gender).val("");
    			}

    		    $("#"+ birthDate).val(theBirthDate);
    		    $("label[for='"+birthDate+"']").html("");
    		}else{
    			if(birthDate=="birthDate"){
					$.validator.messages['idCard']="您好！身份证号码有误，请重新输入";	
				}else{
					$.validator.messages['insured_idCard']="您好！身份证号码有误，请重新输入";
				}
    		    $("#"+ birthDate).val("");
    		}
    		// var tempDate = $("#" + birthDate).val();
			// 如果不是身份证，则出生日期可以编辑
			// $("#spe_"+ birthDate).html("<input id='"+birthDate+"'
			// name='"+birthDate+"' value='"+tempDate+"' type='text'
			// class='common_input required insuredAge' />");
        return flag || theCheckIdCard;
		} else if(idCardType == "6"){
			return checkGroupCard(value);
		}else if(idCardType == "9"){
			/*if(value.length!=15){
				if(birthDate=="birthDate"){
					$.validator.messages['idCard']="请输入正确的外国人居留证号码";	
				}else{
					$.validator.messages['insured_idCard']="请输入正确的外国人居留证号码";
				}
				flag = false;
			}else {
				flag=true;
			}*/
			var theCivilianPostCard=checkCivilianPostCard(value);
			if(theCivilianPostCard){
				flag=true;
			}else{
				if(birthDate=="birthDate"){
					$.validator.messages['idCard']="您好！外国人居留证号码有误，请重新输入";	
				}else{
					$.validator.messages['insured_idCard']="您好！外国人居留证号码有误，请重新输入";
				}
				flag = false;
			}
			return flag;
		}else{
			// var tempDate = $("#" + birthDate).val();
			// 如果不是身份证，则出生日期可以编辑
			// $("#spe_"+ birthDate).html("<input id='"+birthDate+"'
			// name='"+birthDate+"' value='"+tempDate+"' type='text'
			// class='common_input required insuredAge'
			// onfocus='WdatePicker({isShowClear:false,readOnly:true,maxDate:'"+$('#currentDate').val()+"'})'
			// />");
			//return flag;
			return true;
		}
}
	
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

	/***************************************************************************
	 * * 填写投保信息页表单域事件处理 * *
	 **************************************************************************/
	// 证件类型下拉选择框改变事件
	var idCardType = $("#idType").children('option:selected').val();
	//var idCardMessage = "请输入正确的身份证号码";
	var idCardMessage ="";
	if(idCardType=='1'){
		idCardMessage = "您好！身份证号码有误，请重新输入";
	}
    if(idCardType=='3'){
        idCardMessage = "您好！军官证有误，请重新输入";
    }
	if(idCardType=='6'){
		idCardMessage = "请输入正确的组织机构代码";
	}
	if(idCardType=='9'){
		idCardMessage = "您好！外国人居留证号码有误，请重新输入";
	}
	
	$("#idType").change(function(){
		// 获取选中的证件类型
		idCardType = $(this).children('option:selected').val();
        $("#idNumber").addClass("notHaveChinese")
        $("#idNumber").removeClass("junguanzheng")
        if (idCardType=='3'){
            $("#idNumber").removeClass("notHaveChinese")
            $("#idNumber").addClass("junguanzheng")
        }
		
		if(idCardType=='6'){
			idCardMessage = "请输入正确的组织结构代码";
		}
		if(idCardType=='1'){
			idCardMessage = "您好！身份证号码有误，请重新输入";
		}
        if(idCardType=='3'){
            idCardMessage = "您好！军官证有误，请重新输入";
        }
		if(idCardType=='9'){
			idCardMessage = "您好！外国人居留证号码有误，请重新输入";
		}
		
		initCardAndSexAndDateGroup(idCardType, "gender", "idNumber", "birthDate");
		
		// ***************************************************************
		// TODO 证件类型是通过配置实现的，将来会有变化，下述代码为身份证处理代码，如配置有变化，修改此处
		// ***************************************************************
		initSexAndDateCss(idCardType, "gender", "idNumber", "idCard", "birthDate");
		
	});	
	
	/***************************************************************************
	 * * 填写投保信息页表单校验 * *
	 **************************************************************************/
	// 家政雇佣服务人员证件校验
	jQuery.validator.addMethod("servicerIdCard",function(value,element){
		var thisObj = this.optional(element);
		idCardType = $("#servicerIdType").children('option:selected').val();
		return checkEstateIdCard(idCardType,value,thisObj);
	},idCardMessage);

	// 身份证校验
	jQuery.validator.addMethod("idCard",function(value,element){
		// ***************************************************************
		// TODO 证件类型是通过配置实现的，将来会有变化，下述代码为身份证处理代码，如配置有变化，修改此处
		// ***************************************************************
		var thisObj = this.optional(element);
		idCardType = $("#idType").children('option:selected').val();
		//alert(idCardMessage);
		return initSexAndDateVal(idCardType, value, "birthDate", "gender", thisObj);
	},idCardMessage);
	
	jQuery.validator.addMethod("insuredCount",function(value,element){
		var flag = true;
		var productCode = $("#productCode").val(); 
		if(!checkInsuredCount(value)){
			flag = false;
			$.validator.messages['insuredCount']="请输入正确的份数";						
		}
		
		// 一元超值旅游产品 份数最大值为3份
		if(productCode=='YIYUAN'&&parseInt(value)>3){
			flag = false;
			$.validator.messages['insuredCount']="您好！本产品最大购买份数为3份，请核对后重新输入";				
			
		}
		
		// 交行积分乐园 安心飞 最大份数为5
		if(productCode=='JTSC_DQJTRYX'&&parseInt(value)>5){
			flag = false;
			$.validator.messages['insuredCount']="本产品最大购买份数为5份";
			
		}	
		// 交行积分乐园 安心驾 安心游 最大份数为4
		if((productCode=='JTSC_JAXJRYX'||productCode=='E_LYRSYWSHX_AXY')&&parseInt(value)>4){
			flag = false;
			$.validator.messages['insuredCount']="本产品最大购买份数为4份";	
			
		}		
		// 安居稳赢系列产品 最大份数为1000
		if((productCode=='AJWYJCX_A'||productCode=='AJWYJCX_B'||productCode=='AJWYJCX_C')&&parseInt(value)>1000){
			flag = false;
			$.validator.messages['insuredCount']="本产品最大购买份数为1000份";
			
		}	
		
		if(($("#productSerialNo").val()).indexOf( 'JTFW_YNTTYWX_planB')>=0 && (parseInt(value)>3 || parseInt(value)<0)){
			flag = false;
			$.validator.messages['insuredCount']="请输入正确的份数";
		}
		
		return this.optional(element)|| flag;
	},null);
	
	jQuery.validator.addMethod("unitCount",function(value,element){
		var flag = true;
		var productCode = $("#productCode").val(); 
		if(!checkInsuredCount(value)){
			flag = false;
			$.validator.messages['unitCount']="请输入正确的份数";						
		}		
		// 交行积分 安心驾最大份数为4份
		if(productCode=='JTSC_JAXJRYX'&&parseInt(value)>4){
			flag = false;
			$.validator.messages['unitCount']="本产品最大购买份数为4份";				
			
		}
		
		if(flag&& productCode=='JTSC_JAXJRYX'){	
			var grossPremium = parseInt(value)*parseInt($('#unitPremium_input').val());
			$("#unitPremium").html("网销优惠价：" + parseInt(grossPremium) +"元");		
		}
		return this.optional(element)|| flag;
	},null);	
	
	// 产险（乐驾人生被保乘客不能大于核定座位数验证）
	jQuery.validator.addMethod("numberOfPassengers",function(value,element){
		return checkNumberOfPassengers(value);
	},"乘客数不应大于座位数");
	
	jQuery.validator.addMethod("domesticTravelDest",function(value,element){
		return checkDomesticTravelDest(value);
	},"请检查旅游目的地是否有误");
	
	// 产险（车牌号验证）
	jQuery.validator.addMethod("licensePlateNo",function(value,element){
		return checkLicensePlateNo(value);
	},"您好！车牌号码输入有误，请重新输入");
	
	// 产险（车类发动机号验证）
	jQuery.validator.addMethod("engineNo",function(value,element){
		return checkEngineNo(value);
	},"您好！发动机号输入有误，请重新输入");
	
	// 产险（网银无忧验证银行卡号）
	jQuery.validator.addMethod("bankCard",function(value,element){
		return checkBankCard(value);
	},"您好！银行卡号有误，请核对后重新输入");
	
	// 产险（家政责任）身份证校验
	jQuery.validator.addMethod("idCardCheck",function(value,element){
		return checkIdCard(value);
	},"您好！证件号码有误，请核对后重新输入");
	
	// 产险（家政责任）姓名校验
	jQuery.validator.addMethod("nameCheck",function(value,element){
		var pattern = /^([a-zA-Z\u4e00-\u9fa5\s]+)$/g;
		var flag = pattern.test(value);
			return flag&&getByteLength(value)<=20;
	},"您好！姓名只能含汉字、字母、空格，最多为20个字符，请核对后重新输入");
	
	
	// 驾驶证校验
	jQuery.validator.addMethod("drivingLicense",function(value,element){
		return this.optional(element) || checkIdCard(value);
	},"您好！驾驶证号码有误，请核对后重新输入");
	
	jQuery.validator.addMethod("pingyin",function(value,element){
		return this.optional(element) || checkPingYin(value);
	},"您好！姓名拼音须以英文大写拼写，以空格分隔，请核对后重新输入");
	
	jQuery.validator.addMethod("lengthCheck",function(value,element){
		var pattern = /^([a-zA-Z\u4e00-\u9fa5\s]+)$/g;
		var flag = pattern.test(value);
			return flag&&getByteLength(value)<=10;
	},"该项只能含汉字、字母、空格，最多为10个字符");
	
	// 判断投保人年龄
	/*
	 * jQuery.validator.addMethod("insuredAge",function(value,element){ return
	 * this.optional(element)|| checkBirthDateAge(value);
	 * },"年龄需大于等于18周岁小于等于64周岁");
	 */
	
	jQuery.validator.addMethod("insuredAge",function(value,element){
		var flag = true;
		var productCode = $("#productCode").val(); 
		var productTypeId = $("#productTypeId").val();
		// 区分产寿险 校验不同规则
		if(productTypeId=='2'){
			if(productCode == 'QLG102' && element.name == 'insured_birthDate'){
				var betweenYear = 0;
				var theDateArr = value.split("-");
				var theCurrentDate = $("#currentDate").val();
				var theCurrentDateArr = theCurrentDate.split("-");

				betweenYear = parseInt(theCurrentDateArr[0],10) - parseInt(theDateArr[0],10);
				if(betweenYear > 0){
					if(parseInt(theCurrentDateArr[1],10) < parseInt(theDateArr[1],10)){
						betweenYear--;
					}else if(parseInt(theCurrentDateArr[1],10) == parseInt(theDateArr[1],10)){
						if(parseInt(theCurrentDateArr[2],10) < parseInt(theDateArr[2],10)){
							betweenYear--;
						}
					}
					if(betweenYear > 90){
						flag = false;
						$.validator.messages['insuredAge']="被保人年龄需出生满30天至90周岁";
					}
				}
				if(betweenYear == 0){
					var nowDate = new Date(theCurrentDateArr[0],theCurrentDateArr[1],theCurrentDateArr[2]);
					var oldDate = new Date(theDateArr[0],theDateArr[1],theDateArr[2]);
					if(Math.floor((nowDate-oldDate)/86400000) < 30){
						flag = false;
						$.validator.messages['insuredAge']="被保人年龄需出生满30天至90周岁";
					}
				}
			}else{
				if(!checkBirthDateAge(value)){
					flag = false;
					$.validator.messages['insuredAge']="年龄需大于等于18周岁小于等于64周岁";				
				}
			}		
		}else if(productTypeId=='1'){
			var age = getAgeByBirthDate(value);		
			if(element.name == 'birthDate'){
				if(parseInt(age) < 0){
					flag = false;
					$.validator.messages['insuredAge'] = "投保人年龄有误，请重输";
				}
				if(productCode == '2309990000000039'){
					if(parseInt(age)<16 || parseInt(age)>100){
						flag = false;
						$.validator.messages['insuredAge']="投保人年龄需在16到100周岁之间";
					}
				}else if(productCode == 'GRYWX'){
					if(parseInt(age)<16 || parseInt(age)>65){
						flag = false;
						$.validator.messages['insuredAge']="您好！投保人年龄需在16到65周岁之间，请核对后重新输入";
					}					
				}else if(productCode =='LYX_LYFS_TD'|| productCode == 'JWLXBX_ZG' || productCode == 'JWLXBX_JY' ||
						 productCode=='ETYFJZBX'|| productCode=='TB_TLWY'|| productCode=='TB_TXRS'|| 
					     productCode=='LYYWX_QQ'|| productCode=='LYYWX_RH'|| productCode=='LYYWX_DN' ||
					     productCode=='LJRS_JSY'|| productCode=='LJRS_JAJ'|| productCode=='ZXSC_ECYB'||
					     productCode=='LYYWX_GA'|| productCode=='QZBXFA'|| productCode=='LXRS_JWLXYWX'||
					     productCode=='LXRS_JTK'|| productCode=='TLRSYWSH' || productCode=='LXRS_HYZHBZ'|| 
					     productCode== 'YIYUAN' || productCode == 'CWX_GRZHZJSS_DQ'|| productCode == 'CWX_N'||
					     productCode=='2101740000000000'|| productCode=='2101750000000000'||productCode=='LXRS_LYK'||
					     productCode== '11075700'|| productCode == 'GRWYDQ'||productCode== '2101700000000009'|| 
					     productCode == '2305990000000022'||productCode=='CWX_GRZHZJSS_YN'||productCode=='CWX_GRZHZJSS_YY'){
					if(parseInt(age)<18 || parseInt(age)>70){
					flag = false;
					$.validator.messages['insuredAge']="您好！本产品投保人年龄需在18至70周岁，请核对后重新输入";
					}					
				}else if(parseInt(age)<18 || parseInt(age)>100 ){
					flag = false;
					$.validator.messages['insuredAge']="您好！投保人年龄需在18-100周岁之间，请核对后重新输入";
				}
			}else if(element.name == 'insured_birthDate'){
				if(parseInt(age) < 0){
					flag = false;
					$.validator.messages['insuredAge'] = "您好！被保人年龄有误，请核对后重新输入";
				}
				if(productCode=='2308990000000000'||productCode=='LJRS_JSY'){
					if(parseInt(age) < 18 || parseInt(age) > 70){
						flag = false;
						$.validator.messages['insuredAge']="您好！被保人年龄需在18到70周岁之间，请核对后重新输入";								
					}
					
				}else if(productCode.indexOf('QNWS')>=0){
					if(parseInt(age) < 0 || parseInt(age) > 100){
						flag = false;
						$.validator.messages['insuredAge']="被保人年龄需在0到100周岁之间";								
					}
		    	}else if(productCode.indexOf('AFJT')>=0){  
				  if(parseInt(age)<3 || parseInt(age) > 70){
					flag = false;
					$.validator.messages['insuredAge']="被保人年龄需在3到70周岁之间";
				   }
			    }else if(productCode == 'JTSC_JAXJRYX' || productCode == 'ZYX_JSYSCYWX'){
					if(parseInt(age)<1 || parseInt(age) > 70){
						flag = false;
						$.validator.messages['insuredAge']="被保人年龄需在1到70周岁之间";
					}
				}else if(productCode == '2309990000000039'  ){
					if(parseInt(age)<16 || parseInt(age) >100){
						flag = false;
						$.validator.messages['insuredAge']="被保人年龄需在16到100周岁之间";
					}
				}
				else if(productCode == 'GDYH_LYYW_JN' || productCode == 'GDYH_LYYW_JW'){
					var mainInsuredAmount = $("#mainInsuredAmount").val();
					if(mainInsuredAmount=='10万'){
						if(parseInt(age)<1 || parseInt(age) > 75){
							flag = false;
							$.validator.messages['insuredAge']="被保人年龄需在1到75周岁之间";
						}
					}else{
						if(parseInt(age) < 18 || parseInt(age) > 70){
							flag = false;
							$.validator.messages['insuredAge']="被保人年龄需在18到70周岁之间";								
						}						
					}
				}else if(productCode == 'GDYH_JAX'){
					var productSerialNo = $("#productSerialNo").val(); 
					if(productSerialNo!='GDYH_JAX_planA'){
						if(parseInt(age) < 18 || parseInt(age) > 65){
							flag = false;
							$.validator.messages['insuredAge']="被保人年龄需在18到65周岁之间";								
						}
					}else{
						if(parseInt(age) < 18 || parseInt(age) > 75){
							flag = false;
							$.validator.messages['insuredAge']="被保人年龄需在18到75周岁之间";								
						}
					}
				}else if(productCode == 'GRYWX'){
					if(parseInt(age)<16 || parseInt(age) >65){
						flag = false;
						$.validator.messages['insuredAge']="您好！被保人年龄需在16到65周岁之间，请核对后重新输入";
					}
				}else if(productCode == 'GMKT_YWX_GD' || productCode == 'GMKT_YWX_TD'
					|| productCode == 'JTFW_JZJY_DQ' || productCode == 'JTFW_JZJY_YN'){
					if(parseInt(age)<16 || parseInt(age) >65){
						flag = false;
						$.validator.messages['insuredAge']="被保人年龄需在16到65周岁之间";
					}
				}/*else if(productCode == 'CWX_GRZHZJSS_YN'){
					if(parseInt(age)<16 || parseInt(age)>65){
						flag = false;
						$.validator.messages['insuredAge']="被保人年龄需在16到65周岁之间";
					}					
				}*/else if(productCode == 'CYTX_LYYWX' ){
					var productSerialNo = $("#productSerialNo").val(); 
					if(productSerialNo=='CYTX_LYYWX_planA'||productSerialNo=='CYTX_LYYWX_planE'
					 ||productSerialNo=='CYTX_LYYWX_planK'){
						if(parseInt(age)<1 || parseInt(age)>75){
							flag = false;
							$.validator.messages['insuredAge']="被保人年龄需在1到75周岁之间";
						}
					}else{
						if(parseInt(age)<18 || parseInt(age)>75){
							flag = false;
							$.validator.messages['insuredAge']="被保人年龄需在18到75周岁之间";
						}
					}
				}else if(productCode == 'CYTX_LYYWX_TD' ){
					var productSerialNo = $("#productSerialNo").val(); 
					if(productSerialNo=='CYTX_LYYWX_planA'||productSerialNo=='CYTX_LYYWX_planE'
					 ||productSerialNo=='CYTX_LYYWX_planK'){
						if(parseInt(age)<1 || parseInt(age)>75){
							flag = false;
							$.validator.messages['insuredAge']="被保人年龄需在1到75周岁之间";
						}
					}else{
						if(parseInt(age)<18 || parseInt(age)>75){
							flag = false;
							$.validator.messages['insuredAge']="被保人年龄需在18到75周岁之间";
						}
					}
				}else if(productCode == 'JNFA' || productCode == 'JWFA'){
					if(parseInt(age)<1 || parseInt(age)>75){
						flag = false;
						$.validator.messages['insuredAge']="被保人年龄需在1到75周岁之间";
					}
				}else if(productCode == 'JNFA_TD' || productCode == 'JWFA_TD'){
					if(parseInt(age)<18 || parseInt(age)>75){
						flag = false;
						$.validator.messages['insuredAge']="被保人年龄需在18到75周岁之间";
					}
				}else if(productCode=='LYYWX_QQ'||productCode=='LYYWX_RH'||productCode=='LYYWX_DN'||
						 productCode=='LYYWX_GA'||productCode=='LXRS_LYK'||productCode=='LXRS_JTK'||
						 productCode=='QZBXFA'||productCode=='JWLXBX_JY'||productCode=='JWLXBX_ZG'||
						 productCode=='2101750000000000'||productCode=='2101740000000000'||
						 productCode=='ZYX_LYYWX'||productCode=='LXRS_HYZHBZ'||productCode=='TLRSYWSH'||
						 productCode=='CWX_GRZHZJSS_DQ'||productCode=='11075700'||productCode=='GRWYDQ'||
						 productCode=='2101700000000009'||productCode=='2305990000000022'||productCode=='LYX_LYFS_TD'||
						 productCode=='CWX_GRZHZJSS_YN'||productCode=='CWX_GRZHZJSS_YY'){
					if(parseInt(age)>70){
						flag=false;
						$.validator.messages['insuredAge']="您好！本产品被保险人年龄必须在0周岁至70周岁，请核对后重新输入";
					}
					
				}else if(productCode=='LXRS_JWLXYWX'){
					if(parseInt(age)>60||parseInt(age)<12){
						flag=false;
						$.validator.messages['insuredAge']="您好！本产品被保人年龄需在12到60周岁之间，请核对后重新输入";
					}
				}else if(productCode=='YIYUAN'){
					if(parseInt(age)>70||parseInt(age)<16){
						flag=false;
						$.validator.messages['insuredAge']="您好！本产品被保人年龄需在16到70周岁之间，请核对后重新输入";
					}
				}else if(productCode=='CWX_N'){
					if(parseInt(age)>100||parseInt(age)<16){
						flag=false;
						$.validator.messages['insuredAge']="您好！被保人年龄需在16到100周岁之间，请核对后重新输入";
					}
				}
				else{
					if(parseInt(age) > 100){
						flag = false;
						$.validator.messages['insuredAge']="您好！被保人年龄需小于等于100周岁，请核对后重新输入";								
					}				
				}
			}else if(element.name == 'mainInsured_birthDate'){
				if(parseInt(age) < 0){
					flag = false;
					$.validator.messages['insuredAge'] = "被保人年龄有误，请重输";
				}
				if(productCode == 'LJRS_JAJ' || productCode == 'LJRS_JAX'|| productCode == 'JTSC_JAXJRYX' || productCode == 'ZYX_JSYSCYWX'){
					if($("#applicantRelatedToMainInsured").val() == '4'){
						var betweenDays = checkBetweenDate($("#birthDate").val(),$("#mainInsured_birthDate").val());
						if(!checkBetweenDate($("#birthDate").val(),$("#mainInsured_birthDate").val())){
							$.validator.messages['insuredAge'] =  "父母关系的出生日期有误";
							return false ; 
						}
					}else if($("#applicantRelatedToMainInsured").val() == '3'){
						var betweenDays = checkBetweenDate($("#birthDate").val(),$("#mainInsured_birthDate").val());
						if(checkBetweenDate($("#birthDate").val(),$("#mainInsured_birthDate").val())){
							$.validator.messages['insuredAge'] =  "子女关系的出生日期有误";
							return false ; 
						}
					}
					if(parseInt(age)<1 || parseInt(age) > 70){
						flag = false;
						$.validator.messages['insuredAge']="	被保人年龄需在1到70周岁之间";	
					}
				}
			}
		}
		return this.optional(element)|| flag;
	},null);	
	// 验证固定电话或手机(若为区号格式为区号-电话号)
	jQuery.validator.addMethod("telephone", function(value, element) {
		var reg;
		if(value!=''&&value.substring(0,1)=='1'){
			reg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
			$.validator.messages['telephone']="您好！手机号码格式有误，请重新输入";
		}else{
			reg = /^(0[0-9]{2,3}\-{1})+([2-9][0-9]{6,7})+(\-{1}[0-9]{1,4})?$/;
			$.validator.messages['telephone']="您好！电话号码格式有误，请重新输入";
		}
		return this.optional(element) || reg.test(value);
	}, null); 
	// 验证手机号码
	jQuery.validator.addMethod("telephonenum", function(value, element) {
		var reg;
		reg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
		$.validator.messages['telephonenum']="您好！手机号码格式有误，请重新输入";
		return this.optional(element) || reg.test(value);
	}, null); 
	// 验证紧急联系电话(若为区号格式为区号-电话号)
	jQuery.validator.addMethod("emergencyPhoneNumber", function(value, element) {
		var reg;
		if(value!=''&&value.substring(0,1)=='1'){
			reg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
			$.validator.messages['emergencyPhoneNumber']="您好！手机号码格式有误，请重新输入";
		}else{
			reg = /^(0[0-9]{2,3}\-{1})+([2-9][0-9]{6,7})+(\-{1}[0-9]{1,4})?$/;
			$.validator.messages['emergencyPhoneNumber']="您好！电话号码格式有误，请重新输入";
		}
		return this.optional(element) || reg.test(value);
	}, null); 
	
	// 航班号校验
	jQuery.validator.addMethod("maxlengthC", function(value, element) {
		var reg = /^[A-Za-z0-9]{4,10}$/;
		return this.optional(element) || reg.test(value);
	}, $.validator.format("您好！您填写的航班号有误，请重新输入"));
	
	/***************************************************************************
	 * * 被保人 * *
	 **************************************************************************/	
	  // 证件类型下拉选择框改变事件
	 var insuredIdCardType = "";
	 $("#insured_idType").change(function(){
		// 获取选中的证件类型
		 insuredIdCardType = $(this).children('option:selected').val();
         $("#insured_idNumber").addClass("notHaveChinese")
         $("#insured_idNumber").removeClass("junguanzheng")
		 if (insuredIdCardType=='3'){
             $("#insured_idNumber").removeClass("notHaveChinese")
             $("#insured_idNumber").addClass("junguanzheng")
		 }
		 
		 initCardAndSexAndDateGroup(insuredIdCardType, "insured_gender", "insured_idNumber", "insured_birthDate");
		
		// ***************************************************************
		// TODO 证件类型是通过配置实现的，将来会有变化，下述代码为身份证处理代码，如配置有变化，修改此处
		// ***************************************************************
		initSexAndDateCss(insuredIdCardType, "insured_gender", "insured_idNumber", "insured_idCard", "insured_birthDate");
	});
	// 触发一次证件类型下拉选择框改变事件
	
	
	// 身份证校验
	 var idCardMessage2 = "您好！身份证号码有误，请重新输入";
	jQuery.validator.addMethod("insured_idCard",function(value,element){
		// ***************************************************************
		// TODO 证件类型是通过配置实现的，将来会有变化，下述代码为身份证处理代码，如配置有变化，修改此处
		// ***************************************************************
		insuredIdCardType = $("#insured_idType").val();
		
		if(insuredIdCardType=='1'){
			idCardMessage2 = "您好！身份证号码有误，请重新输入";
		}
		if(insuredIdCardType=='9'){
			idCardMessage2 = "您好！外国人居留证号码有误，请重新输入";
		}
		var thisObj = this.optional(element);
		//var productCode=$("#productCode").val();
		return initSexAndDateVal(insuredIdCardType, value, "insured_birthDate", "insured_gender", thisObj);
		/*if(productCode=='WWB_ZYYL'){
			return initSexAndDateVal(insuredIdCardType, value, "insured_birthDate", "insured_genderV", thisObj);
		}else{
			return initSexAndDateVal(insuredIdCardType, value, "insured_birthDate", "insured_gender", thisObj);
		}*/
		
	},idCardMessage2);


	jQuery.validator.addMethod("nameSpell",function(value,element){
		return this.optional(element)|| compareNameSpell(value);
	},"您好！姓名拼音必须与被保人姓名的拼音一致，请重新输入");

	// 校验确认银行卡号
	jQuery.validator.addMethod("againBankCard",function(value,element){
		var flag = true;
		if($("#insured_bankCardNumber").val()!=value){
			$.validator.messages['againBankCard']="银行卡号输入不一致";			
			flag = false;			
		}
		return this.optional(element) || flag;				
	},null);	
	
	// 添加被保人弹层配置
	$("#addbbr").click(function(){
		if($("#wtqr").attr("checked") == false){
			alertErroMsg("请勾选委托代理后再添加被保人！");
			return;
		}
		//对被保人数量进行校验
		var prodCode = $("#productCode").val();
		
		var r = validateInsuredNum(prodCode,"bbr_list") ;
		if(!r){
			return ;
		}
		if(prodCode=='WWB_ZYYL'){
			var bbrList=$("table[id='bbr_list']").find("tr").length;
			if(bbrList>1){
				alertMess("很抱歉，该产品只支持单人投保");
				return;
			}
			
		}
		if(prodCode=='TPY_ZGDZYYLBX_GD'){
			var bbrList=$("table[id='bbr_list']").find("tr").length;
			if(bbrList>1){
				alertMess("您好！个人款只能添加一个被保人，请核对后重新输入");
				return;
			}
		}
		//团单最少3人，最多无限制
		if(prodCode=='TPY_ZGDZYYLBX_TD'){
			//var bbrList=$("table[id='bbr_list']").find("tr").length;
			/*if(bbrList>10){
				alertMess("家庭款最多只能添加10个被保人");
				return;
			}*/
			/*if(bbrList<3){
				alertMess("家庭款最少为3个被保人");
				return;
			}*/
		}
		
		$("#underAge").hide();
		$("#underAge2").hide();
		$('#insureddiv').html("添加被保人");
		$("#addInsured_form .error").html("");
		// 将被保人弹出层表单清空
		$("#reset").trigger("click");
		$("#insured_idType").trigger("change");	
			
		$("#insuredOperateType").val("add");
		$("#insured_insuredRelatedToApplicant").trigger("change");
        $("#bbr_config").html("添 加");
        $("#insured_birthDate").val("");
        $("#insureSum").attr("readonly","readonly");
        $.XYTipsWindow({
			___title:"添加被保人",
			___width:"770",
			___height:"",
			___content:"id:bbr_box",
			___drag:"___boxTitle",		
			___showTitle :true,
			___showbg:true,
			___offsets:{left:"50%",marginLeft:-385+"px",top:"40px"}
		});
        
	});
	
	/**
	 * 导入被保人按钮
	 */
	$("#importbbr").click(function(){
		// 必须先输入投保人信息
		if(!$("#premiums_form").validate().form()){
			if("JTFW_JZJY_YN" == $("#productCode").val() || "JTFW_JZJY_DQ" == $("#productCode").val()){
				$.XYTipsWindow({
					___title:"信息提示",
					___content:"text:<div class='message_text'><span class='m_tips'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>请先填写保单配送信息！</td></tr></table></div>",
					___width:"360",
					___height:"100",
					___drag:"___boxTitle",
					___showbg:true,
					___button:["确 定"]
				});
			}else{
				$.XYTipsWindow({
					___title:"信息提示",
					___content:"text:<div class='message_text'><span class='m_tips'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>您好！请先填写投保人信息！</td></tr></table></div>",
					___width:"360",
					___height:"100",
					___drag:"___boxTitle",
					___showbg:true,
					___button:["确 定"]
				});
			}
			
			return;
		}
		

		// var length = $("table[id='bbr_list']").find("tr").length;

		// $.XYTipsWindow.removeBox();
		$('#insureddiv').html("添加被保人");
		$("#addInsured_form .error").html("");
		$("#insured_idType").trigger("change");	

		// 将被保人弹出层表单清空
		$("#reset").trigger("click");	
		$("#insuredOperateType").val("add");
		$("#insured_insuredRelatedToApplicant").trigger("change");
        $("#bbr_config").html("添 加");
        // $("#insured_birthDate").val("");
        
		$.XYTipsWindow({
			___title:"导入被保人",
			___width:"770",
			___height:"200",
			___content:"id:importbbrbox",
			___drag:"___boxTitle",		
			___showTitle :true,
			___showbg:true
//			___offsets:{left:"50%",marginLeft:-385+"px",top:"40px"}
		});
		
		if("w_col_0" == $("#bbr_list").find("td").attr("class")){
			$.XYTipsWindow({
				___title:"信息提示",
				___content:"text:<div class='message_text'><span class='m_tips'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>您好！重新导入会覆盖之前数据,请慎重操作！</td></tr></table></div>",
				___width:"360",
				___height:"100",
				___drag:"___boxTitle",
				___showbg:true,
				___button:["确 定"]
			});
		}

	});
	/**
	 * 导入被保人页面 上传按钮
	 */
	$("#bbr_upload").click(function(){
		// 导入会清空之前数据,请慎重操作
		
		var productCode = $("#productCode").val(); 
		var productSerialNo = $("#productSerialNo").val();
		var mainInsuredAmount = $("#mainInsuredAmount").val();
		var insured_productTypeId = $("#insured_productTypeId").val();
		var random = $("#random").val();
		var cityName = $("#cityName").val();
		var provinceName = $("#provinceName").val();
		var city = $("#city").val();
		var province = $("#province").val();
		
		//以下是投保人信息
		var fullName = $("#fullName").val();
		var idType = $("#idType").val();
		var idNumber = $("#idNumber").val();
		var gender = $("#gender").val();
		var birthDate = $("#birthDate").val();
		var phoneNumber = $("input[name=phoneNumber]").val();
		var email = $("input[name=email]").val();
		var address = $("input[name=address]").val();
		var postcode = $("input[name=postcode]").val();
	
		var insured_occupationClass = $("#insured_occupationClass").val();
		var insured_occupationalType = $("#insured_occupationalType").val();
		var insu_third_occupationName = $("#insu_third_occupationName").val();
		
//		var bbrurl = "importbbr?productCode="+productCode+"&productSerialNo="
//		+productSerialNo+"&mainInsuredAmount="+mainInsuredAmount
//		+"&insured_productTypeId="+insured_productTypeId+"&random="+random
//		+"&province="+province+"&city="+city+"&insured_occupationalType="
//		+insured_occupationalType+"&insured_occupationClass="+insured_occupationClass
//		+"&insu_third_occupationName="+insu_third_occupationName
//		+"&cityName="+cityName+"&provinceName="+provinceName
//		+"&fullName="+fullName+"&idType="+idType
//		+"&idNumber="+idNumber+"&gender="+gender
//		+"&birthDate="+birthDate+"&phoneNumber="+phoneNumber
//		+"&email="+email+"&address="+address
//		+"&postcode="+postcode;
		
		//bbrurl = encodeURI(encodeURI(bbrurl));
		var formV = $("#addInsured_form").serializeArray();
 
		var o = {};
	    var a = $("#premiums_form").serializeArray();
	    $.each(a, function() {
	    	o[this.name] = this.value || '';
	    	/**
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }*/
	    });
	    
	    $.each(formV, function() {
	    	o[this.name] = this.value || '';
	    	/**
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }*/
	    });
	    
		$.ajaxFileUpload({
			url:"importbbr",
			type : "post",
			secureuri:false,
			fileElementId:"bbrFile",
			dataType:'text',
			data:o,  
			success:function(data,status){
				try{
				data = JSON.parse(data);
				}catch(e){
				}
				if(data.errorCode!="0"){
					$.XYTipsWindow({
						___title:"信息提示",
						___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + data.errorMsg + "</td></tr></table></div>",
						___width:"360",
						___height:"100",
						___drag:"___boxTitle",
						___showbg:true,
						___button:["确 定"]
					});
					return;
				}
				$.XYTipsWindow.removeBox();
				var bbrList = data.insuredList;
				var insuredAllNum = data.insuredAllNum;
				if(productCode=='CYTX_LYYWX_TD'){
					$('#insurednum').val(insuredAllNum);
				}
				
				//$.XYTipsWindow.removeBox();
				//if (($.browser.msie) && ($.browser.version == "6.0")){$('#premiums_form select').show();$('html,body').css({"overflow":"hidden","overflow-y":"auto"});}
		
				var array = $("table[id='bbr_list']").find("tr");
				var CNTBindex=1;
				if(array.length != 1){//第一行th表头直接略过
					for(var i=1;i<array.length;i++){
						var id = $("#bbr_list").find("tr:last").attr("id");
						$('#'+id).remove();
						}
				}
				$.each(bbrList,function(n,value) {
					var startTR = "<tr id=\"insured_list_row_" + n + "\">";
					var endTR = "</tr>";
					var str = '';
					var relatedToApplicant='';
					var gender='';
					var insured_emergencyPhoneNumber='';
					var insured_bankCardNumber='';
					var insured_drivingLicense='';
					var insu_third_occupationName='';
					var insured_phoneNumber='';
					var insured_fullName='';
					var insured_idNumber='';
					var insured_birthDate='';
					var insured_address='';
					var address='';
					var insured_idType = '';
					var insured_pingYin = '';
					var age= "";
					$.each(value,function(n,item) {
						
						
						if(n=="insured_fullName"){
							insured_fullName = item;
							$('#insured_fullName').val(item);
							if(productCode == 2310990000000000 || productCode == 2311990000000000||productCode=='JWLXBX_JY'||productCode=='JWLXBX_ZG' ){
								  
								var fullNameSpell = changeToPinyin(item);
								$('#insured_nameSpell').val(fullNameSpell);
			                }
							
						}
						if(n=="insured_idNumber"){
							insured_idNumber = item;
							$('#insured_idNumber').val(item);
						}
						if(n=="insured_insuredRelatedToApplicant"){
							relatedToApplicant = item;
							$('#insured_insuredRelatedToApplicant').val(item);
						}
						if(n=="insured_gender"){
							gender = item;
							$('#insured_gender').val(item);
						}
						if(n=="insured_emergencyPhoneNumber"){
							insured_emergencyPhoneNumber = item;
							$('#insured_emergencyPhoneNumber').val(item);
						}
						if(n=="insured_bankCardNumber"){
							insured_bankCardNumber = item;
							$('#insured_bankCardNumber').val(item);
						}
						if(n=="insured_drivingLicense"){
							insured_drivingLicense = item;
							$('#insured_drivingLicense').val(item);
						}
						if(n=="insu_third_occupationName"){
							insu_third_occupationName = item;
							$('#insu_third_occupationName').val(item);
						}
						if(n=="insured_phoneNumber"){
							insured_phoneNumber = item;
							$('#insured_phoneNumber').val(item);
						}
						if(n=="insured_birthDate"){
							insured_birthDate = item;
							$('#insured_birthDate').val(item);
						}
						if(n=="insured_address"){
							insured_address = item;
							$('#insured_address').val(item);
						}
						if(n=="insured_idType"){
							if(item=="1"){
								insured_idType = "身份证";
		        			}
							if(item=="2"){
								insured_idType = "护照";
		        			}
							if(item=="3"){
								insured_idType = "军官证";
		        			}
							if(item=="4"){
								insured_idType = "驾照";
		        			}
							if(item=="5"){
								insured_idType = "其他";
		        			}
						}
						if(n == "age"){
							age = item;
						}
						if(n=="insured_province"){
							$('#insured_province').val(item);
						}
						if(n=="insured_city"){
							$('#insured_city').val(item);
						}
						if(n=="insured_cityName"){
							$('#insured_cityName').val(item);
						}
						if(n=="insured_provinceName"){
							$('#insured_provinceName').val(item);
						}
						
					});
					if(relatedToApplicant == '1'){
						str = "<td class='w_col_0'>本人</td>";
						str += "<td colspan='5'>同投保人信息</td>";
					}else{
						var proCode = $("#insured_productCode").val();
						if(proCode == 'LJRS_JAJ'||proCode == 'LJRS_JAX' ||proCode == 'ZYX_JSYSCYWX'){
							str = "<td class='w_col_0'>" + $('#insured_fullName').val() + "</td><td>&nbsp;"+ insured_idType + "</td><td>&nbsp;" + $('#insured_idNumber').val();
							str += "</td><td>" + $('#insured_birthDate').val() ;
							str += "</td>";
						}else if(proCode == 'JYBD_LYYWSHX'||proCode == 'JYBD_LYYWSHX_TD'){
							str = "<td class='w_col_0'>" + $('#insured_insuredRelatedToApplicant').find('option:selected').text() + "</td><td>&nbsp;" + $('#insured_fullName').val() + "</td><td>&nbsp;" + $('#insured_idNumber').val();
							if(null != gender && "" != gender){
								str += "</td><td>" + jQuery.trim($('#insured_gender').find('option:selected').text());
							}else{
								str += "</td><td>";
							}
							str += "</td><td>" + $('#insured_birthDate').val() ;
							str += "</td><td>" + insured_phoneNumber + "&nbsp;</td>";
						}else if(proCode == 'CNTB'){
							
							str +="<td>&nbsp;" + CNTBindex + "</td>&nbsp;"
							str +="<td>&nbsp;" + insured_fullName + "</td>&nbsp;"
							CNTBindex=CNTBindex+1;
							$('#insure_flag').val("1") ;
							
						}else{
							str = "<td class='w_col_0'>" + $('#insured_insuredRelatedToApplicant').find('option:selected').text() + "</td><td>&nbsp;" + $('#insured_fullName').val() + "</td><td>&nbsp;" + $('#insured_idNumber').val();
							str += "</td><td>" + jQuery.trim($('#insured_gender').find('option:selected').text());
							str += "</td><td>" + $('#insured_birthDate').val() ;
							if(proCode=='2311990000000000' || proCode =='2310990000000000' || proCode == '2101740000000000' 
								|| proCode =='2101750000000000' || proCode =='GDYH_LYYW_JN'|| proCode =='GDYH_LYYW_JW'||proCode=='JWLXBX_JY'||proCode=='JWLXBX_ZG'){
								str += "</td><td>" + $('#insured_emergencyPhoneNumber').val() + "&nbsp;</td>";
							}else if(proCode == 'GRWYDQ'||proCode == 'GH_SJYHDQ'){
								str += "</td><td>" + $('#insured_bankCardNumber').val() + "&nbsp;</td>";
							}else if(proCode == '2308990000000000'){
								str += "</td><td>" + $('#insured_drivingLicense').val() + "&nbsp;</td>";
							}else if(proCode == 'GRYWX'){
								str += "</td><td>" + $('#insu_third_occupationName').val() + "&nbsp;</td>";
							}else if(proCode == 'LM_QZYLBX'||proCode == 'LM_LYAQRYX'){
								str += "</td><td>" + age + "&nbsp;</td>";
							}else{
								str += "</td><td>" + insured_phoneNumber + "&nbsp;</td>";
							}
						}
						
					}
					var pd = $("#insured_productCode").val();
					if(pd=='CNTB'){
						//str += "<td><a href=\"javascript:void(0)\" class=\"under_link delbbr\" index=" + n + ">删除</a></td>";
					}else{
						str += "<td><a href=\"javascript:void(0)\" class=\"under_link modifybbr\" index=" + n + ">修改</a> ";
						str += "<a href=\"javascript:void(0)\" class=\"under_link delbbr\" index=" + n + ">删除</a></td>";
					}
					
					$("#bbr_list").append(startTR + str + endTR);
				});
				
			
//				var theDetailCountList = $("table[id='bbr_list']").find("tr").length-1;
//				calcTheGrossPremium(data.grossPremium, theDetailCountList);
				var thePrice = data.grossPremium;
				var unitPremium = data.unitPremium;
				if(productCode=="CNTB"){
					$("#unitPremium").html("网销优惠价：" + thePrice+"元");
					$("#premium").val(data.premium);
					$("#grossPremium").val(thePrice);
				}else{
					var theDetailCount = $("table[id='bbr_list']").find("tr").length - 1;
	        	    if($("#productTypeId").val() == '1'){
	        	    	if(productCode=="JTFW_JZJY_YN" && $("#productSerialNo").val().indexOf("JTFW_YNTTYWX_planB")>=0){
							calcEstateGrossPremiumForJTFW(data.grossPremium,$('#tyx_unitPremium_input').val(),$('#zrx_unitPremium_input').val(),data.tyx_count,data.zrx_count);
						}else{
							calcEstateGrossPremium(data.grossPremium, data.unitPremium);    						
						}
	        	    }else{
	        		    calcTheGrossPremium(thePrice, theDetailCount);
	        	    }
				}
        	    
        	    

				
				//changeAddButton2("", "none");
				//$('#reset').click();
			
			},
			error:function(data,status,e){
				alert("文件上传失败！");
			}
		});
		
	});
	// excel模版下载
	$("#excel_download").click(function(){
		var productCode = $("#productCode").val(); 
		var productSerialNo = $("#productSerialNo").val();
		var url = "";
		if((productCode == "JTFW_JZJY_YN" || productCode == "JTFW_JZJY_DQ")){
			url = "downHandlerTemplateForJTFW?productCode="+productCode+"&productSerialNo="+productSerialNo;
		}else{
			url = "downHandlerTemplate?productCode="+productCode;
		}
		window.location.href = url;
	});
//	$("#bbrup").click(function(){
//		var obj = $("#bbrFile");
//		obj.click();
//	});
	function file_Select(obj) { 
        var name = obj.value.split('//'); 
        //$("#txtFileName").val(name[name.length - 1]);  
        $("#txtFileName").val(name[name.length - 1]);
        //document.getElementById("txtFileName").value=;
        alert(document.getElementById("txtFileName").value);
    } 
//	$("#bbrFile").live("onchange",function(){
//		alert(obj); 
//        var name = obj.value.split('//'); 
//        alert(name); 
//        //$("#txtFileName").val(name[name.length - 1]);  
//        $("#txtFileName").val(name[name.length - 1]);
//        //document.getElementById("txtFileName").value=;
//        alert(document.getElementById("txtFileName").value);
//	});
	// 添加被保人弹层select显示隐藏
	$("#addbbr,.modifybbr,.importbbr").live("click",function(){
		if (($.browser.msie) && ($.browser.version == "6.0")){$('#premiums_form select').hide();$('html,body').css({"overflow":"hidden","overflow-y":"hidden"});}
	});
	$("#close_bbr").live("click",function(){
		if($('#linkSource').val()=='innetRenewal'){
			// 如果表单校验失败，则返回
			if(!$("#addInsured_form").validate().form()){
				return;
			}
		}
		if (($.browser.msie) && ($.browser.version == "6.0")){$('#premiums_form select').show();$('html,body').css({"overflow":"hidden","overflow-y":"auto"});}
		$.XYTipsWindow.removeBox();
		hiddenLoading();
	});
	
	// 查询被保人信息
	$(".modifybbr").live("click",function(){ 
		showLoading();
		$('#insureddiv').html("修改被保人");
		$("#addInsured_form .error").html("");
		$("#insured_idType").trigger("change");
		$("#insuredSeq").val($(this).attr("index"));
		$("#insured_insuredSeq").val($(this).attr("index"));
		var formV = $('#premiums_form').serialize();
		
		$.ajax({
			url : 'searchInsured',
			type : "post",
			data : formV,
			dataType : 'json',
			success : function(data){
				if(data.result == 0){
					
					if(data.cityCollList != null){
						var options = "<option value=''>请选择</option>";
						for(var i=0;i<data.cityCollList.length;i++){
		    				options += "<option value="+data.cityCollList[i].kind+">"+data.cityCollList[i].name+"</option>";
		    			}
						$('#insured_city').html(options);
					}
					hiddenLoading();
					
					// 向表单填充
				    fillInsuredFiled(data);
	
					// $("#insured_idType").trigger("change");
			if(data.insured.insured_insuredRelatedToApplicant!='1'){
						   var insuredIdCardType = $("#insured_idType").children('option:selected').val();
						   initSexAndDateCss(insuredIdCardType, "insured_gender", "insured_idNumber", "insured_idCard", "insured_birthDate");
						   if(insuredIdCardType=='1'){
							   $("#insured_gender").attr("disabled", "disabled");	
							   $("#spe_insured_birthDate").html("<input id='insured_birthDate' name='insured_birthDate' onchange='underAgeInfo()' value='"+data.insured.insured_birthDate+"' type='text' class='common_input required insuredAge' readonly='readonly' />");
						   }else{
							   $("#insured_gender").attr("disabled", "");	
							   $("#spe_insured_birthDate").html("<input id='insured_birthDate' name='insured_birthDate' onchange='underAgeInfo()' value='"+data.insured.insured_birthDate+"' type='text' class='common_input required insuredAge' onfocus=WdatePicker({isShowClear:false,readOnly:true,maxDate:'"+$('#currentDate').val()+"'}) />");					   
						   }				    	
				    	
				    }
				    underAgeInfo();
				}
			},
			error : function(){
				monitorError("NONCAR0008");
				hiddenLoading();
			}
		});
	});

	$("#bbr_config2").click(function(){
		 if($("#underAgeFlag").val() == "1"){
         	var person_type = $("#insured_insuredRelatedToApplicant").val() ;
         	if(person_type != 1){
         		var v = $('input:radio[name="isBuyInOtherBXGS"][checked]').val();
     			if(!(v == 'N' || v == 'Y')){
     				$("#errorLabel").html("您好！标示红色*的为必填字段，请输入相应内容");
     				return false;
     			}
     			if(v == "Y"){
     				var sum = $("#insureSum").val();
     				if("" == sum || null == sum){
     					$("#errorLabel").html("您好！标示红色*的为必填字段，请输入相应内容");
     					return false;
     				}
     				if(!(/^[0-9]*[1-9][0-9]*$/.test(sum))){
     					$("#errorLabel").html("");
     					$("#errorLabel").html("请输入正确的投保金额");
     					return false;
     				};
     				if(parseInt(sum)>500000){
     					$("#errorLabel").html("");
     					$("#errorLabel").html("请输入正确的投保金额");
     					return false;
     				}
     			}
         	}
 		}
		changeAddButton2("none","");
		var newMethod = $("#insuredOperateType").val();
		if(!$("#addInsured_form").validate().form()){
			changeAddButton2("","none");
			return ;
		}
		var formV = $("#addInsured_form").serialize();
		var compareFlag = 0;
		$.ajax({
			url : "compareInsuredIdCard",
			async: false , 
			type : "post",
			data : formV,
			dataType : "json",
			success : function(data){
				if(data.result == 2){
					msg = "您好！您的保单信息需进一步确认，请致电热线10108888-2咨询";
					compareFlag = 1;
					$.XYTipsWindow({
						___title:"信息提示",
						___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
						___width:"360",
						___height:"100",
						___drag:"___boxTitle",
						___showbg:true,
						___button:["确 定"],
					    ___callback:function(){
					    	changeAddButton("", "none");
						    	return;
							}
						});
				}else if(data.f == -100){
					if(data.ip.substr(0,6) != '10.190'){
						msg = "ip:"+data.ip+",port:"+data.port+",<br/>sessionid:"+data.sessionId+"<br/>productCode:"+data.productCode+",random:"+data.random;
					}else{
						msg = "系统异常，请稍后再试";
					}
					compareFlag = 1;
					$.XYTipsWindow({
						___title:"信息提示",
						___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
						___width:"360",
						___height:"100",
						___drag:"___boxTitle",
						___showbg:true,
						___button:["确 定"],
					    ___callback:function(){
					    	changeAddButton("", "none");
						    	return;
							}
					});
				}
				
			},
			error : function(data){
					monitorError("NONCAR0003");
					compareFlag = 1;
					return;
				}
			});	
		if(compareFlag == '1'){
			changeAddButton2("", "none");
			return ;
		}
		var orderCheckFlag = 0; 
			var insuredFormV = $("#addInsured_form").serialize();
			showLoading();
			$.ajax({
				url : ctx + "/sale/estate/checkOrder",
				type : "post",
				async: false , 
				data : insuredFormV,
				dataType : "json",
				success : function(data){
					if(data.result == 1 ){
						orderCheckFlag  = 1;
						var msg = data.info;
						$.XYTipsWindow({
							___title:"信息提示",
							___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
							___width:"360",
							___height:"150",
							___drag:"___boxTitle",
							___showbg:true,
							___button:["确 定"],
						    ___callback:function(){
						    	changeAddButton("", "none");
						    	return true;
							}
						});
					}
					hiddenLoading();
				},
				error: function(){
					monitorError("NONCAR0002");
					hiddenLoading();
				}
			});
		if(orderCheckFlag == '1'){
			return ;
		}
		
		
		
		var method = "";
		if(newMethod =='add')
			method = "addInsured";
		if(newMethod =='modi')
			method = "modifyInsured";
		$.ajax({
			url : method,
			type : "post",
			data : formV,
			dataType : "json",
			success : function(data){
				if(data.flag == 1){
					if(data.result == 1){
						var msg = "超过被保人人数,请回到上一投保信息页面进行修改";
						$.XYTipsWindow({
							___title:"信息提示",
							___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
							___width:"360",
							___height:"100",
							___drag:"___boxTitle",
							___showbg:true,
							___button:["确 定"],
						    ___callback:function(){
						    	changeAddButton2("", "none");
						    	return;
							}
						});
						changeAddButton2("", "none");
						return ;
					}
					if(data.index != -1){
						if(newMethod == "add"){
							if($("#insured_productTypeId").val() == '1'){
									calcEstateGrossPremium(data.grossPremium,data.unitPremium);
							}
							else{
								theDetailCount = $("table[id='bbr_list']").find("tr").length;
								calcTheGrossPremium(data.grossPremium, theDetailCount);
							}
						}else if(newMethod == "modi" && $("#insured_productTypeId").val() == '1'){
							calcEstateGrossPremium(data.grossPremium,data.unitPremium);
						}
						$.XYTipsWindow.removeBox();
						if (($.browser.msie) && ($.browser.version == "6.0")){$('#premiums_form select').show();$('html,body').css({"overflow":"hidden","overflow-y":"auto"});}
						var startTR = "<tr id=\"insured_list_row_" + data.index + "\">";
						var endTR = "</tr>";
						var str = '';
							str = "<td class='w_col_0'>"+$('#insured_fullName').val();
							str += "</td><td>" + $("#insured_idType").find('option:selected').text();
							str += "</td><td>" + $('#insured_idNumber').val();
							str += "</td><td>&nbsp;"+$('#insured_birthDate').val()+"</td>";
						str += "<td><a href=\"javascript:void(0)\" class=\"under_link modifybbr\" index=" + data.index + ">修改</a> ";
						str += "<a href=\"javascript:void(0)\" class=\"under_link delbbr\" index=" + data.index + ">删除</a></td>";
						if(newMethod == "add"){
							$("#bbr_list").append(startTR + str + endTR);
						}else if(newMethod == "modi"){
							$("#insured_list_row_" + data.index).html(str);
						}else{}						
						
						changeAddButton2("", "none");
						$('#reset').click();
					}
				}else{
					var errorMsg = "";
					if(newMethod =='add'){
						errorMsg = "添加";
					}else if(newMethod == "modi"){
						errorMsg = "修改";
					}
					changeAddButton2("", "none");
					popupMessage(360,100,"m_error",errorMsg+"被保人失败，请刷新页面再试");
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				if(method == 'addInsured'){
					monitorError("NONCAR0004");
				}else{
					monitorError("NONCAR0005");
				}
				changeAddButton("", "none");
				popupMessage(360,100,"m_error","系统错误，请稍后再试("+textStatus+")");
			}
		});

	});
	
	// 添加或修改被保人信息
	$("#bbr_config").click(function(){
		
		var productCode = $("#productCode").val();
		if(productCode=="TPY_ZGDZYYLBX_TD"||productCode=="TPY_ZGDZYYLBX_GD"||productCode=='WWB_ZYYL'){
			//当点击添加的时候看是被保人是否是本人
			var relatedToApplicant=$('#insured_insuredRelatedToApplicant').val();
			if(relatedToApplicant==1){
				if (!$("#premiums_form").validate().form()){
					changeAddButton("", "none");
					$('#reset').click();
					$.XYTipsWindow.removeBox();
					alertMess("您好！当被保人选本人时，必须先录入投保人信息，请核对后重新输入");
					return;
				}
			}
		}
		if(productCode=='WWB_ZYYL'){
			var relation=$("#insured_insuredRelatedToApplicant option:selected").val();
			var insu_card;
			var birthday;
			var enterAge;
			var plan;
			if(relation=='1'){
				//获取投保人的年龄
				//投保人的身份证号
				 insu_card = $("#idNumber").val();
				 
				// 将身份证号转成出生日期
				birthday = ageByIdCard(insu_card);
				 enterAge = getAge(birthday);
				//获取当前的计划
				plan=$("#plan").val();
				if(enterAge>=50&&enterAge<=55&&plan=='planC'){
					alertMess("您好！被保险人年龄超出本产品保障范围，请核对后重新提交。");
					return;
				}
			}else{
				//获取被保人的年龄
				//被保人的身份证号
				insu_card = $("#insured_idNumber").val();
				
				// 将身份证号转成出生日期
				 birthday = ageByIdCard(insu_card);
			     enterAge = getAge(birthday);
				//获取当前的计划
				 plan=$("#plan").val();
				if(enterAge>=50&&enterAge<=55&&plan=='planC'){
					alertMess("您好！被保险人年龄超出本产品保障范围，请核对后重新提交。");
					return;
				}
				
			}
			/*
			 * 判断投被保人关系是否正确
			 * */
			/*applicationSex= maleOrFemalByIdCard(insu_card);
			insureSex=maleOrFemalByIdCard(insu_card);*/
			/*if(applicationSex==insureSex){
				alertMess("投被保人关系不正确，请重新选择！");
				return;
			}*/
			

		}
		
            if(productCode=="GAMYYWSHX"){
            	 var person_type = $("#insured_insuredRelatedToApplicant").val() ;
    		     var sex =$("#gender").val() ;
    		     if(sex==1&&person_type==1){
    		          alert("投保人为男时，被保人不能选本人!");	
    		          return ;
    		     }
    		     var insured_gender =$("#insured_gender").val() ;
    		     if(insured_gender==1&&person_type==6){
    		          alert("被保人性别不能为男!");
    		          return ;
    		     }
            } 
            if(productCode=="JWLXX_ZG_GD" || productCode=="JWLXX_ZG_TD"){
            	var count = $("#insured_count").val();
    			if(parseInt(count)>1){	    		
    				var msg = "本产品最大购买份数为1份！";
    				$.XYTipsWindow({
    					___title:"信息提示",
    					___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
    					___width:"360",
    					___height:"100",
    					___drag:"___boxTitle",
    					___showbg:true,
    					___button:["确 定"],
    				    ___callback:function(){
    				    	changeAddButton("", "none");
    				    	return true;
    					}
    				});
    	    		return false;				
    			}	
            }
            if(productCode=="ZYX_LYYWX"){
            	var count = $("#insured_count").val();
            	if(parseInt(count)>5){	    		
    				var msg = "本产品最大购买份数为5份！";
    				$.XYTipsWindow({
    					___title:"信息提示",
    					___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
    					___width:"360",
    					___height:"100",
    					___drag:"___boxTitle",
    					___showbg:true,
    					___button:["确 定"],
    				    ___callback:function(){
    				    	changeAddButton("", "none");
    				    	return true;
    					}
    				});
    	    		return false;				
    			}	
            }
            if(productCode=="JWLXX_ZG_TD"){
            	 var insuredage=$("#insured_birthDate").val();
     			var age = getAgeByBirthDate(insuredage);
     			
    			if(parseInt(age)<18){	    		
    				var msg = "被保人年龄不能小于18岁！";
    				$.XYTipsWindow({
    					___title:"信息提示",
    					___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
    					___width:"360",
    					___height:"100",
    					___drag:"___boxTitle",
    					___showbg:true,
    					___button:["确 定"],
    				    ___callback:function(){
    				    	changeAddButton("", "none");
    				    	return true;
    					}
    				});
    	    		return false;				
    			}	
            }
            
            if(productCode=="TPY_ZGDZYYLBX_GD"||productCode=="TPY_ZGDZYYLBX_TD"){
              	 var insuredage=$("#insured_birthDate").val();
       			var age = getAgeByBirthDate(insuredage);
       			
      			if(parseInt(age)<0||parseInt(age)>60){	    		
      				var msg = "您好！被保人年龄必须在0-60周岁，请核对后重新输入";
      				$.XYTipsWindow({
      					___title:"信息提示",
      					___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
      					___width:"360",
      					___height:"100",
      					___drag:"___boxTitle",
      					___showbg:true,
      					___button:["确 定"],
      				    ___callback:function(){
      				    	changeAddButton("", "none");
      				    	return true;
      					}
      				});
      	    		return false;				
      			}	
              }else if(productCode=='WWB_ZYYL'){
            	  var insuredage=$("#insured_birthDate").val();
         			var age = getAgeByBirthDate(insuredage);
         			
        			if(parseInt(age)<18||parseInt(age)>55){	    		
        				var msg = "您好！被保人年龄必须在18-55周岁，请核对后重新输入";
        				$.XYTipsWindow({
        					___title:"信息提示",
        					___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
        					___width:"360",
        					___height:"100",
        					___drag:"___boxTitle",
        					___showbg:true,
        					___button:["确 定"],
        				    ___callback:function(){
        				    	changeAddButton("", "none");
        				    	return true;
        					}
        				});
        	    		return false;				
        			}	
              }
            
            if(productCode=="GRYWX"){
           	 var insuredage=$("#insured_birthDate").val();
    			var age = getAgeByBirthDate(insuredage);
    			
   			if(parseInt(age)<16||parseInt(age)>65){	    		
   				var msg = "您好！被保人年龄必须在16-65周岁，请核对后重新输入";
   				$.XYTipsWindow({
   					___title:"信息提示",
   					___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
   					___width:"360",
   					___height:"100",
   					___drag:"___boxTitle",
   					___showbg:true,
   					___button:["确 定"],
   				    ___callback:function(){
   				    	changeAddButton("", "none");
   				    	return true;
   					}
   				});
   	    		return false;				
   			}	
           }
            
          //针对儿童预防接种保险校验被保人信息：不能是投保人本人，年龄在0-12岁
            if(productCode=="ETYFJZBX"){
           	 var person_type = $("#insured_insuredRelatedToApplicant").val() ;
   		     if(person_type==1){
   		          alert("您好！本产品被保人不能选本人，请核对后重新输入");	
   		          return ;
   		     }
   		    var insuredage=$("#insured_birthDate").val();
			var age = getAgeByBirthDate(insuredage);
			var ageDays = getAgeDayByBirthDate(insuredage);
			if(parseInt(age)> 12){
				alert("您好！被保人为小于或等于12周岁的儿童，且出生满30天以上，请核对后重新输入");
				return ;
			}else if(parseInt(ageDays)<30){
				alert("您好！被保人出生必须满30天以上，请核对后重新输入");
				return ;
			}
			var count = $("#insured_count").val();
			if(parseInt(count)>2){	    		
				var msg = "您好！本产品最大购买份数为2份，请核对后重新输入";
				$.XYTipsWindow({
					___title:"信息提示",
					___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
					___width:"360",
					___height:"100",
					___drag:"___boxTitle",
					___showbg:true,
					___button:["确 定"],
				    ___callback:function(){
				    	changeAddButton("", "none");
				    	return true;
					}
				});
	    		return false;				
			}	
           }
            
          //针对儿童预防接种保险校验被保人信息：不能是投保人本人，年龄在0-12岁
            if(productCode=="TB_TLWY" || productCode=="TB_TXRS" || productCode=="TLNN_XSYEYWSHX"){
           	 var person_type = $("#insured_insuredRelatedToApplicant").val() ;
   		     if(person_type==1){
   		          alert("您好！本产品被保人不能选本人，请核对后重新输入");	
   		          return ;
   		     }
   		    var insuredage=$("#insured_birthDate").val();
			var age = getAgeByBirthDate(insuredage);
			var ageDays = getAgeDayByBirthDate(insuredage);
			if(parseInt(ageDays)<30||parseInt(age)>18){
				alert("您好！被保人年龄必须为出生满30天-18周岁，请核对后重新输入");
				return ;
			}
			var count = $("#insured_count").val();
			if(parseInt(count)>1){	    		
				var msg = "您好！本产品最大购买份数为1份，请核对后重新输入";
				$.XYTipsWindow({
					___title:"信息提示",
					___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
					___width:"360",
					___height:"100",
					___drag:"___boxTitle",
					___showbg:true,
					___button:["确 定"],
				    ___callback:function(){
				    	changeAddButton("", "none");
				    	return true;
					}
				});
	    		return false;				
			}	
           }
            /**
             * 被保人为本人验证
             */
            if(productCode=="JNFA" || productCode=="JWFA"){
            	var insurantMatters= $("#insured_insuredRelatedToApplicant").val();;
	    		if("1"==insurantMatters){
	    			var insuredage=$("#birthDate").val();
	    			var age = getAgeByBirthDate(insuredage);
	    			if(parseInt(age)<1 || parseInt(age) > 75){
	    				alert("投保人年龄不在1到75周岁之间时，被保人不能选本人!");
	    				return ;
					}
	    		}
           }
            if(productCode=="TPY_ZGDZYYLBX_GD" || productCode=="TPY_ZGDZYYLBX_TD"){
            	var insurantMatters= $("#insured_insuredRelatedToApplicant").val();
	    		if("1"==insurantMatters){
	    			var insuredage=$("#birthDate").val();
	    			var age = getAgeByBirthDate(insuredage);
	    			if(parseInt(age)<16 || parseInt(age) > 60){
	    				alert("您好！投保人年龄不在16到60周岁之间时，被保人不能选本人，请核对后重新输入");
	    				return ;
					}
	    		}
           }else if(productCode=='WWB_ZYYL'){
        	   var insurantMatters= $("#insured_insuredRelatedToApplicant").val();
	    		if("1"==insurantMatters){
	    			var insuredage=$("#birthDate").val();
	    			var age = getAgeByBirthDate(insuredage);
	    			if(parseInt(age)<18 || parseInt(age) > 55){
	    				alert("您好！投保人年龄不在18到55周岁之间时，被保人不能选本人，请核对后重新输入");
	    				return ;
					}
	    		}
           }
            
            if(productCode=='LYYWX_QQ'||productCode=='LYYWX_RH'||productCode=='LYYWX_DN'||
			   productCode=='LYYWX_GA'||productCode=='LXRS_LYK'||productCode=='LXRS_JTK'||
			   productCode=='JWLXBX_ZG'||productCode=='JWLXBX_JY'||productCode=='QZBXFA'||
			   productCode=='2101740000000000'||productCode=='2101750000000000'||
			   productCode=='ZYX_LYYWX'||productCode=='LXRS_HYZHBZ'||productCode=='LJRS_JSY'||
			   productCode=='TLRSYWSH'||productCode=='YIYUAN'||productCode=='CWX_GRZHZJSS_DQ'||
			   productCode=='11075700'||productCode=='GRWYDQ'||productCode=='2101700000000009'||
			   productCode=='2305990000000022'||productCode=='LYX_LYFS_TD'||productCode=='CWX_GRZHZJSS_YN'||
			   productCode=='CWX_GRZHZJSS_YY'){
        	   var insurantMatters= $("#insured_insuredRelatedToApplicant").val();;
	    		if("1"==insurantMatters){
	    			var insuredage=$("#birthDate").val();
	    			var age = getAgeByBirthDate(insuredage);
	    			if(parseInt(age)<18 || parseInt(age) > 70){
	    				alert("您好！本产品投保人年龄必须在18到70周岁之间，请核对后重新输入");
	    				return ;
					}
           }
           }else if(productCode=='LXRS_JWLXYWX'){
        	   var insurantMatters= $("#insured_insuredRelatedToApplicant").val();;
	    		if("1"==insurantMatters){
	    			var insuredage=$("#birthDate").val();
	    			var age = getAgeByBirthDate(insuredage);
	    			if(parseInt(age)<18 || parseInt(age) > 60){
	    				alert("您好！投保人年龄不在18到60周岁之间，请核对后重新输入");
	    				return ;
					}
          }
           }else if(productCode=='LJRS_JAJ'||productCode=='LJRS_JAX'||productCode=='ZRX_AJZH_C'||
        		    productCode=='QNWS_FDX'||productCode=='QNWS_FZXJT'||productCode=='QNWS_JBAJDQ'||
        		    productCode=='QNWS_JYFZX'||productCode=='QNWS_ZKX'){
        	   var insurantMatters= $("#insured_insuredRelatedToApplicant").val();;
	    		if("1"==insurantMatters){
	    			var insuredage=$("#birthDate").val();
	    			var age = getAgeByBirthDate(insuredage);
	    			if(parseInt(age)<18 || parseInt(age) > 100){
	    				alert("您好！投保人年龄不在18到100周岁之间，请核对后重新输入");
	    				return ;
					}
         }
          }else if(productCode=='GRYWX'){
       	   var insurantMatters= $("#insured_insuredRelatedToApplicant").val();;
   		if("1"==insurantMatters){
   			var insuredage=$("#birthDate").val();
   			var age = getAgeByBirthDate(insuredage);
   			if(parseInt(age)<16 || parseInt(age) > 65){
   				alert("您好！投保人年龄不在16到65周岁之间，请核对后重新输入");
   				return ;
				}
    }
     }
            
            if($("#underAgeFlag").val() == "1"){
            	var person_type = $("#insured_insuredRelatedToApplicant").val() ;
            	if(person_type != 1){
            		var v = $('input:radio[name="isBuyInOtherBXGS"][checked]').val();
        			if(!(v == 'N' || v == 'Y')){
        				$("#errorLabel").html("您好！标示红色*的为必填字段，请输入相应内容");
        				return false;
        			}
        			if(v == "Y"){
        				var sum = $("#insureSum").val();
        				if("" == sum || null == sum){
        					$("#errorLabel").html("您好！标示红色*的为必填字段，请输入相应内容");
        					return false;
        				}
        				if(!(/^[0-9]*[1-9][0-9]*$/.test(sum))){
        					$("#errorLabel").html("");
        					$("#errorLabel").html("请输入正确的投保金额");
        					return false;
        				};
        				if(parseInt(sum)>500000){
        					$("#errorLabel").html("");
        					$("#errorLabel").html("请输入正确的投保金额");
        					return false;
        				}
        			}
            	}
    		}
            
            changeAddButton("none", "");
		    
		var newMethod = $("#insuredOperateType").val();
		// 如果表单校验失败，则返回
		if(!$("#addInsured_form").validate().form()){
			changeAddButton("", "none");
			return;
		}
		
		
		var pcityName=$('#insured_cityName').val();
		var pcity=$('#insured_city').val();
		if(""!=pcityName){
			var checkflag=checkRegion(pcityName,pcity);
			if(!checkflag){
				$.XYTipsWindow({
					___title:"信息提示",
					___content:"text:<div class='message_text'><span class='m_tips'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>您好！请正确填写所在地区</td></tr></table></div>",
					___width:"360",
					___height:"100",
					___drag:"___boxTitle",
					___showbg:true,
					___button:["确 定"]
				});
				changeAddButton("", "none");
				return;
			}
		}
	
		
		
		// 若为产险且被保人为其他（非本人）时验证被保人所填份数是否满足条件
		var orderCheckFlag = 0; 
		if($("#insured_productTypeId").val() == '1' && $("#insured_insuredRelatedToApplicant").val() != '1'){
			var insuredFormV = $("#addInsured_form").serialize();
			showLoading();
			$.ajax({
				url : ctx + "/sale/estate/checkOrder",
				type : "post",
				async: false , 
				data : insuredFormV,
				dataType : "json",
				success : function(data){
					if(data.result == 1 ){
						orderCheckFlag  = 1;
						var msg = data.info;
						$.XYTipsWindow({
							___title:"信息提示",
							___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
							___width:"360",
							___height:"150",
							___drag:"___boxTitle",
							___showbg:true,
							___button:["确 定"],
						    ___callback:function(){
						    	changeAddButton("", "none");
						    	return true;
							}
						});
					}
					hiddenLoading();
				},
				error: function(){
					hiddenLoading();
					monitorError("NONCAR0002");
				}
			});
		}else{
			if(productCode.indexOf('QNWS')>=0){
				var appBirthDate = $("#birthDate").val();  
				var applAge = getAgeByBirthDate(appBirthDate);
				if(parseInt(applAge)>100 || parseInt(applAge)<0){
					$.XYTipsWindow({
						___title:"信息提示",
						___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>被保人年龄需在0到100周岁之间</td></tr></table></div>",
						___width:"360",
						___height:"150",
						___drag:"___boxTitle",
						___showbg:true,
						___button:["确 定"],
					    ___callback:function(){
					    	
					    	return true;
						}
					});
					changeAddButton("", "none");
					return;
				}
				
				
			}
			
		}
		if(orderCheckFlag == '1'){
			return ;
		}
		
		// 一元旅游 被保人为未成年人时 份数限制为一份
		if(productCode=='YIYUAN'){
			var appBirthDate = $("#insured_birthDate").val();  
			var applAge = getAgeByBirthDate(appBirthDate);
			var count = $("#insured_count").val();
			if(parseInt(applAge)<18 && parseInt(count)>1){	    		
				var msg = "您好！被保人为未成年人时，本产品最大购买份数为1份，请核对后重新输入";
				$.XYTipsWindow({
					___title:"信息提示",
					___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
					___width:"360",
					___height:"100",
					___drag:"___boxTitle",
					___showbg:true,
					___button:["确 定"],
				    ___callback:function(){
				    	changeAddButton("", "none");
				    	return true;
					}
				});
	    		return false;				
			}	
			var relatedToApplicant = $("#insured_insuredRelatedToApplicant").val();
			if("1"==relatedToApplicant){
				$("#app_count").val(count);				
			}			
		}
		
		var relatedToApplicant = $('#insured_insuredRelatedToApplicant').find('option:selected').val();
		var relatedToApplicantName = jQuery.trim($('#insured_insuredRelatedToApplicant').find('option:selected').text());
		var method = "";

		$('#insured_insuredRelatedToApplicantName').val(relatedToApplicantName);
		$('#insured_genderName').val(jQuery.trim($('#insured_gender').find('option:selected').text()));
		var formV = $('#addInsured_form').serialize();
		
		if($("#insuredOperateType").val() == "add"){
	    	var retVal=true;
	    	$("#bbr_list tr").each(function(){
	    		var insurantMatter= $(this).children().eq(0).text();
	    		if("本人"==jQuery.trim(insurantMatter)){
	    			retVal=false;
	    		}
	    	});
	    	if(!retVal && relatedToApplicant=='1'){
	    		
				var msg = "您好！您的保单信息需进一步确认，请致电热线10108888-2咨询";
				$.XYTipsWindow({
					___title:"信息提示",
					___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
					___width:"360",
					___height:"100",
					___drag:"___boxTitle",
					___showbg:true,
					___button:["确 定"],
				    ___callback:function(){
				    	changeAddButton("", "none");
				    	return true;
					}
				});
	    		return false;
	    	}			
			method = "addInsured";
		}else if($("#insuredOperateType").val() == "modi"){
			method = "modifyInsured";
		}else{
			changeAddButton("", "none");
			return;
		}
		
//		
// if(relatedToApplicant == "1"){
// $("#reset").trigger("click");
// }
		
		
		var isRepeat = false;
		
		// 投保人证件号
		var theInsuranceIdNumber = $("#idNumber").val();
		// 被保人证件号
		var theInsuredIdNumber = $("#insured_idNumber").val();
		var insuredIdType = $("#idType").val();
		var theInsuranceIdType = $("#insured_idType").val();
		
		if($("#productCode").val() != 'YC_GZRYRYX_GD' && $("#productCode").val() != 'YC_MXYYRYX_GD'&& $("#productCode").val() != 'YC_ZHWYRYX_GD'
			&& $("#productCode").val() != 'YC_GZRYRYX_TD'&& $("#productCode").val() != 'YC_MXYYRYX_TD'&& $("#productCode").val() != 'YC_ZHWYRYX_TD'){
			if(theInsuranceIdNumber != "" && theInsuranceIdNumber == theInsuredIdNumber){
				if(theInsuranceIdType!= "" && theInsuranceIdType == insuredIdType){
					if($("#productCode").val()=='WWB_ZYYL'){
						if(relatedToApplicant!=1){
							isRepeat = true;
							var msg = "您好！您的保单信息需进一步确认，请致电热线10108888-2咨询";
							$.XYTipsWindow({
								___title:"信息提示",
								___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
								___width:"360",
								___height:"100",
								___drag:"___boxTitle",
								___showbg:true,
								___button:["确 定"],
							    ___callback:function(){
							    	changeAddButton("", "none");
							    	return true;
								}
							});
						}
						
					}else{
						isRepeat = true;
						var msg = "您好！您的保单信息需进一步确认，请致电热线10108888-2咨询";
						$.XYTipsWindow({
							___title:"信息提示",
							___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
							___width:"360",
							___height:"100",
							___drag:"___boxTitle",
							___showbg:true,
							___button:["确 定"],
						    ___callback:function(){
						    	changeAddButton("", "none");
						    	return true;
							}
						});
					}
					
				}
			}
		}
		if(productCode == 'YC_GZRYRYX_GD'|| productCode == 'YC_MXYYRYX_GD'|| productCode == 'YC_ZHWYRYX_GD'){
			var person_type = $("#insured_insuredRelatedToApplicant").val() ;
			if(person_type==1&&
					!(($("#fullName").val() == $("#insured_fullName").val()) && 
							($("#idType").val() == $("#insured_idType").val()) && 
							($("#idNumber").val() ==  $("#insured_idNumber").val()) && 
							($("#gender").val() == $("#insured_gender").val()) && 
							($("#birthDate").val() == $("#insured_birthDate").val()) && 
							($("#phoneNumber").val() == $("#insured_phoneNumber").val()) && 
							($("#email").val() == $("#insured_email").val()))){
				var msg = "与投保人信息不一致";
				$.XYTipsWindow({
					___title:"信息提示",
					___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
					___width:"360",
					___height:"100",
					___drag:"___boxTitle",
					___showbg:true,
					___button:["确 定"],
				    ___callback:function(){
				    	changeAddButton("", "none");
				    	return true;
					}
				});
				return false;
			}
		}
		
		if(isRepeat){
			changeAddButton("", "none");
			return;
		}
		
		if(productCode=="TPY_ZGDZYYLBX_TD"||productCode=="TPY_ZGDZYYLBX_GD"||productCode=="WWB_ZYYL"){
			var enterAge;
			var insu_idType=$("#insured_idType").val();
			var relatedToApplicant=$('#insured_insuredRelatedToApplicant').val();
			var insu_card;
			//投保人证件类型
			var idType=$("#idType").val();
			//1为本人根据投保人来算年龄
			if(relatedToApplicant=='1'){
				if(idType=='1'){
					//投保人的身份证号
					insu_card = $("#idNumber").val().toUpperCase();
					// 将身份证号转成出生日期
					var birthday = ageByIdCard(insu_card);
					if (birthday == "") {
						return false;
					}
					enterAge = getAge(birthday);
				}else{
					var insured_birthDate=$("#birthDate").val();
					enterAge = getAge(insured_birthDate);
				}
				
			}else{
				//非本人
				if(insu_idType=='1'){
					//被保人的身份证号
					insu_card = $("#insured_idNumber").val().toUpperCase();
					// 将身份证号转成出生日期
					var birthday = ageByIdCard(insu_card);
					if (birthday == "") {
						return false;
						
					}
					enterAge = getAge(birthday);
				}else{
					var insured_birthDate=$("#insured_birthDate").val();
					enterAge = getAge(insured_birthDate);
				}
				
			}
			
			var plan = $("#plan").val();
			$("#productSerialNo").val(productCode +"_" +plan);
			formV +=("&enterAge="+enterAge);
		}
		
		if($("#insured_insuredRelatedToApplicant").val() == '1'){
			formV +=("&insured_birthDate="+$("#birthDate").val());
		}
		// 被保人验证
		$.ajax({
			url : "compareInsuredIdCard",
			type : "post",
			data : formV,
			dataType : "json",
			success : function(data){
				if(data.result == 0){
					$.ajax({
						url : method,
						type : "post",
						data : formV,
						dataType : "json",
						success : function(data){
							if(data.flag == 1){
								if(data.result == 1){
									var msg = "您好！最多只能添加50个被保人，请核对后重新输入";
									if(data.spec != null && data.spec != ''){
										msg="您好！本产品被保险人最多只能添加1个，请核对后重新输入";
									}
									$.XYTipsWindow({
										___title:"信息提示",
										___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
										___width:"360",
										___height:"100",
										___drag:"___boxTitle",
										___showbg:true,
										___button:["确 定"],
									    ___callback:function(){
									    	changeAddButton("", "none");
									    	return;
										}
									});
									changeAddButton("", "none");
									return ;
								}
								if(data.result == 2){
									var msg = "最多只能添加150个被保人";
									$.XYTipsWindow({
										___title:"信息提示",
										___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
										___width:"360",
										___height:"100",
										___drag:"___boxTitle",
										___showbg:true,
										___button:["确 定"],
									    ___callback:function(){
									    	changeAddButton("", "none");
									    	return;
										}
									});
									changeAddButton("", "none");
									return ;
								}
								if(data.index != -1){
									if(newMethod == "add"){
										if($("#insured_productTypeId").val() == '1'){
											if(productCode=="JTFW_JZJY_YN" && $("#productSerialNo").val().indexOf("JTFW_YNTTYWX_planB")>=0){
					    						calcEstateGrossPremiumForJTFW(data.grossPremium,$('#tyx_unitPremium_input').val(),$('#zrx_unitPremium_input').val(),data.tyx_count,data.zrx_count);
					    					}else if(productCode=="TPY_ZGDZYYLBX_TD"||productCode=="TPY_ZGDZYYLBX_GD"||productCode=="WWB_ZYYL"){
					    						getPremiun(data,newMethod);
					    						return;
					    					}else {
					    						calcEstateGrossPremium(data.grossPremium, data.unitPremium);
					    					}
										}
										else{
											theDetailCount = $("table[id='bbr_list']").find("tr").length;
											calcTheGrossPremium(data.grossPremium, theDetailCount);
										}
									}else if(newMethod == "modi" && $("#insured_productTypeId").val() == '1'){
										if(productCode=="JTFW_JZJY_YN" && $("#productSerialNo").val().indexOf("JTFW_YNTTYWX_planB")>=0){
				    						calcEstateGrossPremiumForJTFW(data.grossPremium,$('#tyx_unitPremium_input').val(),$('#zrx_unitPremium_input').val(),data.tyx_count,data.zrx_count);
				    					}else if(productCode=="TPY_ZGDZYYLBX_TD"||productCode=="TPY_ZGDZYYLBX_GD"||productCode=="WWB_ZYYL"){
				    						getPremiun(data,newMethod);  
				    						return;
				    					}else{
				    						calcEstateGrossPremium(data.grossPremium, data.unitPremium);    						
				    					}
									}
									
									$.XYTipsWindow.removeBox();
									
									if (($.browser.msie) && ($.browser.version == "6.0")){$('#premiums_form select').show();$('html,body').css({"overflow":"hidden","overflow-y":"auto"});}
									var startTR = "<tr id=\"insured_list_row_" + data.index + "\">";
									var endTR = "</tr>";
									var str = '';
									if(relatedToApplicant == '1'){
										str = "<td class='w_col_0'>本人</td>";
										if($("#insured_productCode").val() == 'JWLXX_ZG_GD'){
		        							str += "<td colspan='6'>同投保人信息</td>";
		        							}else{
										    str += "<td colspan='5'>同投保人信息</td>";
		        							}
									}else{
										str = "<td class='w_col_0'>" + $('#insured_insuredRelatedToApplicant').find('option:selected').text() + "</td><td>&nbsp;" + $('#insured_fullName').val() + "</td>" ;
										var proCode = $("#insured_productCode").val();
										if(proCode == 'JWLXX_ZG_GD'){
		        							str += "<td>"+ $('#insured_nameSpell').val()+"&nbsp;</td>";
		        							}
											str +=  "<td>"+ $('#insured_idNumber').val()+ "</td>";
											str += "<td>" + jQuery.trim($('#insured_gender').find('option:selected').text());
											str += "</td><td>" + $('#insured_birthDate').val() ;
										if(proCode=='2311990000000000' || proCode =='2310990000000000' || proCode == '2101740000000000' 
											|| proCode =='2101750000000000' || proCode =='GDYH_LYYW_JN'|| proCode =='GDYH_LYYW_JW'||proCode=='JWLXBX_JY'||proCode=='JWLXBX_ZG'){
											str += "</td><td>" + $('#insured_emergencyPhoneNumber').val() + "&nbsp;</td>";
										}else if(proCode == 'GRWYDQ'||proCode == 'GH_SJYHDQ'){
											str += "</td><td>" + $('#insured_bankCardNumber').val() + "&nbsp;</td>";
										}else if(proCode == 'CWX_N'){
											str += "</td><td>" + $('#insured_bankCardNumber').val() + "&nbsp;</td>";
										}else if(proCode == '2308990000000000'){
											str += "</td><td>" + $('#insured_drivingLicense').val() + "&nbsp;</td>";
										}else if(proCode == 'GRYWX'){
											str += "</td><td>" + $('#insu_third_occupationName').val() + "&nbsp;</td>";
										}else if(proCode == 'LM_QZYLBX'||proCode == 'LM_LYAQRYX'){
											
											str += "</td><td>" + getAge($('#insured_birthDate').val()) + "&nbsp;</td>";
										}else {
												str += "</td><td>" + $('#insured_phoneNumber').val() + "&nbsp;</td>";
										}
									}
									str += "<td><a href=\"javascript:void(0)\" class=\"under_link modifybbr\" index=" + data.index + ">修改</a> ";
									str += "<a href=\"javascript:void(0)\" class=\"under_link delbbr\" index=" + data.index + ">删除</a></td>";
									if(newMethod == "add"){
										$("#bbr_list").append(startTR + str + endTR);
									}else if(newMethod == "modi"){
										$("#insured_list_row_" + data.index).html(str);
									}else{}						
									
									changeAddButton("", "none");
									$('#reset').click();
								}
							}else{
								var errorMsg = "";
								if($("#insuredOperateType").val() == "add"){
									errorMsg = "添加";
								}else if($("#insuredOperateType").val() == "modi"){
									errorMsg = "修改";
								}
								changeAddButton("", "none");
								popupMessage(360,100,"m_error",errorMsg+"被保人失败，请刷新页面再试");
							}
						},
						error : function(){
							changeAddButton("", "none");
							if(method == 'addInsured'){
								monitorError("NONCAR0004");
							}else{
								monitorError("NONCAR0005");
							}
						}
					});
				}else{
					// alert($("#insuredOperateType").val());
					var msg = "";
					if(data.result == 1){
						msg = "您好！您的保单信息需进一步确认，请致电热线10108888-2咨询";
					}if(data.result == 2){
						msg = "您好！您的保单信息需进一步确认，请致电热线10108888-2咨询";
					}else if(data.result == -100){
						if(data.ip.substr(0,6) != '10.190'){
							msg = "ip:"+data.ip+",port:"+data.port+",<br/>sessionid:"+data.sessionId+"<br/>productCode:"+data.productCode+",random:"+data.random;
						}else{
							msg = "系统异常，请稍后再试";
						}
					}
					
					$.XYTipsWindow({
						___title:"信息提示",
						___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
						___width:"360",
						___height:"100",
						___drag:"___boxTitle",
						___showbg:true,
						___button:["确 定"],
					    ___callback:function(){
					    	changeAddButton("", "none");
					    	return;
						}
					});						
				}
			},
			error : function(data){
				changeAddButton("", "none");
				monitorError("NONCAR0003");
				popupMessage(360,100,"m_error","系统错误，请稍后再试");
			}
		});	
		
		
	});

	// 删除被保人
	$(".delbbr").live("click",function(){
		var index = $(this).attr('index');
		var productCode = $("#insured_productCode").val();
		var random = $("#insured_random").val();
		var productTypeId = $("#insured_productTypeId").val();
		$.XYTipsWindow({
			___title:"对话框",
			___content:"text:<div class='message_text'><span class='m_confirm'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>您好！被保险人是否确定删除，请再次确认</td></tr></table></div>",
			___width:"360",
			___height:"100",
			___drag:"___boxTitle",
			___showbg:true,
			___button:["是","否"],
		    ___callback:function(val){
		    	if(val == "是"){
		    		$.ajax({
		    			url : 'delInsured',
		    			type : "post",
		    			data : {index : index, productCode : productCode, random : random, productTypeId : productTypeId},
		    			dataType : 'json',
		    			success : function(data){
		    				if(data.result == 0){
		    					$("#insured_list_row_" + index).remove();
		    					
		    					theDetailCount = $("table[id='bbr_list']").find("tr").length - 1;
		    					if($("#insured_productTypeId").val() == '1'){
		    						if(productCode=="JTFW_JZJY_YN" && $("#productSerialNo").val().indexOf("JTFW_YNTTYWX_planB")>=0){
			    						calcEstateGrossPremiumForJTFW(data.grossPremium,$('#tyx_unitPremium_input').val(),$('#zrx_unitPremium_input').val(),data.tyx_count,data.zrx_count);
			    					}else if(productCode=="TPY_ZGDZYYLBX_TD"||productCode=="TPY_ZGDZYYLBX_GD"){
			    						calcEstateGrossPremium();
			    					}else{
			    						calcEstateGrossPremium(data.grossPremium, data.unitPremium);    						
			    					}
		    					}else{
		    						calcTheGrossPremium(data.grossPremium, theDetailCount);
		    					}
							if('CYTX_LYYWX_TD'==productCode){
		    						$('#insurednum').val(theDetailCount);
		    					}
								
		    				}
		    			},
		    			error : function(){
		    				monitorError("NONCAR0006");
		    			}
		    		});
		    	}
			}
		});
	});
	
	// 折叠展开
	$(".common_nav a.under_link").click(function(){
	    if($(this).html() == "展开") {
			$(this).html("展开").removeClass("up_link");
			$(this).parent("h3.common_nav").siblings(".content_box").hide();
		}else {
			$(this).html("收起").addClass("up_link");
			$(this).parent("h3.common_nav").siblings(".content_box").show();
		}
	});
});

/**
 * 
 * 添加被保人按钮状态改变方法 当点击添加/修改被保人窗口的按钮后，此按钮将变灰且不可点击，在添加完成后，再恢复此按钮状态
 * 
 * @param par1
 * @param par2
 * 
 */
function changeAddButton(par1, par2){
	$("#bbr_config_disabled").html($("#bbr_config").html());
	$("#bbr_config").css("display", par1);
	$("#bbr_config_disabled").css("display", par2);
}

function changeAddButton2(par1, par2){
	$("#bbr_config_disabled2").html($("#bbr_config2").html());
	$("#bbr_config2").css("display", par1);
	$("#bbr_config_disabled2").css("display", par2);
}

function changeNextButton(par1, par2){
	$("#nextButtonInfo_disabled").html($("#nextButtonInfo").html());
	$("#nextButtonInfo").css("display",par1);
	$("#nextButtonInfo_disabled").css("display",par2);
}

function changeMyNextButton(par1, par2){
	$("#mYnextButtonInfo_disabled").html($("#mYnextButtonInfo").html());
	$("#mYnextButtonInfo").css("display",par1);
	$("#mYnextButtonInfo_disabled").css("display",par2);
}

function initSexAndDateCss(idCardType, gender, idNumber, idCardClass, birthDate){
	// 如果是身份证，则不允许编辑出生日期文本框，只能通过输入身份证号以后自动生成
	if(idCardType == "1"){
		var tempDate = $("#" + birthDate).val();
		$("#spe_"+ birthDate).html("<input id='"+birthDate+"' name='"+birthDate+"' value='"+tempDate+"' type='text' class='common_input required insuredAge' readonly='readonly' />");		
		// 性别选择框禁止修改
		$("#" + gender).bind("focus",function(){
			$(this).blur();
		});		
		// 增加身份证验证class
		$("#" + idNumber).addClass(idCardClass);
		// 出生日期取消日期选择绑定
		$("#" + birthDate).unbind("focus");
		$("#" + birthDate).bind("focus",function(){
			$(this).blur();
		});
	}else if(idCardType == "6"){
		// 增加身份证验证class
		$("#" + idNumber).addClass(idCardClass);
	}else if(idCardType == "9") {
		var tempDate = $("#" + birthDate).val();
		$("#spe_"+ birthDate).html("<input id='"+birthDate+"' name='"+birthDate+"' onchange='underAgeInfo();' value='"+tempDate+"' type='text' class='common_input required insuredAge' onfocus=WdatePicker({isShowClear:false,readOnly:true,maxDate:'"+$('#currentDate').val()+"'}) />");
		//<input id="insured_birthDate_bak" type="hidden"/>
		// 性别选择框允许修改
		$("#" + gender).unbind("focus");
		// 增加身份证验证class
		$("#" + idNumber).addClass(idCardClass);
		$("#" + birthDate).unbind("focus");
	}else{
		var tempDate = $("#" + birthDate).val();
		$("#spe_"+ birthDate).html("<input id='"+birthDate+"' name='"+birthDate+"' onchange='underAgeInfo();' value='"+tempDate+"' type='text' class='common_input required insuredAge' onfocus=WdatePicker({isShowClear:false,readOnly:true,maxDate:'"+$('#currentDate').val()+"'}) />");
		//<input id="insured_birthDate_bak" type="hidden"/>
		// 性别选择框允许修改
		$("#" + gender).unbind("focus");
		// 增加身份证验证class
		$("#" + idNumber).removeClass(idCardClass);
		$("#" + birthDate).unbind("focus");
	}
}


/**
 * 通过身份证返回出生日期
 * 
 * @param idCard
 *            15/18位身份证号码
 * 
 * @return 年龄
 */ 
var theBirthDate = "";
function ageByIdCard(idCard){
   var birYear = null;
   var birMonth = null;
   var birDay = null;

   if(idCard.length == 18){
	   birYear=idCard.substr(6,4);
       birMonth=idCard.substr(10,2);
       birDay=idCard.substr(12,2);
   }
   if(idCard.length == 15){
     birYear = "19" + idCard.substr(6,2);
     birMonth = idCard.substr(8,2);
     birDay = idCard.substr(10,2);
   } 
   
   if(birYear == null || birMonth == null || birDay == null){
       theBirthDate = "";
   }else{
	   theBirthDate = birYear + "-" + birMonth + "-" + birDay;
   }
   return theBirthDate;
}

/**
 * 
 * 姓名的拼音必须与被保人姓名拼音一致
 * 
 */ 

function compareNameSpell(nameSpell){
	if($("#insured_insuredRelatedToApplicant").val() != "1"){
		var insured_fullNameSpell = changeToPinyin($("#insured_fullName").val()).trim().replace(" ","").replace(" ","").replace(" ","");
		nameSpell = $("#insured_nameSpell").val().toUpperCase().trim().replace(" ","").replace(" ","").replace(" ","");
		if(insured_fullNameSpell == nameSpell){
			return true;
		}
		return false;
	}else{
		var fullNameSpell = changeToPinyin($("#fullName").val()).trim().replace(" ","").replace(" ","").replace(" ","");
		nameSpell = $("#insured_nameSpell").val().toUpperCase().trim().replace(" ","").replace(" ","").replace(" ","");
		if(fullNameSpell == nameSpell){
			return true;
		}
		return false;
	}
}

function checkBankCard(bankCard){
	var s = bankCard;
	var reg = /^\d{8,20}$/;
	if(reg.test(s))
		return true;
		
	return false;
}

function checkPingYin(temp){
	var pinyin = temp.toUpperCase();
	$("#insured_nameSpell").val(pinyin);
	var reg = /^[A-Z]+\s{1}[A-z]+(\s{1}[A-Z]+)*\s?$/;
	if(reg.test(pinyin))
		return true; 
	return false;
}

function checkNumberOfPassengers(value){
	var passengers = $("#numberOfPassengers").val();
	var seats = $("#numberOfSeats").val();
	if($("#productCode").val() == 'ZYX_JSYSCYWX'){
		seats = $("#seatNum").val();
	}
		if(parseInt(passengers)>parseInt(seats))
			return false;
	
	return true;
	
}

function checkInsuredCount(insuredCount){
	var count = insuredCount;
	var productCode = $("#productCode").val(); 
	var productSerialNo = $("#productSerialNo").val();
	$("#insured_insuredRelatedToApplicant").val() != "1";
	// 产品份数校验配置，不同产品份数配置不同的正则表达式
	var regConf = {
			"ZRX_AJZH_C" : /^[1-9]{1}[0-9]{0,2}$/,
			"AJWYJCX_A" : /^(?!0)(?:[0-9]{1,3}|1000)$/,
			"AJWYJCX_B" : /^(?!0)(?:[0-9]{1,3}|1000)$/,
			"AJWYJCX_C" : /^(?!0)(?:[0-9]{1,3}|1000)$/
	};
	// 判断长白山团购购买份数
	if(productCode=='CBS_LYRS'){
		if(insuredCount>10){
			return false;
		}
		var insuredage=$("#birthDate").val();
		// 被保人日期
		if($("#insured_insuredRelatedToApplicant").val() != "1"){
			insuredage=$("#insured_birthDate").val();
		}
		var theCurrentDate = $("#currentDate").val();
		var theCurrentDateArr = theCurrentDate.split("-");

		var betweenYear = parseInt(theCurrentDateArr[0]) - parseInt(insuredage.split("-")[0]);
		if(productSerialNo=="CBS_LYRS_planA"){
			if(betweenYear<18&&insuredCount>1){return false;}			
		}else if(productSerialNo=="CBS_LYRS_planB"){
			if(insuredCount>5){
				return false;
			}else if(betweenYear<18){
				return false;
			}
		}else{
			if(insuredCount>1){
				return false;
			}
		}
		
		
	}
	
	var reg = /^[1-9]{1}[0-9]{0,1}$/;
	if(productCode && regConf[productCode]){
		reg = regConf[productCode] ;
	}
	return reg.test(count);
}


/**
 * 计算年龄
 * 
 * @param theBirthDate
 * @returns {Boolean}
 */
function checkBirthDateAge(theBirthDate){
    var betweenYear = 0;
	var theDateArr = theBirthDate.split("-");
	var theCurrentDate = $("#currentDate").val();
	var theCurrentDateArr = theCurrentDate.split("-");

	betweenYear = parseInt(theCurrentDateArr[0],10) - parseInt(theDateArr[0],10);
	if(betweenYear > 0){
		if(parseInt(theCurrentDateArr[1],10) < parseInt(theDateArr[1],10)){
			betweenYear--;
		}else if(parseInt(theCurrentDateArr[1],10) == parseInt(theDateArr[1],10)){
			if(parseInt(theCurrentDateArr[2],10) < parseInt(theDateArr[2],10)){
				betweenYear--;
			}
		}
	}
    return betweenYear >= 18 && betweenYear < 65;
}

/**
 * 计算年龄
 * 
 * @param theBirthDate
 * @returns {age}
 */
function getAgeByBirthDate(theBirthDate){
    var betweenYear = -1;
	var theDateArr = theBirthDate.split("-");
	var theCurrentDate = $("#currentDate").val();
	var theCurrentDateArr = theCurrentDate.split("-");

	betweenYear = parseInt(theCurrentDateArr[0]) - parseInt(theDateArr[0],10);
	if(betweenYear >= 0){
		if(parseInt(theCurrentDateArr[1],10) < parseInt(theDateArr[1],10)){
			betweenYear--;
		}else if(parseInt(theCurrentDateArr[1],10) == parseInt(theDateArr[1],10)){
			if(parseInt(theCurrentDateArr[2],10) < parseInt(theDateArr[2],10)){
				betweenYear--;
			}
		}
	}
    return betweenYear;
}


/**
 * 校验手机号码
 * 
 * @param mobilephone
 * @return true or false
 */
function checkMobile(mobilephone){
	 var s = mobilephone; 
	 var reg0 = /^13\d{9}$/;
	 var reg1 = /^15\d{9}$/;
	 var reg2 = /^18\d{9}$/;
	 var reg3 = /^14\d{9}$/;
	 var my = false;
	 if (reg0.test(s)) my = true;
	 if (reg1.test(s)) my = true;
	 if (reg2.test(s)) my = true;
	 if (reg3.test(s)) my = true;
	 if (!my){
	    return false;
	 }else{
		return true;
	 }
}

/**
 * 校验儿童的出生日期是否大于30天
 * 
 * @param theBirthDate
 * @return days
 */
function getAgeDayByBirthDate(theBirthDate){
	var theCurrentDate = $("#currentDate").val();
	
	var dt = Date.parse(theBirthDate.replace(/-/g,"/"));
	var birthDate = new Date(dt);
	
	var dtNow = Date.parse(theCurrentDate.replace(/-/g,"/"));
	var nowDate = new Date(dtNow);
	
	var date = nowDate.getTime()-birthDate.getTime();
	
	return Math.floor(date/(24*3600*1000));
}




/**
 * 
 * 校验参数日期是否早于当前日期
 * 
 * @param theDate
 * @return
 * 
 */
function compareDate(theDate){
	var startStr = theDate.split("-");
	var startDate = new Date(startStr[0],startStr[1]-1,startStr[2]);
	var currentDate = new Date();
	var year = currentDate.getFullYear();
	var month = currentDate.getMonth() + 1;
	var day = currentDate.getDate();
	var nowDate = new Date(year + "/" + month + "/" + day);
	if(startDate <= nowDate){
		return false;
	}
	return true;
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

/**
 * 
 * 生成保险止期
 * 
 */
function startPickedFunc(){
	var startDate = $("#inceptionDate").val();
	var endDate = calculateEndDate(startDate);
	$("#plannedEndDate").val(endDate);
}

/**
 * 
 * 判断被保人证件号是否与投保人证件号重复
 * 
 */
function compareInsuredAndInsurance(){
	// 如果被保人与投保人的证件类型都是身份证
	if($("#idType").val() == "1" && $("#insured_idType").val() == "1" && $("#insured_insuredRelatedToApplicant").val() != "1"){
		// 投保人身份证
		var theInsuranceIdNumber = $("#idNumber").val();
		// 被保人身份证
		var theInsuredIdNumber = $("#insured_idNumber").val();
		if(theInsuranceIdNumber != ""){
			if(theInsuranceIdNumber == theInsuredIdNumber){
				var msg = "被保人与投保人证件号重复！";
				$.XYTipsWindow({
					___title:"信息提示",
					___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
					___width:"360",
					___height:"100",
					___drag:"___boxTitle",
					___showbg:true,
					___button:["确 定"],
				    ___callback:function(){
				    	return true;
					}
				});
			}
		}
	}
}

/**
 * 
 * 计算保费，住要用于产险产品保费计算
 * 
 */
function calcPrice(){
    showLoading(); 
    var formV = $("#premiums_form").serialize();
    var coupon = $("#coupon").val();
    var productCode = $("#productCode").val();
    $.ajax({
  		url : ctx + "/sale/estate/loadProductPrice",
		type : "post",
		data : formV,
		dataType : "json",
		success : function(data){
			if(data.result == 0){
				if(null != productCode && ('CYTX_LYYWX' == productCode||'CYTX_LYYWX_TD' == productCode||'JNFA' == productCode||'JNFA_TD' == productCode||'ZYX_LYYWX'==productCode)){
					$("#unitPremium").html("网销优惠价：" + data.price +"元");
					$('#unitPremium_input').val(data.price);
					$("#orgPremium").remove();
				}else{
					if(coupon!= null &&coupon!= '' ){
						// 优惠券不为空显示团购价
						$("#unitPremium").html("团购价：" + parseInt(data.price) +"元");
					}else if(productCode=='JTSC_JAXJRYX'){
						var unitCount = $("#unitCount").val();
						if(unitCount=="1"||unitCount=="2"||unitCount=="3"||unitCount=="4"){
							var grossPremium = parseInt(unitCount)*parseInt(data.price);
							$("#unitPremium").html("网销优惠价：" + parseInt(grossPremium) +"元");							
						}else{
							$("#unitPremium").html("网销优惠价：" + parseInt(data.price) +"元");
						}							
					}else if(productCode=='ZXEG_HBYWX'){
						$("#unitPremium").html("价格：" + parseInt(data.price) +"元");
					}else{						
						$("#unitPremium").html("网销优惠价：" + parseInt(data.price) +"元");
					}
					if(productCode=="JTFW_JZJY_YN" && $("#productSerialNo").val().indexOf("JTFW_YNTTYWX_planB")>=0){
						$('#tyx_unitPremium_input').val(data.JTFW_YNTTYWX);
						$('#zrx_unitPremium_input').val(data.JZJYZRBX_YN);
					}
					$('#unitPremium_input').val(data.price);
					$('#sumInsured').val(data.sumInsured);
					if(parseInt(data.price) == parseInt(data.price_before))
						$("#orgPremium").remove();
					else{
						$("#orgPremium").html("原价："+parseInt(data.price_before)+"元");
						$("#discountRate").val(data.discountRate);
					}
				}
				
				// 光大家政雇佣
				if(null != productCode && 'GDYH_JZGY' == productCode){
					$("#orgPremium").remove();
					$("#unitPremium").html("网销优惠价：" + parseInt(data.price_before) +"元");
					$('#unitPremium_input').val(data.price_before);
				}
			}
			hiddenLoading();
		},
		error : function(data){
			$("#discountRate").val(data.discountRate);
			hiddenLoading();
			monitorError("NONCAR0001");
		}
	});
}

function calcPriceInfo(){
    showLoading(); 
    var formV = $("#premiums_form").serialize();
    var coupon = $("#coupon").val();
    var productCode = $("#productCode").val();
    $.ajax({
  		url : ctx + "/sale/estate/loadProductPriceTerm",
		type : "post",
		data : formV,
		dataType : "json",
		success : function(data){
			if(data.result == 0){
				
					if(coupon!= null &&coupon!= '' ){
						// 优惠券不为空显示团购价
						$("#unitPremium").html("团购价：" + parseInt(data.price) +"元");
					}else if(productCode=='JTSC_JAXJRYX'){
						var unitCount = $("#unitCount").val();
						if(unitCount=="1"||unitCount=="2"||unitCount=="3"||unitCount=="4"){
							var grossPremium = parseInt(unitCount)*parseInt(data.price);
							$("#unitPremium").html("网销优惠价：" + parseInt(grossPremium) +"元");							
						}else{
							$("#unitPremium").html("网销优惠价：" + parseInt(data.price) +"元");
						}							
					}else if(productCode=='ZXEG_HBYWX'){
						$("#unitPremium").html("价格：" + parseInt(data.price) +"元");
					}else{						
						$("#unitPremium").html("网销优惠价：" + parseInt(data.price) +"元");
					}
					
					$('#unitPremium_input').val(data.price);
					$('#sumInsured').val(data.sumInsured);
					if(parseInt(data.price) == parseInt(data.price_before))
						$("#orgPremium").remove();
					else{
						$("#orgPremium").html("原价："+parseInt(data.price_before)+"元");
						$("#discountRate").val(data.discountRate);
					}
				
				
				// 光大家政雇佣
				if(null != productCode && 'GDYH_JZGY' == productCode){
					$("#orgPremium").remove();
					$("#unitPremium").html("网销优惠价：" + parseInt(data.price_before) +"元");
					$('#unitPremium_input').val(data.price_before);
				}
			}
			hiddenLoading();
		},
		error : function(data){
			$("#discountRate").val(data.discountRate);
			hiddenLoading();
			monitorError("NONCAR0001");
		}
	});
}



/**
 * 
 * 查询是否为车险保单号
 * 
 */
function autoPolicyQuery(){
	
	var pNo = $("#AutoOrderNo").val();
	var orgType = $("#drivingCostomType").val();
	if(pNo==''){
		$("p[for='autoOrderNo']").html("");
		
	}
    params={policyNo:pNo};
    $.ajax({
    	url : ctx + "/sale/shortterm/autoPolicyQuery",
		type : "post",
		data : params,
		dataType : "json",
		success : function(data){
			if(data.result == 0){
				$("#drivingCostomType").val(1);
				if($("#productCode").val()=='LJRS_JSY'|| $("#productCode").val() == 'LJRS_JAJ' || $("#productCode").val() == 'LJRS_JAX'){
	    			if(orgType=="0"){
	    				$("#combo_list").css("display","none");
		    			$("#combo_list2").css("display","");
	    				var checked = $("input:radio:checked").val();
	    				var lastLetter = checked.substring(checked.length-1,checked.length);
	    				var newLastLetter = String.fromCharCode(lastLetter.charCodeAt(0)+planSpan);
	    				var new_combo = checked.substring(0,checked.length-1)+newLastLetter;
	    				$("input[type=radio][value="+new_combo+"]").attr("checked",'checked');
	    				$("#productSerialNo").val($("input:radio:checked").val());
	    			}
				}
				calcPrice();
				$("p[for='autoOrderNo']").html("");
			}else{
				if(data.result == 1)
				$("#drivingCostomType").val(0);
				if($("#productCode").val()=='LJRS_JSY' || $("#productCode").val() == 'LJRS_JAJ' || $("#productCode").val() == 'LJRS_JAX'){
	    			if(orgType=="1"){
	    				$("#combo_list").css("display","");
		    			$("#combo_list2").css("display","none");
		    			var checked = $("input:radio:checked").val();
	    				var lastLetter = checked.substring(checked.length-1,checked.length);
	    				var newLastLetter = String.fromCharCode(lastLetter.charCodeAt(0)-planSpan);
	    				var new_combo = checked.substring(0,checked.length-1)+newLastLetter;
	    				$("input[type=radio][value="+new_combo+"]").attr("checked",'checked');
	    				$("#productSerialNo").val($("input:radio:checked").val());
	    			}
				}
				
				calcPrice();
				if($("#AutoOrderNo").val()!='')
				$("p[for='autoOrderNo']").html("您好！您的保单信息需进一步确认，请致电热线10108888-2咨询");
			}
			
		},
		error : function(){
			monitorError("NONCAR0009");
		}
	});
}


/**
 * 
 * 在投被保人年龄校验规则不一致校验投保人年龄
 * 
 */
function checkApplAge(){
	var flag = true;
	var appBirthDate = $("#birthDate").val();
	$("#bbr_list tr").each(function(){
		var insurantMatter= $(this).children().eq(0).text();
		if('本人'==jQuery.trim(insurantMatter)){
			var applAge = getAgeByBirthDate(appBirthDate);
			if(parseInt(applAge)>70 || parseInt(applAge)<0){
				flag =  false;					
			}
		}
	});
	return flag;
}

function checkApplAgeGRYW(){
	var flag = true;
	var appBirthDate = $("#birthDate").val();
	$("#bbr_list tr").each(function(){
		var insurantMatter= $(this).children().eq(0).text();
		if('本人'==jQuery.trim(insurantMatter)){
			var applAge = getAgeByBirthDate(appBirthDate);
			if(parseInt(applAge)>65 || parseInt(applAge)<18){
				flag =  false;					
			}
		}
	});
	return flag;
}


function checkSelfAge(){
	var flag = true;
	var selfBirthDate = $("#birthDate").val();
	var selfAge = getAgeByBirthDate(selfBirthDate);
	if(parseInt(selfAge) >= 71 || parseInt(selfAge) <1)
		flag = false;
	
	return flag;
}
// 校验被保人为保人的年龄
function validateAge(startAge,endAge){
	var flag = true;
	var appBirthDate = $("#birthDate").val();
	$("#bbr_list tr").each(function(){
		var insurantMatter= $(this).children().eq(0).text();
		if('本人'==jQuery.trim(insurantMatter)){
			var applAge = getAgeByBirthDate(appBirthDate);
			if(parseInt(applAge)>endAge || parseInt(applAge)<startAge){
				flag =  false;	
			}
		}
		var birth= $(this).children().eq(4).text();
		if('出生日期'!=jQuery.trim(birth)&&'本人'!=jQuery.trim(insurantMatter)){
			var applAge = getAgeByBirthDate(birth);
			if(parseInt(applAge)>endAge || parseInt(applAge)<startAge){
				flag =  false;					
			}
		}
		
	});
	return flag;
}
/**
 * 获取两个日期间的天数
 * 
 * @param date1
 * @param date2
 * @returns {Number}
 */
function getDaysBetweenDate(date1,date2){

    var arr1 = date1.split("-"); 
    var arr2 = date2.split("-"); 
    
	var dt1 = new Date(); 
	dt1.setFullYear(arr1[0]); 
	dt1.setMonth(arr1[1] - 1); 
	dt1.setDate(arr1[2]); 
	var dt2 = new Date(); 
	dt2.setFullYear(arr2[0]); 
	dt2.setMonth(arr2[1] - 1); 
	dt2.setDate(arr2[2]); 
	var dif = dt2.getTime() - dt1.getTime(); 
	var days = dif / (24 * 60 * 60 * 1000); 
	
	return Math.round(days);
	
}

/**
 * 获取两个日期间的天数
 * 
 * @param date1
 * @param date2
 * @returns {boolean}
 */
function checkBetweenDate(date1,date2){

	var arr1 = date1.split("-");
	var arr2 = date2.split("-");
	var dt1 = new Date(arr1[0],arr1[1],arr1[2]);

	var dt2 = new Date(arr2[0],arr2[1],arr2[2]);
	
	return dt1.getTime() > dt2.getTime();
	
}

/**
 * 产险检查车牌号
 */
function checkLicensePlateNo(temp){
	
    var licensePlateNo = $.trim(temp).toUpperCase();
    $("#licensePlateNo").val(licensePlateNo);
	var per = /^[京津沪渝蒙新藏桂黑吉辽冀晋青鲁豫苏皖浙闽赣湘鄂粤琼甘陕川贵云宁]{1}[A-Z]{1}[A-Za-z0-9]{5}$/;
	var per1= /^[京]{1}[A-Z]{1}[A-Za-z0-9]{5,6}$/
	var per2=/[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]/im;
	var fanti=/^[滬遼晉魯蘇閩贛粵瓊陝貴雲甯]{1}/;
	var per3=/^[京]{1}[A-Z]{1}/;
	
	if(per.test(licensePlateNo) || per1.test(licensePlateNo)){
		return true ;
	}else{
		if(fanti.test(licensePlateNo) || per2.test(licensePlateNo)){
			$.validator.messages['licensePlateNo'] = "您好！您输入的车牌号包含繁体字、特殊字符，请重新输入";
			return false ; 
		}
	}
	$.validator.messages['licensePlateNo'] = "您好！车牌号码输入有误，请重新输入";
	return false ;
	}
	 

/**
 * 产险检查引擎号
 */
function checkEngineNo(engineNo){
	var e= engineNo;
	
// /^[a-zA-Z0-9]{0,13}$/
	var reg = /[0-9a-zA-Z\s*\-]{1,16}$/;
	if(reg.test(e))
		return true;
	return false;
}

/**
 * 产险境内旅游目的地,等待需求确认
 */
function checkDomesticTravelDest(dest){
	return true;
}

//畅游天下校验保险止期
function checkDays(){
	var productCode = $("#productCode").val();
	var planAll;
	if(productCode=='CYTX_LYYWX'){
		planAll = ['CYTX_LYYWX_planA','CYTX_LYYWX_planB','CYTX_LYYWX_planC','CYTX_LYYWX_planD','CYTX_LYYWX_planE',
	               'CYTX_LYYWX_planF','CYTX_LYYWX_planG','CYTX_LYYWX_planH','CYTX_LYYWX_planI','CYTX_LYYWX_planJ',
	               'CYTX_LYYWX_planK','CYTX_LYYWX_planL','CYTX_LYYWX_planM','CYTX_LYYWX_planN','CYTX_LYYWX_planO','CYTX_LYYWX_planP'];
	}else{
		planAll = ['CYTX_LYYWX_TD_planA','CYTX_LYYWX_TD_planB','CYTX_LYYWX_TD_planC','CYTX_LYYWX_TD_planD','CYTX_LYYWX_TD_planE',
		               'CYTX_LYYWX_TD_planF','CYTX_LYYWX_TD_planG','CYTX_LYYWX_TD_planH','CYTX_LYYWX_TD_planI','CYTX_LYYWX_TD_planJ',
		               'CYTX_LYYWX_TD_planK','CYTX_LYYWX_TD_planL','CYTX_LYYWX_TD_planM','CYTX_LYYWX_TD_planN','CYTX_LYYWX_TD_planO','CYTX_LYYWX_TD_planP'];
	}
	

	
	var minDay = [1,1,1,1,4,4,4,4,4,4,11,11,11,11,11,11];
	var maxDay = [3,3,3,3,10,10,10,10,10,10,20,20,20,20,20,20];
	var startDate = $("#inceptionDate").val();
	var plannedEndDate = $("#plannedEndDate").val();
	var productSerialNo = $("#productSerialNo").val();
	
	var policyUnit = 'd';
	var index = 0;
	var policyTerm = 1;
	$.each(planAll,function(n,value){
		if(value==productSerialNo){
			index = n;
			return false;
		}
	});
	policyTerm= minDay[index];
	var minDate = dateAdd(policyUnit, policyTerm, startDate);
	policyTerm= maxDay[index];
	var maxDate = dateAdd(policyUnit, policyTerm, startDate);
	
	var minStr = minDate.split("-");
	var maxStr = maxDate.split("-");
	var endStr = plannedEndDate.split("-");
	var date1 = new Date(minStr[0],minStr[1]-1,minStr[2]);
	var date2 = new Date(maxStr[0],maxStr[1]-1,maxStr[2]);
	var date = new Date(endStr[0],endStr[1]-1,endStr[2]);
	if(date>date2||date<date1){
		alertErroMsg("保险止期只能在"+minDate+"和"+maxDate+"之间！");
		return false;
	}
	return true;
}

function validateInsuredNum(prodCode , elementId){
	var check = true ;
	var element = $("#"+elementId);
	var prodConstant = {
			"11075700" : 2
	};
	
	if(prodCode && prodConstant[prodCode]){ 
		if(element && element.find('tr')){
			if(element.find('tr').length==prodConstant[prodCode]){
				check =false ;
				var msg = "您好！本产品只能添加一个被保人，请核对后重新输入";
				$.XYTipsWindow({
					___title:"信息提示",
					___content:"text:<div class='message_text'><span class='m_error'></span><table width='100%' border='0' cellspacing='0' cellpadding='0' class='m_text'><tr><td>" + msg + "</td></tr></table></div>",
					___width:"360",
					___height:"100",
					___drag:"___boxTitle",
					___showbg:true,
					___button:["确 定"],
				    ___callback:function(){
					}
				});
			}
		}
		
	}
	
	return check ;
}

/**
 * 跟据出生日期算年龄
 * 
 * @param strBirthday
 * @return
 */
function getAge(strBirthday)
{   
	var birthday=new Date(strBirthday.replace(/-/g, "\/")); 
	var d=new Date();

	/**
	 * (birthday.getDate()-1)为新宝对状元宝宝年龄计算方法 举例 2011-11-22这查询出生日期2010-11-22为28周岁
	 * 2011-11-22这查询出生日期2010-11-23为28周岁 2011-11-22这查询出生日期2010-11-24为27周岁
	 */
	return d.getFullYear()-birthday.getFullYear()-((d.getMonth()<birthday.getMonth()|| (d.getMonth()==birthday.getMonth() && d.getDate()<birthday.getDate()))?1:0); 

}


function getuuid()
{   
	var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

	     var res = "";
	     for(var i = 0; i < n ; i ++) {
	         var id = Math.ceil(Math.random()*35);
	         res += chars[id];
	     }
	     return res;

}

function buma(productName,step,elementName){
	var s=s_gi(s_account);
	s.linkTrackVars='prop56';
	s.prop56=""+productName+":"+step+":"+elementName+"";
	s.tl(this,'o', ''+elementName+'');

}
