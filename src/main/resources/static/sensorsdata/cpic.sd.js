function setsensorsdata(params){
    var param = params || {}
    var sd = {
        data:{
            //使用热力图功能的URL白名单
            heatmapURLWhiteList : param.heatmapURLWhiteList || [],
            //使用热力图功能表示
            heatmapURLWhiteListResult : false,
            //生产域名集合
            hostList : [
                "service.cpic.com.cn", //小蓝鲸
                "service1.cpic.com.cn", //小蓝鲸
                "one.cpic.com.cn", //保险箱
                "open.cpic.com.cn", //TJ小程序
                'wx.cpic.com.cn', //E服务微信
                'jkxwx.cpic.com.cn', //健康险微信
                'wxcdn.cpic.com.cn', //E服务微信
                'vip.cpic.com.cn', //客户俱乐部
                'www.cpic.com.cn', //集团官网
                'www.ecpic.com.cn', //集团官网
                'app3.cpic.com.cn', //集团官网
                'mall.cpic.com.cn',//集团官网
                'property.cpic.com.cn', //产险官网
                'life.cpic.com.cn', //寿险官网
                'asset.cpic.com.cn', //资产官网
                'health.cpic.com.cn', //健康险官网
                'a.cpic.com.cn',//本地活动
                'acdn.8686c.com',//本地活动
                'www.aaic.com.cn', //安信农险官网
                'www.cj-pension.com.cn', //长江养老官网
                'a2cdn3.8686c.com', //官网cdn域名
                'a2cdn3.cpiccdn.com', //官网cdn域名
                'm.cpic.com.cn',//非车移动
                'mcdn.cpiccdn.com',//非车移动
                'm.ecpic.com.cn'//非车移动
            ],
            project : param.project || 'TBJTGW',
            heatmap : param.heatmap || {}
        },
        created : function(){
            sd.setHead();
            sd.data.heatmapURLWhiteList.toString().indexOf(location.href.split(/\?|\#/)[0])<=0?sd.data.heatmapURLWhiteListResult = true:sd.data.heatmapURLWhiteListResult = false;
            sd.lodeSensorsdata(param)
            if (sd.getCookie('member_token') && JSON.parse(sd.getCookie('cpicsdData')) && (sd.getCookie('member_token') == JSON.parse(sd.getCookie('cpicsdData')).token)) {
                var getnum = parseInt(JSON.parse(sd.getCookie('cpicsdData')).data,16)/3
                sa.login(getnum);
            }else if(sd.getCookie('member_token') && (!JSON.parse(sd.getCookie('cpicsdData')) || (JSON.parse(sd.getCookie('cpicsdData')) && ((sd.getCookie('member_token') != JSON.parse(sd.getCookie('cpicsdData')).token))))){
                sd.jsonp(sd.data.hostList.toString().indexOf(location.hostname)>=0?'https://one.cpic.com.cn/Proxy/oauth2/checkLogin':'https://onesit.cpic.com.cn/Proxy/oauth2/checkLogin')
            }
        },
        getCookie : function (key) {
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
        setCookie : function (params) {
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

            document.cookie = params.name + "="
                + params.value + "; path=/; domain=" + params.domain + ";" + expires;
        },

        /**
         * removeCookie
         */
        removeCookie : function (p) {
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
            } else {
            }
        },
        //触点判断
        getGchannel : function () {
            if (/cpicapp_android/i.test(navigator.userAgent) || /cpicapp_ios/i.test(navigator.userAgent)) {
                return 'APP';
            }else if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) {
                return 'W'
            }else{
                if (((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) && !/^www./.test(location.host)) || /^m./.test(location.host)) {
                    return 'T' 
               }else{
                    return 'PC'
               }
            }
        },
        setHead:function() {
            //<meta name="referrer" content="always">
            var _meta = document.createElement('meta');
            _meta.setAttribute('name', 'referrer');
            _meta.setAttribute('content', 'always');
            document.querySelector('head').appendChild(_meta);
        },
        //jsonp请求方法
        jsonp : function (url, data, callback) {
            if (typeof data == 'string') {
              callback = data
              data = {}
            }
            var callbackName = 'loginCallback'+new Date().getTime()
            var hasParams = url.indexOf('?')
            url += hasParams>=0 ? '&' : '?' + 'callbackparam=' + callbackName
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
                    var getNum = data.mobile*3;
                    var setdata = getNum.toString(16)
                    sd.setCookie({name:'cpicsdData',value:encodeURIComponent('{"data":"'+setdata+'","token":"'+data.token+'"}'),domain:'.cpic.com.cn'})
                    sa.login(data.mobile);
                }             
                _script.parentNode.removeChild(_script);
            }
        },
        getQueryString:function (name, urls) {
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
        lodeSensorsdata : function (param) {
            var sensorsdata = {
                sdk_url:'https://a2cdn3.8686c.com/sensorsdata/1.10.9/sensorsdata.min.js',
                name: 'sa',
                server_url:sd.data.hostList.toString().indexOf(location.hostname)>=0?'https://xnjkfx.cpic.com.cn:8006/sa?project=' + sd.data.project:'https://xnjkfxsit.cpic.com.cn/sa?project='+ sd.data.project,
                show_log: param.show_log || false, //设置 true 后会在网页控制台打 logger，会显示发送的数据,设置 false 表示不显示
                source_channel:['cmpid'],
                heatmap_url: 'https://a2cdn3.8686c.com/sensorsdata/1.10.9/heatmap.min.js',
                heatmap: {
                   //是否开启点击图，默认 default 表示开启，可以设置 'not_collect' 表示关闭
                    clickmap:sd.data.heatmap.clickmap || 'default',
                    //是否开启触达注意力图，默认 default 表示开启，可以设置 'not_collect' 表示关闭
                    scroll_notice_map:sd.data.scroll_notice_map || 'default',
                    //设置成 true 后，我们会自动给 a 标签绑定一个 sa.trackLink() 方法（详见本页 3.3 ）。
                    //如果是单页面 a 标签不涉及页面跳转或者 a 标签的点击是下载功能，建议不要打开。默认 false 。
                    isTrackLink:sd.data.isTrackLink || true,
                    //设置多少毫秒后开始渲染点击图,因为刚打开页面时候页面有些元素还没加载
                    loadTimeout: sd.data.loadTimeout || 3000,
                    //返回真会采集当前页面的数据，返回假表示不采集当前页面,设置这个函数后，内容为空的话，是返回假的。不设置函数默认是采集所有页面
                    collect_url: function(){
                        //如果只采集首页
                        if(param.showHeatmap || sd.data.heatmapURLWhiteListResult){
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
                var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
                w['sensorsDataAnalytic201505'] = n;
                w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
                var ifs = ['track','quick','register','registerPage','registerOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister','getAppStatus'];
                for (var i = 0; i < ifs.length; i++) {
                    w[n][ifs[i]] = w[n].call(null, ifs[i]);
                }
                if (!w[n]._t) {
                    x = d.createElement(s), y = d.getElementsByTagName(s)[0];
                    x.async = 1;
                    x.src = p;
                    x.setAttribute('charset','UTF-8');
                    y.parentNode.insertBefore(x, y);
                    w[n].para = para;
                }
            })(sensorsdata);
            //增加来源
            sa.registerPage({
                $url:document.location.href.substring(0,100),
                plat: sd.getGchannel(),
                referrer: document.referrer,
                cmpid1: sd.getQueryString('cmpid') || ''
            });
        }
    }
    sd.created()
}