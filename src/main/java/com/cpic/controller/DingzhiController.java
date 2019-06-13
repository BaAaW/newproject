package com.cpic.controller;

import com.cpic.pojo.Dingzhi;
import com.cpic.service.DingzhiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class DingzhiController {
    @Autowired
    private DingzhiService dingzhiService;

    @RequestMapping("/insertDing")
    @ResponseBody
public Integer insertDing(Dingzhi dingzhi, String who,String birth,String intention,String budget,String date,String dname,String age,String phone,String site,Integer dznum){
        Integer dznum1 = dingzhiService.selectMax();//最后约定的人数
        dingzhi.setDznum(dznum1+1);//每预订成功人数加1
        /*System.out.println("dingzhi = " + dingzhi);
        System.out.println("wo = " + who);
        System.out.println("cs = " + birth);
        System.out.println("yx = " + intention);
        System.out.println("ys = " + budget);
        System.out.println("yy = " + date);
        System.out.println("mz = " + dname);
        System.out.println("xb = " + age);
        System.out.println("sj = " + phone);
        System.out.println("dz = " + site);
        System.out.println("xz = " + dznum);*/
        Integer num = dingzhiService.insertDingzhi(dingzhi);
        return num;
    }

    @RequestMapping("/selectMaxnum")//显示最大选择定制人数
    @ResponseBody
    public Integer selectMaxnum(){
        System.out.println("dingzhiService = " + dingzhiService);
        Integer dznum = dingzhiService.selectMax();
          return dznum;
    }

    @RequestMapping("/xiuGai")//跳转并传的值到xiugai.html
    public String xiuGai(Model model,Integer id){
        System.out.println("----------------修改----------------" );
        System.out.println("id = " + id);
        List<Dingzhi> xg = dingzhiService.selectDzid(id);
        System.out.println("xg = " + xg);
        model.addAttribute("xg",xg);
        return "xiugai";
    }
    @RequestMapping("/updateDingzhi")//执行修改SQL
    @ResponseBody
    public Integer updateDingzhi(Dingzhi dingzhi, String who,String birth,String intention,String budget,String date,String dname,String age,String phone,String site,Integer dzid){
        Integer xgnum = dingzhiService.updateDingzhi(dingzhi);
        return xgnum;
    }

}
