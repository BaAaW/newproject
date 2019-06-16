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
import java.util.*;
import java.util.stream.Stream;

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
    private ProtectionService protectionService;
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
    public String listproduct(Model model,ArrayList<Integer> id){
        System.out.println(id);
        return "listcerttype";
    }

    @RequestMapping("/list/{pdid}")
    public String list(Model model,@PathVariable Integer pdid){

        int pagenum=1;
        int pagesize=5;

        List<Content> contentlist=contentService.list();
        List<Features> featureslist=featuresService.list();
        List<Product> products=productService.getallproduct(0,0,0,0,pdid);
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
        model.addAttribute("pdid",pdid);

        System.out.println(contentlist);
        //System.out.println(2/pagesize+1);

        return "market/rsywbx/list";
    }
    @RequestMapping("/pageproduct")
    public String pageproduct(Integer pdid,Integer pagenum,Integer selectcont,Integer selectfeat,Integer selectage,Integer selecttime,Model model){
        int pagesize=5;
        List<Content> contentlist=contentService.list();
        List<Features> featureslist=featuresService.list();

        List<Product> products=productService.getallproduct(selectcont,selectfeat,selectage,selecttime,pdid);
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
        model.addAttribute("pdid",pdid);

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
                               @ModelAttribute("protvals") String protvals,@ModelAttribute("protvalg") String protvalg,
                               @ModelAttribute("protids") String protids,@ModelAttribute("protidg") String protidg,
                               @ModelAttribute("pid")Integer pid, Integer cid, BindingResult result){
        if(protvalg==null){
            protvalg="";
        }

        System.out.println("protvalg"+protvalg);
        System.out.println("protvals"+protvals);
        System.out.println("protidg"+protidg);
        System.out.println("protids"+protids);

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
    @RequestMapping("orderconfirm")
    public String orderconfirm(String fkinuserids,String copieslist,String relations,
                               String protvals,String protvalg,
                               String protids,String protidg,
                               Integer pid,@ModelAttribute("orders")Orders order,User asuser,Model model){

        System.out.println("fkinuserids"+fkinuserids);
        System.out.println("copieslist"+copieslist);
        System.out.println("relations"+relations);
        if(protvalg==null){
            protvalg="";
        }
        System.out.println("protvalg"+protvalg);
        System.out.println("protvals"+protvals);
        System.out.println("protidg"+protidg);
        System.out.println("protids"+protids);

        System.out.println("asuser"+asuser);
        System.out.println("order"+order);

        List<Protection> subprotectionList=new ArrayList<>();
        List<Protection> mainprotectionList=new ArrayList<>();
        List<Orders> addedorderids=new ArrayList<>();

        ArrayList<Integer> protvalgs=stringtointlist(protvalg);
        ArrayList<Integer> protvalss=stringtointlist(protvals);
        ArrayList<Integer> protidgs=stringtointlist(protidg);
        ArrayList<Integer> protidss=stringtointlist(protids);
        ArrayList<Integer> fkinuseridss=stringtointlist(fkinuserids);
        ArrayList<Integer> copieslists=stringtointlist(copieslist);
        List<String> relationss=Arrays.asList(relations.split("-"));

        int totalcopies=0;

        QueryWrapper<User> userquery=new QueryWrapper<User>().eq("uname",asuser.getUname())
                .eq("certnum",asuser.getCertnum()).eq("fkceid",asuser.getFkceid());
        User checkuser=userService.getOne(userquery);
        if(checkuser==null){
            userService.save(asuser);
        }else{
            userService.update(asuser,userquery);
        }
        asuser=userService.getOne(userquery);
        asuser.setCertType(certTypeService.getById(asuser.getFkceid()));

        try {
            int z=0;
            for (int i:fkinuseridss) {
                Orders o=(Orders) order.clone();
                String uuid=UUID.randomUUID().toString();
                o.setUuid(uuid);
                o.setFkinid(i);
                o.setInuser(userService.getuserbyuid(i));
                o.setCopies(copieslists.get(z));
                o.setRelation(relationss.get(z));
                o.setAsuser(asuser);
                o.setFkasid(asuser.getUid());
                o.setJobclass(jobclassService.getById(o.getFkjobcid()));
                System.out.println(o);
                ordersService.save(o);
                addedorderids.add(ordersService.selectOrdersbyuuid(uuid));
                z++;
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        for (Orders j:addedorderids) {
            for (int i:protidgs) {
                ordersService.insertordertoprotection(i,j.getOid());
            }
            for (int i:protidss) {
                ordersService.insertordertoprotection(i,j.getOid());
            }
            totalcopies+=j.getCopies();
        }
        //附加险
        int x=0;
        for (int i:protidgs) {
            Protection mainprotection=protectionService.getById(i);
            mainprotection.setAmount(protvalgs.get(x));
            x++;
            subprotectionList.add(mainprotection);
        }
        //主险
        int y=0;
        for (int i:protidss) {
            Protection subprotection=protectionService.getById(i);
            subprotection.setAmount(protvalss.get(y));
            y++;
            mainprotectionList.add(subprotection);
        }

        model.addAttribute("mainprotectionList",mainprotectionList);
        model.addAttribute("subprotectionList",subprotectionList);
        model.addAttribute("product",productService.getById(pid));
        model.addAttribute("addedorderids",addedorderids);
        model.addAttribute("asuser",asuser);
        model.addAttribute("totalcopies",totalcopies);

        return "orderconfirm";
    }
    private ArrayList<Integer> stringtointlist(String s){
        String[] rs1=s.split("-");
        ArrayList<Integer> rs2=new ArrayList<>();
        for (String r:rs1) {
            rs2.add(Integer.valueOf(r));
        }
        //System.out.println("rs2"+rs2);
        return rs2;
    }
}
