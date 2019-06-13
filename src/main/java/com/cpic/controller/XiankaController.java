package com.cpic.controller;

import com.cpic.pojo.Xianka;
import com.cpic.service.XiankaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class XiankaController {
    @Autowired
    private XiankaService xiankaService;

    @RequestMapping("/selectMima")//按卡号和密码进行保修卡的激活
    @ResponseBody
    public String selectMima(Model model,String xkcard,String xkpass) {
        System.out.println("xkcard = " + xkcard);
        System.out.println("xkpass = " + xkpass);
        String jhm = xiankaService.selectMima(xkcard, xkpass);
        System.out.println("jhm = " + jhm);
        if(jhm!=null) {
           /* System.out.println("equals="+jhm.equals("2"));
            System.out.println("jhm=='2'="+jhm=="2" );*/
            if (jhm.equals("2")) {
                Integer num = xiankaService.updateJihuo(xkcard, xkpass);
                if (num > 0) {
                    return "保修卡激活成功！";
                } else {
                    return "保修卡激活失败！";
                }
            } else {
                return "此卡已为激活状态可以直接进行保修卡查询！";
            }
        }else{
            return "查无此卡！";
        }
    }

    @RequestMapping("/selectJihuo")//先进行激活码查询，如果激活码为1就进行查询操作，为2就无法查询
    @ResponseBody
    public String selectJihuo(Model model,String xkcard,String xkpass){//按卡号和密码查询
        System.out.println("xkcard = " + xkcard);
        System.out.println("xkpass = " + xkpass);
        String jhm = xiankaService.selectMima(xkcard, xkpass);
        if (jhm!=null){
            if (jhm.equals("2")){
                return "1";//您的保险卡未激活,请激活后再查询！
            }else {
                return "2";//执行查询！
            }
        }
        return "查无此卡！";
    }
    @RequestMapping("/selectCxbd")//此卡已为激活状态进行查询
    @ResponseBody
    public List<Xianka> selectCxbd(Model model,String xkcard,String xkpass){//此卡已为激活状态进行查询
        List<Xianka> list = xiankaService.selectBd(xkcard,xkpass);
        return list;
    }







    @RequestMapping("/selectSfz")//先进行激活码查询，如果激活码为1就进行查询操作，为2就无法查询
    @ResponseBody
    public String selectSfz(Model model,String xkrenid){//按身份证查询
        System.out.println("xkrenid = " + xkrenid);
        String jhm = xiankaService.selectRenid(xkrenid);
        if (jhm!=null){
            if (jhm.equals("2")){
                return "1";//您的保险卡未激活,请激活后再查询！
            }else {
                return "2";//执行查询(selectCxsfz)！
            }
        }
        return "查无此卡！";
    }
    @RequestMapping("/selectCxsfz")
    @ResponseBody
    public List<Xianka> selectCxsfz(Model model, String xkrenid){//此卡已为激活状态进行查询
        System.out.println("xkrenid = " + xkrenid);
        List<Xianka> list = xiankaService.selectSfz(xkrenid);
        return list;
    }

}
