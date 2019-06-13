/*!
 * base.js v=2.0
 * date:2018-05-24
 *
 * autor:fsy
 *
 */
function setsensorsdata(params) {
    var param = params || {}
    var sd = {
        data: {
            //使用热力图功能的URL白名单
            heatmapURLWhiteList: param.heatmapURLWhiteList || [],
            //使用热力图功能表示
            heatmapURLWhiteListResult: false,
            //生产域名集合
            hostList: [
                // "service.cpic.com.cn", //小蓝鲸
                // "service1.cpic.com.cn", //小蓝鲸
                // "one.cpic.com.cn", //保险箱
                // "open.cpic.com.cn", //TJ小程序
                // 'wx.cpic.com.cn', //E服务微信
                // 'jkxwx.cpic.com.cn', //健康险微信
                // 'wxcdn.cpic.com.cn', //E服务微信
                // 'vip.cpic.com.cn', //客户俱乐部
                // 'www.cpic.com.cn', //集团官网
                // 'www.ecpic.com.cn', //集团官网
                // 'app3.cpic.com.cn', //集团官网
                // 'mall.cpic.com.cn', //集团官网
                // 'property.cpic.com.cn', //产险官网
                // 'life.cpic.com.cn', //寿险官网
                // 'asset.cpic.com.cn', //资产官网
                // 'health.cpic.com.cn', //健康险官网
                // 'a.cpic.com.cn', //本地活动
                // 'acdn.8686c.com', //本地活动
                // 'www.aaic.com.cn', //安信农险官网
                // 'www.cj-pension.com.cn', //长江养老官网
                // 'a2cdn3.8686c.com', //官网cdn域名
                // 'a2cdn3.cpiccdn.com', //官网cdn域名
                // 'm.cpic.com.cn', //非车移动
                // 'mcdn.cpiccdn.com', //非车移动
                // 'm.ecpic.com.cn' //非车移动
            ],
            project: param.project || 'TBJTGW',
            heatmap: param.heatmap || {}
        },
        created: function() {
            sd.setHead();
            sd.data.heatmapURLWhiteList.toString().indexOf(location.href.split(/\?|\#/)[0]) <= 0 ? sd.data.heatmapURLWhiteListResult = true : sd.data.heatmapURLWhiteListResult = false;
            sd.lodeSensorsdata(param)
            if (sd.getCookie('member_token') && JSON.parse(sd.getCookie('cpicsdData')) && (sd.getCookie('member_token') == JSON.parse(sd.getCookie('cpicsdData')).token)) {
                var getnum = parseInt(JSON.parse(sd.getCookie('cpicsdData')).data, 16) / 3
                sa.login(getnum);
            } else if (sd.getCookie('member_token') && (!JSON.parse(sd.getCookie('cpicsdData')) || (JSON.parse(sd.getCookie('cpicsdData')) && ((sd.getCookie('member_token') != JSON.parse(sd.getCookie('cpicsdData')).token))))) {
                sd.jsonp(sd.data.hostList.toString().indexOf(location.hostname) >= 0 ? 'Proxy/oauth2/checkLogin' : 'Proxy/oauth2/checkLogin')
            }
        },
        getCookie: function(key) {
            var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
            arr = document.cookie.match(reg);
            if (arr) {
                return unescape(arr[2]);
            } else {
                return null;
            }
        },
        /**
         * setCookie
         */
        setCookie: function(params) {
            params = params || {};
            //params=name, value,domain,expTime分钟        var exp = new Date();
            var expires = "";
            if (params.expTime) {
                params.expTime = params.expTime * 60 * 1000;
                exp.setTime(exp.getTime() + params.expTime);
                expires = ";expires=" + exp.toGMTString();
            }
            if (!params.domain) {
                params.domain = document.domain;
            }

            document.cookie = params.name + "=" +
                params.value + "; path=/; domain=" + params.domain + ";" + expires;
        },

        /**
         * removeCookie
         */
        removeCookie: function(p) {
            var dp = {
                domain: "",
                name: "",
                path: "/"
            };
            if (typeof p == 'object') {
                this.extend(dp, p);
            } else if (typeof p == 'string') {
                dp.name = p;
            }
            if (!dp.domain) {
                dp.domain = document.domain;
            }
            var exp = new Date("2000", "1", "1");
            var cval = this.getCookie(dp.name);
            if (cval != null) {
                document.cookie = dp.name + "=" + cval + ";domain=" + dp.domain + ";path=" + dp.path + ";expires=" + exp.toGMTString();
            } else {}
        },
        //触点判断
        getGchannel: function() {
            if (/cpicapp_android/i.test(navigator.userAgent) || /cpicapp_ios/i.test(navigator.userAgent)) {
                return 'APP';
            } else if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) {
                return 'W'
            } else {
                if (((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) && !/^www./.test(location.host)) || /^m./.test(location.host)) {
                    return 'T'
                } else {
                    return 'PC'
                }
            }
        },
        setHead: function() {
            //<meta name="referrer" content="always">
            var _meta = document.createElement('meta');
            _meta.setAttribute('name', 'referrer');
            _meta.setAttribute('content', 'always');
            document.querySelector('head').appendChild(_meta);
        },
        //jsonp请求方法
        jsonp: function(url, data, callback) {
            if (typeof data == 'string') {
                callback = data
                data = {}
            }
            var callbackName = 'loginCallback' + new Date().getTime()
            var hasParams = url.indexOf('?')
            url += hasParams >= 0 ? '&' : '?' + 'callbackparam=' + callbackName
            var params = '';
            for (var i in data) {
                params += '&' + i + '=' + data[i]
            }
            url += params

            var _script = document.createElement('script')
            _script.setAttribute('src', url)
            document.querySelector('head').appendChild(_script)
                //jsonp回调方法，需要是全局方法
            window[callbackName] = function(data) {
                if (data.logined) {
                    var getNum = data.mobile * 3;
                    var setdata = getNum.toString(16)
                    sd.setCookie({ name: 'cpicsdData', value: encodeURIComponent('{"data":"' + setdata + '","token":"' + data.token + '"}'), domain: '.cpic.com.cn' })
                    sa.login(data.mobile);
                }
                _script.parentNode.removeChild(_script);
            }
        },
        getQueryString: function(name, urls) {
            urls = urls || window.location.href;
            //删除锚点数据
            if (/\#.*?\&/.test(urls)) {
                urls = urls.substring(0, urls.lastIndexOf("#"));
            }

            if (urls && urls.indexOf("?") > -1) {
                urls = urls.substring(urls.indexOf("?") + 1);
            }
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = urls ? urls.match(reg) : window.location.search.substr(1).match(reg);
            if (r != null && r[2] != "") {
                var ms = r[2].match(/(\<)|(\>)|(%3C)|(%3E)/g);
                if (ms && ms.length >= 4) {
                    //如果检测到有2对及以上开始和结束尖括号
                    r[2] = r[2].replace(/(\<)|(%3C)/g, "");
                }
                return r[2];
                // return  unescape(r[2]);
            }
            return null;
        },
        lodeSensorsdata: function(param) {
            var sensorsdata = {
                sdk_url: 'sensorsdata/1.10.9/sensorsdata.min.js',
                name: 'sa',
                server_url: sd.data.hostList.toString().indexOf(location.hostname) >= 0 ? 'sa?project=' + sd.data.project : 'sa?project=' + sd.data.project,
                show_log: param.show_log || false, //设置 true 后会在网页控制台打 logger，会显示发送的数据,设置 false 表示不显示
                source_channel: ['cmpid'],
                heatmap_url: 'sensorsdata/1.10.9/heatmap.min.js',
                heatmap: {
                    //是否开启点击图，默认 default 表示开启，可以设置 'not_collect' 表示关闭
                    clickmap: sd.data.heatmap.clickmap || 'default',
                    //是否开启触达注意力图，默认 default 表示开启，可以设置 'not_collect' 表示关闭
                    scroll_notice_map: sd.data.scroll_notice_map || 'default',
                    //设置成 true 后，我们会自动给 a 标签绑定一个 sa.trackLink() 方法（详见本页 3.3 ）。
                    //如果是单页面 a 标签不涉及页面跳转或者 a 标签的点击是下载功能，建议不要打开。默认 false 。
                    isTrackLink: sd.data.isTrackLink || true,
                    //设置多少毫秒后开始渲染点击图,因为刚打开页面时候页面有些元素还没加载
                    loadTimeout: sd.data.loadTimeout || 3000,
                    //返回真会采集当前页面的数据，返回假表示不采集当前页面,设置这个函数后，内容为空的话，是返回假的。不设置函数默认是采集所有页面
                    collect_url: function() {
                        //如果只采集首页
                        if (param.showHeatmap || sd.data.heatmapURLWhiteListResult) {
                            return true;
                        }
                    },
                    // 设置触达图的有效停留时间，默认超过4秒以上算有效停留
                    scroll_delay_time: sd.data.scroll_delay_time || 4000
                } //必须配置这个参数才会发送数据，如果只想采集所有页面的仅交互按钮的数据，可以使用这种配置方式 heatmap:{}
            };
            if (!param.showHeatmap) {
                delete sensorsdata.heatmap;
                delete sensorsdata.heatmap_url;
            }
            if (sd.getQueryString('tingyun') == 'testing') {
                sensorsdata.server_url = '';
            }
            if (sd.getGchannel() == 'APP') {
                sensorsdata.use_app_track = true;
                sensorsdata.use_client_time = true;
            }
            (function(para) {
                var p = para.sdk_url,
                    n = para.name,
                    w = window,
                    d = document,
                    s = 'script',
                    x = null,
                    y = null;
                w['sensorsDataAnalytic201505'] = n;
                w[n] = w[n] || function(a) { return function() {
                        (w[n]._q = w[n]._q || []).push([a, arguments]); } };
                var ifs = ['track', 'quick', 'register', 'registerPage', 'registerOnce', 'trackSignup', 'trackAbtest', 'setProfile', 'setOnceProfile', 'appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify', 'login', 'logout', 'trackLink', 'clearAllRegister', 'getAppStatus'];
                for (var i = 0; i < ifs.length; i++) {
                    w[n][ifs[i]] = w[n].call(null, ifs[i]);
                }
                if (!w[n]._t) {
                    x = d.createElement(s), y = d.getElementsByTagName(s)[0];
                    x.async = 1;
                    x.src = p;
                    x.setAttribute('charset', 'UTF-8');
                    y.parentNode.insertBefore(x, y);
                    w[n].para = para;
                }
            })(sensorsdata);
            //增加来源
            sa.registerPage({
                $url: document.location.href.substring(0, 100),
                plat: sd.getGchannel(),
                referrer: document.referrer,
                cmpid1: sd.getQueryString('cmpid') || ''
            });
        }
    }
    sd.created()
}
// 神策布码 start
var sensorsdata = {
    project: "TBJTGW",
    show_log: false
}
if (window.location.pathname === '/' || window.location.pathname === "/index.shtml") {
    var sensorsdata = {
        project: "TBJTGW",
        showHeatmap: true,
        show_log: false,
    }
}
//cmsBase.loadJs('https://a2cdn3.8686c.com/sensorsdata/cpic.sd.js', function () {
setsensorsdata(sensorsdata)
    //})
    // 神策布码 start
    // -------------------------------------- 项目专属 start----------------------------------------
var cmsBase = cmsBase || {};
(function() {

    var that = this,

        core_version = "1.0",

        host = '',

        hostData = {
            m: {
                sit: {
                    cms: 'cpicmobile/pages/wap/html',
                    jpgw: '',
                    xlj: '',
                    bxxLoginUrl: 'pc/views/member/login.html',
                    loginStatusUrl: 'Proxy/oauth2/checkLogin?X-CAF-Authorization-Token=0275c9d1ecbe52fe8f902d493284b7cf',
                },
                prod: {
                    cms: 'm.cpic.com.cn',
                    jpgw: '',
                    xlj: '',
                    bxxLoginUrl: 'pc/views/member/login.html',
                    loginStatusUrl: 'Proxy/oauth2/checkLogin?X-CAF-Authorization-Token=0275c9d1ecbe52fe8f902d493284b7cf',
                }
            },
            pc: {
                sit: {
                    cms: '',
                    jpgw: '',
                    xlj: '',
                    bxxLoginUrl: 'pc/views/member/login.html',
                    loginStatusUrl: 'Proxy/oauth2/checkLogin?X-CAF-Authorization-Token=0275c9d1ecbe52fe8f902d493284b7cf',
                },
                prod: {
                    cms: '',
                    cdn: '',
                    jpgw: '',
                    xlj: '',
                    bxxLoginUrl: 'pc/views/member/login.html',
                    loginStatusUrl: 'Proxy/oauth2/checkLogin?X-CAF-Authorization-Token=0275c9d1ecbe52fe8f902d493284b7cf',
                }
            }
        };

    this.init = function() {
        //根据域名判断现在环境 start
        var a, b;
        a = cmsBase.operatingSystem.mobOrPc !== 'pc' ? 'm' : 'pc';
        b = cmsBase.environment;
        cmsBase.host = hostData[a][b];
        // 全局使用域名：cmsBase.host.cms
        //根据域名判断现在环境 end

    }

    /*
     * @function 环境判断
     * @return  sit || prod
     *
     */
    this.environment = function() {
            var host = location.href.match(/(http[s]?\:\/\/)(.*?)\//);
            if (host[0].split('.')[0].indexOf('sit') > 0 || !isNaN(Number(host[0].split('.')[0]))) {
                return 'sit';
            } else {
                return 'prod';
            }
        }()
        /*
         * @function 设备判断
         * @return  m || w || pc
         *
         */
    this.operatingSystem = {
        mobOrPc: function() {
            if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                if (isWeiXin()) {
                    return "w";
                } else {
                    return 'm';
                }
            } else {
                return 'pc';
            }

            //微信
            function isWeiXin() {
                var ua = window.navigator.userAgent.toLowerCase();
                if (/MicroMessenger/i.test(ua)) {
                    return true;
                } else {
                    return false;
                }
            };
        }()
    }

    /**
     * 动态加载JS
     * @param {string} url 脚本地址
     * @param {function} callback  回调函数
     */
    this.loadJs = function(url, callback) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            if (typeof(callback) == 'function') {
                script.onload = script.onreadystatechange = function() {
                    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                        callback();
                        script.onload = script.onreadystatechange = null;
                    }
                };
            }
            head.appendChild(script);
        }
        /*
         * @function 登录状态
         * @return  true||false
         * 问题：js是异步处理，会跳过ajax异步执行剩余代码，需要把代码加在ajax回调函数中
         */
        // this.loginStatus = function () {
        //   var status = false;
        //   $.ajax({
        //     url: cmsBase.host.loginStatusUrl,
        //     dataType: 'jsonp',
        //     jsonp: 'callbackparam',
        //     async: false,//可能会锁死页面 或者直接使用登录判断的url 重写ajax
        //   }).done(function (data) {
        //     var userName = data.username;
        //     if (undefined != userName && '' != userName) {
        //       status = true;
        //     }
        //   }).always(function(){
        //     return status;
        //   })

    // }

    //金牌顾问 相关跳转 start
    // 我要咨询和提需求
    this.gotoNeeds = function(productCode, productName) {
        var url;
        url ="o2o/llifeinsure/module/needs.html?source=GWYD&secondSource=DZBX&productCode=" + productCode + "&productName=" + productName;
        return url;
    }
    this.gotoSearch = function(productCode, productName) {
            var url;
            url = "o2o/llifeinsure/module/search.html?source=GWYD&secondSource=DLSS&productCode=" + productCode + "&productName=" + productName;
            return url;
        }
        //金牌顾问 相关跳转 end
}).call(cmsBase)
cmsBase.init();
// -------------------------------------- 项目专属 end----------------------------------------
// 神策补码模块 start
// var sensorsdata = {
//   sdk_url:  "/sensorsdata/sensorsdata.min.js",
//         name:  'sa',
//   show_log:false,
//         server_url:  cmsBase.environment == "prod" ? "https://xnjkfx.cpic.com.cn:8006/sa?project=JTGW" : "https://xnjkfxsit.cpic.com.cn/sa?project=JTGW"
// }
// if (window.location.pathname === '/' || window.location.pathname === "/index.shtml") {
//   sensorsdata.heatmap_url = "/sensorsdata/heatmap.min.js";
//   sensorsdata.heatmap = {
//     //是否开启点击图，默认 default 表示开启，可以设置 'not_collect' 表示关闭
//     clickmap:  'default',
//     //是否开启触达注意力图，默认 default 表示开启，可以设置 'not_collect' 表示关闭
//     scroll_notice_map:  'default',
//     //设置成 true 后，我们会自动给 a 标签绑定一个 sa.trackLink() 方法（详见本页 3.3 ）。
//     //如果是单页面 a 标签不涉及页面跳转或者 a 标签的点击是下载功能，建议不要打开。默认 false 。
//     isTrackLink:  false,
//     //设置多少毫秒后开始渲染点击图,因为刚打开页面时候页面有些元素还没加载
//     loadTimeout:  3000,
//     // 设置触达图的有效停留时间，默认超过4秒以上算有效停留
//     scroll_delay_time:  4000
//   };
// }
// (function  (para)  {
//   var  p  =  para.sdk_url,  n  =  para.name,  w  =  window,  d  =  document,  s  =  'script',  x  =  null,  y  =  null;
//   w['sensorsDataAnalytic201505']  =  n;
//   w[n]  =  w[n]  ||  function  (a)  {  return  function  ()  {  (w[n]._q  =  w[n]._q  ||  []).push([a,  arguments]);  }  };
//   var  ifs  =  ['track',  'quick',  'register',  'registerPage',  'registerOnce',  'trackSignup',  'trackAbtest',  'setProfile',  'setOnceProfile',  'appendProfile',  'incrementProfile',  'deleteProfile',  'unsetProfile',  'identify',  'login',  'logout',  'trackLink',  'clearAllRegister',  'getAppStatus'];
//   for  (var  i  =  0;  i  <  ifs.length;  i++)  {
//     w[n][ifs[i]]  =  w[n].call(null,  ifs[i]);
//   }
//   if  (!w[n]._t)  {
//     x  =  d.createElement(s),  y  =  d.getElementsByTagName(s)[0];
//     x.async  =  1;
//     x.src  =  p;
//     x.setAttribute('charset',  'UTF-8');
//     y.parentNode.insertBefore(x,  y);
//     w[n].para  =  para;
//   }
// })(sensorsdata);
// if(typeof pageName!='undefined'){
//   sa.quick('autoTrack', {
//     pageChannel: 'JTGW',
//     pageName:pageName
//   });
// }else{
//   sa.quick('autoTrack', {
//     pageChannel: 'JTGW',
//     pageName:'没有布置pageName'
//   });
// }
// 神策补码模块 end  
// -------------------------------------- 原型方法添加 start----------------------------------------
/**
 * 得到地址栏参数
 * @param name 参数名称
 * @param urls 从指定的urls获取参数
 * @returns string
 */
