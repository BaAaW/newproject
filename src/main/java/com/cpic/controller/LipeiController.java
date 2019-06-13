package com.cpic.controller;

import com.cpic.service.LipeiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LipeiController {
    @Autowired
    private LipeiService lipeiService;

    @RequestMapping("/SelectLpbaoan")
    @ResponseBody
    public String SelectLpbaoan(Model model, String lpidnumber, String lpnumber){
        System.out.println("lpidnumber = " + lpidnumber);
        System.out.println("lpnumber = " + lpnumber);
        Integer num = lipeiService.selectLpbaoan(lpidnumber,lpnumber);
        System.out.println("num = " + num);
        String jg = lipeiService.selectLpjieguo(num);
        System.out.println("jg = " + jg);
        if(num==null) {
        return "0";
        }
        return jg;
    }


    @RequestMapping("/SelectLpbaodan")
    @ResponseBody
    public String SelectLpbadoan(Model model, String lpidnumber, String lpbdnumber) {
        System.out.println("lpidnumber = " + lpidnumber);
        System.out.println("lpbdnumber = " + lpbdnumber);
        Integer num = lipeiService.selectLpbaodan(lpidnumber, lpbdnumber);
        System.out.println("num = " + num);
        String jg = lipeiService.selectLpjieguo(num);
        System.out.println("jg = " + jg);
        if(num==null) {
            return "0";
        }
        return jg;
    }
}
