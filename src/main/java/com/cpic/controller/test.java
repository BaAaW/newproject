package com.cpic.controller;

import com.cpic.service.DingzhiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class test {

    @Autowired
    private DingzhiService dingzhiService;

   //测试fuwu模板
    @RequestMapping("fw")
    public String fw(){

        return "index.html";
    }

    //测试fuwu1模板
    @RequestMapping("fw1")
    public String fw1(){

        return "fuwu1.html";
    }

    //测试fuwu2模板
    @RequestMapping("fw2")
    public String fw2(){

        return "fuwu2.html";
    }

    //测试fuwu3模板
    @RequestMapping("fw3")
    public String fw3(){

        return "fuwu3.html";
    }

    //测试fuwu4模板
    @RequestMapping("fw4")
    public String fw4(){

        return "fuwu4.html";
    }


    //测试fuwu5模板
    @RequestMapping("fw5")
    public String fw5(){

        return "fuwu5.html";
    }


    //测试fuwu6模板
    @RequestMapping("fw6")
    public String fw6(){

        return "fuwu6.html";
    }


    //服务跳转
    @RequestMapping("fw7")
    public String fw7(String id){


        return "fuwu7.html";
    }
    //测试fuwu7模板
    @RequestMapping("fwbg")
    public String fwbg(String id){


        return "biangeng7.html";
    }



    //测试fuwu8模板
    @RequestMapping("fw8")
    public String fw8(){

        return "fuwu8.html";
    }


    //测试fuwu9模板
    @RequestMapping("fw9")
    public String fw9(Model model){
        //把最大的dznum发送给页面
       Integer dznum = dingzhiService.selectMax();
       model.addAttribute("dznum",dznum);

        return "fuwu9.html";
    }
}
