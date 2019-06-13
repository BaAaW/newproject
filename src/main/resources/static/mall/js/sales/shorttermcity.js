$(function(){
	//加载中支公司数据
	$.ajax({
		type:"POST",
		data : {"productSerialNo" : $('#productSerialNo').val()},
		url:ctx +"/sale/code/findNewCity",
	
		success:function(data){
			var newLocalCity = [];
			for (var i = 0;i < localCity.length; i++){
				
				
					if(localCity[i].provinceCode != '830000'){
						var params = {};
						params['provinceCode'] = localCity[i].provinceCode;
						params['cityCode'] = localCity[i].cityCode;
						params['text'] = localCity[i].text;
						params['dpt'] = localCity[i].dpt;
						params['carNo'] = localCity[i].carNo;
						params['pName'] = localCity[i].pName;
						params['cName'] = localCity[i].cName;
						newLocalCity.push(params);
					}
				}
				
			
			if(($('#productSerialNo').val() == '2311990000000000_planE' 
				|| $('#productSerialNo').val() == '2311990000000000_planF' 
				|| $('#productSerialNo').val() == '2311990000000000_planG'
				|| $('#productSerialNo').val() == 'JWLXBX_ZG_planE'
				|| $('#productSerialNo').val() == 'JWLXBX_ZG_planF'
				|| $('#productSerialNo').val() == 'JWLXBX_ZG_planG'
					)){
				localCity = newLocalCity;
			}
			
			// 初始化车辆所在分公司地区数据
			serverCity=data;
			try{
				//由于宁波赔付率太高 故关闭宁波地区
				if($('#productSerialNo').val().indexOf('QNWS')>-1||$('#productSerialNo').val().indexOf('ZRX_AJZH_C')>-1){
					serverCity=serverCity.replace('330000,浙江省,330200,宁波市,宁波,Ningbo,NB,,|','');
				}
			}catch(Exception){}
			
			
			var ABCDEF="A,B,C,D,E,F";
			var GHIJ="G,H,I,J";
			var KLMN="K,L,M,N";
			var PQRSTU="P,Q,R,S,T,U,V,W";
			var XYZ="X,Y,Z";
			
			var localABCDEF=[];
			//根据首字母加载数据
			for (var i = 0; i < ABCDEF.split(",").length; i++) {
				searchData(ABCDEF.split(",")[i],localABCDEF,serverCity);
			}
			
			var localGHIJ=[];
			for (var i = 0; i < GHIJ.split(",").length; i++) {
				 searchData(GHIJ.split(",")[i],localGHIJ,serverCity);
			}
			var localKLMN=[];
			for (var i = 0; i < KLMN.split(",").length; i++) {
				searchData(KLMN.split(",")[i],localKLMN,serverCity);
			}
			var localPQRSTU=[];
			for (var i = 0; i < PQRSTU.split(",").length; i++) {
				searchData(PQRSTU.split(",")[i],localPQRSTU,serverCity);
			}
			var localXYZ=[];
			for (var i = 0; i < XYZ.split(",").length; i++) {
				searchData(XYZ.split(",")[i],localXYZ,serverCity);
			}
			
			Search.init($('#cityName'),{
				hideName: $('#province'),
				hideName1:$('#city'),
				hideName2:$('#provinceName'),
				localCity :localCity,
				localABCDEF: localABCDEF,
				localGHIJ: localGHIJ,
				localKLMN: localKLMN,
				localPQRSTU: localPQRSTU,
				localXYZ: localXYZ,
				serverCity: serverCity,
				address:"",
				productType:'1',
				insured:"N"	
			});
			
			Search.init($('#insured_cityName'),{
				hideName: $('#insured_province'),
				hideName1:$('#insured_city'),
				hideName2:$('#insured_provinceName'),
				localCity :localCity,
				localABCDEF: localABCDEF,
				localGHIJ: localGHIJ,
				localKLMN: localKLMN,
				localPQRSTU: localPQRSTU,
				localXYZ: localXYZ,
				serverCity: serverCity,
				address:"",
				productType:'1',
				insured:"Y"		
			});
			
			
			Search.init($('#insured_cityName_asset'),{
				hideName: $('#insured_province_asset'),
				hideName1:$('#insured_city_asset'),
				hideName2:$('#insured_provinceName_asset'),
				localCity :localCity,
				localABCDEF: localABCDEF,
				localGHIJ: localGHIJ,
				localKLMN: localKLMN,
				localPQRSTU: localPQRSTU,
				localXYZ: localXYZ,
				serverCity: serverCity,
				address:"",
				productType:'1',
				insured:"A"		
			});
		}
	});
});


function isNotNull(value){
	if(value != null && value != "" && value != undefined && value != "null" && value != "undefined"){
		return true;
	}else{
		return false;
	}	
}
function GetQueryString(name) {	 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	var r = decodeURI(location.search);
	r = r.substr(1).match(reg);
	if (r!=null) return unescape(r[2]); return null;
}



//根据首字母查询数据
function searchData(txt,data,serverCity){
	   var str = $.trim(txt), ls = [] , ex = [];
		   if(str = str.toLowerCase().replace(/\\/g,'_')){
		   		var citys = []; 
				$(serverCity.replace(/(^\|*)|(\|*$)/g,'').split('||')).each(function(i,n){
					if(n.indexOf('|') > -1){
						var ct =n.split('|'), p = ct[0].split(',');
					    $(ct).each(function(i,k){
							citys.push(k);
						})
					}else{
						citys.push(n)
					}
				})
				
			  $(citys).each(function(i,n){
				  //if(ls.length < 8){
				      var s = n.split(',') , 
				      isCn = /^[\u4e00-\u9fa5]/.test(str);
					  if(s[isCn ? 3 : 5].search(new RegExp("^" + str,'i')) > -1){
						 /0{2}$/.test(s[2]) ? ls.unshift(n) : ex.push(n);
						//晋江中支公司不是以00结尾，做特殊处理
						 if("350582"==s[2]){
							 ls.unshift(n);
						 }
					  }
					  else if(s[isCn ? 4 : 6].search(new RegExp("^" + str,'i')) > -1){
						/0{2}$/.test(s[2]) ? ls.unshift(n) : ex.push(n);
					  }
					  else if(s[2].search(new RegExp("^" + str,'i')) > -1){ // 通过城市代码查找
						/0{2}$/.test(s[2]) ? ls.unshift(n) : ex.push(n);
					  }
				//  }
		      });
			  if(ls.length < 8) ls = ls.concat(ex.slice(0,8 - ls.length));
		   }
		  
			var tempdata="" ;
			$(ls).each(function(n,i){
			  var d = this.split(',');
			  if(d[4].indexOf('null') == -1){ 
			  	data.push({provinceCode:d[0],cityCode:d[2],text:d[4],dpt:d[7],carNo:d[8],pName:d[1],cName:d[3]});
			  }
			})
}
