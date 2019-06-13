package com.cpic.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cpic.pojo.jobclass;
import com.cpic.service.JobclassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RequestMapping("/hds")
@RestController
public class AjaxController {
    @Autowired
    private JobclassService jobclassService;
    @GetMapping("largetomiddle")
    public List<jobclass> largetomiddle(Integer largecid){
        System.out.println("largecid"+largecid);
        List<jobclass> middlelist=jobclassService.list(new QueryWrapper<jobclass>().eq("cparent",largecid));
        return middlelist;
    }
    @GetMapping("middletosmall")
    public List<jobclass> middletosmall(Integer middlecid){
        System.out.println("middlecid"+middlecid);
        List<jobclass> smalllist=jobclassService.list(new QueryWrapper<jobclass>().eq("cparent",middlecid));
        return smalllist;
    }
    @GetMapping("smalltoctype")
    public Integer smalltoctype(Integer smallcid){
        System.out.println("smallcid"+smallcid);
        jobclass j=jobclassService.getById(smallcid);
        if (j!=null) return j.getCtype();
        else return 0;
    }
    @RequestMapping("addinsuredUser")
    public void addinsuredUser(){

    }
}
