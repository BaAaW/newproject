package com.cpic.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cpic.dao.CertTypeMapper;
import com.cpic.pojo.*;
import com.cpic.service.*;
import com.cpic.service.impl.CertTypeServiceImpl;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.mongodb.BasicDBObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
@RequestMapping("/hds")
@Controller
public class IndexController {
    @Autowired
    private ContentService contentService;
    @Autowired
    private JobclassService jobclassService;
    @Autowired
    private FeaturesService featuresService;
    @Autowired
    private CertTypeService certTypeService;
    @Autowired
    private ProductService productService;
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private UserService userService;
    @Autowired
    private OrdersService ordersService;


    @RequestMapping("addcerttype")
    public String addCertType(String ctname){
        CertType certType=new CertType();
        certType.setCename(ctname);
        certTypeService.save(certType);
        return "redirect:listcerttype";
    }

    @RequestMapping("listcerttype")
    public String listCertType(Model model){
        List<CertType> certTypelist = certTypeService.list();
        for(CertType c:certTypelist){
            System.out.println(c.getCeid()+"\t"+c.getCename());
        }
        model.addAttribute("certTypelist",certTypelist);
        return "listcerttype";
    }

    @RequestMapping("addproduct")
    public String addproduct(Product product){
        productService.save(product);
        return "redirect:listproduct";
    }

    @RequestMapping("listproduct")
    public String listproduct(Model model){
        //IPage<Product> page = productService.getallproduct(new Page<Product>(1,10));
        //List<Product> productlist = page.getRecords();
//        PageInfo<Product> productlist =productService.getallproduct();
//        model.addAttribute("productlist",productlist);
//        System.out.println(productlist.size());
//        System.out.println(productlist.get(0).getFeaturelist());
//        System.out.println(productlist.get(0).getProtectionlist());
        return "listcerttype";
    }

    @RequestMapping("/list")
    public String list(Model model){
        //IPage<Product> page = productService.getallproduct(new Page<Product>(1,25));
        //Page<Product> page=productService.getallproduct();
//        System.out.println("class:"+page.getClass());
//        System.out.println("total:"+page.getTotal());
//        System.out.println("pages:"+page.getPages());
//        System.out.println("pagenum:"+page.getPageNum());
//        model.addAttribute("productlist",page.getResult());
//        model.addAttribute("pagecount",page.getPages());
//        model.addAttribute("producttotal",page.getTotal());

        int pagenum=1;
        int pagesize=5;

        List<Content> contentlist=contentService.list();
        List<Features> featureslist=featuresService.list();
        List<Product> products=productService.getallproduct(0,0,0,0);
        List<Product> productlist=null;
        if(pagenum*pagesize>products.size()){
            productlist=products.subList((pagenum-1)*pagesize,products.size());
        }else{
            productlist=products.subList((pagenum-1)*pagesize,pagenum*pagesize);
        }
        model.addAttribute("productlist",productlist);
        model.addAttribute("contentlist",contentlist);
        model.addAttribute("featureslist",featureslist);

        model.addAttribute("selectcont",0);
        model.addAttribute("selectfeat",0);
        model.addAttribute("selectage",0);
        model.addAttribute("selecttime",0);

        model.addAttribute("pagecount",products.size()/pagesize+1);
        model.addAttribute("producttotal",products.size());
        model.addAttribute("pagenum",pagenum);

        System.out.println(contentlist);
        //System.out.println(2/pagesize+1);

        return "market/rsywbx/list";
    }
    @RequestMapping("/pageproduct")
    public String pageproduct(Integer pagenum,Integer selectcont,Integer selectfeat,Integer selectage,Integer selecttime,Model model){
        int pagesize=5;
        List<Content> contentlist=contentService.list();
        List<Features> featureslist=featuresService.list();

        List<Product> products=productService.getallproduct(selectcont,selectfeat,selectage,selecttime);
        List<Product> productlist=null;
        if(pagenum*pagesize>products.size()){
            productlist=products.subList((pagenum-1)*pagesize,products.size());
        }else{
            productlist=products.subList((pagenum-1)*pagesize,pagenum*pagesize);
        }

        model.addAttribute("productlist",productlist);
        model.addAttribute("contentlist",contentlist);
        model.addAttribute("featureslist",featureslist);

        model.addAttribute("selectcont",selectcont);
        model.addAttribute("selectfeat",selectfeat);
        model.addAttribute("selectage",selectage);
        model.addAttribute("selecttime",selecttime);

        model.addAttribute("pagecount",products.size()/pagesize+1);
        model.addAttribute("producttotal",products.size());
        model.addAttribute("pagenum",pagenum);

        return "market/rsywbx/list";
    }
    @GetMapping("showproduct/{pid}")
    public String showproduct(@PathVariable Integer pid,Model model){
        System.out.println(pid);
        Product p=productService.getById(pid);

        Query query=new Query();
        query.addCriteria(Criteria.where("pid").is(pid));
        Product mongoproduct = mongoTemplate.findOne(query, Product.class);

        if(mongoproduct==null){
            model.addAttribute("mongoproduct",new Product());
        }
        else {
            model.addAttribute("mongoproduct",mongoproduct);
        }
        model.addAttribute("product",p);

        return "showproduct";
    }
    @GetMapping("estimate")
    public String estimate(Integer productid,Model model,@ModelAttribute("orders")Orders orders){
        System.out.println("productid"+productid);
        Product p=productService.getproductbypid(productid);
        List<jobclass> largelist=jobclassService.list(new QueryWrapper<jobclass>().eq("cgrade",1));
        model.addAttribute("largelist",largelist);
        model.addAttribute("product",p);
        int maxctype=0;
        for (Protection prot:p.getProtectionlist()) {
            if(prot.getMaxctype()>maxctype)maxctype=prot.getMaxctype();
        }
        model.addAttribute("maxctype",maxctype);
        return "estimate";
    }
    @RequestMapping("nextestimate")
    public String nextestimate(HttpSession session, Model model, @ModelAttribute("orders") @Validated Orders orders,
                               ArrayList<Integer> protvals,ArrayList<Integer> protvalg,ArrayList<Integer> protids,ArrayList<Integer> protidg,
                               Integer pid, Integer cid, BindingResult result){
        if(protvalg==null){
            protvalg=new ArrayList<Integer>();
        }
        for (int i:protvalg) {
            System.out.println("protvalg"+i);
        }
        for (int i:protvals) {
            System.out.println("protvals"+i);
        }
        for (int i:protidg) {
            System.out.println("protidg"+i);
        }
        for (int i:protids) {
            System.out.println("protids"+i);
        }
        System.out.println("pid"+pid+"cid"+cid);
        jobclass jobclass=jobclassService.getById(cid);
        orders.setJobclass(jobclass);
        System.out.println(orders);
        if(result.hasErrors()){
            for (ObjectError error : result.getAllErrors()) {
                System.out.println(error.getDefaultMessage());
            }
            return "estimate";
        }

        session.setAttribute("user",userService.getuserbyuid(1));
        User user=(User)session.getAttribute("user");
        if(user==null){
            session.setAttribute("user",new User());
        }

        model.addAttribute("product",productService.getById(pid));
        model.addAttribute("certTypelist",certTypeService.list());
        return "nextestimate";
    }
}
