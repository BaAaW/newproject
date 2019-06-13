/**
 * 校验姓名
 * @param correctName 要校验的姓名
 */
function checkCorrectName(value){
	var flag = true;
	var msg = "";
	if (value.length == 0){
		msg = "您好！请输入姓名";
		flag = false;
	}else if((value.charAt(0) == "·") || (value.charAt(value.length-1) == "·")||(value.charAt(0) == " ") || (value.charAt(value.length-1) == " ")||(value.charAt(0) == ",")|| (value.charAt(value.length-1) == ",")){
		msg = "您好！姓名信息有误，请重新输入";
		flag = false;
	}else if(isChn_check(value.charAt(0))){
		if(value.length == 1){
			msg = "您好！姓名填写格式有误，请重新输入";
			flag = false;
		}
	}else if(isEng_check(value.charAt(0))){
		if(value.length == 1){
			msg = "您好！姓名填写格式有误，请重新输入";
			flag = false;
		}
	}
	if(flag == true){
		if(!matchType_check(value)){		
			msg = "您好！姓名信息有误，请重新输入";
			flag = false;
		}else if(isMix_check(value)){
			msg = "您好！姓名中不允许同时含有汉字与字母，请核对后重新输入";
			flag = false;
		}else if(kg_check(value)){
			msg = "您好！汉语姓名中不能包含空格，请核对后重新输入";
			flag = false;
		}else if(dh_check(value)){
			msg = "您好！汉语姓名中不能包含“,”，请核对后重新输入";
			flag = false;
		}else if(mulPoint_check(value)){
			msg = "您好！汉语姓名中不能包含多个“·”，请核对后重新输入";
			flag = false;
		}else if(matchEng_check(value)){
			msg = "您好！英文不能包含“·”，请核对后重新输入";
			flag = false;
		}else if(mulKg_check(value)){
			msg = "您好！英文中不能包含多个空格，请核对后重新输入";
			flag = false;
		}else if(mulDh_check(value)){
			msg = "您好！英文中不能包含多个“,”，请核对后重新输入";
			flag = false;
		}else if(upLength_check(value)){
			msg = "您好！姓名长度不能超过50个字符，请核对后重新输入";
			flag = false;
		}
	}
	return msg;
}

function matchType_check(str){
	var pattern = /^([a-zA-Z\u4e00-\u9fa5\s·,]+)$/g;
	if(pattern.test(str)){
		return true;
	}else{
		return false;
	}
}
//汉字姓名不能含空格
function kg_check(str){
	var patter = /^[\s]+\D*$/;
	var pattern2 = /^\D*[\s]\D*$/;
	var start = str.charAt(0);
	 if(isChn_check(start) ){//以汉字开头
		 if(pattern2.test(str)){			
				return true;
		 }
	 }else if(patter.test(str)){
		 var pattern3 = /^([\u4e00-\u9fa5\s·]+)$/g;
		 if(pattern3.test(str)){			
				return true;
		 }
	 }
}
//汉字姓名不能含逗号
function dh_check(str){
	var patter = /^[\,]+\D*$/;
	var pattern2 = /^\D*[\,]\D*$/;
	var start = str.charAt(0);
	 if(isChn_check(start) ){//以汉字开头
		 if(pattern2.test(str)){			
				return true;
		 }
	 }else if(patter.test(str)){
		 var pattern3 = /^([\u4e00-\u9fa5\,]+)$/g;
		 if(pattern3.test(str)){			
				return true;
		 }
	 }
}
//多个·处理
function mulPoint_check(str){
	var new_str = str.replace(/\·+/g,'·');
	if(new_str!=str){	
		return true;
	}
}

//多个空格处理
function mulKg_check(str){
	var new_str = str.replace(/\s+/g,' ');
	if(new_str!=str){	
		return true;
	}
}
//多个逗号处理
function mulDh_check(str){
	var new_str = str.replace(/\,+/g,',');
	if(new_str!=str){	
		return true;
	}
}


function isMix_check(str){
	 var start = str.charAt(0);
	 var leng = str.length;
	 if(isChn_check(start)){//以汉字开头
		 for(var i=1;i<leng;i++){
			 if(isEng_check(str.charAt(i))){				 
				 return true;
			 }
		 }
	 }else if(isEng_check(start)){
		 for(i=1;i<leng;i++){
			 if(isChn_check(str.charAt(i))){				
				 return true;
			 }
		 }
	 }else{
		 return false;
	 }	 
}
function isEng_check(str){
	var reg = "^[a-zA-Z\]+$";
	var re = new RegExp(reg);
	if(re.test(str)){
		return true;
	}else{
		return false;
	}
}

//英文中间不能有·
function matchEng_check(str){
	var reg_one =  /^([a-zA-Z\s]+)$/g;
	var patter = /^[\·]+\D*$/;
	var pattern2 = /^\D*[\·]\D*$/;
	var start = str.charAt(0);
	if(isEng_check(start)){
		if(pattern2.test(str)){			
			return true;
		}
	}else if(patter.test(str)){
		if(reg_one.test(str)){				
			return true;
		}
	}
	
}

function isChn_check(str){
	var reg =  "^[\u4e00-\u9fa5\]+$";
	var re = new RegExp(reg);
	if(re.test(str)){
		return true;
	}else{
		return false;
	}
}

function length_check(str){
	var leng = str.length;
	if(isChn_check(str)){	 
		if(leng >5){
			return true;
		}else{
			return false;
		}
	}
}

//姓名长度校验
function upLength_check(str){
	var leng = str.length;
	if(isChn_check(str)){	 
		if(leng >25){
			return true;
		}
	}else if(isEng_check(str)){
		if(leng >50){
			return true;
		}	
	}
}
