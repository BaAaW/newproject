(function(){
	function sortNumber(a, b){return a - b;}
	function SearchText(){};
	SearchText.prototype = {
	    //generate the list content
		_getListCt: function(){
			var self = this , fl = 'list-f', ls = "<div class='search'>", data = this._serverCity || this.localCity;
			var flag=this.insured;
			//默认搜索返回是有值的
			this.emptySearchFlag="N";
			
		    if(flag=="Y"){
		    	self.popCt.addClass('search-list-insured'); 
		    	//self.popCt.addClass('search-list');
		    }else if(flag=="A"){
		    
		    	self.popCt.addClass('search-list-insured-asset');
		    	
		    }else if(flag=="N"){
		    
		    	self.popCt.addClass('search-list');
		    }
			 
			if(self._serverCity && self._serverCity.length > 0){
			   fl = 'list-l';
			}else{
				if($.trim(self.input.val()) && self.isSearch){
					ls += ['<div class="n-f">对不起，找不到: ',self.input.val(),'</div>'].join('');
					//搜索结果为空
					this.emptySearchFlag="Y";
				}else{
					//ls += ["<div class='search title'><div class='search'>",self.title,"</div><a class='close'></a></div>"].join('');
					ls+=['<div class="city_select_tt"><b>热门城市</b>(可选择城市或输入城市全拼/简拼)</div>'].join('');
					  if(flag=="Y"){
						  ls +='<div class="city_select_tab_insured"><ul style="padding:0 ,0px"><li class="current" style="padding:0 0 0 0">热门</li><li style="padding:0 0 0 0;font-size:10px">ABCDEF</li><li style="padding:0 0 0 0;font-size:10px">GHIJ</li><li style="padding:0 0 0 0;font-size:10px">KLMN</li><li style="padding:0 0 0 0;width:62px;font-size:10px">PQRSTUVW</li><li style="padding:0 0 0 0;font-size:10px">XYZ</li></ul></div>';
					  }else if(flag == "A"){
						  ls +='<div class="city_select_tab_insured_asset"><ul style="padding:0 ,0px"><li class="current" style="padding:0 0 0 0">热门</li><li style="padding:0 0 0 0;font-size:10px">ABCDEF</li><li style="padding:0 0 0 0;font-size:10px">GHIJ</li><li style="padding:0 0 0 0;font-size:10px">KLMN</li><li style="padding:0 0 0 0;width:62px;font-size:10px">PQRSTUVW</li><li style="padding:0 0 0 0;font-size:10px">XYZ</li></ul></div>';
					  }else{
						  ls +='<div class="city_select_tab"><ul style="padding:0 ,0px"><li class="current" style="padding:0 0 0 0">热门</li><li style="padding:0 0 0 0;font-size:10px">ABCDEF</li><li style="padding:0 0 0 0;font-size:10px">GHIJ</li><li style="padding:0 0 0 0;font-size:10px">KLMN</li><li style="padding:0 0 0 0;width:62px;font-size:10px">PQRSTUVW</li><li style="padding:0 0 0 0;font-size:10px">XYZ</li></ul></div>';
					  }
				}
			}
			if(data && data.length > 0){
				ls += "<div class='city_select_content'><ul>";
				$.each(data,function(){
					ls += ["<li class=",fl," t=",this.text," p='",this.provinceCode,"'c='",this.cityCode,"'dpt='",this.dpt,"'pName='",this.pName,
					"'cName='",this.cName,"'carNo='",this.carNo,"'><span><a href='javascript:void(0);'>",this.text,"</a></span>","<span><a class='list-a' style='display:",
					fl == 'list-l' ? 'inline':'none',"' href='javascript:void(0);'>",this['alias'],'</a></span>',"</li>"].join('')
				})	
				ls += '</ul></div>';
			}
		
			//按字母加载数据(ABCDEF)
			ls+='<div class="city_select_content" style="display:none"><ul  style="height: 165px;overflow-y: auto;overflow-x:hidden;">';
			$.each(this.localABCDEF,function(){
						ls += ["<li style='width:39px' class=",fl," t=",this.text," p='",this.provinceCode,"'c='",this.cityCode,"'dpt='",this.dpt,"'pName='",this.pName,
						"'cName='",this.cName,"'carNo='",this.carNo,"'><span><a href='javascript:void(0);'>",this.text,"</a></span>","<span><a class='list-a' style='display:",
						fl == 'list-l' ? 'inline':'none',"' href='javascript:void(0);'>",this['alias'],'</a></span>',"</li>"].join('')
			})	
			ls+='</ul></div>';
			//按字母加载数据(GHIJ)
			ls+='<div class="city_select_content" style="display:none"><ul  style="height: 165px;overflow-y: auto;overflow-x:hidden;">';
			$.each(this.localGHIJ,function(){
						ls += ["<li style='width:39px' class=",fl," t=",this.text," p='",this.provinceCode,"'c='",this.cityCode,"'dpt='",this.dpt,"'pName='",this.pName,
						"'cName='",this.cName,"'carNo='",this.carNo,"'><span><a href='javascript:void(0);'>",this.text,"</a></span>","<span><a class='list-a' style='display:",
						fl == 'list-l' ? 'inline':'none',"' href='javascript:void(0);'>",this['alias'],'</a></span>',"</li>"].join('')
			})	
			ls+='</ul></div>';
			
			//按字母加载数据(KLMN)
			ls+='<div class="city_select_content" style="display:none"><ul style="height: 165px;overflow-y: auto;overflow-x:hidden;">';
			$.each(this.localKLMN,function(){
						ls += ["<li style='width:39px' class=",fl," t=",this.text," p='",this.provinceCode,"'c='",this.cityCode,"'dpt='",this.dpt,"'pName='",this.pName,
						"'cName='",this.cName,"'carNo='",this.carNo,"'><span><a href='javascript:void(0);'>",this.text,"</a></span>","<span><a class='list-a' style='display:",
						fl == 'list-l' ? 'inline':'none',"' href='javascript:void(0);'>",this['alias'],'</a></span>',"</li>"].join('')
			})	
			ls+='</ul></div>';
			//按字母加载数据(PQRSTU)
			ls+='<div class="city_select_content" style="display:none"><ul style="height: 165px;overflow-y: auto;overflow-x:hidden;">';
			$.each(this.localPQRSTU,function(){
						ls += ["<li style='width:39px' class=",fl," t=",this.text," p='",this.provinceCode,"'c='",this.cityCode,"'dpt='",this.dpt,"'pName='",this.pName,
						"'cName='",this.cName,"'carNo='",this.carNo,"'><span><a href='javascript:void(0);'>",this.text,"</a></span>","<span><a class='list-a' style='display:",
						fl == 'list-l' ? 'inline':'none',"' href='javascript:void(0);'>",this['alias'],'</a></span>',"</li>"].join('')
			})	
			ls+='</ul></div>';
			//按字母加载数据(XYZ)
			ls+='<div class="city_select_content" style="display:none"><ul style="height: 165px;overflow-y: auto;overflow-x:hidden;">';
			$.each(this.localXYZ,function(){
						ls += ["<li style='width:39px' class=",fl," t=",this.text," p='",this.provinceCode,"'c='",this.cityCode,"'dpt='",this.dpt,"'pName='",this.pName,
						"'cName='",this.cName,"'carNo='",this.carNo,"'><span><a href='javascript:void(0);'>",this.text,"</a></span>","<span><a class='list-a' style='display:",
						fl == 'list-l' ? 'inline':'none',"' href='javascript:void(0);'>",this['alias'],'</a></span>',"</li>"].join('')
			})	
			ls+='</ul></div>';
			
			return ls + '</div>';
		},
		//bind the click event
		_listClick: function(){
			var self = this;
//			$('.search-list li',this.popCt).live('click',function(e){
			var flag=this.insured;
			var name='.search-list li';
		    if(flag=="Y"){
		    	name='.search-list-insured li';
		    }else if(flag=="A"){
		    	name='.search-list-insured-asset li';
		    }
			$(name).live('click',function(e){
				if(self.emptySearchFlag=="N"){
                var t = e.target;
                while(t!= this && t.parentNode) t = t.parentNode;
                self.setValue($(t).attr('t'),[$(t).attr('p'),$(t).attr('c'),$(t).attr('pName'),$(t).attr('cName'),$(t).attr('dpt'),$(t).attr('carNo')].join('|'));
				}else{
				
					self.input.val("");
				}
                self._triggerEvent('select',self.hiddenField.val(),e);
                self.close();
                return false;
            });
			$(document).bind('click',function(e){
				
				if(!$(e.target).hasClass('search') && self.isShow){
					items = self.popCt.find('li');
					if(self.isShow && items.size() > 0){
						var it = items.filter('.li-hover'), li = ''; it.removeClass('li-hover'), inx = items.index(it);
						it.click();
					}
				
				  self.close();
				  
				}
			}).bind('keydown',function(e){
				
				var keyCode = e.keyCode , items = self.popCt.find('li');
				if(keyCode == 229) self.isEnterKey = true;
				if(items.hasClass('list-l')){ --keyCode;}
				if(self.isShow && items.size() > 0){ 
					var it = items.filter('.li-hover'), li = ''; it.removeClass('li-hover'), inx = items.index(it);
					if(keyCode == 38){
					   li = (inx - 4) >= 0 ? items.eq(inx - 4) : it;
					   if(inx == 0) li = it.siblings(':last');
					}else if (keyCode == 40){
					   li = (inx + 4) <= 19 ? items.eq(inx + 4) : it;
					   if(inx == 19) li = it.siblings(':first')
					}else if(keyCode == 13){
					   if(it.size() > 0) it.click();
					}else if(keyCode == 37){
					   li = it.prev().size() > 0 ? it.prev() : it.siblings(':last');
					}else if(keyCode == 39){
					   li = it.next().size() > 0 ? it.next() : items.eq(0);
					}else if((keyCode == 12 || keyCode == 27) && self.isShow){
						if(keyCode == 12) it.click();
						self.close();
					}
					if(li && li.length > 0) li.addClass('li-hover');
				}else{
				   if(self.hiddenField.val() && (keyCode == 12 || keyCode == 13)){
				      self._triggerEvent('focus',e);
				   }
				}
			});
			//热门城市和省市tab切换
			 var  tabName=".city_select_tab li";
			  if(flag=="Y"){
				  tabName='.city_select_tab_insured li';
			  }else if(flag=="A"){
				  tabName='.city_select_tab_insured_asset li';
			  }
				$(tabName).live('click',function(){
					self._show();
					self.isShow=false;
					$(this).addClass("current").siblings("li").removeClass();
					$(this).parents(".search").find(".city_select_content:eq("+$(this).index()+")").show().siblings(".city_select_content").hide();
				});	
				//鼠标离开事件
				$(tabName).live('mouseleave',function(){
					 self.isShow=true;
					 $(this).removeClass("li-hover");
					// $(this).removeClass();
				});	
				//获得鼠标指针
				$(tabName).live('mousemove',function(){
					 $(this).removeClass("li-hover");
				});	
		},    
		//reset ths list content
		_rebulidPopCt: function(){
		    this.popCt.empty().width(this.listWidth).append(this._getListCt()).hide();
			$('li',this.popCt).hover(function(){
			     $(this).siblings().removeClass('li-hover')
				 $(this).addClass('li-hover')
			  },function(){
			      //$(this).removeClass('li-hover')
			  });
		},	
		//display the list content
		_show: function(){
		  
			var ps = this.input;
			var flag=this.insured;
		    if(flag=="Y"){
		    	this.popCt.addClass('search-list-insured'); 
		    	//self.popCt.addClass('search-list');
		    }else if (flag=="N"){
		    	this.popCt.addClass('search-list');
		    }else  {
		    	this.popCt.addClass('search-list-insured-asset');
		    }
			this.popCt.css({position: 'absolute',left: (ps.position().left) + 'px',top: ps.position().top + ps.outerHeight() + 'px',width:'268px'})
			.css('z-index', 9999999).show();
			$('li:first',this.popCt).addClass('li-hover');
			if(!this.isShow) this._triggerEvent('drop');
			var h = $('li:first',this.popCt).innerHeight();
			if(!this._serverCity){
			 // $('ul',this.popCt).height(h*6);
			}else{
			  var isIE = $.browser.msie;
              var isIE6 = isIE && !window.XMLHttpRequest;
			  var isIE8 = isIE && !!document.documentMode;
              var isIE7 = isIE && !isIE6 && !isIE8;
			  //$('ul',this.popCt).height(h*((this._serverCity.length)+1));			 
			  //if(isIE6 || isIE7) $('li',this.popCt).height(h - 5);			  
			}
			if($("#vehicleIframeDIV")){
				//兼容IFrame显示  防止在IE6下，城市选择器 被<select>标签遮住
				$("#vehicleIframeDIV").show();
			/*	$("#vehicleIframeDIV").css("width",$(".search-list").css("width"));
				$("#vehicleIframeDIV").css("height",$(".search-list").css("height"));
				$("#vehicleIframeDIV").css("width",$(".search-list").css("width"));
				$("#vehicleIframeDIV").css("top",$(".search-list").css("top"));
				$("#vehicleIframeDIV").css("left",$(".search-list").css("left"));
				$("#vehicleIframeDIV").css("position",$(".search-list").css("position"));*/
				
				$("#vehicleIframeDIV").css("width",$(".search-list-insured").css("width"));
				$("#vehicleIframeDIV").css("height",$(".search-list-insured").css("height"));
				$("#vehicleIframeDIV").css("width",$(".search-list-insured").css("width"));
				$("#vehicleIframeDIV").css("top",$(".search-list-insured").css("top"));
				$("#vehicleIframeDIV").css("left",$(".search-list-insured").css("left"));
				$("#vehicleIframeDIV").css("position",$(".search-list-insured").css("position"));
			}
			this.isShow = true;
		},
		//close pop content
		close: function(){
			
			this.popCt.hide();
			//alert("2222")
			if($("#vehicleIframeDIV")){
				//兼容IFrame隐藏
				$("#vehicleIframeDIV").hide();
			}
			this.isShow = false;
			this._triggerEvent('undrop');
		},
		//bind search event
		_searchText: function(){
			var self = this;
			this.input.bind('keyup',function(e){
			  var keyCode = e.keyCode; 
			  self.isSearch = true;
			  if((keyCode >= 65 && keyCode <= 90)||(keyCode >= 48 && keyCode <= 57)||(keyCode >= 96 && keyCode <= 105)
			  || keyCode == 8 || keyCode == 32 || self.isEnterKey){
				 self.timeout = setTimeout(function(){
				    self.hiddenField.val('');
					self._triggerEvent('editor',self.input.val(),self.hiddenField,e);
					self._filterText(); 
					self._show();
					self.isEnterKey = false;
				 },300);
			  }else if($.inArray(keyCode,[37,38,39,40]) == -1){
				self.close();
			  }
			});
		},
		
		_filterText: function(txt){
		   var self = this , str = $.trim(txt || self.input.val()), ls = [] , ex = [];
		   if(str = str.toLowerCase().replace(/\\/g,'_')){
			  $(this.serverCity).each(function(i,n){
				  if(ls.length < 8){
				      var s = n.split(',') , 
				      isCn = /^[\u4e00-\u9fa5]/.test(str);
					  if(s[isCn ? 3 : 5].search(new RegExp("^" + str,'i')) > -1){
						 /0{2}$/.test(s[2]) ? ls.unshift(n) : ex.push(n);
					  }
					  else if(s[isCn ? 4 : 6].search(new RegExp("^" + str,'i')) > -1){
						/0{2}$/.test(s[2]) ? ls.unshift(n) : ex.push(n);
					  }
					  else if(s[2].search(new RegExp("^" + str,'i')) > -1){ // 通过城市代码查找
						/0{2}$/.test(s[2]) ? ls.unshift(n) : ex.push(n);
					  }
				  }
		      });
			  if(ls.length < 8) ls = ls.concat(ex.slice(0,8 - ls.length));
		   }
		   self._serverCity = (ls.length > 0 || str) ? self._filterData(ls) : '';		
		   self._rebulidPopCt();
		},
		//search result
        _filterData: function(ls){
        	
			var ls_data = [] , ix = 1000;
			$(ls).each(function(n,i){
			  var d = this.split(',');
			  if(d[4].indexOf('null') == -1){ 
			    var inx = Number(d[9] || ix++);
				ls_data.push({provinceCode:d[0],cityCode:d[2],text:d[4],pName:d[1],cName:d[3],alias:d[5],s:d[6],dpt:d[7],carNo:d[8],inx:inx})
			  }
			})
		   
		    return ls_data.sort(function(a,b){return a.inx > b.inx ? 1 : -1;});
		 },
		 //trigger eventhandler
        _triggerEvent: function(type,opt,e){
			var fn = this.opt[type];
			if(fn && $.isFunction(fn)) fn.apply(this,[opt,e]);
		},			
		//rebuild service data format
		_splitData: function(data){
			var self = this; this.citys = []; 
			$(data.replace(/(^\|*)|(\|*$)/g,'').split('||'))
			.each(function(i,n){
				n.indexOf('|') > -1 ? self._splitCity(n) : self.citys.push(n);
			})
			return self.citys;
		},		
		//bulid data string
		_splitCity: function(c){
			var self = this , ct = c.split('|'), p = ct[0].split(',');
		    $(ct).each(function(i,n){
//				self.citys.push(i > 0 ? ((p.slice(0,2).concat([n])).join(',')) : n);
				self.citys.push(n);
			})
		},	
		// bind input click event
		_inputClick: function(){
		   var obj = this;
		   obj.input.bind('click',function(){
				if($(this).hasClass('search-text')) $(this).removeClass('search-text').val('');
				obj._serverCity = ''; obj.isSearch = false; obj._rebulidPopCt();
				//$(this).val() ? obj._filterText() : obj._rebulidPopCt();
				if(this.createTextRange){
				   var r = this.createTextRange() , sel = r.duplicate();     
				   sel.moveStart("character", $(this).val().length);     
				   sel.setEndPoint("EndToStart", r);     
				   sel.select();
				}else{
				   this.setSelectionRange(0,$(this).val().length);  
				   this.focus();  
				}
				obj.isShow ? obj.close(): obj._show();	
			}).blur(function(e){
			   /*var li = $('.li-hover',obj.popCt);
			   if(li && li.length > 0 && li.hasClass('list-l')){
				  obj.setValue(li.attr('t'),[li.attr('p'),li.attr('c'),li.attr('pName'),li.attr('cName'),li.attr('dpt'),li.attr('carNo')].join('|'));
				  obj._triggerEvent('select',obj.hiddenField.val(),e);
			   }else{
				  obj.hiddenField.val();
			   }	*/
			})
		},
		//set hidden field value
		setValue: function(text,value){
			
			if(text && value){
				
			 // this.hiddenField.val(value);
			  var data=value.split('|');
			  //省
			 			  
			  this.hiddenField.val(data[0]);
			  //市
			  this.hiddenField1.val(data[1]);
			  //省名称
			  this.hiddenField2.val(data[2]);
			  //市名称
			  this.input.val(text);
			  
			  
			  var flag=this.insured;
			  if(flag=="N"){
				    $("label[for='cityName']").html("");
				    
			  }
			  $("label[for='insured_cityName']").html("");
			  if("undefined"!=typeof vmmm && vmmm=='T'){
					selectCityLocation();
				}
		   }
		},
		//ip location address
		locateAddress: function(text){
		  if(text && text.indexOf('.') > -1){ 	
			  var ad = text.split('.'); 
			  var vCityName = ad[ad.length-1];
			  this._filterText(vCityName); //取最后的值城市代码
			  var code = this._serverCity;
			  if(code && code.length > 0){
				this.setValue(code[0].text ,[code[0].provinceCode,code[0].cityCode,code[0].pName,code[0].cName,code[0].dpt,code[0].carNo].join('|'));
				this._triggerEvent('select',this.hiddenField.val());
			  }else{
				this._serverCity = '';
				this.input.addClass('search-text').val(vCityName)
			  }
		  }	
		}
		
	
		
	};
	 
	
	
	//setting init config

	Search = {
		init: function(elem,options){
		    var opt = options || {} , self = elem , addr = opt.address, obj = new SearchText();
		    obj.productType = opt.productType || "2";  // 新保转包1 ，续保 2
			obj.isShow = false; obj.listWidth = self.outerWidth() + (opt.expandWidth || 105);
			obj.localCity = opt.localCity;
			obj.localABCDEF = opt.localABCDEF;
			obj.localGHIJ = opt.localGHIJ;
			obj.localKLMN = opt.localKLMN;
			obj.localPQRSTU = opt.localPQRSTU;
			obj.localXYZ = opt.localXYZ;
			obj.serverCity = obj._splitData(opt.serverCity);	
			obj.title = opt.title || '&nbsp; 热门城市（其他城市请直接输入搜索）';
			obj.opt = opt; obj.popCt = $("<div>"); obj.input = self; 
			obj.hiddenField = opt.hideName;
			obj.hiddenField1 =opt.hideName1;
			obj.hiddenField2 =opt.hideName2;
			obj.insured=opt.insured;
			obj.emptySearchFlag='N';
			obj._inputClick(); obj._listClick(); self.after(obj.hiddenField).after(obj.popCt); obj._searchText();
			//obj.locateAddress(addr);
		}
	};
})()