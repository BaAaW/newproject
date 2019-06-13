package com.cpic.controller;

import com.cpic.pojo.Baodan;
import com.cpic.pojo.Chexian;
import com.cpic.pojo.Dingzhi;
import com.cpic.service.BaodanService;
import com.cpic.service.ChexianService;
import com.cpic.service.DingzhiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class SelectController {
    @Autowired
    private DingzhiService dingzhiService;
    @Autowired
    private BaodanService baodanService;
    @Autowired
    private ChexianService chexianService;

    @PostMapping("/selectPhone")//按手机号查询
    public String selectPhone(Model model, String phone, String dname) {
        System.out.println("phone = " + phone);
        System.out.println("dname = " + dname);

        List<Dingzhi> dz = dingzhiService.selectPhone(phone, dname);

        if (dz.size() == 0 || dz.isEmpty()) {
            model.addAttribute("cw", "查无此单");
            return "fuwu1";
        } else {
            model.addAttribute("dz", dz);
            model.addAttribute("ws", "为谁投保");
            model.addAttribute("cs", "出生日期");
            model.addAttribute("tb", "投保意向");
            model.addAttribute("bf", "保费预算");
            model.addAttribute("yy", "预约时间");
            model.addAttribute("nd", "您的称呼");
            model.addAttribute("xb", "性别");
            model.addAttribute("yl", "预留手机号");
            model.addAttribute("jz", "居住地");
            model.addAttribute("bd", "保单变更");
            System.out.println("dz = " + dz);
            return "selectSj";
        }
    }


    @PostMapping("/selectBaodan")//按保单号查询
    public String selectBaodan(Model model, String bdnumber, String bdidnumber) {
        System.out.println("bdnumber = " + bdnumber);
        System.out.println("bdidnumber = " + bdidnumber);

        List<Baodan> bd = baodanService.selectBaodan(bdnumber, bdidnumber);

        if (bd.size() == 0 || bd.isEmpty()) {
            model.addAttribute("cw1", "查无此单");
            return "fuwu1";
        } else {
            model.addAttribute("bd", bd);
            model.addAttribute("sfh", "身份证号");
            model.addAttribute("bdh", "保单号");
            model.addAttribute("nr", "保障内容");
            model.addAttribute("ts", "保障特色");
            model.addAttribute("cb", "承保年龄");
            model.addAttribute("qx", "保单期限");
            model.addAttribute("jg", "价格");
            model.addAttribute("be", "保额");
            model.addAttribute("sj", "参保时间");
            model.addAttribute("sjh", "手机号");
            model.addAttribute("xb", "性别");
            model.addAttribute("bdr", "被保人");
            System.out.println("bd = " + bd);
            return "selectBd";
        }
    }


    @PostMapping("/selectChexian")//按车牌号/车架号查询
    public String selectChexian(Model model, String cpnumber, String cjnumber, String cxidnumber, String cpcj) {
        System.out.println("cpcj = " + cpcj);
        List<Chexian> cx = chexianService.selectChexian(cpcj, null, cxidnumber);//按车牌号查询
        List<Chexian> cx1 = chexianService.selectChexian(null, cpcj, cxidnumber);//按车架号查询

        if (cx.size() == 0 || cx.isEmpty()) {//如果车牌号为null就进行车架号查询
            if (cx1.size() == 0 || cx1.isEmpty()) {  //如果车架号为null
                model.addAttribute("cw2", "查无此单"); //两个都查询不到就返回原页面
                return "fuwu1";
            }else{
                model.addAttribute("cx", cx1);
                model.addAttribute("cx1", "车牌号");
                model.addAttribute("cx2", "车架号");
                model.addAttribute("cx3", "身份证号");
                model.addAttribute("cx4", "保单号");
                model.addAttribute("cx5", "行驶城市");
                model.addAttribute("cx6", "车主生日");
                model.addAttribute("cx7", "手机号");
                model.addAttribute("cx8", "车险套餐");
                model.addAttribute("cx9", "保额");
                model.addAttribute("cx10", "产品方案");
                model.addAttribute("cx11", "参保时间");
                model.addAttribute("cx12", "保险期限");
                model.addAttribute("cx13", "承保年龄");
                model.addAttribute("cx14", "销售区域");
                model.addAttribute("cx15", "被保人");
                System.out.println(" 按车架号查询= " + cx1);
                return "selectCx";
            }
        } else {
            model.addAttribute("cx", cx);
            model.addAttribute("cx1", "车牌号");
            model.addAttribute("cx2", "车架号");
            model.addAttribute("cx3", "身份证号");
            model.addAttribute("cx4", "保单号");
            model.addAttribute("cx5", "行驶城市");
            model.addAttribute("cx6", "车主生日");
            model.addAttribute("cx7", "手机号");
            model.addAttribute("cx8", "车险套餐");
            model.addAttribute("cx9", "保额");
            model.addAttribute("cx10", "产品方案");
            model.addAttribute("cx11", "参保时间");
            model.addAttribute("cx12", "保险期限");
            model.addAttribute("cx13", "承保年龄");
            model.addAttribute("cx14", "销售区域");
            model.addAttribute("cx15", "被保人");
            System.out.println(" 按车牌号查询= " + cx);
            return "selectCx";
        }

      }
    @PostMapping("/selectChexianFw4")//按车牌号/车架号查询
    public String selectChexianFw4(Model model, String cpnumber, String cjnumber, String cxidnumber, String cpcj) {
        System.out.println("cpcj = " + cpcj);
        List<Chexian> cx = chexianService.selectChexian(cpcj, null, cxidnumber);//按车牌号查询
        List<Chexian> cx1 = chexianService.selectChexian(null, cpcj, cxidnumber);//按车架号查询

        if (cx.size() == 0 || cx.isEmpty()) {//如果车牌号为null就进行车架号查询
            if (cx1.size() == 0 || cx1.isEmpty()) {  //如果车架号为null
                model.addAttribute("cw2", "查无此单"); //两个都查询不到就返回原页面
                return "fuwu4";
            }else{
                model.addAttribute("cx", cx1);
                model.addAttribute("cx1", "车牌号");
                model.addAttribute("cx2", "车架号");
                model.addAttribute("cx3", "身份证号");
                model.addAttribute("cx4", "保单号");
                model.addAttribute("cx5", "行驶城市");
                model.addAttribute("cx6", "车主生日");
                model.addAttribute("cx7", "手机号");
                model.addAttribute("cx8", "车险套餐");
                model.addAttribute("cx9", "保额");
                model.addAttribute("cx10", "产品方案");
                model.addAttribute("cx11", "参保时间");
                model.addAttribute("cx12", "保险期限");
                model.addAttribute("cx13", "承保年龄");
                model.addAttribute("cx14", "销售区域");
                model.addAttribute("cx15", "被保人");
                System.out.println(" 按车架号查询= " + cx1);
                return "selectCx";
            }
        } else {
            model.addAttribute("cx", cx);
            model.addAttribute("cx1", "车牌号");
            model.addAttribute("cx2", "车架号");
            model.addAttribute("cx3", "身份证号");
            model.addAttribute("cx4", "保单号");
            model.addAttribute("cx5", "行驶城市");
            model.addAttribute("cx6", "车主生日");
            model.addAttribute("cx7", "手机号");
            model.addAttribute("cx8", "车险套餐");
            model.addAttribute("cx9", "保额");
            model.addAttribute("cx10", "产品方案");
            model.addAttribute("cx11", "参保时间");
            model.addAttribute("cx12", "保险期限");
            model.addAttribute("cx13", "承保年龄");
            model.addAttribute("cx14", "销售区域");
            model.addAttribute("cx15", "被保人");
            System.out.println(" 按车牌号查询= " + cx);
            return "selectCx";
        }

    }

}
