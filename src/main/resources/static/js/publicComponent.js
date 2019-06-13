/***************************************************************************************************************
 *************************************** ______ .______    __    ______ *****************************************
 ************************************** /      ||   _  \  |  |  /      | ****************************************
 ************************************* |  ,----'|  |_)  | |  | |  ,----' ****************************************
 ************************************* |  |     |   ___/  |  | |  | *********************************************
 ************************************* |  `----.|  |      |  | |  `----. ****************************************
 ************************************** \______|| _|      |__|  \______| ***  version : sit-1.0  ****************
 ***************************************                                 ***  modify time ：2019/01/08 14:46  ***
 ***************************************************************************************************************/

///////////////////////////////////////////  函数定义  /////////////////////////////////////////////////////////

/**
 * 动态加载JS
 * @param {string} url  脚本地址
 * @param {function} callback  回调函数
 */
var loadJs = function(url, callback) {
    var head = document.getElementsByTagName('head')[0]
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    if (typeof callback == 'function') {
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState ||
                this.readyState === 'loaded' ||
                this.readyState === 'complete'
            ) {
                callback()
                script.onload = script.onreadystatechange = null
            }
        }
    }
    head.appendChild(script)
}

/**
 * 动态加载CSS
 * @param {string} url 样式地址
 */
function dynamicLoadCss(url) {
    var head = document.getElementsByTagName('head')[0]
    var link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = url
    head.appendChild(link)
}

/**
 * 根据src中的  ${KEY}  替换对应json中的值（json中不需要带${}符号）
 * @param {string} src  模板html代码
 * @param {function} data{0:"aaa",1"bbb"} json对象
 */
var replaceLink = function(src, data) {
    src = src.replace(new RegExp('\\${\\w+\\d+}', 'g'), function(str) {
        var v = data[str.match('\\w+\\d+')]
        return v != null ? v : '#;'
    })
    return src
}

