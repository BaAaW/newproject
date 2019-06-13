package com.cpic.controller;

import com.cpic.pojo.City;
import com.cpic.service.CityService;
import com.cpic.service.PromaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class PcController {
    @Autowired
    private PromaryService promaryService;
    @Autowired
    private CityService cityService;

@RequestMapping("/SelectCity")
@ResponseBody
    public List<City> SelectCity(String proName){
   /* System.out.println("省份 = " + proName);*/
    Integer proId = promaryService.selectProid(proName);
    List<City> listc = cityService.selectCityname(proId);
    /*System.out.println("listc = " + listc);*/
        return listc;
    }

}
