

if (typeof (bfast) == "undefined"){
	
	var localCity = [
	              	{provinceCode:"110000", cityCode:"110100", text:"北京",dpt:'20127',carNo:'京A',pName:'北京市',cName:'北京市'},
	              	{provinceCode:"310000", cityCode:"310100", text:"上海",dpt:'2022003',carNo:'沪A',pName:'上海市',cName:'上海市'},
	              	{provinceCode:"440000", cityCode:"440100", text:"广州",dpt:'2043503',carNo:'粤A',pName:'广东省',cName:'广州市'},
	 				{provinceCode:"830000", cityCode:"440300", text:"深圳",dpt:'20516',carNo:'粤B',pName:'深圳市',cName:'深圳市'},	
	              	{provinceCode:"320000", cityCode:"320500", text:"苏州",dpt:'24528',carNo:'苏E',pName:'江苏省',cName:'苏州市'},
	              	{provinceCode:"330000", cityCode:"330100", text:"杭州",dpt:'2120956',carNo:'浙A',pName:'浙江省',cName:'杭州市'},
	              	{provinceCode:"320000", cityCode:"320100", text:"南京",dpt:'2108904',carNo:'苏A',pName:'江苏省',cName:'南京市'},
	              	{provinceCode:"120000", cityCode:"120100", text:"天津",dpt:'20321',carNo:'津A',pName:'天津市',cName:'天津市'},
	              	{provinceCode:"370000", cityCode:"370100", text:"济南",dpt:'2365701',carNo:'鲁A',pName:'山东省',cName:'济南市'},
	              	{provinceCode:"370000", cityCode:"370200", text:"青岛",dpt:'2113678',carNo:'鲁B',pName:'山东省',cName:'青岛市'},
	              	{provinceCode:"420000", cityCode:"420100", text:"武汉",dpt:'2091301',carNo:'鄂A',pName:'湖北省',cName:'武汉市'},
	              	{provinceCode:"430000", cityCode:"430100", text:"长沙",dpt:'22019',carNo:'湘A',pName:'湖南省',cName:'长沙市'},
	              	{provinceCode:"210000", cityCode:"210100", text:"沈阳",dpt:'20606',carNo:'辽A',pName:'辽宁省',cName:'沈阳市'},
	              	{provinceCode:"510000", cityCode:"510100", text:"成都",dpt:'2269302',carNo:'川A',pName:'四川省',cName:'成都市'},
	              	{provinceCode:"500000", cityCode:"500100", text:"重庆",dpt:'21821',carNo:'渝A',pName:'重庆市',cName:'重庆市'},
	              	{provinceCode:"610000", cityCode:"610100", text:"西安",dpt:'21700',carNo:'陕A',pName:'陕西省',cName:'西安市'},
	              	{provinceCode:"340000", cityCode:"340100", text:"合肥",dpt:'22528',carNo:'皖A',pName:'安徽省',cName:'合肥市'},
	              	{provinceCode:"350000", cityCode:"350100", text:"福州",dpt:'21319',carNo:'闽A',pName:'福建省',cName:'福州市'},
	              	{provinceCode:"220000", cityCode:"220100", text:"长春",dpt:'2082504',carNo:'吉A',pName:'吉林省',cName:'长春市'}
//	              	{provinceCode:"130000", cityCode:"130100", text:"石家庄",dpt:'2242635',carNo:'冀A',pName:'河北省',cName:'石家庄'}
	              ]
}else{
	
	var asd2= bfast;
	if(asd2=="T"){
		var localCity = [
		                {provinceCode:"110000", cityCode:"110100", text:"北京",dpt:'20127',carNo:'京A',pName:'北京市',cName:'北京市'},
		              	{provinceCode:"310000", cityCode:"310100", text:"上海",dpt:'2022003',carNo:'沪A',pName:'上海市',cName:'上海市'},
		              	{provinceCode:"440000", cityCode:"440100", text:"广州",dpt:'2043503',carNo:'粤A',pName:'广东省',cName:'广州市'},
		 				{provinceCode:"830000", cityCode:"440300", text:"深圳",dpt:'20516',carNo:'粤B',pName:'深圳市',cName:'深圳市'},	
		              	{provinceCode:"320000", cityCode:"320500", text:"苏州",dpt:'24528',carNo:'苏E',pName:'江苏省',cName:'苏州市'},
		              	{provinceCode:"330000", cityCode:"330100", text:"杭州",dpt:'2120956',carNo:'浙A',pName:'浙江省',cName:'杭州市'},
		              	{provinceCode:"320000", cityCode:"320100", text:"南京",dpt:'2108904',carNo:'苏A',pName:'江苏省',cName:'南京市'},
		              	{provinceCode:"120000", cityCode:"120100", text:"天津",dpt:'20321',carNo:'津A',pName:'天津市',cName:'天津市'},
		              	{provinceCode:"370000", cityCode:"370100", text:"济南",dpt:'2365701',carNo:'鲁A',pName:'山东省',cName:'济南市'},
		              	{provinceCode:"370000", cityCode:"370200", text:"青岛",dpt:'2113678',carNo:'鲁B',pName:'山东省',cName:'青岛市'},
		              	{provinceCode:"420000", cityCode:"420100", text:"武汉",dpt:'2091301',carNo:'鄂A',pName:'湖北省',cName:'武汉市'},
		              	{provinceCode:"430000", cityCode:"430100", text:"长沙",dpt:'22019',carNo:'湘A',pName:'湖南省',cName:'长沙市'},
		              	{provinceCode:"210000", cityCode:"210100", text:"沈阳",dpt:'20606',carNo:'辽A',pName:'辽宁省',cName:'沈阳市'},
		              	{provinceCode:"510000", cityCode:"510100", text:"成都",dpt:'2269302',carNo:'川A',pName:'四川省',cName:'成都市'},
		              	{provinceCode:"500000", cityCode:"500100", text:"重庆",dpt:'21821',carNo:'渝A',pName:'重庆市',cName:'重庆市'},
		              	{provinceCode:"610000", cityCode:"610100", text:"西安",dpt:'21700',carNo:'陕A',pName:'陕西省',cName:'西安市'},
		              	{provinceCode:"340000", cityCode:"340100", text:"合肥",dpt:'22528',carNo:'皖A',pName:'安徽省',cName:'合肥市'},
		              	{provinceCode:"350000", cityCode:"350100", text:"福州",dpt:'21319',carNo:'闽A',pName:'福建省',cName:'福州市'},
		              	{provinceCode:"220000", cityCode:"220100", text:"长春",dpt:'2082504',carNo:'吉A',pName:'吉林省',cName:'长春市'}
//		              	{provinceCode:"130000", cityCode:"130100", text:"石家庄",dpt:'2242635',carNo:'冀A',pName:'河北省',cName:'石家庄'}
		              ]
	}else{
	var localCity = [
	             	{provinceCode:"110000", cityCode:"110100", text:"北京",dpt:'20127',carNo:'京A',pName:'北京市',cName:'北京市'},
	             	{provinceCode:"310000", cityCode:"310100", text:"上海",dpt:'2022003',carNo:'沪A',pName:'上海市',cName:'上海市'},
	             	{provinceCode:"440000", cityCode:"440100", text:"广州",dpt:'2043503',carNo:'粤A',pName:'广东省',cName:'广州市'},
					{provinceCode:"830000", cityCode:"440300", text:"深圳",dpt:'20516',carNo:'粤B',pName:'深圳市',cName:'深圳市'},	
	             	{provinceCode:"320000", cityCode:"320500", text:"苏州",dpt:'24528',carNo:'苏E',pName:'江苏省',cName:'苏州市'},
	             	{provinceCode:"330000", cityCode:"330100", text:"杭州",dpt:'2120956',carNo:'浙A',pName:'浙江省',cName:'杭州市'},
	             	{provinceCode:"320000", cityCode:"320100", text:"南京",dpt:'2108904',carNo:'苏A',pName:'江苏省',cName:'南京市'},
	             	{provinceCode:"120000", cityCode:"120100", text:"天津",dpt:'20321',carNo:'津A',pName:'天津市',cName:'天津市'},
	             	{provinceCode:"370000", cityCode:"370100", text:"济南",dpt:'2365701',carNo:'鲁A',pName:'山东省',cName:'济南市'},
	             	{provinceCode:"370000", cityCode:"370200", text:"青岛",dpt:'2113678',carNo:'鲁B',pName:'山东省',cName:'青岛市'},
	             	{provinceCode:"420000", cityCode:"420100", text:"武汉",dpt:'2091301',carNo:'鄂A',pName:'湖北省',cName:'武汉市'},
	             	{provinceCode:"430000", cityCode:"430100", text:"长沙",dpt:'22019',carNo:'湘A',pName:'湖南省',cName:'长沙市'},
	             	{provinceCode:"210000", cityCode:"210100", text:"沈阳",dpt:'20606',carNo:'辽A',pName:'辽宁省',cName:'沈阳市'},
	             	{provinceCode:"510000", cityCode:"510100", text:"成都",dpt:'2269302',carNo:'川A',pName:'四川省',cName:'成都市'},
	             	{provinceCode:"500000", cityCode:"500100", text:"重庆",dpt:'21821',carNo:'渝A',pName:'重庆市',cName:'重庆市'},
	             	{provinceCode:"610000", cityCode:"610100", text:"西安",dpt:'21700',carNo:'陕A',pName:'陕西省',cName:'西安市'},
	             	{provinceCode:"340000", cityCode:"340100", text:"合肥",dpt:'22528',carNo:'皖A',pName:'安徽省',cName:'合肥市'},
	             	{provinceCode:"350000", cityCode:"350100", text:"福州",dpt:'21319',carNo:'闽A',pName:'福建省',cName:'福州市'},
	             	{provinceCode:"220000", cityCode:"220100", text:"长春",dpt:'2082504',carNo:'吉A',pName:'吉林省',cName:'长春市'}
//	             	{provinceCode:"130000", cityCode:"130100", text:"石家庄",dpt:'2242635',carNo:'冀A',pName:'河北省',cName:'石家庄'}
	             ]
	}
}

var addInitCity = 0;                  
             
var serverCity = '';


function selectCity(){
	var provinceCode = GetQueryString("provinceCode");
	var number = 0;
		//获取该省份下面的城市
		var cities = 	$("#cityes").val();
		var cityMess=[];
		var citiesArray =cities.split("|");
		//遍历
		for ( var i = 0; i < citiesArray.length; i++) {
			if(citiesArray[i] == null || "" == citiesArray[i]){
				continue;
			}
			var citiesMessArray = citiesArray[i].split(",");
			if(citiesMessArray == null){
				continue;
			}
			if(citiesMessArray.length>=9){
				var params = {};
				params['provinceCode'] = citiesMessArray[0];
				params['cityCode'] = citiesMessArray[2];
				if(number == 0){
					number+=1;
					loadCityInitSe(citiesMessArray[0],citiesMessArray[2]);
				}
				params['text'] = citiesMessArray[4];
				//暂时用cityCode替代
				params['dpt'] = citiesMessArray[2];
				params['carNo'] = citiesMessArray[8];
				params['pName'] = citiesMessArray[1];
				params['cName'] = citiesMessArray[3];
				cityMess.push(params);
			}
		}
		localCity = cityMess;
}