$(document).ready(function(){
               $.ajax({
					url: '/cpic/Proxy/oauth2/checkLogin?X-CAF-Authorization-Token=0275c9d1ecbe52fe8f902d493284b7cf',
					dataType: 'jsonp',
                 jsonp:'callbackparam',
					success: function(data){
                      //var userName = data.title.indexOf('UNM_')>-1?data.title.split('UNM_')[1]:data.title;
						var userName = data.nickname||data.username;
                        var loginHref = location.href;
						if(userName){
                          if(userName.indexOf('UNM_')>-1){
                      		userName = userName.split('UNM_')[1];
                      	  }
                          
                         var loginHtml="<span>尊敬的</span>"+
                            "<a href=\"/cpic/pc/views/ibox/safeboxindex/index.html\" title=\"会员中心\" target=\"_blank\"><font style=\"color:#FFFFFF\">"
                          +userName+"，</font></a>"+
                            "<span>欢迎您访问！</span><a href='/cpic/pc/views/member/logout.html?sysid=JTGW&redirect_uri="+loginHref+"'>退出</a>";
                          
                          if($(".loginPanel")){
                              $(".loginPanel").addClass("displayN");
                              $(".loggedPanel").removeClass("displayN");
                              $(".loggedName").html(userName);
                            }
                          $("#loginInfo").html(loginHtml);
                        }
                      
		 }});});