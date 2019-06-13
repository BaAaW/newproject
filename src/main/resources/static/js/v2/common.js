var comonNavStatusTxt = "新导航";
/*var showBxcsRandom = function(){
  if(getRandom()){
  	$("#nav-item-bxcs-old").removeClass('nav-item-box');
    $("#nav-item-bxcs-new").addClass('nav-item-box');
	comonNavStatusTxt="新导航";
	childHover();
  }else{
  	$("#nav-item-bxcs-new").removeClass('nav-item-box');
    comonNavStatusTxt="原导航栏";
  }
}
*/
var commonHandler = function() {
    //顶部悬停
    $(".nav-item").hover(function() {
        var $this = $(this);
        $this.addClass("on");
        $this.find(".circle").removeClass("hide");
        $this.find(".nav-item-box").removeClass("hide");
        if (!$(".search-prompt-box").hasClass("hide")) {
            $(".search-prompt-box").addClass("hide")
        }
    }, function() {
        var $this = $(this);
        $this.removeClass("on");
        $this.find(".circle").addClass("hide");
        $this.find(".nav-item-box").addClass("hide");
    });
    // 保险超市OM调用核心方法
    var bxcsABTestOM = function(text) {
            if (s_gi) {
                var s = s_gi(s_account);
                s.linkTrackVars = 'prop27,eVar52';
                s.prop27 = text;
                s.eVar52 = text;
                s.tl(this, 'o', 'A/Btest');
            }
        }
        // 定义保险操作ABTest OM触点事件监听
    var bindBxcsOMHandler = function() {
            if (comonNavStatusTxt === "原导航栏") {
                $("#nav-item-bxcs-old a").click(function() {
                    var $this = $(this);
                    bxcsABTestOM($this.find("span").text() + "-" + comonNavStatusTxt);
                })
            } else {
                // 新导航大分来绑定
                $("#nav-item-bxcs-new .is_item_box a").click(function() {
                        var $this = $(this);
                        bxcsABTestOM($this.find("span").text() + "-" + comonNavStatusTxt);
                    })
                    // 新导航子分类绑定
                $("#nav-item-bxcs-new .column-link-box .col_item a").click(function() {
                    var $this = $(this);
                    var productName = $this.find("h4").text();
                    if (productName !== "") {
                        bxcsABTestOM(productName + "-" + comonNavStatusTxt);
                    }
                });
            }
        }
        //保险超市菜单ABTest
        //showBxcsRandom();
    $("#nav-item-bxcs-new").addClass('nav-item-box');
    childHover();
    bindBxcsOMHandler();
    //绑定顶部检索相关逻辑
    bindCommonSearch();
}

