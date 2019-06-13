//公共页头页尾加载
if (typeof jQuery !== "undefined") {
    var footerLoaded = false,headerLoaded = false;
    //提供公共头部、底部加载完后的回调函数：可用于在加载前使用loading蒙版，通过回调函数取消loading蒙版
    if(typeof afterCommonLoaded === "function"){
        var loadedInterval = window.setInterval(function(){
            if(footerLoaded && headerLoaded){
                clearInterval(loadedInterval);
                afterCommonLoaded();
            }
        },100);
    }
    
    $(function () {
        var HEAD_URL = "/cpic/include/template/v2/common/header.shtml", FOOTER_URL = "/cpic/include/template/v2/common/footer.shtml";
        var $header = $("#commonHeader"), $footer = $("#commonFooter"), $body = $("body");
        var afteHeaderLoaded = function () {
            //调用顶部的绑定脚本
            if (typeof commonHandler === "function") {
                commonHandler();
            }
        }
        //加载公共脚本和样式 
        if (typeof commonHandler === "undefined") {
                        var s_locHost=window.location.host
                        if(s_locHost.indexOf("wwwsit") >= 0 ) {
                          $("head").append('<link  rel="stylesheet" href="/cpic/css/v2/common.css?v=2.6" /><script type="text/javascript" src="/cpic/js/v2/common.js?v=2.2"></script>')
                        } else {
                            $("head").append('<link  rel="stylesheet" href="/cpic/css/v2/common.css?v=2.6" /><script type="text/javascript" src="/cpic/js/v2/common.js?v=2.2"></script>')
                        }
            
        }
        //加载公共顶部
        if ($header.length > 0) {
            $header.load(HEAD_URL, function(){headerLoaded = true;afteHeaderLoaded();})
        } else {
            $.get(HEAD_URL, function (headHtml) {
                $(headHtml).prependTo($body);
                headerLoaded = true;
                afteHeaderLoaded();
            });
        }
        //加载公共底部
        if ($footer.length > 0) {
            $footer.load(FOOTER_URL, function(){footerLoaded = true;})
        } else {
            $.get(FOOTER_URL, function (footerHtml) {
                $(footerHtml).appendTo($body);
                footerLoaded = true;
            });
        }
    })
} else {
    if (typeof console !== "undefined") {
        console.error("必须在加载脚本前引入jQuery");
    } else {
        alert("必须在加载脚本前引入jQuery");
    }
}