///////////////////////////////////////////  模板定义  /////////////////////////////////////////////////////////
var headTemplate =
    '<div class="head">' +
    '    <div class="head-container clearfix">' +
    '        <div class="pull-left logo-box">' +
    '            <a href="${HEAD0}" target="_blank">' +
    '                <span class="icon-cpic-common icon-cpic-logo"></span>' +
    '            </a>' +
    '        </div>' +
    '        <div class="nav pull-left">' +
    '            <ul class="nav-ul clearfix">' +
    '                <li class="nav-item  nav-item-bxcs pull-left">' +
    '                    <a href="${HEAD1}" target="_blank">' +
    '                        <div class="column-name">' +
    '                            <span>保险超市</span>' +
    '                            <div class="icon-cpic-common circle hide"></div>' +
    '                        </div>' +
    '                    </a>' +
    '' +
    '                    <div class="nav-item-box-new hide" id="nav-item-bxcs-new">' +
    '                        <ul class="clearfix is_item_box">' +
    '                            <li class="pull-left insu_sup_item is_item1">' +
    '                                <a target="_blank" href="${HEAD2}" target="_blank"' +
    '                                    onclick="pushSC(\'汽车保险\')">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-qcbx"></i>' +
    '                                    <span>汽车保险</span>' +
    '                                    <b></b>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left insu_sup_item is_item1">' +
    '                                <a target="_blank" href="${HEAD3}" target="_blank"' +
    '                                    onclick="pushSC(\'人寿保险\')">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-rsbx"></i>' +
    '                                    <span>人寿保险</span>' +
    '                                    <b></b>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left insu_sup_item is_item2">' +
    '                                <a target="_blank" href="${HEAD4}" target="_blank"' +
    '                                    onclick="pushSC(\'旅游保险\')">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-lybx"></i>' +
    '                                    <span>旅游保险</span>' +
    '                                    <b class="current_border"></b>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left insu_sup_item is_item3">' +
    '                                <a target="_blank" href="${HEAD5}" target="_blank"' +
    '                                    onclick="pushSC(\'健康保险\')">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-jkbx"></i>' +
    '                                    <span>健康保险</span>' +
    '                                    <b></b>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left insu_sup_item is_item4">' +
    '                                <a target="_blank" href="${HEAD6}" target="_blank"' +
    '                                    onclick="pushSC(\'少儿保险\')">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-sebx"></i>' +
    '                                    <span>少儿保险</span>' +
    '                                    <b></b>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left insu_sup_item is_item6">' +
    '                                <a target="_blank" href="${HEAD7}" target="_blank"' +
    '                                    onclick="pushSC(\'人身意外险\')">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-rsywx"></i>' +
    '                                    <span>人身意外险</span>' +
    '                                    <b></b>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left insu_sup_item is_item5">' +
    '                                <a target="_blank" href="${HEAD8}" target="_blank"' +
    '                                    onclick="pushSC(\'家庭保险\')">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-jtbx"></i>' +
    '                                    <span>家庭保险</span>' +
    '                                    <b></b>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left insu_sup_item is_item7">' +
    '                                <a target="_blank" href="${HEAD9}" target="_blank"' +
    '                                    onclick="pushSC(\'财富规划保险\')">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-lcbx"></i>' +
    '                                    <span>财富规划保险</span>' +
    '                                    <b></b>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left insu_sup_item is_item8">' +
    '                                <a target="_blank" href="${HEAD10}" target="_blank"' +
    '                                    onclick="pushSC(\'企业保险\')">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-qybx"></i>' +
    '                                    <span>企业保险</span>' +
    '                                    <b></b>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left insu_sup_item is_item9">' +
    '                                <a target="_blank" href="${HEAD11}" target="_blank"' +
    '                                    onclick="pushSC(\'贷款保证保险\')">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-dkbx"></i>' +
    '                                    <span>贷款保证保险</span>' +
    '                                    <b></b>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left insu_sup_item is_item10">' +
    '                                <a target="_blank" href="${HEAD12}"' +
    '                                    target="_blank" onclick="pushSC(\'定制保险\')">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-dzbx"></i>' +
    '                                    <span>免费定制</span>' +
    '                                    <b></b>' +
    '                                </a>' +
    '                            </li>' +
    '                        </ul>' +
    '                        <div class="column-link-box clearfix hover_show_box hs_box1  hide"></div>' +
    '                        <!--汽车保险-->' +
    '                        <div class="column-link-box clearfix hover_show_box hs_box2 hide">' +
    '                            <!--人寿保险-->' +
    '                            <div class="line"></div>' +
    '                            <ul>' +
    '                              <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD13}"' +
    "                                        onclick=\"pushSC('人寿保险','位置1')\">" +
    '                                        <h4>鑫满意保险产品计划</h4>' +
    '                                        <p>短期投入，长期领取；高额给付，保费返还；组合万能，收益更高</p>' +
    '                                        <p class="last_p">查看详情</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                              <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD14}"' +
    "                                        onclick=\"pushSC('人寿保险','位置2')\">" +
    '                                        <h4>长相伴A款终身寿险</h4>' +
    '                                        <p>岁月馈赠，爱长相伴，保财富，保灵活，保传承</p>' +
    '                                        <p class="last_p">查看详情</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                              <li class="col_item">' +
    '                                    <a target="_blank" style="width:100%;" href="${HEAD15}"' +
    "                                        onclick=\"pushSC('人寿保险','位置3')\">" +
    '                                        <h4>爱无忧3.0保险产品计划</h4>' +
    '                                        <p>专注防癌 呵护健康</p>' +
    '                                        <p class="last_p">查看详情</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                                <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD16}"' +
    "                                        onclick=\"pushSC('人寿保险','位置4')\">" +
    '                                        <h4>金佑人生A款（2018版）保险产品计划</h4>' +
    '                                        <p>100种重疾保障+50种特定疾病保障，保额逐年递增</p>' +
    '                                            <p class="last_p">查看详情</p>' +
    '                                    </a>' +
    '                                </li>' +
    '							</ul>' +
    '						</div>' +
    '						<div class="column-link-box clearfix hover_show_box hs_box2 hide">' +
    '							<!-- 旅游保险 -->' +
    '                                <div class="line"></div>' +
    '                                <ul>' +
    '                                    <li class="col_item">' +
    '                                        <h3>热门搜索</h3>' +
    '                                        <div>' +
    '                                            <a target="_blank" href="${HEAD17}">申根签证</a>' +
    '                                        </div>' +
    '                                        <div class="ship_box">' +
    '                                            <a target="_blank" href="${HEAD18}">日韩邮轮游</a>' +
    '                                        </div>' +
    '                                        <div>' +
    '                                            <a target="_blank" href="${HEAD19}">国内旅游</a>' +
    '                                        </div>' +
    '                                        <p class="more_trip">' +
    '                                            <a target="_blank" href="${HEAD20}">查看全部旅游保险>></a>' +
    '                                        </p>' +
    '                                    </li>' +
    '                                    <li class="col_item">' +
    '                                        <a target="_blank" href="${HEAD21}"' +
    "                                            onclick=\"pushSC('旅游保险','位置1')\">" +
    '                                            <h4>“乐游人生”境外旅行救援保险（尊贵版）</h4>' +
    '                                            <p>最全保障 签证专用 紧急救援</p>' +
    '                                            <p class="last_p">' +
    '                                                <b>137元</b> 起</p>' +
    '                                        </a>' +
    '                                    </li>' +
    '                                    <li class="col_item">' +
    '                                        <a target="_blank" href="${HEAD22}"' +
    "                                            onclick=\"pushSC('旅游保险','位置2')\">" +
    '                                            <h4>超值旅游险' +
    '                                            </h4>' +
    '                                            <p>1元一天，想玩几天就买几天</p>' +
    '                                            <p class="last_p">' +
    '                                                <b>1元</b> 起</p>' +
    '                                        </a>' +
    '                                    </li>' +
    '                                    <li class="col_item last_li">' +
    '                                        <a target="_blank" href="${HEAD23}"' +
    "                                            onclick=\"pushSC('旅游保险','位置3')\">" +
    '                                            <h4>“乐学人生”境外留学人员意外险' +
    '                                            </h4>' +
    '                                            <p>意外住院 紧急医疗 学业中断保障</p>' +
    '                                            <p class="last_p">' +
    '                                                <b>56元</b> 起</p>' +
    '                                        </a>' +
    '                                    </li>' +
    '                                </ul>' +
    '                        </div>' +
    '                        <div class="column-link-box clearfix hover_show_box hs_box3 hide">' +
    '                            <!--健康保险-->' +
    '' +
    '                            <div class="line"></div>' +
    '                            <ul>' +
    '                                <li class="col_item">' +
    '                                    <h3>热门搜索</h3>' +
    '                                    <div>' +
    '                                        <a target="_blank" href="${HEAD24}">重大疾病</a>' +
    '                                    </div>' +
    '                                    <div class="ship_box">' +
    '                                        <a target="_blank" href="${HEAD25}">百万医疗保险</a>' +
    '                                    </div>' +
    '                                    <div>' +
    '                                        <a target="_blank" href="${HEAD26}">百万防癌</a>' +
    '                                    </div>' +
    '                                    <p class="more_trip">' +
    '                                        <a target="_blank" href="${HEAD27}">查看全部健康保险>></a>' +
    '                                    </p>' +
    '                                </li>' +
    '                                <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD28}"' +
    "                                        onclick=\"pushSC('健康保险','位置1')\">" +
    '                                        <h4>“悦享保”个人癌症医疗保障计划</h4>' +
    '                                        <p>业内领先 45岁以上防癌刚需</p>' +
    '                                        <p class="last_p">' +
    '                                            <b>536元</b> 起</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                                <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD29}"' +
    "                                        onclick=\"pushSC('健康保险','位置2')\">" +
    '                                        <h4>太健康·百万全家桶' +
    '                                        </h4>' +
    '                                        <p>住院太贵 特需医疗 超过1万我来赔</p>' +
    '                                        <p class="last_p">' +
    '                                            <b>96元</b> 起</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                                <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD30}"' +
    "                                        onclick=\"pushSC('健康保险','位置3')\">" +
    '                                        <h4>“花样年华”女性特定疾病保险</h4>' +
    '                                        <p>保障范围广 赔付金高 专为女性定制</p>' +
    '                                        <p class="last_p"> <b>80元</b> 起</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                            </ul>' +
    '                        </div>' +
    '                        <div class="column-link-box clearfix hover_show_box hs_box4 hide">' +
    '                            <!--少儿保险-->' +
    '' +
    '                            <div class="line"></div>' +
    '                            <ul>' +
    '                                <li class="col_item">' +
    '                                    <h3>热门搜索</h3>' +
    '                                    <div>' +
    '                                        <a target="_blank" href="${HEAD31}">意外伤害保障</a>' +
    '                                    </div>' +
    '                                    <div class="ship_box">' +
    '                                        <a target="_blank" href="${HEAD32}">少儿重疾</a>' +
    '                                    </div>' +
    '                                    <div>' +
    '                                        <a target="_blank" href="${HEAD33}">手口足保险</a>' +
    '                                    </div>' +
    '                                    <p class="more_trip">' +
    '                                        <a target="_blank" href="${HEAD34}">查看全部少儿保险>></a>' +
    '                                    </p>' +
    '                                </li>' +
    '' +
    '                                <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD35}"' +
    "                                        onclick=\"pushSC('少儿保险','位置1')\">" +
    '                                        <h4>“四季宝贝”少儿特定疾病保险' +
    '                                        </h4>' +
    '                                        <p>重大疾病 高发疾病门诊 保费超值</p>' +
    '                                        <p class="last_p">' +
    '                                            <b>90元</b> 起</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                                <li class="col_item">' +
    '                                    <a target="_blank" style="width:100%" href="${HEAD36}"' +
    "                                        onclick=\"pushSC('少儿保险','位置2')\">" +
    '                                        <h4>少儿超能宝两全保险3.0</h4>' +
    '                                        <p>15种少儿重疾 2倍给付</p>' +
    '                                        <p class="last_p">查看详情</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                              								<li class="col_item last_li">' +
    '                                    <a target="_blank" href="${HEAD37}"' +
    "                                        onclick=\"pushSC('少儿保险','位置3')\">" +
    '                                        <h4>儿童预防接种保险' +
    '                                        </h4>' +
    '                                        <p>“针”保障，保护宝宝健康成长</p>' +
    '                                        <p class="last_p">' +
    '                                            <b> 10元</b> 起</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                            </ul>' +
    '                        </div>' +
    '                        <div class="column-link-box clearfix hover_show_box hs_box5 hide">' +
    '                            <!--人身意外保险-->' +
    '' +
    '                            <div class="line"></div>' +
    '                            <ul>' +
    '                                <li class="col_item">' +
    '                                    <h3>热门搜索</h3>' +
    '                                    <div>' +
    '                                        <a target="_blank" href="${HEAD38}">个人意外综合</a>' +
    '                                    </div>' +
    '                                    <div class="ship_box">' +
    '                                        <a target="_blank" href="${HEAD39}">交通意外伤害</a>' +
    '                                    </div>' +
    '                                    <div>' +
    '                                        <a target="_blank" href="${HEAD40}">百万意外保障</a>' +
    '                                    </div>' +
    '                                    <p class="more_trip">' +
    '                                        <a target="_blank" href="${HEAD41}">查看全部人身意外保险>></a>' +
    '                                    </p>' +
    '                                </li>' +
    '                                <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD42}"' +
    "                                        onclick=\"pushSC('人身意外保险','位置1')\">" +
    '                                        <h4>“乐行人生”交通工具意外伤害保险' +
    '                                        </h4>' +
    '                                        <p>保障涵盖海陆空各类交通工具 最高200万</p>' +
    '                                        <p class="last_p">' +
    '                                            <b>34元</b> 起</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                                <li class="col_item last_li">' +
    '                                    <a target="_blank" href="${HEAD43}"' +
    "                                        onclick=\"pushSC('人身意外保险','位置2')\">" +
    '                                        <h4>个人意外综合保险' +
    '                                        </h4>' +
    '                                        <p>意外伤害医疗住院 交通事故双倍给付</p>' +
    '                                        <p class="last_p">' +
    '                                            <b>55元</b> 起</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                              									<li class="col_item last_li">' +
    '                                    <a target="_blank" href="${HEAD44}"' +
    "                                        onclick=\"pushSC('人身意外保险','位置3')\">" +
    '                                        <h4>全民运动综合意外保险计划' +
    '                                        </h4>' +
    '                                        <p>自由定制 覆盖特定运动意外</p>' +
    '                                        <p class="last_p">' +
    '                                            <b>1.40元</b> 起</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                            </ul>' +
    '                        </div>' +
    '                        <div class="column-link-box clearfix hover_show_box hs_box6 hide">' +
    '                            <!--家庭保险-->' +
    '' +
    '                            <div class="line"></div>' +
    '                            <ul>' +
    '                                <li class="col_item">' +
    '                                    <h3>热门搜索</h3>' +
    '                                    <div>' +
    '                                        <a target="_blank" href="${HEAD45}">家政雇佣保障</a>' +
    '                                    </div>' +
    '                                    <div class="ship_box">' +
    '                                        <a target="_blank" href="${HEAD46}">个人账户资金保障</a>' +
    '                                    </div>' +
    '                                    <div>' +
    '                                        <a target="_blank" href="${HEAD47}">家庭财产保障</a>' +
    '                                    </div>' +
    '                                    <p class="more_trip">' +
    '                                        <a target="_blank" href="${HEAD48}">查看全部家庭保险>></a>' +
    '                                    </p>' +
    '                                </li>' +
    '                                <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD49}"' +
    "                                        onclick=\"pushSC('家庭保险','位置1')\">" +
    '                                        <h4>' +
    '                                            “全能卫士”基本安居盗抢险' +
    '                                        </h4>' +
    '                                        <p>房屋主体 室内财产 室内外盗抢</p>' +
    '                                        <p class="last_p">' +
    '                                            <b>43元</b> 起</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                                <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD50}"' +
    "                                        onclick=\"pushSC('家庭保险','位置2')\">" +
    '                                        <h4>' +
    '                                            太健康·百万全家桶' +
    '                                        </h4>' +
    '                                        <p>住院太贵 特需医疗 超过1万我来赔</p>' +
    '                                        <p class="last_p">' +
    '                                            <b>96元</b> 起</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                                <li class="col_item last_li">' +
    '                                    <a target="_blank" href="${HEAD51}"' +
    "                                        onclick=\"pushSC('家庭保险','位置3')\">" +
    '                                        <h4>家庭雇佣责任险' +
    '                                        </h4>' +
    '                                        <p>家政服务人员意外伤害赔偿及医疗保障</p>' +
    '                                        <p class="last_p">' +
    '                                            <b>50元</b> 起</p>' +
    '                                    </a>' +
    '' +
    '                                </li>' +
    '                            </ul>' +
    '                        </div>' +
    '                        <div class="column-link-box clearfix hover_show_box hs_box7 hide">' +
    '                            <!--财富规划保险-->' +
    '' +
    '                            <div class="line"></div>' +
    '                            <ul>' +
    '                                <li class="col_item">' +
    '                                    <h3>热门搜索</h3>' +
    '                                    <div>' +
    '                                        <a target="_blank" href="${HEAD52}">年金保险</a>' +
    '                                    </div>' +
    '                                    <div class="ship_box">' +
    '                                        <a target="_blank" href="${HEAD53}">保险分红</a>' +
    '                                    </div>' +
    '                                    <div>' +
    '                                        <a target="_blank" href="${HEAD54}">养老保障</a>' +
    '                                    </div>' +
    '                                    <p class="more_trip">' +
    '                                        <a target="_blank" href="${HEAD55}">查看全部财富规划保险>></a>' +
    '                                    </p>' +
    '                                </li>' +
    '                                <li class="col_item">' +
    '                                  ' +
    '                                  							<a target="_blank" href="${HEAD56}"' +
    "                                        onclick=\"pushSC('财富规划保险','位置1')\">" +
    '                                        <h4>长江天天盈</h4>' +
    '                                        <p>1000元起投 灵活存取 让零钱活起来</p>' +
    '                                        <p class="last_p">查看详情</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                                <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD57}"' +
    "                                        onclick=\"pushSC('财富规划保险','位置2')\">" +
    '                                        <h4>聚宝盆保险产品组合计划' +
    '                                        </h4>' +
    '                                        <p>祝贺金，关爱金，增额返还，持续增值，资金灵活</p>' +
    '                                        <p class="last_p">查看详情</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                                <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD58}"' +
    "                                        onclick=\"pushSC('财富规划保险','位置3')\">" +
    '                                        <h4>金佑人生A款（2018版）保险' +
    '                                            <br>产品计划</h4>' +
    '                                        <p>100种重疾保障+50种特定疾病保障，保额逐年递增</p>' +
    '                                        <p class="last_p">查看详情</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                            </ul>' +
    '                        </div>' +
    '                        <div class="column-link-box clearfix hover_show_box hs_box8 hide">' +
    '                            <!--企业保险-->' +
    '' +
    '                            <div class="line"></div>' +
    '                            <ul>' +
    '                                <li class="col_item">' +
    '                                    <h3>热门搜索</h3>' +
    '                                    <div>' +
    '                                        <a target="_blank" href="${HEAD59}">企业年金计划</a>' +
    '                                    </div>' +
    '                                    <div class="ship_box">' +
    '                                        <a target="_blank" href="${HEAD60}">员工养老保障</a>' +
    '                                    </div>' +
    '                                    <p class="more_trip">' +
    '                                        <a target="_blank" href="${HEAD61}">查看全部企业保险>></a>' +
    '                                    </p>' +
    '                                </li>' +
    '                                <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD62}"' +
    "                                        onclick=\"pushSC('企业保险','位置1')\">" +
    '                                        <h4>企业年金集合计划</h4>' +
    '                                        <p>完善社会保障体系、享受税收优惠、增强企业凝聚力</p>' +
    '                                        <p class="last_p">查看详情</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                                <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD63}"' +
    "                                        onclick=\"pushSC('企业保险','位置2')\">" +
    '                                        <h4>养老保障计划</h4>' +
    '                                        <p>建立多层次养老保障体系、完善员工福利解决方案</p>' +
    '                                        <p class="last_p">查看详情</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                                <li class="col_item last_li">' +
    '                                    <a target="_blank" href="${HEAD64}"' +
    "                                        onclick=\"pushSC('企业保险','位置3')\">" +
    '                                        <h4>小微企业出口信用</h4>' +
    '                                        <p>投保手续简便， 索赔单证简明， 赔款迅速及时</p>' +
    '                                        <p class="last_p">查看详情</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                            </ul>' +
    '                        </div>' +
    '                        <div class="column-link-box clearfix hover_show_box hs_box9 hide">' +
    '                            <!--贷款保险-->' +
    '                            <div class="line"></div>' +
    '                            <ul>' +
    '                                <li class="col_item">' +
    '                                    <h3>热门搜索</h3>' +
    '                                    <div>' +
    '                                        <a target="_blank" href="${HEAD65}">保单客户专享</a>' +
    '                                    </div>' +
    '                                    <div class="ship_box">' +
    '                                        <a target="_blank" href="javascript:void(0)">房屋交易保险</a>' +
    '                                    </div>' +
    '                                    <p class="more_trip">' +
    '                                        <a target="_blank" href="${HEAD66}">查看全部贷款保险>></a>' +
    '                                    </p>' +
    '                                </li>' +
    '                                <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD67}" style="width:100%;">' +
    '                                        <h4>保单客户专享</h4>' +
    '                                        <p>有任何公司的寿险保单就能申请</p>' +
    '                                        <p class="last_p">查看详情' +
    '                                        </p>' +
    '                                    </a>' +
    '                                </li>' +
    '                                <li class="col_item">' +
    '                                    <a target="_blank" href="${HEAD68}"' +
    "                                        onclick=\"pushSC('贷款保险','位置1')\">" +
    '                                        <h4>交易保' +
    '                                            <br>（房屋抵押履约保证保险）' +
    '                                        </h4>' +
    '                                        <p>针对二手房交易 保障房屋抵押贷款交易</p>' +
    '                                        <p class="last_p">查看详情</p>' +
    '                                    </a>' +
    '                                </li>' +
    '                                <li class="col_item last_li">' +
    '                                    <a target="_blank" href="${HEAD69}">' +
    '                                        <h4>房主专享</h4>' +
    '                                        <p>有房就能申请、无抵押无担保 3-50万</p>' +
    '                                        <p class="last_p">查看详情</p>' +
    '' +
    '                                    </a>' +
    '                                </li>' +
    '                            </ul>' +
    '                        </div>' +
    '                        <div class="column-link-box clearfix hover_show_box hs_box10 hide">' +
    '                            <!--定制保险-->' +
    '                            <div class="line"></div>' +
    '' +
    '                            <div class="consult-specialist-main" style="float:left;">' +
    '                                <a href="${HEAD70}" target="_blank" class="color-blue readMore dzbx">' +
    '                                    <div class="consult-specialist-item pull-left on" style="width: 340px;">' +
    '                                        <div class="consult-specialist-img-box">' +
    '                                            <div style=" height: 170px;">' +
    '                                              <img src="${HEAD71}" alt="">' +
    '                                            </div>' +
    '                                        </div>' +
    '                                        <div>' +
    '                                            <h3>免费定制</h3>' +
    '                                            <p style="text-align: center;">综合规划保障' +
    '                                                <br>专业定制保险方案</p>' +
    '                                            <span class="color-blue readMore">' +
    '                                                了解详情' +
    '                                            </span>' +
    '                                        </div>' +
    '                                    </div>' +
    '                                </a>' +
    '                                <a href="${HEAD72}" target="_blank" class="color-blue readMore jpgw">' +
    '                                    <div class="consult-specialist-item pull-left on" style="width: 420px; margin: 45px 34px 0;">' +
    '                                        <div class="consult-specialist-img-box">' +
    '                                            <div style="height: 170px;">' +
    '                                              <img src="${HEAD73}" alt="">' +
    '                                            </div>' +
    '                                        </div>' +
    '                                        <div>' +
    '                                            <h3>金牌顾问</h3>' +
    '                                            <p style="text-align: center;">全程投保指导' +
    '                                                <br>省时又省心</p>' +
    '                                            <span class="color-blue readMore">' +
    '                                                了解详情' +
    '                                            </span>' +
    '                                        </div>' +
    '                                    </div>' +
    '                                </a>' +
    '                                <a href="${HEAD74}" target="_blank" class="color-blue readMore tjcp">' +
    '                                    <div class="consult-specialist-item pull-left on" style="width: 312px;">' +
    '                                        <div class="consult-specialist-img-box">' +
    '                                            <div style="height: 170px;">' +
    '                                              <img src="${HEAD75}" alt="">' +
    '                                            </div>' +
    '                                        </div>' +
    '                                        <div>' +
    '                                            <h3>推荐产品</h3>' +
    '                                            <p style="text-align: center;">专业方案配置' +
    '                                                <br>高性价比产品</p>' +
    '                                            <span class="color-blue readMore">' +
    '                                                了解详情' +
    '                                            </span>' +
    '                                        </div>' +
    '                                    </div>' +
    '                                </a>' +
    '                            </div>' +
    '' +
    '                        </div>' +
    '                    </div>' +
    '                </li>' +
    '                <li class="nav-item pull-left">' +
    '                    <a rel="canonical" href="${HEAD76}" target="_blank">' +
    '                        <div class="column-name">' +
    '                            <span>服务大厅</span>' +
    '                            <div class="icon-cpic-common circle hide"></div>' +
    '                        </div>' +
    '                    </a>' +
    '                    <div class="nav-item-box hide">' +
    '                        <ul class="clearfix">' +
    '                            <li class="pull-left">' +
    '                                <a href="${HEAD77}"' +
    '                                    target="_blank">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-bdfw"></i>' +
    '                                    <span>保单查询</span>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left">' +
    '                                <a href="${HEAD78}" target="_blank">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-lpfw"></i>' +
    '                                    <span>理赔服务</span>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left">' +
    '                                <a href="${HEAD79}" target="_blank">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-wdcx"></i>' +
    '                                    <span>网点查询</span>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left">' +
    '                                <a href="${HEAD80}"' +
    '                                    target="_blank">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-cxfw"></i>' +
    '                                    <span>车险一站式服务</span>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left">' +
    '                                <a target="_blank" href="${HEAD81}"' +
    '                                    target="_blank">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-jzcx" style="display:block;float: left; background-image: url(${HEAD82});background-size: 100% 100%;background-position: 0 0;"></i>' +
    '                                    <div style="float: right;">' +
    '                                        <p style="height: 24px;line-height: 32px;color:#4a4a4a;">电子保单</p>' +
    '                                        <p style="height: 10px;line-height: 32px;color:#4a4a4a;">验真与下载</p>' +
    '                                    </div>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left">' +
    '                                <a target="_blank" href="${HEAD83}">' +
    '                                    <i class="icon-cpic-common-add icon-bxcs icon-bxkjh"></i>' +
    '                                    <span>保险卡激活</span>' +
    '                                </a>' +
    '                            </li>' +
    '' +
    '                            <li class="pull-left">' +
    '                                <a target="_blank" href="${HEAD84}">' +
    '                                    <i class="icon-cpic-common-add icon-bxcs icon-bdbg"></i>' +
    '                                    <span>保单变更</span>' +
    '                                </a>' +
    '                            </li>' +
    '' +
    '                            <li class="pull-left">' +
    '                                <a target="_blank" href="${HEAD85}">' +
    '                                    <i class="icon-cpic-common-add icon-bxcs icon-tbvip"></i>' +
    '                                    <span>太保客户尊享</span>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left">' +
    '                                <a target="_blank" href="${HEAD86}"' +
    '                                    target="_blank">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-dzbx"></i>' +
    '                                    <span>免费定制</span>' +
    '                                    <b></b>' +
    '                                </a>' +
    '                            </li>' +
    '                            <li class="pull-left">' +
    '                                <a rel="canonical" target="_blank" href="${HEAD87}">' +
    '                                    <i class="icon-cpic-common-add icon-bxcs icon-allservice"></i>' +
    '                                    <span>更多服务</span>' +
    '                                </a>' +
    '                            </li>' +
    '                        </ul>' +
    '' +
    '                    </div>' +
    '' +
    '                </li>' +
    '                <li class="nav-item pull-left">' +
    '                    <a href="${HEAD88}" target="_blank">' +
    '                        <div class="column-name">' +
    '                            <span>会员中心</span>' +
    '                        </div>' +
    '                    </a>' +
    '' +
    '                    <div class="nav-item-box hide">' +
    '' +
    '                        <ul class="clearfix">' +
    '' +
    '                            <li class="pull-left">' +
    '                                <a target="_blank" href="${HEAD89}">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-khjlb icon-club"></i>' +
    '                                    <span>会员中心</span>' +
    '                                </a>' +
    '                            </li>' +
    '' +
    '                            <li class="pull-left">' +
    '                                <a target="_blank" href="${HEAD90}">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-yxh icon-club"></i>' +
    '                                    <span>产险-优享汇</span>' +
    '                                </a>' +
    '                            </li>' +
    '' +
    '                            <li class="pull-left">' +
    '                                <a target="_blank" href="${HEAD91}">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-esxb icon-club"></i>' +
    '                                    <span>寿险-e生相伴</span>' +
    '                                </a>' +
    '                            </li>' +
    '' +
    '                            <li class="pull-left">' +
    '                                <a target="_blank" href="${HEAD92}">' +
    '                                    <i class="icon-cpic-common icon-bxcs icon-hzsm icon-club"></i>' +
    '                                    <span>合作商盟</span>' +
    '                                </a>' +
    '                            </li>' +
    '                        </ul>' +
    '' +
    '                    </div>' +
    '                </li>' +
    '                <li class="nav-item pull-left" style="width:135px">' +
    '                    <a href="${HEAD93}" target="_blank">' +
    '                        <div class="column-name">' +
    '                            <span>投资者关系</span>' +
    '                            <span style="color:#fff;">(IR)</span>' +
    '                        </div>' +
    '                    </a>' +
    '                </li>' +
    '                <li class="nav-item pull-left">' +
    '                    <a href="${HEAD94}" target="_blank">' +
    '                        <div class="column-name">' +
    '                            <span>关于公司</span>' +
    '                            <div class="icon-cpic-common circle hide"></div>' +
    '                        </div>' +
    '                    </a>' +
    '                    <div class="nav-item-box hide">' +
    '                        <ul class="clearfix">' +
    '                            <li class="pull-left">' +
    '                                <a href="${HEAD95}" target="_blank">财产保险公司</a>' +
    '                            </li>' +
    '                            <li class="pull-left">' +
    '                                <a href="${HEAD96}" target="_blank">人寿保险公司</a>' +
    '                            </li>' +
    '                            <li class="pull-left">' +
    '                                <a href="${HEAD97}" target="_blank">资产管理公司</a>' +
    '                            </li>' +
    '                            <li class="pull-left">' +
    '                                <a href="${HEAD98}" target="_blank">健康险公司</a>' +
    '                            </li>' +
    '                            <li class="pull-left">' +
    '                                <a href="${HEAD99}" target="_blank">安信农保公司</a>' +
    '                            </li>' +
    '                            <li class="pull-left">' +
    '                                <a href="${HEAD100}" target="_blank">长江养老公司</a>' +
    '                            </li>' +
    '                            <li class="pull-left">' +
    '                                <a href="${HEAD101}" target="_blank">养老投资公司</a>' +
    '                            </li>' +
    '                        </ul>' +
    '                        <div class="line"></div>' +
    '                        <div class="column-link-box clearfix">' +
    '                            <h3 class="pull-left">关于太平洋保险集团</h3>' +
    '                            <a href="${HEAD102}" target="_blank">' +
    '                                <span class="pull-left">查看太平洋保险></span>' +
    '                            </a>' +
    '                        </div>' +
    '                    </div>' +
    '                </li>' +
    '            </ul>' +
    '        </div>' +
    '        <div class="search-box clearfix pull-left">' +
    '            <input type="text" class="pull-left search-text" placeholder="搜索您感兴趣的保险类型或服务">' +
    '            <span class="icon-cpic-common search-btn pull-left"></span>' +
    '            <a href="${HEAD103}" class="toApp">' +
    '                <div class="appWral">' +
    '                    <div class="appImg"></div>' +
    '                    <p>太平洋保险APP</p>' +
    '                </div>' +
    '            </a>' +
    '            <div class="search-prompt-box hide">' +
    '                <i class="icon-cpic-common circle"></i>' +
    '                <ul class="keywords-box">' +
    '                    ' +
    '                        ' +
    '                            <li>' +
    '                                <a href="javascript:;">30秒免费定制您的专业保险方案</a>' +
    '                            </li>' +
    '                            <li>' +
    '                                <a href="javascript:;">&quot;乐游人生&quot;境外旅行救援保险(尊贵版)</a>' +
    '                            </li>' +
    '                            <li>' +
    '                                <a href="javascript:;">全能卫士家财险</a>' +
    '                            </li>' +
    '                            <li>' +
    '                                <a href="javascript:;">个人意外综合保险</a>' +
    '                            </li>' +
    '                            <li>' +
    '                                <a href="javascript:;">医保卡买保险</a>' +
    '                            </li>' +
    '                            <li>' +
    '                                <a href="javascript:;">保单查询</a>' +
    '                            </li>' +
    '                    ' +
    '                </ul>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '</div>'
