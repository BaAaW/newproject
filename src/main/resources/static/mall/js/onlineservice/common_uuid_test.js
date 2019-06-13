/**
 * @author zhaowendi
 */
$(function () {
	try{
		var cookieString = decodeURI(document.cookie);
		var cookieArray = cookieString.split("; ");
		var ade = false;
		for(var i=0;i<cookieArray.length;i++){
			var cookieNum = cookieArray[i].split("=");
			if(cookieNum[0] == "bd_uuid"){
				ade = true;
				break;
			}
		}
		if(!ade){
			$.getJSON("https://www.cpic.com.cn/mall/getuuid?jsonpCallback=?",function(result){
				var uuid = result.uuid;	
				var exp = new Date();
				exp.setTime(exp.getTime() + 365*24*60*60*1000*100);
				document.cookie="bd_uuid="+uuid+";path=/;expires="+exp;				
			});
		}
	}catch(Excepion){}
});
function getuuid(){
	try{
		cookieString = decodeURI(document.cookie);
		cookieArray = cookieString.split("; ");
		for(var i=0;i<cookieArray.length;i++){
			var cookieNum = cookieArray[i].split("=");
			if(cookieNum[0] == "bd_uuid"){
				return cookieNum[1];
			}
		}
	}catch(Excepion){}
	return "not find uuid";
}
		

