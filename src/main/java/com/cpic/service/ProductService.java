package com.cpic.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cpic.pojo.Product;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;

import java.util.List;

public interface ProductService extends IService<Product> {
    //public IPage<Product> getallproduct(Page<Product> page);
    public Product getproductbypid(int pid);
    public List<Product> getallproduct(int selectcont,int selectfeat,int selectage,int selecttime,int fkpdid);
}