//检索相关逻辑
var bindCommonSearch = function() {
    //搜索框
    var $keywordsbox = $(".keywords-box"),
        $keywordsItems = $keywordsbox.find("li"),
        $searchBox = $(".search-text").siblings(".search-prompt-box");
    var searchItemIdx = -1;
    var searchAjax = "//www.cpic.com.cn/search/cpic/suggest";
    var commonSearchUrl = "//www.cpic.com.cn/market/jsjg/?searchType=all&content=";
    var keywordHtml = $keywordsbox.html();

    function hideKeyBox(e) {
        if (e.target.className != 'pull-left search-text focus' && e.target.className != 'search-prompt-box' && e.target.className != 'keywords-box' && e.target.className != 'keywords-box-li' && e.target.className != 'keywords-box-a') {
            $(".search-text").removeClass("focus");
            $searchBox.addClass("hide");
            $([window, document.body]).unbind("click", hideKeyBox);
        }
    }
    var resetSearchList = function() {
        $keywordsbox.html(keywordHtml);
        $keywordsItems = $keywordsbox.find("li");
        searchItemIdx = -1;
    }
    window.searchKeyupCallback = function(keys) {
        var len = keys.s.length;
        var spans = "";
        for (var i = 0; i < len; i++) {
            spans += " <li><a href='javascript:;'>" + keys.s[i] + "</a></li>"
        }
        $keywordsbox.html(spans);
        searchItemIdx = -1;
        $keywordsItems = $keywordsbox.find("li");
        if (len === 0) {
            $searchBox.addClass("hide");
        } else {
            if ($searchBox.hasClass("hide")) {
                $(".search-text").siblings(".search-prompt-box").removeClass("hide");
            }
        }
    }
    $(".search-text").focus(function() {
        $(this).addClass("focus");
        $(this).siblings(".search-prompt-box").removeClass("hide");
        $([window, document.body]).click(hideKeyBox);
    });

    var textb = $(".search-text");
    textb.focus(function() {
        if (!textb.val()) {
            resetSearchList();
        }
    });

    textb.keyup(function(event) {
        var evtCode = event.which;
        //删除文字的情况
        if ((evtCode === 46 || evtCode === 8) && textb.val().trim() == "") {
            resetSearchList();
        }
        if ($keywordsbox.is(":visible")) {
            if (evtCode === 38) { //上
                searchItemIdx--;
                if (searchItemIdx <= -1) {
                    searchItemIdx = $keywordsItems.size() - 1;
                }
                $keywordsItems.removeClass("searchCur").eq(searchItemIdx).addClass("searchCur");
            } else if (evtCode === 40) { // 下
                searchItemIdx++;
                if (searchItemIdx === $keywordsItems.size()) {
                    searchItemIdx = 0;
                }
                $keywordsItems.removeClass("searchCur").eq(searchItemIdx).addClass("searchCur");
            }
        }
        if (textb.val().trim() == "") {
            return;
        }
        if (evtCode != 39 && evtCode != 40 && evtCode != 37 && evtCode != 38 && evtCode != 13) $.ajax({
            url: searchAjax,
            type: "GET",
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            async: false,
            timeout: 5000,
            data: {
                "wd": encodeURI(textb.val()),
                "cb": "searchKeyupCallback"
            },
            success: function(json) {},
            error: function(xhr) {
                return;
            }
        })
    });
    textb.keydown(function(event) {
        if (event.which == 13) {
            if (searchItemIdx !== -1) {
                var searchTxt = $keywordsItems.filter(".searchCur").text();
                //神策 20190101 star 
                pushSCsearch(searchTxt, '输入');
                //神策 20190101 end

                window.location.href = commonSearchUrl + escape(searchTxt);
                return;
            } else if (textb.val().trim() != "") {
                //神策 20190101 star 
                pushSCsearch(textb.val().trim(), '输入');

                //神策 20190101 end
                window.location.href = commonSearchUrl + escape(textb.val().trim());
                return;
            }

        }
    });
    $('.search-btn').click(function() {
        if (textb.val().trim() != "") {
            //神策 20190101 star 
            pushSCsearch(textb.val().trim(), '输入');
            //神策 20190101 end
            window.open(commonSearchUrl + escape(textb.val().trim()));
            return;
        }
    });
    $("body").delegate(".keywords-box li", "click", function() {
        var $this = $(this);
        //神策 20190101 star 
        pushSCsearch($this.find('a').text(), '推荐热词');
        //神策 20190101 end
        window.open(commonSearchUrl + escape($this.find('a').text()) + "&hit=ShouyeDhZnss&inType=hot");
        return;
    });
}

function getRandom() {
    var m = Math.random();
    if (m < 0.5) {
        return true;
    } else {
        return false;
    }
}

function childHover() {
    $(".hover_show_box").eq(2).removeClass('hide');
    var allItem = $('.insu_sup_item');
    for (var i = 0; i < allItem.length; i++) {
        $(allItem[i]).hoverDelay()
    }
    $(".hover_show_box ul li").mouseover(function() {
        $(this).addClass('current_bg').siblings("li").removeClass("current_bg");
    })
    $('.hover_show_box ul li:not(li:last-child)').append(" <i class='border-right'></i>");
}
//hover延迟处理
/*(function($){
              
    })(jQuery);*/
$(function() {
    $.fn.hoverDelay = function(options) {
        var i = $(".is_item_box").children("li").index($(this));
        var Item = $('.insu_sup_item').eq(i);
        var defaults = {
            hoverDuring: 200,
            outDuring: 200,
            hoverEvent: function() {
                $(Item).find('b').addClass('current_border');
                $(Item).siblings('li').find('b').removeClass('current_border');
                $(".hover_show_box").eq(i).removeClass('hide').siblings(".hover_show_box").addClass('hide');
                $.noop();
            },
            outEvent: function() {
                $.noop();
            }
        };

        var sets = $.extend(defaults, options || {});
        var hoverTimer, outTimer;
        return $(this).each(function() {
            $(this).hover(function() {
                clearTimeout(outTimer);
                hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
            }, function() {
                clearTimeout(hoverTimer);
                outTimer = setTimeout(sets.outEvent, sets.outDuring);
            });
        });
    }
    commonHandler();
})

//神策 20190101 star
function pushSC(first, second, third) {
    try {

        sa.track('NavigationClick', {
            pageChannel: '首页', //前向来源
            navigation: first, //所属险种
            secondNavigation: second, //保险产品名称
            thirdNavigation: third, //保险产品ID
        });
    } catch (error) {

    }
}
//神策 20190101 end
//神策 20190101 star 
function pushSCsearch(val, type) {
    try {
        sa.track('search', {
            pageChannel: '公共模块',
            key_word: val,
            word_type: type, //推荐热词、输入
            position: '顶部菜单栏' //顶部菜单栏、页面中部
        });
    } catch (error) {

    }
}
//神策 20190101 end