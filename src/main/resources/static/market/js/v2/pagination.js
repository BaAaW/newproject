//分页插件
/**
2014-08-05 ch
**/
(function($){
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillHtml:function(obj,args){
			return (function(){
				obj.empty();
				//上一页
				if(args.current > 1){
					obj.append('<span class="prevPage "><i class="triangle-left"></i></span>');
				}else{
					obj.remove('.prevPage');
					obj.append('<span class="disabled"><i class="triangle-left"></i></span>');
				}
				//中间页码
				if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
					obj.append('<span class="tcdNumber">'+1+'</span>');
				}
				if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				var start = args.current -2,end = args.current+2;
				if((start > 1 && args.current < 4)||args.current == 1){
					end++;
				}
				if(args.current > args.pageCount-4 && args.current >= args.pageCount){
					start--;
				}
				for (;start <= end; start++) {
					if(start <= args.pageCount && start >= 1){
						if(start != args.current){
							obj.append('<span class="tcdNumber">'+ start +'</span>');
						}else{
							obj.append('<span class="current blue">'+ start +'</span>');
						}
					}
				}
				if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
					obj.append('<span class="tcdNumber">'+args.pageCount+'</span>');
				}
				//下一页
				if(args.current < args.pageCount){
					obj.append('<span class="nextPage"><i class="triangle-right"></i></span>');
				}else{
					obj.remove('.nextPage');
					obj.append('<span class="disabled"><i class="triangle-right"></i></span>');
				}
			})();
		},
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
				obj.on("click","span.tcdNumber",function(){
					var current = parseInt($(this).text());
					ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current);
					}
                  ms.jumpToTop(obj);
				});
				//上一页
				obj.on("click","span.prevPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current-1);
					}
                  ms.jumpToTop(obj);
				});
				//下一页
				obj.on("click","span.nextPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current+1);
					}
                  ms.jumpToTop(obj);
				});
			})();
		},
      
      
      //添加跳转至第一个条目方法
      jumpToTop:function(obj){
			//点击分页按钮页面滚动到第一个产品条目的位置
        var scroll_offset = $(".time").offset(); //得到pos这个div层的offset，包含两个值，top和left 
				$("body,html").animate({ 
				scrollTop:scroll_offset.top //让body的scrollTop等于pos的top，就实现了滚动 
				},0);
		}
      
	}
	$.fn.createPage = function(options){
		var args = $.extend({
			pageCount : 10,
			current : 1,
			backFn : function(){}
		},options);
		ms.init(this,args);
	}
})(jQuery);