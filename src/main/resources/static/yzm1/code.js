
$(function() {  
    var code = 9999; 
    function codes(){
    	
        var ranColor = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6); //随机生成颜色
    	// alert(ranColor)
    	var ranColor2 = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6); 
     	var num1 = Math.floor(Math.random() * 100);  
        var num2 = Math.floor(Math.random() * 100);  
        code = num1 + num2;  
        
        $("#code").html(num1 + "+" + num2 + "=?");  
        if ($("#code").hasClass("nocode")) {  
            $("#code").removeClass("nocode");  
            $("#code").addClass("code"); 
           
        }  
        $("#code").css('background',ranColor);
         $("#code").css('color',ranColor2);

    }
    codes()
   
    $("#code").on('click',codes)
      
    $("#policyBtn").click(function(){
       var sfz = $("#ploicyCertificateNum").val();
       //alert(sfz);
       var bdh = $("#policNo").val();
       //alert(bdh);
        if(($("#ploicyCertificateNum").val()).length!=18){
            //$("#reportCertificateNum").addClass("jg");
            alert('请输入正确的身份证号码！');
        }else {
            $("#ploicyCertificateNum").removeClass("jg");
        }
        if(($("#policNo").val()).length!=10) {
            alert('请输入正确的保单号！');
            //$("#reportNo").addClass("jg");
        }else {
            $("#policNo").removeClass("jg")
        }
        if ($(".input").val() == code && code != 9999) {
            if(($("#ploicyCertificateNum").val()).length!=18) {
                $("#ploicyCertificateNum").addClass("jg");
            }else if(($("#policNo").val()).length!=10) {
                $("#policNo").addClass("jg");
            }else {
         //alert("---表单验证通过---");
      $.post('/cpic/SelectLpbaodan',{'lpidnumber':sfz,'lpbdnumber':bdh},function (data) {
          //alert(data);
          if(data==0){
              alert("查无此单！")
          }else{
              var ct = $(".ul2");
              var yj = $("#yj2");
              ct.empty();
              yj.empty();
              /*var op = "<option value='"+n.cityName+"'>"+n.cityName+"</option>";
              op = $(op);
              ct.append(op);*/
              //alert(data);
              var jg = data;
              //alert(jg);
              //var op ="<div><input placeholder='"+jg+"'></div>"
              var op ="<div><input placeholder='理赔已处理"+jg+"%' readonly=\"readonly\"></div>" +
                  "<div class=\"layui-progress layui-progress-big\" lay-showPercent=\"true\">\n" +
                  "<div class=\"layui-progress-bar layui-bg-blue\" lay-percent=\"80%\" style='width: "+jg+"%'></div>\n" +
                  "</div>"
              op1 = $(op);
              ct.append(op1);
          }

      })
            }
        } else {  
            alert("请输入正确的验证码!");
        }  
    });  
});  