String.prototype.getQueryString = function(name, urls) {
    urls = urls || window.location.href;
    if (this) {
        urls = this;
    }

    //删除锚点数据
    if (/\#.*?\&/.test(urls)) {
        urls = urls.substring(0, urls.lastIndexOf("#"));
    }

    if (urls && urls.indexOf("?") > -1) { urls = urls.substring(urls.indexOf("?") + 1); }
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = urls ? urls.match(reg) : window.location.search.substr(1).match(reg);
    if (r != null && r[2] != "") {
        var ms = r[2].match(/(\<)|(\>)|(%3C)|(%3E)/g);
        if (ms && ms.length >= 4) {
            //如果检测到有2对及以上开始和结束尖括号
            r[2] = r[2].replace(/(\<)|(%3C)/g, "");
        }
        return r[2];
        // return  unescape(r[2]);
    }
    return null;
};

//兼容低版本
//ie9以下
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/ ) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0) ?
            Math.ceil(from) :
            Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++) {
            if (from in this && this[from] === elt)
                return from;
        }
        return -1;
    };
}
// -------------------------------------- 原型方法添加 end----------------------------------------
// 智能推荐star
function znTui(params) {
    var params2 = {};
    params2.client = params.client || "000";
    params2.distinct = params.distinct || getCookie("sensorsdata2015jssdkcross").$device_id;
    // if(getCookie("sensorsdata2015jssdkcross")){}
    params2.mobile = params.mobile || "";
    params2.productName = params.productName || "";
    params2.productCode = params.productCode || "";
    params2.serviceName = params.serviceName || "";
    params2.serviceCode = params.serviceCode || "";
    params2.keyWord = params.keyWord || "";
    params2.version = params.version || "";

    var isSit = window.location.href.indexOf("wwwsit.cpic.com.cn") > 0
    var userURLs = {
        ajaxURL: isSit ?
            "Proxy/oauth2/checkLogin?X-CAF-Authorization-Token=0275c9d1ecbe52fe8f902d493284b7cf" : "https://one.cpic.com.cn/Proxy/oauth2/checkLogin?X-CAF-Authorization-Token=0275c9d1ecbe52fe8f902d493284b7cf",
        bxxEnter: isSit ?
            "pc/views/ibox/safeboxindex/index.html" : "pc/views/ibox/safeboxindex/index.html",
        bxxGet: isSit ?
            "pc/views/member/login.html" : "pc/views/member/login.html"
    }
    $.ajax({
        url: userURLs.ajaxURL,
        dataType: "jsonp",
        jsonp: "callbackparam",
        success: function(data) {
            var userName = data.username
            if (undefined != userName && "" != userName) {
                params2.mobile = data.mobile;
                sendZN(params2)
            } else {
                sendZN(params2)
            }
        },
        error: function(data) {
            sendZN(params2)
        }
    })

    function sendZN(params2) {
        var data = {
            "client": params2.client, //来源标识 见数据字典
            "distinct_id": params2.distinct, //用户唯一标识 web端采用默认cookieid，移动端采用IMEI
            "mobile": params2.mobile, //登录用户手机号
            "time": new Date().getTime(), //时间（精确到毫秒）
            "url": window.location.href, //网络地址
            "productName": params2.productName, //产品名称
            "productCode": params2.productCode, //产品代码
            "serviceName": params2.serviceName, //服务名称
            "serviceCode": params2.serviceCode, //服务代码
            "keyWord": params2.keyWord, //搜索关键字
            "version": params2.version //服务版本
        }
        $.ajax({
            url: "zntj/api_recommend/monitorPoint",
            type: "get",
            data: data,
            dataType: "json",
            success: function(data) {
                //alert(data.msg)
                //console.log("success")
            }
        });

    }

    function getCookie(name) {
        var arr, reg = new RegExp("(^|)" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return JSON.parse(unescape(arr[2]));
        else
            return null;
    }
}
// 智能推荐end