var footTemplate =
    '<div class="footer">' +
    '	<div class="footer-contanir">' +
    '		<div class="footer-top clearfix">' +
    '			<div class="clearfix pull-left" style="overflow: hidden">' +
    '				<div class="pull-left list">' +
    '					<h4>关于我们</h4>' +
    '					<ul>' +
    '						<li><a href="${FOOT0}" rel="nofollow" target="_blank">公司简介</a></li>' +
    '						<li><a href="${FOOT1}" rel="nofollow" target="_blank">联系我们</a></li>' +
    '						<li><a href="${FOOT2}" rel="nofollow" target="_blank">人才招聘</a></li>' +
    '					</ul>' +
    '				</div>' +
    '				<div class="pull-left list">' +
    '					<h4>帮助中心</h4>' +
    '					<ul>' +
    '						<li><a href="${FOOT3}" rel="nofollow" target="_blank">隐私条款</a></li>' +
    '						<li><a href="${FOOT4}" rel="nofollow" target="_blank">法律咨询</a></li>' +
    '						<li><a href="${FOOT5}" target="_blank">保险资讯</a></li>' +
    '                        <li><a href="${FOOT6}" target="_blank">保险百科</a></li>' +
    '					</ul>' +
    '				</div>' +
    '				<div class="pull-left list">' +
    '					<h4>集团旗下</h4>' +
    '					<ul>' +
    '						<li><a href="${FOOT7}" target="_blank">财产保险</a></li>' +
    '						<li><a href="${FOOT8}" target="_blank">人寿保险</a></li>' +
    '						<li><a href="${FOOT9}" target="_blank">资产管理</a></li>' +
    '						<li><a href="${FOOT10}" target="_blank">健康险</a></li>' +
    '					</ul>' +
    '				</div>' +
    '				<div class="pull-left list">' +
    '					<h4>&nbsp;</h4>' +
    '					<ul>' +
    '						<li><a href="${FOOT11}" target="_blank">安信农保</a></li>' +
    '						<li><a href="${FOOT12}" target="_blank">长江养老</a></li>' +
    '						<li><a href="${FOOT13}" target="_blank">养老投资</a></li>' +
    '					</ul>' +
    '				</div>' +
    '			</div>' +
    '			<div class="pull-left qrcode-box">' +
    '				<h4>关注我们</h4>' +
    '				<ul class="clearfix"' +
    '					style="overflow: hidden; float: right;">' +
    '					<li class="pull-left"><i class="icon-cpic-common image-codePhone"></i>' +
    '					<p>手机网站</p></li>' +
    '					<li class="pull-left"><i class="icon-cpic-common image-codeWx"></i>' +
    '					<p>官方微信号</p></li>' +
    '					<li class="pull-left"><i class="icon-cpic-common image-codeApp"></i>' +
    '					<p>APP下载</p></li>' +
    '				</ul>' +
    '			</div>' +
    '		</div>' +
    '		<div class="footer-bot">' +
    '			<div class="pull-left copyright">' +
    '				<p>版权所有©中国太平洋保险（集团）股份有限公司CopyRight©China Pacific</p>' +
    '				<p style="margin-top: 5px;">Insurance(group) Co.,Ltd.. All' +
    '					Rights Reserved 沪ICP备12028297号</p>' +
    '			</div>' +
    '			<div class="pull-right">' +
    '              <div class="clearfix pull-left" style="margin-right:5px;"><i class="icon-cpic-common icon-iconphone_1x"></i></div>' +
    '				<div class="pull-left">' +
    '                  <p style="font-size: 14px; letter-spacing: 1.75px;line-height:19px;color:#d0e0f2;margin-left:5px;";>7×24小时全国统一客服电话</p>' +
    '                  <p style="font-size: 18px; opacity: 0.8; letter-spacing: 2.25px;line-height:24px;color:#d0e0f2">95500</p>' +
    '				</div>' +
    '			</div>' +
    '		</div>' +
    '	</div>' +
    '</div>'

///////////////////////////////////////////  样式加载  /////////////////////////////////////////////////////////
dynamicLoadCss('https://a2cdn3.8686c.com/css/v2/common.css')

///////////////////////////////////////////  脚本加载  /////////////////////////////////////////////////////////

//判断页面中是否有jQuery对象，如果没有则引入jquery
if (typeof jQuery === 'undefined') {
    loadJs('https://a2cdn3.8686c.com/js/jquery.min.js', function() {
        $.ajax({
            url: 'https://a2cdn3.8686c.com/js/url.js',
            type: 'GET',
            dataType: 'jsonp',
            jsonpCallback: 'callbackjsonp',
            success: function(data) {
                //头部样式加载
                $('body').prepend(replaceLink(headTemplate, JSON.parse(data)))
                    //尾部样式加载
                $('body').append(replaceLink(footTemplate, JSON.parse(data)))
                loadJs('https://a2cdn3.8686c.com/js/v2/common.js')
            },
            error: function(data) {}
        })
    })
} else {
    $(function() {
        if ($('.footer').length < 1) {
            $.ajax({
                url: 'https://a2cdn3.8686c.com/js/url.js',
                type: 'GET',
                dataType: 'jsonp',
                jsonpCallback: 'callbackjsonp',
                success: function(data) {
                    //头部样式加载
                    $('body').prepend(replaceLink(headTemplate, JSON.parse(data)))
                        //尾部样式加载
                    $('body').append(replaceLink(footTemplate, JSON.parse(data)))
                    loadJs('https://a2cdn3.8686c.com/js/v2/common.js')
                },
                error: function(data) {}
            })
        }
    })
}